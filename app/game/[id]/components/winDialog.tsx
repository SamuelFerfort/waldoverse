import { useRouter } from "next/navigation";
import { RefObject } from "react";
import { submitScore } from "@/app/lib/actions";

interface WinDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  token: string;
}

export default function WinDialog({ dialogRef, token }: WinDialogProps) {
  const router = useRouter();

  return (
    <dialog
      ref={dialogRef}
      className="p-8 rounded-lg bg-gradient-to-r from-purple-900 to-indigo-900 text-white neon-border"
      onClose={(e) => e.preventDefault()}
    >
      <form
        action={submitScore}
        className="flex flex-col gap-8"
      >
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
            required
            className="w-full p-3 rounded neon-border bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
        </div>
        <input type="hidden" id="token" name="token" value={token} />

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-full neon-border hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Submit Score
          </button>
          <button
            type="button"
            onClick={() => router.push("/leaderboard")}
            className="bg-gray-700 text-white px-6 py-3 rounded-full neon-border hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
          >
            Skip
          </button>
        </div>
      </form>
    </dialog>
  );
}
