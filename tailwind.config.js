/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
};