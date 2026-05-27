import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "iconSmall";
};

const variants = {
  button: {
    base: "h-12 w-full",
    icon: "h-12 w-12",
    iconSmall: "h-8 w-8",
  },
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "base",
  className,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={classMerge([
        "flex items-center justify-center rounded-2xl border border-surface-dark bg-surface-dark px-4 py-3 text-base text-white transition-colors duration-200 ease-linear hover:bg-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light md:rounded-3xl md:text-xl",
        variants.button[variant],
        isLoading && "cursor-progress",
        className,
      ])}
      {...rest}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
