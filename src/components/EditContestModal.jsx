import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import axios from "axios";

const EditContestModal = ({ isOpen, onClose, contest, onUpdate }) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (contest) {
            setValue("name", contest.name);
            setValue("description", contest.description);
            setValue("price", contest.price);
            setValue("prizeMoney", contest.prizeMoney);
            setValue("taskInstruction", contest.taskInstruction);
            setValue("contestType", contest.contestType);
            setValue("deadline", new Date(contest.deadline));
            setValue("image", contest.image);
        }
    }, [contest, setValue]);

    const onSubmit = async (data) => {
        try {
            let imageUrl = contest.image; // keep old image if no new file

            // Upload new image if a file is selected
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                    formData
                );
                imageUrl = res.data.data.display_url;
            }

            const updatedData = { ...data, image: imageUrl };

            await toast.promise(onUpdate(contest._id, updatedData), {
                loading: "Updating contest...",
                success: "Contest updated successfully",
                error: "Failed to update contest",
            });

            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-bold mb-4">Edit Contest</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label">Contest Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="label">Contest Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                        {imageFile && <p className="text-sm mt-1">{imageFile.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">Description</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="label">Price</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("price", { required: true, min: 0 })}
                        />
                        {errors.price && <p className="text-red-500 text-sm">Price must be at least 0</p>}
                    </div>

                    {/* Prize Money */}
                    <div>
                        <label className="label">Prize Money</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            {...register("prizeMoney", { required: true, min: 0 })}
                        />
                        {errors.prizeMoney && (
                            <p className="text-red-500 text-sm">Prize money must be at least 0</p>
                        )}
                    </div>

                    {/* Task Instruction */}
                    <div>
                        <label className="label">Task Instruction</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register("taskInstruction", { required: true })}
                        />
                        {errors.taskInstruction && (
                            <p className="text-red-500 text-sm">Task instruction is required</p>
                        )}
                    </div>

                    {/* Contest Type */}
                    <div>
                        <label className="label">Contest Type</label>
                        <select
                            className="select select-bordered w-full"
                            {...register("contestType", { required: true })}
                        >
                            <option value="">Select type</option>
                            <option value="image">Image Contest</option>
                            <option value="article">Article Writing</option>
                            <option value="video">Video Contest</option>
                            <option value="design">Design Contest</option>
                        </select>
                        {errors.contestType && (
                            <p className="text-red-500 text-sm">Contest type is required</p>
                        )}
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="label">Deadline</label>
                        <Controller
                            control={control}
                            name="deadline"
                            render={({ field }) => (
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    className="input input-bordered w-full"
                                    minDate={new Date()}
                                />
                            )}
                        />
                        {errors.deadline && <p className="text-red-500 text-sm">Deadline is required</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" className="btn btn-outline" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Update Contest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContestModal;
