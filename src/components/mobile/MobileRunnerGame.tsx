import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, ChevronUp } from 'lucide-react';
import { useWindows } from '@/contexts/WindowContext';

interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  speed: number;
  streak: number;
  countdown: number | null;
}

interface Runner {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: ObstacleType;
  scored: boolean;
}

type ObstacleType = 'camera' | 'tripod' | 'computer' | 'clapperboard';

// Landscape-optimized constants
const GRAVITY = 0.9;
const JUMP_FORCE = -14;
const FALL_MULTIPLIER = 1.4;
const INITIAL_SPEED = 5;
const MAX_SPEED = 14;
const GRACE_PERIOD_MS = 1200;
const WARMUP_DURATION = 4;
const SPEED_CURVE_K = 0.12;

export function MobileRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const gameStartTimeRef = useRef<number>(0);
  const recentObstaclesRef = useRef<ObstacleType[]>([]);
  const { closeWindow } = useWindows();
  
  // Landscape dimensions - wide and short for good visibility
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 200 });
  const groundY = canvasSize.height - 40;
  
  const runnerRef = useRef<Runner>({
    x: 80,
    y: groundY,
    width: 35,
    height: 55,
    velocityY: 0,
    isJumping: false,
  });
  
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    isGameOver: false,
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('runnerHighScore') || '0', 10),
    speed: INITIAL_SPEED,
    streak: 0,
    countdown: null,
  });

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  // Resize canvas to fit container - landscape oriented
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Wide aspect ratio for landscape gameplay
        const width = Math.min(rect.width - 24, 700);
        const height = Math.min(180, rect.height * 0.4);
        setCanvasSize({ width, height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Update groundY when canvas resizes
  useEffect(() => {
    const newGroundY = canvasSize.height - 40;
    runnerRef.current.y = newGroundY;
  }, [canvasSize.height]);

  const jump = useCallback(() => {
    if (!runnerRef.current.isJumping && gameStateRef.current.isRunning && !gameStateRef.current.isPaused) {
      runnerRef.current.velocityY = JUMP_FORCE;
      runnerRef.current.isJumping = true;
    }
  }, []);

  const startCountdown = useCallback(() => {
    setGameState(prev => ({ ...prev, countdown: 3, isGameOver: false }));
    
    const countdownInterval = setInterval(() => {
      setGameState(prev => {
        if (prev.countdown === null || prev.countdown <= 1) {
          clearInterval(countdownInterval);
          const newGroundY = canvasSize.height - 40;
          runnerRef.current = {
            x: 80,
            y: newGroundY,
            width: 35,
            height: 55,
            velocityY: 0,
            isJumping: false,
          };
          obstaclesRef.current = [];
          recentObstaclesRef.current = [];
          gameStartTimeRef.current = Date.now();
          return {
            ...prev,
            isRunning: true,
            isGameOver: false,
            isPaused: false,
            score: 0,
            speed: INITIAL_SPEED,
            streak: 0,
            countdown: null,
          };
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 700);
  }, [canvasSize.height]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => {
      const newHighScore = Math.max(prev.score, prev.highScore);
      localStorage.setItem('runnerHighScore', newHighScore.toString());
      return {
        ...prev,
        isRunning: false,
        isGameOver: true,
        isPaused: false,
        highScore: newHighScore,
      };
    });
  }, []);

  // Draw runner - compact for landscape
  const drawRunner = useCallback((ctx: CanvasRenderingContext2D, runner: Runner) => {
    ctx.save();
    
    const currentGroundY = canvasSize.height - 40;
    const centerX = runner.x + 17;
    const hipY = runner.y - 16;
    const shoulderY = runner.y - 38;
    const headY = runner.y - 48;
    
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#1a1a2e';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    
    if (runner.isJumping) {
      // Jump pose
      ctx.beginPath();
      ctx.moveTo(centerX, hipY);
      ctx.lineTo(centerX, shoulderY);
      ctx.stroke();
      
      // Backpack
      ctx.fillStyle = '#2d2d44';
      ctx.fillRect(centerX - 12, shoulderY + 2, 10, 16);
      ctx.strokeRect(centerX - 12, shoulderY + 2, 10, 16);
      ctx.fillStyle = '#1a1a2e';
      
      // Head
      ctx.beginPath();
      ctx.arc(centerX, headY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Legs tucked
      ctx.beginPath();
      ctx.moveTo(centerX - 2, hipY);
      ctx.lineTo(centerX - 10, hipY + 10);
      ctx.lineTo(centerX - 14, hipY + 4);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 2, hipY);
      ctx.lineTo(centerX - 4, hipY + 12);
      ctx.lineTo(centerX - 12, hipY + 7);
      ctx.stroke();
      
      // Arms up
      ctx.beginPath();
      ctx.moveTo(centerX - 2, shoulderY + 4);
      ctx.lineTo(centerX - 12, shoulderY + 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 2, shoulderY + 4);
      ctx.lineTo(centerX + 10, shoulderY + 12);
      ctx.stroke();
    } else {
      // Running animation
      const frame = Math.floor((Date.now() / 140) % 2);
      const bob = frame === 0 ? -1 : 0;
      const adjustedHipY = hipY + bob;
      const adjustedShoulderY = shoulderY + bob;
      const adjustedHeadY = headY + bob;
      
      // Torso
      ctx.beginPath();
      ctx.moveTo(centerX, adjustedHipY);
      ctx.lineTo(centerX, adjustedShoulderY);
      ctx.stroke();
      
      // Backpack
      ctx.fillStyle = '#2d2d44';
      ctx.fillRect(centerX - 12, adjustedShoulderY + 2, 10, 16);
      ctx.strokeRect(centerX - 12, adjustedShoulderY + 2, 10, 16);
      ctx.fillStyle = '#1a1a2e';
      
      // Head
      ctx.beginPath();
      ctx.arc(centerX, adjustedHeadY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Legs
      if (frame === 0) {
        ctx.beginPath();
        ctx.moveTo(centerX - 3, adjustedHipY);
        ctx.lineTo(centerX + 6, adjustedHipY + 14);
        ctx.lineTo(centerX + 9, runner.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + 3, adjustedHipY);
        ctx.lineTo(centerX - 6, adjustedHipY + 14);
        ctx.lineTo(centerX - 9, runner.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(centerX - 3, adjustedHipY);
        ctx.lineTo(centerX - 6, adjustedHipY + 14);
        ctx.lineTo(centerX - 9, runner.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + 3, adjustedHipY);
        ctx.lineTo(centerX + 6, adjustedHipY + 14);
        ctx.lineTo(centerX + 9, runner.y);
        ctx.stroke();
      }
      
      // Arms
      const armOffset = frame === 0 ? 8 : -8;
      ctx.beginPath();
      ctx.moveTo(centerX - 2, adjustedShoulderY + 4);
      ctx.lineTo(centerX - 2 - armOffset, adjustedShoulderY + 16);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 2, adjustedShoulderY + 4);
      ctx.lineTo(centerX + 2 + armOffset, adjustedShoulderY + 16);
      ctx.stroke();
    }
    
    ctx.restore();
  }, [canvasSize.height]);

  // Draw obstacle - sized for landscape
  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    
    ctx.fillStyle = '#1a1a2e';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    switch (obstacle.type) {
      case 'camera':
        ctx.fillRect(obstacle.x + 4, obstacle.y - 28, 28, 20);
        ctx.strokeRect(obstacle.x + 4, obstacle.y - 28, 28, 20);
        ctx.fillRect(obstacle.x + 24, obstacle.y - 34, 8, 6);
        ctx.strokeRect(obstacle.x + 24, obstacle.y - 34, 8, 6);
        ctx.beginPath();
        ctx.arc(obstacle.x + 40, obstacle.y - 18, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'tripod':
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(obstacle.x + 18, obstacle.y - 50);
        ctx.lineTo(obstacle.x, obstacle.y);
        ctx.moveTo(obstacle.x + 18, obstacle.y - 50);
        ctx.lineTo(obstacle.x + 36, obstacle.y);
        ctx.moveTo(obstacle.x + 18, obstacle.y);
        ctx.lineTo(obstacle.x + 18, obstacle.y - 50);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.fillRect(obstacle.x + 6, obstacle.y - 60, 24, 12);
        ctx.strokeRect(obstacle.x + 6, obstacle.y - 60, 24, 12);
        break;
        
      case 'computer':
        ctx.fillRect(obstacle.x + 4, obstacle.y - 42, 36, 28);
        ctx.strokeRect(obstacle.x + 4, obstacle.y - 42, 36, 28);
        ctx.fillStyle = '#3b5998';
        ctx.fillRect(obstacle.x + 7, obstacle.y - 39, 30, 20);
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(obstacle.x + 16, obstacle.y - 14, 12, 10);
        ctx.strokeRect(obstacle.x + 16, obstacle.y - 14, 12, 10);
        ctx.fillRect(obstacle.x + 10, obstacle.y - 4, 24, 4);
        ctx.strokeRect(obstacle.x + 10, obstacle.y - 4, 24, 4);
        break;
        
      case 'clapperboard':
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(obstacle.x + 2, obstacle.y - 34, 36, 28);
        ctx.strokeRect(obstacle.x + 2, obstacle.y - 34, 36, 28);
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(obstacle.x + 2, obstacle.y - 44, 36, 10);
        ctx.strokeRect(obstacle.x + 2, obstacle.y - 44, 36, 10);
        ctx.fillStyle = '#f0f0f0';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(obstacle.x + 6 + i * 9, obstacle.y - 44, 4, 10);
        }
        break;
    }
    
    ctx.restore();
  }, []);

  // Main game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const state = gameStateRef.current;
    if (!state.isRunning || state.isPaused) return;

    const currentGroundY = canvasSize.height - 40;

    // Clear canvas
    ctx.fillStyle = 'rgba(20, 20, 35, 0.97)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, currentGroundY + 3);
    ctx.lineTo(canvas.width, currentGroundY + 3);
    ctx.stroke();
    
    // Ground texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 25) {
      ctx.beginPath();
      ctx.moveTo(i, currentGroundY + 3);
      ctx.lineTo(i + 12, currentGroundY + 3);
      ctx.stroke();
    }

    // Update runner physics
    const runner = runnerRef.current;
    const effectiveGravity = runner.velocityY > 0 ? GRAVITY * FALL_MULTIPLIER : GRAVITY;
    runner.velocityY += effectiveGravity;
    runner.y += runner.velocityY;
    
    if (runner.y >= currentGroundY) {
      runner.y = currentGroundY;
      runner.velocityY = 0;
      runner.isJumping = false;
    }

    // Draw runner
    drawRunner(ctx, runner);

    // Spawn obstacles - larger gaps for reaction time
    const timeSinceStart = Date.now() - gameStartTimeRef.current;
    const pastGracePeriod = timeSinceStart > GRACE_PERIOD_MS;
    const baseSpawnChance = 0.012;
    const speedBonus = (state.speed - INITIAL_SPEED) * 0.0015;
    const spawnChance = baseSpawnChance + speedBonus;
    
    // Wider min gap for landscape - more reaction time
    const baseGap = 280;
    const speedGapBonus = (state.speed - INITIAL_SPEED) * 8;
    const randomVariance = Math.random() * 60;
    const minGap = baseGap + speedGapBonus + randomVariance;
    
    const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
    const canSpawn = obstaclesRef.current.length === 0 || (lastObstacle && lastObstacle.x < canvas.width - minGap);
    
    if (pastGracePeriod && Math.random() < spawnChance && canSpawn) {
      const allTypes: ObstacleType[] = ['camera', 'tripod', 'computer', 'clapperboard'];
      const recentTypes = recentObstaclesRef.current;
      let availableTypes = allTypes.filter(t => !recentTypes.includes(t));
      if (availableTypes.length === 0) {
        availableTypes = allTypes.filter(t => t !== recentTypes[recentTypes.length - 1]);
      }
      
      const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      recentObstaclesRef.current = [...recentTypes, type].slice(-2);
      
      const dimensions: Record<ObstacleType, { width: number; height: number }> = {
        camera: { width: 48, height: 40 },
        tripod: { width: 40, height: 65 },
        computer: { width: 48, height: 50 },
        clapperboard: { width: 42, height: 48 },
      };
      
      obstaclesRef.current.push({
        x: canvas.width + 20,
        y: currentGroundY,
        width: dimensions[type].width,
        height: dimensions[type].height,
        type,
        scored: false,
      });
    }

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= state.speed;
      drawObstacle(ctx, obstacle);
      return obstacle.x > -60;
    });

    // Collision detection
    for (const obstacle of obstaclesRef.current) {
      const runnerBox = {
        left: runner.x + 6,
        right: runner.x + runner.width - 6,
        top: runner.y - runner.height + 10,
        bottom: runner.y,
      };
      
      const obstacleBox = {
        left: obstacle.x + 4,
        right: obstacle.x + obstacle.width - 4,
        top: obstacle.y - obstacle.height,
        bottom: obstacle.y,
      };

      if (
        runnerBox.right > obstacleBox.left &&
        runnerBox.left < obstacleBox.right &&
        runnerBox.bottom > obstacleBox.top &&
        runnerBox.top < obstacleBox.bottom
      ) {
        endGame();
        return;
      }
    }

    // Score
    let scoreToAdd = 0;
    let streakBonus = 0;
    for (const obstacle of obstaclesRef.current) {
      if (!obstacle.scored && obstacle.x + obstacle.width < runner.x) {
        obstacle.scored = true;
        scoreToAdd += 1;
      }
    }

    // Update speed
    const timeSec = timeSinceStart / 1000;
    let newSpeed: number;
    if (timeSec < WARMUP_DURATION) {
      const warmupProgress = timeSec / WARMUP_DURATION;
      const warmupTarget = INITIAL_SPEED + 1.5;
      newSpeed = INITIAL_SPEED + (warmupTarget - INITIAL_SPEED) * warmupProgress;
    } else {
      const adjustedTime = timeSec - WARMUP_DURATION;
      const warmupEndSpeed = INITIAL_SPEED + 1.5;
      newSpeed = warmupEndSpeed + (MAX_SPEED - warmupEndSpeed) * (1 - Math.exp(-SPEED_CURVE_K * adjustedTime));
    }
    
    if (scoreToAdd > 0) {
      setGameState(prev => {
        const newStreak = prev.streak + scoreToAdd;
        if (Math.floor(newStreak / 5) > Math.floor(prev.streak / 5)) {
          streakBonus = 1;
        }
        return {
          ...prev,
          score: prev.score + scoreToAdd + streakBonus,
          speed: newSpeed,
          streak: newStreak,
        };
      });
    } else {
      setGameState(prev => ({ ...prev, speed: newSpeed }));
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [drawRunner, drawObstacle, endGame, canvasSize.height]);

  // Start game loop
  useEffect(() => {
    if (gameState.isRunning && !gameState.isPaused) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState.isRunning, gameState.isPaused, gameLoop]);

  // Draw initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = 'rgba(20, 20, 35, 0.97)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentGroundY = canvasSize.height - 40;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, currentGroundY + 3);
    ctx.lineTo(canvas.width, currentGroundY + 3);
    ctx.stroke();

    drawRunner(ctx, runnerRef.current);
  }, [drawRunner, canvasSize]);

  return (
    <div 
      ref={containerRef}
      className="h-full flex flex-col bg-gradient-to-b from-[hsl(250,25%,12%)] to-[hsl(250,20%,8%)] relative overflow-hidden"
    >
      {/* Header with close, score, and pause */}
      <div className="flex items-center justify-between px-4 py-3 z-10">
        <button
          onClick={() => closeWindow('runner')}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        {/* Score and high score */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-white/50 text-[10px] uppercase tracking-wider">Best</div>
            <div className="text-white/80 font-semibold text-sm">{gameState.highScore}</div>
          </div>
          <div className="px-5 py-2 bg-black/50 backdrop-blur-sm rounded-full">
            <span className="text-white font-bold text-xl">{gameState.score}</span>
          </div>
        </div>
        
        {gameState.isRunning && (
          <button
            onClick={togglePause}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
          >
            {gameState.isPaused ? (
              <Play className="w-5 h-5 text-white fill-white" />
            ) : (
              <Pause className="w-5 h-5 text-white" />
            )}
          </button>
        )}
        {!gameState.isRunning && <div className="w-10" />}
      </div>

      {/* Streak indicator */}
      <AnimatePresence>
        {gameState.isRunning && gameState.streak >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg z-20"
          >
            🔥 x{gameState.streak}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game canvas area - centered and landscape */}
      <div className="flex-1 flex items-center justify-center px-3">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-[700px]">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="block w-full"
          />

          {/* Countdown overlay */}
          <AnimatePresence>
            {gameState.countdown !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/70"
              >
                <motion.span
                  key={gameState.countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="text-6xl font-bold text-white"
                >
                  {gameState.countdown}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start screen */}
          {!gameState.isRunning && !gameState.isGameOver && gameState.countdown === null && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={startCountdown}
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Runner</h2>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform">
                  Start Game
                </button>
              </div>
            </div>
          )}

          {/* Pause overlay */}
          <AnimatePresence>
            {gameState.isPaused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/70"
                onClick={togglePause}
              >
                <div className="text-center">
                  <Pause className="w-12 h-12 text-white mx-auto mb-2" />
                  <p className="text-white text-lg font-semibold">Paused</p>
                  <p className="text-white/50 text-xs mt-1">Tap to resume</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game over screen */}
          {gameState.isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-400 mb-1">Game Over</h2>
                <p className="text-4xl font-bold text-white mb-1">{gameState.score}</p>
                <p className="text-white/50 text-xs mb-4">
                  {gameState.score >= gameState.highScore ? '🎉 New High Score!' : `Best: ${gameState.highScore}`}
                </p>
                <button
                  onClick={startCountdown}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jump button - large and prominent */}
      <div className="px-4 pb-6 pt-4">
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            jump();
          }}
          onMouseDown={jump}
          disabled={!gameState.isRunning || gameState.isPaused}
          className={`w-full py-6 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg transition-all active:scale-[0.98] ${
            gameState.isRunning && !gameState.isPaused
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-900/30'
              : 'bg-white/10 text-white/40'
          }`}
        >
          <ChevronUp className="w-6 h-6" />
          <span>JUMP</span>
        </button>
      </div>
    </div>
  );
}
