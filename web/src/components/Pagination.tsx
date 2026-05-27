import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./Button";

type Props = {
  current: number;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({ current, total, onNext, onPrevious }: Props) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
      <Button variant="icon" onClick={onPrevious} disabled={current === 1}>
        <ArrowLeft />
      </Button>
      <span className="text-sm font-semibold text-surface-dark md:text-2xl">
        {current}/{total}
      </span>
      <Button variant="icon" onClick={onNext} disabled={current === total}>
        <ArrowRight />
      </Button>
    </div>
  );
}
