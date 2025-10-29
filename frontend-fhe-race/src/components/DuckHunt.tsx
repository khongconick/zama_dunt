import React, { useState, useEffect, useRef, useCallback } from "react";
import "./DuckHunt.css";

interface DuckHuntProps {
  canPlay: boolean;
  durationMs: number;
  onComplete: (score: number) => void;
}

interface Target {
  id: number;
  x: number; // position on screen (0-100%)
  y: number; // height (0-100%)
  type: "duck" | "star";
  speedX: number; // horizontal speed
  direction: number; // 1 = right, -1 = left
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  active: boolean;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export const DuckHunt: React.FC<DuckHuntProps> = ({ canPlay, durationMs, onComplete }) => {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [playerX, setPlayerX] = useState(50); // Player position (0-100%)
  const [targets, setTargets] = useState<Target[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  
  const runningRef = useRef(false);
  const scoreRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const nextTargetIdRef = useRef(1);
  const nextBulletIdRef = useRef(1);
  const lastSpawnRef = useRef<number>(0);
  const difficultyRef = useRef(1);
  const keysRef = useRef<Set<string>>(new Set());
  const bulletsRef = useRef<Bullet[]>([]);
  const targetsRef = useRef<Target[]>([]);

  // Reset game
  const reset = useCallback(() => {
    setRunning(false);
    setScore(0);
    setTimeLeft(durationMs);
    setPlayerX(50);
    setTargets([]);
    setBullets([]);
    setExplosions([]);
    runningRef.current = false;
    scoreRef.current = 0;
    nextTargetIdRef.current = 1;
    nextBulletIdRef.current = 1;
    lastSpawnRef.current = 0;
    difficultyRef.current = 1;
    keysRef.current.clear();
    bulletsRef.current = [];
    targetsRef.current = [];
  }, [durationMs]);

  // Start game
  const start = useCallback(() => {
    if (!canPlay) return;
    reset();
    setRunning(true);
    runningRef.current = true;
    startTimeRef.current = performance.now();
    lastFrameRef.current = performance.now();
    lastSpawnRef.current = performance.now();
  }, [canPlay, reset]);

  // Shoot bullet
  const shoot = useCallback(() => {
    if (!runningRef.current) return;
    const bulletId = nextBulletIdRef.current++;
    const newBullet = {
      id: bulletId,
      x: playerX,
      y: 90,
      active: true,
    };
    console.log(`🔫 Shooting bullet ${bulletId} at x=${playerX}`);
    bulletsRef.current = [...bulletsRef.current, newBullet];
    setBullets(bulletsRef.current);
  }, [playerX]);

  // Spawn target
  const spawnTarget = useCallback(() => {
    const targetId = nextTargetIdRef.current++;
    const isStarChance = Math.random() < 0.15; // 15% chance for star
    const type = isStarChance ? "star" : "duck";
    const direction = Math.random() < 0.5 ? 1 : -1; // Random direction
    const startX = direction === 1 ? -10 : 110; // Start from left or right edge
    const y = 20 + Math.random() * 50; // Random height (20-70%)
    const baseSpeed = 0.8 + difficultyRef.current * 0.3;
    const speedX = baseSpeed + Math.random() * 0.5;

    const newTarget: Target = {
      id: targetId,
      x: startX,
      y: y,
      type: type,
      speedX: speedX,
      direction: direction,
    };
    console.log(`🦆 Spawning ${type} #${targetId} at (${startX}, ${y})`);
    targetsRef.current = [...targetsRef.current, newTarget];
    setTargets(targetsRef.current);
  }, []);

  // Game loop
  useEffect(() => {
    if (!runningRef.current) return;

    let rafId: number;

    const tick = (now: number) => {
      if (!runningRef.current) {
        cancelAnimationFrame(rafId);
        return;
      }

      const dtMs = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const dtSec = dtMs / 1000;

      // Update time
      const elapsed = now - startTimeRef.current;
      const remaining = Math.max(0, durationMs - elapsed);
      setTimeLeft(remaining);

      // Game over
      if (remaining <= 0) {
        runningRef.current = false;
        setRunning(false);
        onComplete(scoreRef.current);
        return;
      }

      // Update difficulty
      const progress = elapsed / durationMs;
      difficultyRef.current = 1 + progress * 2; // 1x -> 3x

      // Spawn targets
      const spawnInterval = Math.max(800, 1500 - progress * 700); // Faster spawning
      if (now - lastSpawnRef.current > spawnInterval) {
        spawnTarget();
        lastSpawnRef.current = now;
      }

      // Update player movement
      const moveSpeed = 100; // pixels per second
      setPlayerX((prev) => {
        let newX = prev;
        if (keysRef.current.has("ArrowLeft") || keysRef.current.has("a")) {
          newX -= moveSpeed * dtSec * 0.5; // 0.5 because position is in %
        }
        if (keysRef.current.has("ArrowRight") || keysRef.current.has("d")) {
          newX += moveSpeed * dtSec * 0.5;
        }
        return Math.max(5, Math.min(95, newX)); // Keep in bounds
      });

      // Update targets
      targetsRef.current = targetsRef.current
        .map((target) => ({
          ...target,
          x: target.x + target.direction * target.speedX * dtSec * 50,
        }))
        .filter((target) => {
          if (target.direction === 1 && target.x > 110) return false;
          if (target.direction === -1 && target.x < -10) return false;
          return true;
        });
      setTargets(targetsRef.current);

      // Update bullets
      bulletsRef.current = bulletsRef.current
        .map((bullet) => ({
          ...bullet,
          y: bullet.y - 150 * dtSec,
        }))
        .filter((bullet) => bullet.y > 0 && bullet.active);
      setBullets(bulletsRef.current);

      // Collision detection (bullet vs targets) - using REFS for real-time state!
      const currentBullets = bulletsRef.current;
      const currentTargets = targetsRef.current;
      
      // Debug: Log counts
      if (currentBullets.length > 0 || currentTargets.length > 0) {
        console.log(`🔍 Collision check: ${currentBullets.length} bullets, ${currentTargets.length} targets`);
      }
      
      const hitBulletIds = new Set<number>();
      const hitTargetIds = new Set<number>();
      let scoreAdded = 0;

      currentBullets.forEach((bullet) => {
        if (!bullet.active) return;

        currentTargets.forEach((target) => {
          // Skip if already hit
          if (hitBulletIds.has(bullet.id) || hitTargetIds.has(target.id)) return;

          // Simple collision: check distance
          const dx = Math.abs(bullet.x - target.x);
          const dy = Math.abs(bullet.y - target.y);
          const hitDistance = 8; // Hit tolerance (smaller = more precise aiming required)

          // Debug log
          if (dx < 20 && dy < 20) {
            console.log(`🎯 Close! dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}, hit=${dx < hitDistance && dy < hitDistance}`);
          }

          if (dx < hitDistance && dy < hitDistance) {
            // Hit!
            console.log(`💥 HIT! Bullet (${bullet.x.toFixed(1)}, ${bullet.y.toFixed(1)}) hit ${target.type} at (${target.x.toFixed(1)}, ${target.y.toFixed(1)})`);
            hitBulletIds.add(bullet.id);
            hitTargetIds.add(target.id);
            const points = target.type === "star" ? 5 : 1;
            scoreAdded += points;
          }
        });
      });

      // Update score if any hits
      if (scoreAdded > 0) {
        scoreRef.current += scoreAdded;
        setScore(scoreRef.current);

        // Create explosions at hit positions
        const newExplosions: Explosion[] = [];
        currentTargets.forEach((target) => {
          if (hitTargetIds.has(target.id)) {
            newExplosions.push({
              id: nextTargetIdRef.current++,
              x: target.x,
              y: target.y,
              timestamp: now,
            });
          }
        });
        if (newExplosions.length > 0) {
          console.log("💥 Creating explosions:", newExplosions.length);
        }
        setExplosions((prev) => [...prev, ...newExplosions]);

        // Remove hit bullets and targets
        bulletsRef.current = bulletsRef.current.filter((b) => !hitBulletIds.has(b.id));
        targetsRef.current = targetsRef.current.filter((t) => !hitTargetIds.has(t.id));
        setBullets(bulletsRef.current);
        setTargets(targetsRef.current);
      }

      // Remove old explosions (after 500ms)
      setExplosions((prev) => prev.filter((exp) => now - exp.timestamp < 500));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [running, durationMs, onComplete, spawnTarget]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.add(key);

      // Shoot on Space
      if (key === " " || key === "spacebar") {
        e.preventDefault();
        shoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysRef.current.delete(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shoot]);

  // Click to shoot
  const handleGameClick = useCallback(() => {
    if (runningRef.current) {
      shoot();
    }
  }, [shoot]);

  return (
    <div className="duck-hunt-container">
      {/* HUD */}
      <div className="duck-hud">
        <div className="hud-item">
          <span className="hud-label">Score</span>
          <span className="hud-value">{score}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">Time</span>
          <span className="hud-value">{(timeLeft / 1000).toFixed(1)}s</span>
        </div>
      </div>

      {/* Game Area */}
      <div className={`duck-game ${running ? "active" : ""}`} onClick={handleGameClick}>
        {/* Player (Gun) */}
        <div
          className="player-gun"
          style={{
            left: `${playerX}%`,
          }}
        >
          🔫
        </div>

        {/* Targets (Ducks & Stars) */}
        {targets.map((target) => (
          <div
            key={target.id}
            className={`target target-${target.type}`}
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: target.direction === -1 ? "scaleX(-1)" : "scaleX(1)",
            }}
          >
            {target.type === "duck" ? "🦆" : "⭐"}
          </div>
        ))}

        {/* Bullets */}
        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="bullet"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
            }}
          >
            •
          </div>
        ))}

        {/* Explosions */}
        {explosions.map((explosion) => (
          <div
            key={explosion.id}
            className="explosion"
            style={{
              left: `${explosion.x}%`,
              top: `${explosion.y}%`,
            }}
          >
            💥
          </div>
        ))}

        {/* Start overlay */}
        {!running && (
          <div className="game-overlay">
            <div className="overlay-content">
              <h2>🦆 Duck Hunt</h2>
              <p className="game-instructions">
                ← → or A/D: Move<br />
                Space/Click: Shoot<br />
                🦆 Duck = 1 point<br />
                ⭐ Star = 5 points
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="duck-controls">
        <button className="duck-button" onClick={start} disabled={!canPlay || running}>
          {running ? "Running..." : "Start Hunting"}
        </button>
        <div className="hint">← → or A/D to move | Space/Click to shoot 🔫</div>
      </div>
    </div>
  );
};

