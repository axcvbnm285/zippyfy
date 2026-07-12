import { cn } from "@/lib/utils";

interface Props {
  priority: string;
}

const config: Record<string, { dot: string; text: string; bg: string }> = {
  HIGH:   { dot: "bg-red-500",    text: "text-red-600",    bg: "bg-red-50" },
  MEDIUM: { dot: "bg-amber-400",  text: "text-amber-600",  bg: "bg-amber-50" },
  LOW:    { dot: "bg-emerald-400",text: "text-emerald-600",bg: "bg-emerald-50" },
};

export default function PriorityBadge({ priority }: Props) {
  const c = config[priority] ?? config.LOW;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", c.bg, c.text)}>
      <span className={cn("size-1.5 rounded-full", c.dot)} />
      {priority}
    </span>
  );
}
