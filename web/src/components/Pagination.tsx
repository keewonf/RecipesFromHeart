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
    <div className="flex flex-1 justify-center items-center gap-2 mt-4">
      <Button variant="icon" onClick={onPrevious} disabled={current === 1}>
        <ArrowLeft />
      </Button>
      <span className="text-2xl text-surface-dark">
        {current}/{total}
      </span>
      <Button variant="icon" onClick={onNext} disabled={current === total}>
        <ArrowRight />
      </Button>
    </div>
  );
}
