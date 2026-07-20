import { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-rose-800 hover:bg-rose-700 text-white",
  secondary: "bg-zinc-900 hover:bg-zinc-700",
};

export default function Button({ children, variant = "primary", disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`${disabled ? "bg-gray-500 text-gray-300 cursor-not-allowed" : variantClass[variant]} px-4 py-2 rounded-xl`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
