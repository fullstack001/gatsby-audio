import React from "react";
import cn from "classnames";
let Intent = "primary" | "secondary";
let Size = "sm" | "md" | "lg";
// interface IconButtonProps extends React.ComponentPropsWithoutRef<"button"> {
//     intent?: Intent; // can add more
//     size?: Size;
// }
const colorMap = {
    primary: "bg-cyan-600 text-white",
    secondary: "bg-slate-800 text-slate-400",
};
const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
};
export default function IconButton({
    intent = "primary",
    size = "md",
    className,
    ...props
}) {
    const colorClass = colorMap[intent];
    const sizeClass = sizeMap[size];
    const classes = cn(
        "flex justify-content-center audio-btn",
        colorClass,
        sizeClass,
        className,
    );
    return <button className={classes} {...props} />;
}