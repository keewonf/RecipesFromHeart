type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  children,
  isLoading,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      className="flex justify-center items-center bg-surface-dark text-white text-xl cursor-pointer hover:bg-text-on-bg transition ease-linear"
      type={type}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}
