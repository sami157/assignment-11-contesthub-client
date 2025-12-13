import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const AddContest = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const [deadline, setDeadline] = useState(new Date());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.display_url;
    };


    const onSubmit = async (data) => {
        const imageFile = data.image[0];
        const imageUrl = await uploadImageToImgBB(imageFile);
        const contestData = {
            creatorEmail: user.email,
            name: data.name,
            image: imageUrl,
            description: data.description,
            price: Number(data.price),
            prizeMoney: Number(data.prizeMoney),
            taskInstruction: data.taskInstruction,
            contestType: data.contestType,
            deadline,
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post("/contests", contestData);
            toast.success("Contest added successfully");
            reset();
            setDeadline(new Date());
        } catch (error) {
            toast.error("Failed to add contest");
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Add New Contest</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Contest Name */}
                <div>
                    <label className="label">Contest Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("name", {
                            required: "Contest name is required",
                        })}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Image */}
                <div>
                    <label className="label">Contest Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        {...register("image", {
                            required: "Image is required",
                            validate: {
                                fileExists: files =>
                                    files?.length > 0 || "Please select an image",
                                fileSize: files =>
                                    files[0]?.size < 5_000_000 || "Image must be less than 5MB",
                                fileType: files =>
                                    ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type)
                                    || "Only JPG, PNG, or WebP allowed"
                            }
                        })}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("description", {
                            required: "Description is required",
                        })}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="label">Price</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price cannot be 0 or negative" }
                        })}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price.message}
                        </p>
                    )}
                </div>

                {/* Prize Money */}
                <div>
                    <label className="label">Prize Money</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("prizeMoney", {
                            required: "Prize money is required",
                            min: { value: 1, message: "Prize Money cannot be 0 or negative" }
                        })}
                    />
                    {errors.prizeMoney && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.prizeMoney.message}
                        </p>
                    )}
                </div>

                {/* Task Instruction */}
                <div>
                    <label className="label">Task Instruction</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        {...register("taskInstruction", {
                            required: "Task instruction is required",
                        })}
                    />
                    {errors.taskInstruction && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.taskInstruction.message}
                        </p>
                    )}
                </div>

                {/* Contest Type */}
                <div>
                    <label className="label">Contest Type</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("contestType", {
                            required: "Contest type is required"
                        })}
                    >
                        <option value="">Select type</option>
                        <option value="image">Image Contest</option>
                        <option value="article">Article Writing</option>
                        <option value="video">Video Contest</option>
                        <option value="design">Design Contest</option>
                    </select>
                    {errors.contestType && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.contestType.message}
                        </p>
                    )}
                </div>

                {/* Deadline */}
                <div>
                    <label className="label">Deadline</label>
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        className="input ml-2 input-bordered w-full"
                        minDate={new Date()}
                    />
                    {!deadline && (
                        <p className="text-red-500 text-sm mt-1">
                            Deadline is required
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button className="btn btn-primary w-full mt-4">
                    Add Contest
                </button>
            </form>

        </div>
    );
};

export default AddContest;