import prisma from "@/app/lib/prisma";
import Game from "./game";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default async function GamePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const data = await prisma.image.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      url: true,
      title: true,
      characters: {
        select: {
          id: true,
          name: true,
          picture: true,
        },
      },
    },
  });

  if (!data) {
    return (
      <main className="flex justify flex-col items-center gap-4 center pt-24 ">
        <h1 className="neon-text text-4xl">No image found</h1>
        <Link href="/" className="ml-4">
          <button className="bg-purple-600 text-lg text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Go back home
          </button>
        </Link>
      </main>
    );
  }

  const sessionData = {
    imageId: data.id,
    startTime: Date.now(),
  };

  const token = jwt.sign(sessionData, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  return <Game data={data} token={token} />;
}
