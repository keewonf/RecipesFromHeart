import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"input"> & {
  legend?: string;
  error?: string;
};

export function Input({ legend, error, type = "text", ...rest }: Props) {
  return (
    <fieldset className="flex flex-1 flex-col text-surface-dark">
      {legend && (
        <legend className="mb-2 uppercase text-xxs text-text-primary md:text-xs">
          {legend}
        </legend>
      )}
      <input
        type={type}
        className={classMerge(
          "w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-gray-600 outline-none transition-colors placeholder:uppercase placeholder:text-gray-600/90 focus:border-surface-dark focus:ring-2 focus:ring-surface-dark/10 md:rounded-3xl md:text-base",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
        )}
        {...rest}
      />
      <span className="block min-h-4.5 text-xs text-red-500">{error}</span>
    </fieldset>
  );
}
