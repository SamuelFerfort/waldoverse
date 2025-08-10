"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import toast from "react-hot-toast";
import WinDialog from "./components/winDialog";
import Characters from "./components/characters";
import StyledToaster from "./components/toaster";
import Checkmark from "./components/checkmark";
import TargettingCircle from "./components/targettingCircle";
import {
  type GameDataProps,
  type Coordinates,
  type CharFoundMarker,
  type Character,
} from "@/app/lib/definitions";
import Image from "next/image";
import { checkCoordinates } from "@/app/lib/actions";
import { triggerConfetti } from "@/app/lib/utils";

export default function Game({ data, token }: GameDataProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [charFoundMarkers, setCharFoundMarkers] = useState<CharFoundMarker[]>(
    []
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [_gameEndTime, setGameEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [characters, setCharacters] = useState<Character[]>(data.characters);
  const gameStartTime = useRef(Date.now());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [_isPending, startTransition] = useTransition();

  const blurDataURL = `${
    data.url.split("/upload/")[0]
  }/upload/w_10,e_blur:1000/${data.url.split("/upload/")[1]}`;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (gameStartTime.current && !isGameOver) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - gameStartTime.current);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameOver]);

  useEffect(() => {
    if (characters.length > 0 && characters.every((char) => char.isFound)) {
      setIsGameOver(true);
      setGameEndTime(Date.now());
      triggerConfetti();
    }
  }, [characters]);

  async function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (isGameOver) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const absoluteX = e.clientX - rect.left;
    const absoluteY = e.clientY - rect.top;

    console.log("X:", xPercent);
    console.log("Y:", yPercent);
    setCoordinates({ x: absoluteX, y: absoluteY });
    setIsVisible(true);
    startTransition(async () => {
      try {
        const result = await checkCoordinates({
          x: xPercent,
          y: yPercent,
          imageId: data.id,
        });

        if (result.isFound) {
          result.foundCharacters?.forEach((charName: string) => {
            const alreadyFound = characters.find(
              (char) => char.name === charName && char.isFound
            );
            if (!alreadyFound) {
              toast.success(`You found ${charName}!`);
              setCharacters((chars) =>
                chars.map((char) =>
                  char.name === charName ? { ...char, isFound: true } : char
                )
              );
              setCharFoundMarkers((markers) => [
                ...markers,
                { x: xPercent, y: yPercent, name: charName },
              ]);
            }
          });
        } else {
          toast.error("Nope! Try again");
        }
      } catch (err) {
        console.error("Error checking coordinates", err);
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsVisible(false);
      }
    });
  }

  useEffect(() => {
    if (isGameOver && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isGameOver]);

  return (
    <main>
      <StyledToaster />
      <WinDialog dialogRef={dialogRef} token={token} imageId={data.id} />
      <Characters
        elapsedTime={elapsedTime}
        gameStartTime={gameStartTime}
        characters={characters}
      />
      <section className="cursor-crosshair relative h-full w-full  ">
        <Image
          className="h-full w-full object-cover"
          src={data.url}
          alt={data.title}
          width={1920}
          height={data.title.includes("Universe") ? 2715 : 8086}
          onClick={handleClick}
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        {charFoundMarkers.map((mark, index) => (
          <Checkmark key={index} x={mark.x} y={mark.y} />
        ))}
        <TargettingCircle
          x={coordinates.x}
          y={coordinates.y}
          isVisible={isVisible}
        />
      </section>
    </main>
  );
}
