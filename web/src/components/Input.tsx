type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 text-surface-dark flex-col">
      {legend && (
        <legend className="uppercase text-xxs mb-2 text-text-primary">
          {legend}
        </legend>
      )}
      <input
        type={type}
        className={
          "border border-gray-300 rounded-3xl px-4 py-3.75 w-full h-12 text-sm text-gray-600  outline-none focus:border-2 focus:border-surface-dark placeholder-gray-600/90 bg-white placeholder:uppercase font-bold"
        }
        {...rest}
      />
    </fieldset>
  );
}
