import { useRouter } from "next/navigation";
import { RefObject } from "react";
import { submitScore } from "@/app/lib/actions";
import { useState, useTransition } from "react";

interface WinDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  token: string;
  imageId: string;
}

export default function WinDialog({
  dialogRef,
  token,
  imageId,
}: WinDialogProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData(event.currentTarget);

      try {
        await submitScore(formData);
        router.push(`/leaderboard/?imageId=${imageId}`);
      } catch (error) {
        console.error("Error submitting score:", error);
      }
    });
  };

  return (
    <dialog
      ref={dialogRef}
      className="p-8 rounded-lg bg-gradient-to-r from-purple-900 to-indigo-900 text-white neon-border"
      onClose={(e) => e.preventDefault()}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <h2 className="text-4xl font-bold text-center neon-text animate-pulse">
          Congratulations, you won!
        </h2>

        <div className="space-y-4">
          <label htmlFor="name" className="block text-2xl neon-text-subtle">
            Enter your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="John Doe"
            required
            className="w-full p-3 rounded neon-border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
        <input type="hidden" id="token" name="token" value={token} />

        <div className="flex gap-4 justify-center">
          <button
            disabled={isPending}
            type="submit"
            className={`bg-purple-600 text-white px-6 py-3 rounded-full neon-border transition-all duration-300 transform 
              ${
                isPending
                  ? "bg-purple-400 cursor-not-allowed"
                  : "hover:bg-purple-700 hover:scale-105"
              }`}
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/leaderboard/?imageId=${imageId}`)}
            className="bg-gray-700 text-white px-6 py-3 rounded-full neon-border hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Skip
          </button>
        </div>
      </form>
    </dialog>
  );
}
