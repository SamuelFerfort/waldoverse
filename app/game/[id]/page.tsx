import prisma from "@/app/lib/prisma";

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


  if(!game) {
    return <div>Image not found</div>
  }
  



  return <Game data={data} />;
}
