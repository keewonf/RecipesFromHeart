import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Search as SearchIcon } from "lucide-react";

type SearchBarProps = {
  onSearch: (term: string) => void;
};

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      required
      placeholder="Pesquisar pelo nome"
      startIcon={<SearchIcon size={18} />}
    />
  );
}
