import confetti from "canvas-confetti"

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day} ${hours}:${minutes}`;
};



export function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
    };

    const randomInRange = (min : number, max: number) => Math.random() * (max - min) + min;

    const intervalId = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(intervalId);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#ff00ff", "#00ffff", "#ff00ff", "#ff00ff"],
          emojis: ["🔍", "✨", "🎉"],
          scalar: randomInRange(0.9, 1.1),
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#00ffff", "#ff00ff", "#ffff00", "#00ffff"],
          emojis: ["🔍", "✨", "🎉"],
          scalar: randomInRange(0.9, 1.1),
        })
      );
    }, 250);
  }
