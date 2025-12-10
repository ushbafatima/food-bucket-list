import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const WhackAChili = ({ isOpen, onClose, onGameEnd }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chilis, setChilis] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const gameAreaRef = useRef(null);
  const intervalRef = useRef(null);
  const chiliIntervalRef = useRef(null);
  const isPlayingRef = useRef(false);
  const ELMO_THRESHOLD = 10; // Score threshold for Elmo to appear (10 chilis)

  useEffect(() => {
    if (isOpen && !hasStarted) {
      // Reset game when dialog first opens
      setScore(0);
      setTimeLeft(15);
      setGameOver(false);
      setChilis([]);
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
    // Reset hasStarted when dialog closes
    if (!isOpen) {
      setHasStarted(false);
    }
  }, [isOpen, hasStarted]);

  const startGame = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    setHasStarted(true);
    setScore(0);
    setTimeLeft(15);
    setGameOver(false);
    setChilis([]);

    // Wait a bit for the game area to render, then start spawning
    setTimeout(() => {
      // Timer countdown
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Spawn chilis randomly
      chiliIntervalRef.current = setInterval(() => {
        if (isPlayingRef.current) {
          spawnChili();
        }
      }, 800); // Spawn a new chili every 800ms
      
      // Spawn first chili immediately
      spawnChili();
    }, 200);
  };

  const checkOverlap = (x, y, existingChilis, chiliSize = 80, minDistance = 100) => {
    for (const chili of existingChilis) {
      const distance = Math.sqrt(
        Math.pow(chili.x - x, 2) + Math.pow(chili.y - y, 2)
      );
      if (distance < minDistance) {
        return true; // Overlaps
      }
    }
    return false; // No overlap
  };

  const spawnChili = () => {
    if (!isPlayingRef.current) {
      return;
    }

    const gameArea = gameAreaRef.current;
    if (!gameArea) {
      return;
    }

    // Get the actual bounding rectangle of the game area
    const rect = gameArea.getBoundingClientRect();
    const width = rect.width || gameArea.clientWidth || 800;
    const height = rect.height || gameArea.clientHeight || 400;
    
    if (width <= 0 || height <= 0) {
      return; // Game area not ready yet
    }

    const chiliSize = 80;
    const padding = 10; // Small padding from edges
    const maxX = Math.max(0, width - chiliSize - padding);
    const maxY = Math.max(0, height - chiliSize - padding);

    // Get current chilis to check for overlap
    setChilis((prev) => {
      let attempts = 0;
      let newX, newY;
      let hasOverlap = true;

      // Try to find a non-overlapping position (max 20 attempts)
      while (hasOverlap && attempts < 20) {
        newX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
        newY = Math.max(padding, Math.min(maxY, Math.random() * maxY));
        hasOverlap = checkOverlap(newX, newY, prev, chiliSize, 100);
        attempts++;
      }

      // If we couldn't find a non-overlapping position after 20 attempts, use the last position anyway
      if (hasOverlap && attempts >= 20) {
        newX = Math.max(padding, Math.min(maxX, Math.random() * maxX));
        newY = Math.max(padding, Math.min(maxY, Math.random() * maxY));
      }

      const newChili = {
        id: Date.now() + Math.random(),
        x: newX,
        y: newY,
        duration: 1000 + Math.random() * 500, // 1-1.5 seconds before disappearing (faster)
      };

      // Remove chili after duration
      setTimeout(() => {
        setChilis((current) => current.filter((c) => c.id !== newChili.id));
      }, newChili.duration);

      return [...prev, newChili];
    });
  };

  const handleChiliClick = (chiliId) => {
    setChilis((prev) => prev.filter((c) => c.id !== chiliId));
    setScore((prev) => {
      const newScore = prev + 1;
      // End game immediately when score reaches 10
      if (newScore === ELMO_THRESHOLD) {
        // Stop the game
        setIsPlaying(false);
        isPlayingRef.current = false;
        setGameOver(true);
        
        // Clear intervals
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (chiliIntervalRef.current) {
          clearInterval(chiliIntervalRef.current);
          chiliIntervalRef.current = null;
        }
        
        // Trigger Elmo
        if (onGameEnd) {
          onGameEnd(newScore);
        }
      }
      return newScore;
    });
  };

  const endGame = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setGameOver(true);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (chiliIntervalRef.current) {
      clearInterval(chiliIntervalRef.current);
      chiliIntervalRef.current = null;
    }
  };

  const handleClose = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (chiliIntervalRef.current) {
      clearInterval(chiliIntervalRef.current);
      chiliIntervalRef.current = null;
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
    setGameOver(false);
    setChilis([]);
    // Don't reset hasStarted here - it will be reset when dialog opens next time
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={cn("p-0", "overflow-hidden")}
        style={{
          background: "#171717",
          borderColor: "rgba(249, 115, 22, 0.5)",
          maxWidth: "90vw",
          width: "700px",
          maxHeight: "85vh",
          padding: 0,
        }}
      >
        <div className={cn("p-4")} style={{ width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
          {!isPlaying && !gameOver && !hasStarted && (
            <div className={cn("text-center", "space-y-6")}>
              <p
                className={cn("text-lg")}
                style={{
                  color: "#d4d4d8",
                  fontFamily: "'Roboto Slab', serif",
                }}
              >
                Click the chili peppers before they disappear!
              </p>
              <p
                className={cn("text-sm")}
                style={{
                  color: "#a3a3a3",
                  fontFamily: "'Roboto Slab', serif",
                }}
              >
                Game lasts 15 seconds. Try to get a high score!
              </p>
              <Button
                onClick={startGame}
                className={cn("px-8", "py-3", "text-lg", "font-semibold", "rounded-full")}
                style={{
                  background: "#f97316",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ea580c";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Start Game
              </Button>
            </div>
          )}

          {isPlaying && !gameOver && (
            <div className={cn("flex", "flex-col")} style={{ width: "100%", height: "calc(85vh - 80px)", display: "flex", flexDirection: "column", position: "relative" }}>
              <div
                className={cn("flex", "justify-between", "items-center", "mb-3", "gap-4")}
                style={{ width: "100%", flexShrink: 0 }}
              >
                <div
                  className={cn("px-4", "py-2", "rounded-lg")}
                  style={{
                    background: "rgba(249, 115, 22, 0.2)",
                    border: "1px solid rgba(249, 115, 22, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  <p
                    className={cn("text-xl", "font-bold")}
                    style={{
                      color: "#fb923c",
                      fontFamily: "'Pixelify Sans', sans-serif",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Score: {score}
                  </p>
                </div>
                <div
                  className={cn("px-4", "py-2", "rounded-lg")}
                  style={{
                    background: "rgba(249, 115, 22, 0.2)",
                    border: "1px solid rgba(249, 115, 22, 0.4)",
                    flexShrink: 0,
                  }}
                >
                  <p
                    className={cn("text-xl", "font-bold")}
                    style={{
                      color: "#f97316",
                      fontFamily: "'Pixelify Sans', sans-serif",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Time: {timeLeft}s
                  </p>
                </div>
              </div>

              <div
                ref={gameAreaRef}
                className={cn("relative", "border-2", "rounded-lg")}
                style={{
                  width: "100%",
                  flex: 1,
                  minHeight: "350px",
                  maxHeight: "calc(85vh - 120px)",
                  background: "rgba(23, 23, 23, 0.5)",
                  borderColor: "rgba(249, 115, 22, 0.3)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {chilis.length === 0 && (
                  <div className={cn("absolute", "inset-0", "flex", "items-center", "justify-center")}>
                    
                  </div>
                )}
                {chilis.map((chili) => (
                  <button
                    key={chili.id}
                    onClick={() => handleChiliClick(chili.id)}
                    className={cn("absolute", "transition-all", "cursor-pointer", "z-10")}
                    style={{
                      left: `${chili.x}px`,
                      top: `${chili.y}px`,
                      width: "80px",
                      height: "80px",
                      background: "transparent",
                      border: "none",
                      animation: "chiliPop 0.3s ease-out",
                      pointerEvents: "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src="/resources/labels/spicy/chilli.png"
                      alt="chili"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className={cn("text-center", "space-y-6")}>
              <p
                className={cn("text-4xl", "font-bold", "mb-4")}
                style={{
                  color: "#fb923c",
                  fontFamily: "'Pixelify Sans', sans-serif",
                }}
              >
                Game Over!
              </p>
              <p
                className={cn("text-3xl", "font-bold", "mb-4")}
                style={{
                  color: "#f97316",
                  fontFamily: "'Pixelify Sans', sans-serif",
                }}
              >
                Final Score: {score}
              </p>
              {score >= ELMO_THRESHOLD ? (
                <div className={cn("mb-6")}>
                  <p
                    className={cn("text-2xl", "font-bold", "mb-2")}
                    style={{
                      color: "#facc15",
                      fontFamily: "'Pixelify Sans', sans-serif",
                    }}
                  >
                    Congratulations!
                  </p>
                  <p
                    className={cn("text-lg")}
                    style={{
                      color: "#d4d4d8",
                      fontFamily: "'Roboto Slab', serif",
                    }}
                  >
                    You whacked {score} chilis! Elmo is impressed!
                  </p>
                </div>
              ) : (
                <div className={cn("mb-6")}>
                  <p
                    className={cn("text-2xl", "font-bold", "mb-2")}
                    style={{
                      color: "#fb923c",
                      fontFamily: "'Pixelify Sans', sans-serif",
                    }}
                  >
                    Oops!
                  </p>
                  <p
                    className={cn("text-lg")}
                    style={{
                      color: "#d4d4d8",
                      fontFamily: "'Roboto Slab', serif",
                    }}
                  >
                    You whacked {score} chilis. Try to get {ELMO_THRESHOLD} or more to impress Elmo!
                  </p>
                </div>
              )}
              <div className={cn("flex", "gap-4", "justify-center")}>
                <Button
                  onClick={startGame}
                  className={cn("px-6", "py-2", "rounded-full", "font-semibold")}
                  style={{
                    background: "#f97316",
                    color: "#ffffff",
                    fontFamily: "'Pixelify Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ea580c";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f97316";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Play Again
                </Button>
                <Button
                  onClick={handleClose}
                  className={cn("px-6", "py-2", "rounded-full")}
                  style={{
                    background: "transparent",
                    color: "#fb923c",
                    border: "2px solid #f97316",
                    fontFamily: "'Pixelify Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(249, 115, 22, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes chiliPop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

