import Image from "next/image";
import { type ImageGridProps } from "@/app/lib/definitions";

export default function ImageGrid({
  handleClick,
  images,
  filter,
}: ImageGridProps) {
  return (
    <section className="grid grid-cols-3 w-full max-w-2xl gap-8">
      {images.map((image) => (
        <button
          key={image.id}
          className={`w-full h-64 relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 hover:contrast-75 ${
            filter === image.id ? "scale-105 contrast-75" : ""
          }`}
          onClick={handleClick}
          data-id={image.id}
        >
          <Image
            src={image.url}
            alt={image.title}
            width={320}
            height={384}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">
            {image.title}
          </span>
        </button>
      ))}
    </section>
  );
}
