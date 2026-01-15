import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X } from 'lucide-react';
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

// Mobile-optimized constants
const GRAVITY = 1.2;
const JUMP_FORCE = -18;
const FALL_MULTIPLIER = 1.5;
const INITIAL_SPEED = 6;
const MAX_SPEED = 16;
const GRACE_PERIOD_MS = 800;
const WARMUP_DURATION = 3;
const SPEED_CURVE_K = 0.15;

export function MobileRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const gameStartTimeRef = useRef<number>(0);
  const recentObstaclesRef = useRef<ObstacleType[]>([]);
  const { closeWindow } = useWindows();
  
  const [canvasSize, setCanvasSize] = useState({ width: 350, height: 500 });
  const groundY = canvasSize.height - 80;
  
  const runnerRef = useRef<Runner>({
    x: 60,
    y: groundY,
    width: 45,
    height: 75,
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

  // Resize canvas to fit container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.min(rect.width - 32, 400);
        const height = Math.min(rect.height - 200, 550);
        setCanvasSize({ width, height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Update groundY when canvas resizes
  useEffect(() => {
    runnerRef.current.y = canvasSize.height - 80;
  }, [canvasSize.height]);

  const jump = useCallback(() => {
    const currentGroundY = canvasSize.height - 80;
    if (!runnerRef.current.isJumping && gameStateRef.current.isRunning && !gameStateRef.current.isPaused) {
      runnerRef.current.velocityY = JUMP_FORCE;
      runnerRef.current.isJumping = true;
    }
  }, [canvasSize.height]);

  const startCountdown = useCallback(() => {
    setGameState(prev => ({ ...prev, countdown: 3, isGameOver: false }));
    
    const countdownInterval = setInterval(() => {
      setGameState(prev => {
        if (prev.countdown === null || prev.countdown <= 1) {
          clearInterval(countdownInterval);
          // Start the game
          runnerRef.current = {
            x: 60,
            y: canvasSize.height - 80,
            width: 45,
            height: 75,
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
    }, 800);
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

  // Draw runner - larger, higher contrast
  const drawRunner = useCallback((ctx: CanvasRenderingContext2D, runner: Runner) => {
    ctx.save();
    
    const scale = 1.5;
    const centerX = runner.x + 22;
    const currentGroundY = canvasSize.height - 80;
    const hipY = runner.y - 22 * scale;
    const shoulderY = runner.y - 52 * scale;
    const headY = runner.y - 68 * scale;
    
    // Stronger contrast - dark fill with white outline
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#1a1a2e';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    if (runner.isJumping) {
      // Jump pose
      ctx.beginPath();
      ctx.moveTo(centerX, hipY);
      ctx.lineTo(centerX, shoulderY);
      ctx.stroke();
      
      // Backpack
      ctx.fillStyle = '#2d2d44';
      ctx.fillRect(centerX - 15 * scale, shoulderY + 3, 12 * scale, 20 * scale);
      ctx.strokeRect(centerX - 15 * scale, shoulderY + 3, 12 * scale, 20 * scale);
      ctx.fillStyle = '#1a1a2e';
      
      // Head
      ctx.beginPath();
      ctx.arc(centerX, headY, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Legs tucked
      ctx.beginPath();
      ctx.moveTo(centerX - 3, hipY);
      ctx.lineTo(centerX - 12 * scale, hipY + 12 * scale);
      ctx.lineTo(centerX - 18 * scale, hipY + 4 * scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 3, hipY);
      ctx.lineTo(centerX - 6 * scale, hipY + 15 * scale);
      ctx.lineTo(centerX - 15 * scale, hipY + 9 * scale);
      ctx.stroke();
      
      // Arms
      ctx.beginPath();
      ctx.moveTo(centerX - 3, shoulderY + 5);
      ctx.lineTo(centerX - 15 * scale, shoulderY + 12 * scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 3, shoulderY + 5);
      ctx.lineTo(centerX + 12 * scale, shoulderY + 15 * scale);
      ctx.stroke();
    } else {
      // Running animation
      const frame = Math.floor((Date.now() / 150) % 2);
      const bob = frame === 0 ? -2 : 0;
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
      ctx.fillRect(centerX - 15 * scale, adjustedShoulderY + 3, 12 * scale, 20 * scale);
      ctx.strokeRect(centerX - 15 * scale, adjustedShoulderY + 3, 12 * scale, 20 * scale);
      ctx.fillStyle = '#1a1a2e';
      
      // Head
      ctx.beginPath();
      ctx.arc(centerX, adjustedHeadY, 12 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Legs
      if (frame === 0) {
        ctx.beginPath();
        ctx.moveTo(centerX - 4, adjustedHipY);
        ctx.lineTo(centerX + 8 * scale, adjustedHipY + 18 * scale);
        ctx.lineTo(centerX + 12 * scale, runner.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + 4, adjustedHipY);
        ctx.lineTo(centerX - 8 * scale, adjustedHipY + 18 * scale);
        ctx.lineTo(centerX - 12 * scale, runner.y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(centerX - 4, adjustedHipY);
        ctx.lineTo(centerX - 8 * scale, adjustedHipY + 18 * scale);
        ctx.lineTo(centerX - 12 * scale, runner.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX + 4, adjustedHipY);
        ctx.lineTo(centerX + 8 * scale, adjustedHipY + 18 * scale);
        ctx.lineTo(centerX + 12 * scale, runner.y);
        ctx.stroke();
      }
      
      // Arms
      const armOffset = frame === 0 ? 10 : -10;
      ctx.beginPath();
      ctx.moveTo(centerX - 3, adjustedShoulderY + 5);
      ctx.lineTo(centerX - 3 - armOffset * scale, adjustedShoulderY + 20 * scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX + 3, adjustedShoulderY + 5);
      ctx.lineTo(centerX + 3 + armOffset * scale, adjustedShoulderY + 20 * scale);
      ctx.stroke();
    }
    
    ctx.restore();
  }, [canvasSize.height]);

  // Draw obstacle - larger, higher contrast
  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    const scale = 1.4;
    
    ctx.fillStyle = '#1a1a2e';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    switch (obstacle.type) {
      case 'camera':
        ctx.fillRect(obstacle.x + 5, obstacle.y - 30 * scale, 30 * scale, 22 * scale);
        ctx.strokeRect(obstacle.x + 5, obstacle.y - 30 * scale, 30 * scale, 22 * scale);
        ctx.fillRect(obstacle.x + 25 * scale, obstacle.y - 38 * scale, 10 * scale, 8 * scale);
        ctx.strokeRect(obstacle.x + 25 * scale, obstacle.y - 38 * scale, 10 * scale, 8 * scale);
        // Lens
        ctx.beginPath();
        ctx.arc(obstacle.x + 45 * scale, obstacle.y - 20 * scale, 7 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'tripod':
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(obstacle.x + 20 * scale, obstacle.y - 60 * scale);
        ctx.lineTo(obstacle.x, obstacle.y);
        ctx.moveTo(obstacle.x + 20 * scale, obstacle.y - 60 * scale);
        ctx.lineTo(obstacle.x + 40 * scale, obstacle.y);
        ctx.moveTo(obstacle.x + 20 * scale, obstacle.y);
        ctx.lineTo(obstacle.x + 20 * scale, obstacle.y - 60 * scale);
        ctx.stroke();
        // Camera on top
        ctx.lineWidth = 2;
        ctx.fillRect(obstacle.x + 8 * scale, obstacle.y - 72 * scale, 25 * scale, 15 * scale);
        ctx.strokeRect(obstacle.x + 8 * scale, obstacle.y - 72 * scale, 25 * scale, 15 * scale);
        break;
        
      case 'computer':
        ctx.fillRect(obstacle.x + 5, obstacle.y - 50 * scale, 40 * scale, 32 * scale);
        ctx.strokeRect(obstacle.x + 5, obstacle.y - 50 * scale, 40 * scale, 32 * scale);
        // Screen
        ctx.fillStyle = '#3b5998';
        ctx.fillRect(obstacle.x + 8, obstacle.y - 47 * scale, 34 * scale, 24 * scale);
        ctx.fillStyle = '#1a1a2e';
        // Stand
        ctx.fillRect(obstacle.x + 18 * scale, obstacle.y - 18 * scale, 14 * scale, 12 * scale);
        ctx.strokeRect(obstacle.x + 18 * scale, obstacle.y - 18 * scale, 14 * scale, 12 * scale);
        ctx.fillRect(obstacle.x + 12 * scale, obstacle.y - 6 * scale, 26 * scale, 6 * scale);
        ctx.strokeRect(obstacle.x + 12 * scale, obstacle.y - 6 * scale, 26 * scale, 6 * scale);
        break;
        
      case 'clapperboard':
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(obstacle.x + 3, obstacle.y - 38 * scale, 40 * scale, 32 * scale);
        ctx.strokeRect(obstacle.x + 3, obstacle.y - 38 * scale, 40 * scale, 32 * scale);
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(obstacle.x + 3, obstacle.y - 50 * scale, 40 * scale, 12 * scale);
        ctx.strokeRect(obstacle.x + 3, obstacle.y - 50 * scale, 40 * scale, 12 * scale);
        // Stripes
        ctx.fillStyle = '#f0f0f0';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(obstacle.x + 8 + i * 11 * scale, obstacle.y - 50 * scale, 5 * scale, 12 * scale);
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

    const currentGroundY = canvasSize.height - 80;

    // Clear canvas with semi-transparent dark background
    ctx.fillStyle = 'rgba(20, 20, 35, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground line - prominent
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, currentGroundY + 5);
    ctx.lineTo(canvas.width, currentGroundY + 5);
    ctx.stroke();
    
    // Ground texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, currentGroundY + 5);
      ctx.lineTo(i + 10, currentGroundY + 5);
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

    // Spawn obstacles
    const timeSinceStart = Date.now() - gameStartTimeRef.current;
    const pastGracePeriod = timeSinceStart > GRACE_PERIOD_MS;
    const baseSpawnChance = 0.015;
    const speedBonus = (state.speed - INITIAL_SPEED) * 0.002;
    const spawnChance = baseSpawnChance + speedBonus;
    
    const baseGap = 180;
    const speedGapBonus = (state.speed - INITIAL_SPEED) * 6;
    const randomVariance = Math.random() * 50;
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
      
      // Larger hitboxes for mobile
      const dimensions: Record<ObstacleType, { width: number; height: number }> = {
        camera: { width: 55, height: 50 },
        tripod: { width: 50, height: 80 },
        computer: { width: 55, height: 65 },
        clapperboard: { width: 50, height: 55 },
      };
      
      obstaclesRef.current.push({
        x: canvas.width,
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
      return obstacle.x > -80;
    });

    // Collision detection
    for (const obstacle of obstaclesRef.current) {
      const runnerBox = {
        left: runner.x + 8,
        right: runner.x + runner.width - 8,
        top: runner.y - runner.height + 15,
        bottom: runner.y,
      };
      
      const obstacleBox = {
        left: obstacle.x + 5,
        right: obstacle.x + obstacle.width - 5,
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
      const warmupTarget = INITIAL_SPEED + 2;
      newSpeed = INITIAL_SPEED + (warmupTarget - INITIAL_SPEED) * warmupProgress;
    } else {
      const adjustedTime = timeSec - WARMUP_DURATION;
      const warmupEndSpeed = INITIAL_SPEED + 2;
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

  // Handle touch/tap to jump
  const handleTap = useCallback(() => {
    if (gameState.isRunning && !gameState.isPaused) {
      jump();
    }
  }, [gameState.isRunning, gameState.isPaused, jump]);

  // Draw initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = 'rgba(20, 20, 35, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentGroundY = canvasSize.height - 80;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, currentGroundY + 5);
    ctx.lineTo(canvas.width, currentGroundY + 5);
    ctx.stroke();

    drawRunner(ctx, runnerRef.current);
  }, [drawRunner, canvasSize]);

  return (
    <div 
      ref={containerRef}
      className="h-full flex flex-col bg-gradient-to-b from-[hsl(250,25%,12%)] to-[hsl(250,20%,8%)] relative overflow-hidden"
    >
      {/* Header with close and pause */}
      <div className="flex items-center justify-between px-4 py-3 z-10">
        <button
          onClick={() => closeWindow('runner')}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        {/* Score pill */}
        <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-white font-bold text-lg">{gameState.score}</span>
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

      {/* High score */}
      <div className="text-center pb-2">
        <span className="text-white/50 text-xs uppercase tracking-wider">High Score: </span>
        <span className="text-white/80 font-semibold">{gameState.highScore}</span>
      </div>

      {/* Game canvas area */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="block"
            onClick={handleTap}
            onTouchStart={(e) => {
              e.preventDefault();
              handleTap();
            }}
          />

          {/* Streak indicator */}
          <AnimatePresence>
            {gameState.isRunning && gameState.streak >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg"
              >
                🔥 x{gameState.streak}
              </motion.div>
            )}
          </AnimatePresence>

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
                  className="text-7xl font-bold text-white"
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
                <h2 className="text-3xl font-bold text-white mb-4">Runner</h2>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg active:scale-95 transition-transform">
                  Start Game
                </button>
                <p className="text-white/50 text-sm mt-4">Tap anywhere to jump</p>
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
                  <Pause className="w-16 h-16 text-white mx-auto mb-4" />
                  <p className="text-white text-xl font-semibold">Paused</p>
                  <p className="text-white/50 text-sm mt-2">Tap to resume</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game over screen */}
          {gameState.isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over</h2>
                <p className="text-5xl font-bold text-white mb-2">{gameState.score}</p>
                <p className="text-white/50 text-sm mb-6">
                  {gameState.score >= gameState.highScore ? '🎉 New High Score!' : `Best: ${gameState.highScore}`}
                </p>
                <button
                  onClick={startCountdown}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg active:scale-95 transition-transform"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="text-center py-4">
        <p className="text-white/40 text-xs">Tap anywhere on game to jump</p>
      </div>
    </div>
  );
}