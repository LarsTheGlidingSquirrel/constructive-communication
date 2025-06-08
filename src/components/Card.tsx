"use client";

import { Icon } from "@iconify/react";

const icon = {
  positive: "material-symbols:thumb-up",
  negative: "material-symbols:thumb-down",
  info: "material-symbols:info-outline-rounded",
};

const iconColor = {
  positive: "text-thumb-green",
  negative: "text-thumb-red",
  info: "",
};

export default function Card({
  topIcon,
  title,
  explanation,
}: {
  topIcon: "positive" | "negative" | "info";
  title: string;
  explanation: string;
}) {
  const isLoading = title.length === 0;

  return (
    <div
      className={`shrink grow basis-[24rem] ${isLoading ? "animate-pulse" : ""}`}
    >
      <div className="relative top-7 z-100 flex flex-col items-center">
        <div className="bg-primary-dark rounded-full border-1 border-white/25 p-3">
          <Icon
            className={`text-accent-light aspect-square text-3xl ${iconColor[topIcon]}`}
            icon={icon[topIcon]}
            fallback={<span className="invisible">##</span>}
          />
        </div>
      </div>
      <div className="dark:bg-primary-dark shadow-glow-white flex flex-col gap-4 rounded-2xl border-1 border-white/25 p-5 pt-11">
        <div
          className={`text-accent-dark self-center text-center text-xl font-bold ${isLoading ? "bg-accent-dark min-h-6 w-2/3 rounded-2xl" : ""}`}
        >
          {title}
        </div>
        <div
          className={`${isLoading ? "min-h-64 rounded-2xl bg-white/20" : ""}`}
        >
          {explanation}
        </div>
      </div>
    </div>
  );
}
