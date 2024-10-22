import prisma from "@/app/lib/prisma";
import Game from "./game";
import jwt from "jsonwebtoken"
import { Suspense } from "react";
import Loading from "./components/loading";

export default async function GamePage({ params }: { params: { id: string } }) {
  
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

  if(!data) {
    return <div>Image not found</div>
  }
  

   const sessionData = {
    imageId: data.id,
    startTime: Date.now(),
  };

  const token = jwt.sign(sessionData, process.env.JWT_SECRET!, {
    expiresIn: "15m", 
  });

 




  return (
    <Suspense fallback={<Loading />}>
      <Game data={data} token={token} />
    </Suspense>
  );
}
