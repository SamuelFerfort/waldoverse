import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-2 sm:p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="  sm:text-2xl font-bold neon-text">
          Waldoverse
        </Link>
        <Link href="/leaderboard" className="sm:text-2xl neon-text-subtle">
          Leaderboard
        </Link>
      </div>
    </header>
  );
}
