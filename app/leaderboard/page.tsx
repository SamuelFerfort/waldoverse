import prisma from "../lib/prisma";
import Leaderboard from "./leaderboard";

export default async function LeaderboardPage() {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: [{ duration: "asc" }],
  });

  const images = await prisma.image.findMany();


  if(!leaderboard || !images) {
    throw new Error("Failed to load leaderboard or images");
  }

  return <Leaderboard leaderboard={leaderboard} images={images} />;
}
