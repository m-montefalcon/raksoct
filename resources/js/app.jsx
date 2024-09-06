import "./bootstrap";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

createInertiaApp({
    resolve: (name) => {
        // Remove any leading 'Pages/' prefix from the name
        const componentName = name.replace(/^Pages\//, "");
        return import(`./Pages/${componentName}.jsx`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
