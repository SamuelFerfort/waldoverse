import prisma from "./lib/prisma";
import ImageCard from "./ui/imageCard";

export const dynamic = "force-static";

export default async function HomePage() {
  const images = await prisma.image.findMany();



  return (
    <main className="container mx-auto p-7 pt-20 bg-">
      <section className="flex flex-col gap-8 items-center">
        <h1 className=" text-3xl sm:text-4xl font-bold neon-text">
          Choose Map
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              title={image.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
