import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type LinkButtonVariant = "primary" | "secondary";

type LinkButtonProps = ComponentProps<"a"> & {
  children: ReactNode;
  href: string;
  variant?: LinkButtonVariant;
};

const variantClass: Record<LinkButtonVariant, string> = {
  primary: "bg-rose-800 hover:bg-rose-700 text-white",
  secondary: "bg-zinc-900 hover:bg-zinc-700",
};

export default function LinkButton({ children, href, variant = "primary" }: LinkButtonProps) {
  return (
    <Link
      className={`${variantClass[variant]} px-4 py-2 rounded-xl`}
      href={href}
    >
      {children}
    </Link>
  );
}
