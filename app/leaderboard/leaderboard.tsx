"use client";

import { type LeaderboardProps } from "@/app/lib/definitions";
import { useState } from "react";
import LeaderboardTable from "./components/leaderboardTable";
import ImageGrid from "./components/ImageGrid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Leaderboard({ leaderboard, images }: LeaderboardProps) {
  const [imageFilter, setImageFilter] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const imageIdFromUrl = searchParams.get("imageId");

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const filter = e.currentTarget.dataset.id;
    if (filter) {
      setImageFilter(filter);
      const params = new URLSearchParams(searchParams);
      params.set("imageId", filter);
      router.push(`${pathname}?${params.toString()}`);
    }
  }

  const filter = imageFilter || imageIdFromUrl || images[0].id;

  const filteredLeaderboard = leaderboard.filter(
    (row) => row.imageId === filter
  );

  const title = images.find((img) => img.id === filter)?.title;

  return (
    <main className="p-7 flex flex-col items-center gap-10 main">
      <ImageGrid images={images} handleClick={handleClick} />
      <LeaderboardTable
        filteredLeaderboard={filteredLeaderboard}
        title={title}
      />
    </main>
  );
}
