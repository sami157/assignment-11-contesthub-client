import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { IoIosMoon } from "react-icons/io";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setIsDark(true);
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            setIsDark(false);
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, []);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setIsDark(checked);

        const theme = checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                className="theme-controller"
                value="dark"
                checked={isDark}
                onChange={handleChange}
            />

            <FaSun
                className="swap-on h-6 w-6 fill-current"
            />

            <IoIosMoon
                className="swap-off h-6 w-6 fill-current"
            />
        </label>
    );
};

export default ThemeToggle;