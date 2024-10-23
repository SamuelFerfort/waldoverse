export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center mt-24 space-y-6">
        <div className="relative w-24 h-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-full h-full rounded-full border-4 border-[#bc13fe] opacity-20 animate-pulse"></div>
          {/* Middle Ring */}
          <div className="absolute w-16 h-16 rounded-full border-4 border-[#bc13fe] opacity-40 animate-[spin_3s_linear_infinite] top-4 left-4"></div>
          {/* Inner Ring */}
          <div className="w-8 h-8 rounded-full border-4 border-t-[#bc13fe] border-r-transparent border-b-transparent border-l-transparent animate-[spin_1s_linear_infinite] relative top-8 left-8
            [filter:drop-shadow(0_0_5px_#bc13fe)_drop-shadow(0_0_10px_#bc13fe)]">
          </div>
        </div>
        <p className="neon-text-subtle text-center mt-28 text-lg">Loading leaderboard</p>
      </div>
    );
  }