import { ChevronDown } from "lucide-react";

type Props = Omit<React.ComponentProps<"select">, "onChange"> & {
  label?: string;
  error?: string;
  onValueChange: (value: string) => void;
};

export function Select({
  id,
  label,
  onValueChange,
  children,
  error,
  ...rest
}: Props) {
  return (
    <div className="group">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-heading"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-xl border border-default-medium bg-neutral-secondary-medium/80 shadow-sm transition-all duration-200 hover:border-default-strong hover:shadow-md focus-within:border-surface-dark focus-within:ring-2 focus-within:ring-surface-dark/90">
        <select
          id={id}
          className="w-full appearance-none bg-transparent px-4 py-3 pr-11 text-sm font-bold text-surface-dark placeholder:uppercase placeholder:text-gray-600/90 text-heading outline-none"
          {...rest}
          onChange={(e) => onValueChange(e.target.value)}
        >
          {children}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary transition-transform duration-200 group-focus-within:rotate-180" />
      </div>
      {error && (
        <span className="mt-1 block text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}
