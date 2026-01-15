import { useEffect, useRef, useState, useCallback } from 'react';
import { useWindows } from '@/contexts/WindowContext';
import { MobileRunnerGame } from '@/components/mobile/MobileRunnerGame';
interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  highScore: number;
  speed: number;
  streak: number;
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

const GRAVITY = 0.9;
const JUMP_FORCE = -13;
const FALL_MULTIPLIER = 1.6; // Faster descent for snappier feel
const GROUND_Y = 180;
const INITIAL_SPEED = 5.5; // Slightly slower start (~20% reduction)
const MAX_SPEED = 14;
const GRACE_PERIOD_MS = 1000;
// Two-phase speed curve: gentle warmup for first few seconds, then normal ramp
const WARMUP_DURATION = 4; // seconds of gentle acceleration
const SPEED_CURVE_K = 0.12; // Normal ramp rate after warmup

export function RunnerWindow() {
  const { closeWindow, isMobile } = useWindows();
  
  // Use mobile-optimized version on small screens
  if (isMobile) {
    return <MobileRunnerGame />;
  }
  
  // Desktop version continues below
  return <DesktopRunnerGame closeWindow={closeWindow} />;
}

function DesktopRunnerGame({ closeWindow }: { closeWindow: (id: 'runner') => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const gameStartTimeRef = useRef<number>(0);
  const recentObstaclesRef = useRef<ObstacleType[]>([]); // Track last 2 spawned types
  const runnerRef = useRef<Runner>({
    x: 60,
    y: GROUND_Y,
    width: 30,
    height: 50,
    velocityY: 0,
    isJumping: false,
  });
  
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    isGameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('runnerHighScore') || '0', 10),
    speed: INITIAL_SPEED,
    streak: 0,
  });

  const gameStateRef = useRef(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const jump = useCallback(() => {
    if (!runnerRef.current.isJumping && gameStateRef.current.isRunning) {
      runnerRef.current.velocityY = JUMP_FORCE;
      runnerRef.current.isJumping = true;
    }
  }, []);

  const startGame = useCallback(() => {
    runnerRef.current = {
      x: 60,
      y: GROUND_Y,
      width: 30,
      height: 50,
      velocityY: 0,
      isJumping: false,
    };
    obstaclesRef.current = [];
    recentObstaclesRef.current = [];
    gameStartTimeRef.current = Date.now();
    setGameState(prev => ({
      ...prev,
      isRunning: true,
      isGameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
      streak: 0,
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => {
      const newHighScore = Math.max(prev.score, prev.highScore);
      localStorage.setItem('runnerHighScore', newHighScore.toString());
      return {
        ...prev,
        isRunning: false,
        isGameOver: true,
        highScore: newHighScore,
      };
    });
  }, []);

  // Draw runner (stick figure with backpack, facing right)
  const drawRunner = useCallback((ctx: CanvasRenderingContext2D, runner: Runner, speed: number) => {
    ctx.save();
    
    const centerX = runner.x + 15;
    const hipY = runner.y - 15;
    const shoulderY = runner.y - 35;
    const headY = runner.y - 45;
    
    ctx.strokeStyle = '#2d3748';
    ctx.fillStyle = '#2d3748';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    if (runner.isJumping) {
      // Jump pose - legs tucked, arms back
      
      // Torso (vertical line)
      ctx.beginPath();
      ctx.moveTo(centerX, hipY);
      ctx.lineTo(centerX, shoulderY);
      ctx.stroke();
      
      // Backpack (on the left/back side, since facing right)
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(centerX - 10, shoulderY + 2, 8, 14);
      ctx.fillStyle = '#718096';
      ctx.fillRect(centerX - 9, shoulderY + 4, 6, 5);
      ctx.fillStyle = '#2d3748';
      
      // Head (circle)
      ctx.beginPath();
      ctx.arc(centerX, headY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Left leg - tucked back and up
      ctx.beginPath();
      ctx.moveTo(centerX - 2, hipY);
      ctx.lineTo(centerX - 8, hipY + 8);
      ctx.lineTo(centerX - 12, hipY + 2);
      ctx.stroke();
      
      // Right leg - tucked back and up
      ctx.beginPath();
      ctx.moveTo(centerX + 2, hipY);
      ctx.lineTo(centerX - 4, hipY + 10);
      ctx.lineTo(centerX - 10, hipY + 6);
      ctx.stroke();
      
      // Left arm - held back
      ctx.beginPath();
      ctx.moveTo(centerX - 2, shoulderY + 3);
      ctx.lineTo(centerX - 10, shoulderY + 8);
      ctx.stroke();
      
      // Right arm - slightly forward
      ctx.beginPath();
      ctx.moveTo(centerX + 2, shoulderY + 3);
      ctx.lineTo(centerX + 8, shoulderY + 10);
      ctx.stroke();
      
    } else {
      // Simple 2-frame run cycle with hard-capped cadence
      const CYCLE_MS = 300; // Fixed ~3.3 strides/sec - clean and readable
      const frame = Math.floor((Date.now() / (CYCLE_MS / 2)) % 2); // 2 frames
      
      // Very subtle bob (almost imperceptible)
      const bob = frame === 0 ? -1 : 0;
      const adjustedHipY = hipY + bob;
      const adjustedShoulderY = shoulderY + bob;
      const adjustedHeadY = headY + bob;
      
      // Torso (vertical line)
      ctx.beginPath();
      ctx.moveTo(centerX, adjustedHipY);
      ctx.lineTo(centerX, adjustedShoulderY);
      ctx.stroke();
      
      // Backpack
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(centerX - 10, adjustedShoulderY + 2, 8, 14);
      ctx.fillStyle = '#718096';
      ctx.fillRect(centerX - 9, adjustedShoulderY + 4, 6, 5);
      ctx.fillStyle = '#2d3748';
      
      // Head
      ctx.beginPath();
      ctx.arc(centerX, adjustedHeadY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Simple 2-frame leg positions
      const legLength = 12;
      
      if (frame === 0) {
        // Frame 0: Left forward, right back
        // Left leg - forward
        ctx.beginPath();
        ctx.moveTo(centerX - 3, adjustedHipY);
        ctx.lineTo(centerX + 5, adjustedHipY + 12);
        ctx.lineTo(centerX + 8, runner.y);
        ctx.stroke();
        
        // Right leg - back
        ctx.beginPath();
        ctx.moveTo(centerX + 3, adjustedHipY);
        ctx.lineTo(centerX - 5, adjustedHipY + 12);
        ctx.lineTo(centerX - 8, runner.y);
        ctx.stroke();
      } else {
        // Frame 1: Right forward, left back
        // Left leg - back
        ctx.beginPath();
        ctx.moveTo(centerX - 3, adjustedHipY);
        ctx.lineTo(centerX - 5, adjustedHipY + 12);
        ctx.lineTo(centerX - 8, runner.y);
        ctx.stroke();
        
        // Right leg - forward
        ctx.beginPath();
        ctx.moveTo(centerX + 3, adjustedHipY);
        ctx.lineTo(centerX + 5, adjustedHipY + 12);
        ctx.lineTo(centerX + 8, runner.y);
        ctx.stroke();
      }
      
      // Simple arm swing (opposite to legs)
      const armOffset = frame === 0 ? 6 : -6;
      
      // Left arm
      ctx.beginPath();
      ctx.moveTo(centerX - 2, adjustedShoulderY + 3);
      ctx.lineTo(centerX - 2 - armOffset, adjustedShoulderY + 14);
      ctx.stroke();
      
      // Right arm
      ctx.beginPath();
      ctx.moveTo(centerX + 2, adjustedShoulderY + 3);
      ctx.lineTo(centerX + 2 + armOffset, adjustedShoulderY + 14);
      ctx.stroke();
    }
    
    ctx.restore();
  }, []);

  // Draw obstacle (camera, tripod, computer, clippers)
  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    
    switch (obstacle.type) {
      case 'camera':
        // Camera body - rectangular block
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(obstacle.x + 5, obstacle.y - 22, 22, 16);
        
        // Viewfinder bump on top
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(obstacle.x + 18, obstacle.y - 28, 8, 6);
        
        // Lens barrel protruding from front (right side)
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(obstacle.x + 27, obstacle.y - 19, 6, 10);
        
        // Lens glass (circle at end of barrel)
        ctx.fillStyle = '#4a5568';
        ctx.beginPath();
        ctx.arc(obstacle.x + 33, obstacle.y - 14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#718096';
        ctx.beginPath();
        ctx.arc(obstacle.x + 33, obstacle.y - 14, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Small grip on left side
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(obstacle.x + 2, obstacle.y - 20, 4, 12);
        
        // Rear screen indication
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(obstacle.x + 7, obstacle.y - 19, 10, 8);
        break;
        
      case 'tripod':
        // Stand
        ctx.strokeStyle = '#2d3748';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(obstacle.x + 15, obstacle.y - 45);
        ctx.lineTo(obstacle.x, obstacle.y);
        ctx.moveTo(obstacle.x + 15, obstacle.y - 45);
        ctx.lineTo(obstacle.x + 30, obstacle.y);
        ctx.moveTo(obstacle.x + 15, obstacle.y);
        ctx.lineTo(obstacle.x + 15, obstacle.y - 45);
        ctx.stroke();
        // Camera on top
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(obstacle.x + 5, obstacle.y - 55, 20, 12);
        break;
        
      case 'computer':
        // Monitor
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(obstacle.x + 5, obstacle.y - 40, 30, 25);
        // Screen
        ctx.fillStyle = '#4299e1';
        ctx.fillRect(obstacle.x + 8, obstacle.y - 37, 24, 18);
        // Stand
        ctx.fillStyle = '#718096';
        ctx.fillRect(obstacle.x + 15, obstacle.y - 15, 10, 10);
        ctx.fillRect(obstacle.x + 10, obstacle.y - 5, 20, 5);
        break;
        
      case 'clapperboard':
        // Movie clapperboard / slate
        // Main board (white/light section)
        ctx.fillStyle = '#f7fafc';
        ctx.fillRect(obstacle.x + 2, obstacle.y - 28, 30, 24);
        
        // Board border
        ctx.strokeStyle = '#2d3748';
        ctx.lineWidth = 2;
        ctx.strokeRect(obstacle.x + 2, obstacle.y - 28, 30, 24);
        
        // Top clapper bar (striped section) - attached at hinge, slightly angled
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(obstacle.x + 2, obstacle.y - 38, 30, 10);
        
        // Diagonal stripes on clapper bar
        ctx.fillStyle = '#f7fafc';
        for (let i = 0; i < 4; i++) {
          ctx.fillRect(obstacle.x + 6 + i * 8, obstacle.y - 38, 4, 10);
        }
        
        // Hinge circles
        ctx.fillStyle = '#718096';
        ctx.beginPath();
        ctx.arc(obstacle.x + 6, obstacle.y - 28, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Simple text lines (representing production info)
        ctx.fillStyle = '#2d3748';
        ctx.fillRect(obstacle.x + 6, obstacle.y - 22, 22, 2);
        ctx.fillRect(obstacle.x + 6, obstacle.y - 16, 18, 2);
        ctx.fillRect(obstacle.x + 6, obstacle.y - 10, 20, 2);
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
    if (!state.isRunning) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e2e8f0');
    gradient.addColorStop(1, '#cbd5e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 5);
    ctx.lineTo(canvas.width, GROUND_Y + 5);
    ctx.stroke();

    // Update runner physics
    const runner = runnerRef.current;
    // Apply fall multiplier when descending for snappier feel
    const effectiveGravity = runner.velocityY > 0 ? GRAVITY * FALL_MULTIPLIER : GRAVITY;
    runner.velocityY += effectiveGravity;
    runner.y += runner.velocityY;
    
    if (runner.y >= GROUND_Y) {
      runner.y = GROUND_Y;
      runner.velocityY = 0;
      runner.isJumping = false;
    }

    // Draw runner
    drawRunner(ctx, runner, state.speed);

    // Spawn obstacles (with grace period at start)
    const timeSinceStart = Date.now() - gameStartTimeRef.current;
    const pastGracePeriod = timeSinceStart > GRACE_PERIOD_MS;
    const baseSpawnChance = 0.018;
    const speedBonus = (state.speed - INITIAL_SPEED) * 0.002;
    const spawnChance = baseSpawnChance + speedBonus;
    
    // Dynamic gap: wider at high speed to stay fair, with random variance
    const baseGap = 160;
    const speedGapBonus = (state.speed - INITIAL_SPEED) * 5;
    const randomVariance = Math.random() * 40; // 0-40px extra
    const minGap = baseGap + speedGapBonus + randomVariance;
    
    const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
    const canSpawn = obstaclesRef.current.length === 0 || (lastObstacle && lastObstacle.x < canvas.width - minGap);
    
    if (pastGracePeriod && Math.random() < spawnChance && canSpawn) {
      // Obstacle selection with variety (no repeats in last 2)
      const allTypes: ObstacleType[] = ['camera', 'tripod', 'computer', 'clapperboard'];
      const recentTypes = recentObstaclesRef.current;
      
      // Filter out types that appeared in last 2 spawns
      let availableTypes = allTypes.filter(t => !recentTypes.includes(t));
      if (availableTypes.length === 0) {
        // Fallback: just avoid immediate repeat
        availableTypes = allTypes.filter(t => t !== recentTypes[recentTypes.length - 1]);
      }
      
      const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      
      // Update recent history (keep last 2)
      recentObstaclesRef.current = [...recentTypes, type].slice(-2);
      
      // Hitbox dimensions by type (clapperboard hitbox slightly smaller for fairness)
      const dimensions: Record<ObstacleType, { width: number; height: number }> = {
        camera: { width: 35, height: 35 },
        tripod: { width: 30, height: 55 },
        computer: { width: 35, height: 45 },
        clapperboard: { width: 30, height: 36 },
      };
      
      obstaclesRef.current.push({
        x: canvas.width,
        y: GROUND_Y,
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
      return obstacle.x > -50;
    });

    // Collision detection
    for (const obstacle of obstaclesRef.current) {
      const runnerBox = {
        left: runner.x + 5,
        right: runner.x + runner.width - 5,
        top: runner.y - runner.height + 10,
        bottom: runner.y,
      };
      
      const obstacleBox = {
        left: obstacle.x,
        right: obstacle.x + obstacle.width,
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

    // Score by obstacles cleared (when obstacle passes behind player)
    let scoreToAdd = 0;
    let streakBonus = 0;
    for (const obstacle of obstaclesRef.current) {
      if (!obstacle.scored && obstacle.x + obstacle.width < runner.x) {
        obstacle.scored = true;
        scoreToAdd += 1;
      }
    }

    // Update speed (two-phase curve: gentle warmup, then normal ramp)
    const timeSec = timeSinceStart / 1000;
    let newSpeed: number;
    if (timeSec < WARMUP_DURATION) {
      // Phase 1: Gentle warmup - slow linear increase
      const warmupProgress = timeSec / WARMUP_DURATION;
      const warmupTarget = INITIAL_SPEED + 1.5; // Only gain 1.5 speed during warmup
      newSpeed = INITIAL_SPEED + (warmupTarget - INITIAL_SPEED) * warmupProgress;
    } else {
      // Phase 2: Normal exponential ramp from warmup end point
      const adjustedTime = timeSec - WARMUP_DURATION;
      const warmupEndSpeed = INITIAL_SPEED + 1.5;
      newSpeed = warmupEndSpeed + (MAX_SPEED - warmupEndSpeed) * (1 - Math.exp(-SPEED_CURVE_K * adjustedTime));
    }
    
    if (scoreToAdd > 0) {
      setGameState(prev => {
        const newStreak = prev.streak + scoreToAdd;
        // Bonus point every 5 clears
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
      setGameState(prev => ({
        ...prev,
        speed: newSpeed,
      }));
    }

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [drawRunner, drawObstacle, endGame]);

  // Start game loop when running
  useEffect(() => {
    if (gameState.isRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [gameState.isRunning, gameLoop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!gameStateRef.current.isRunning && !gameStateRef.current.isGameOver) {
          startGame();
        }
        jump();
      }
      if (e.key === 'r' || e.key === 'R') {
        startGame();
      }
      if (e.key === 'Escape') {
        closeWindow('runner');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, startGame, closeWindow]);

  // Touch controls for mobile
  const handleTouch = useCallback(() => {
    if (!gameState.isRunning && !gameState.isGameOver) {
      startGame();
    }
    jump();
  }, [gameState.isRunning, gameState.isGameOver, jump, startGame]);

  // Draw initial state
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#e2e8f0');
    gradient.addColorStop(1, '#cbd5e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 5);
    ctx.lineTo(canvas.width, GROUND_Y + 5);
    ctx.stroke();

    // Draw runner
    drawRunner(ctx, runnerRef.current, INITIAL_SPEED);
  }, [drawRunner]);

  return (
    <div className="h-full flex flex-col bg-[hsl(263,30%,8%)]">
      {/* Game Header - Dark game launcher style */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-purple-500/20 bg-[hsl(263,30%,10%)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🎮</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Runner</h1>
            <p className="text-xs text-purple-300/70">Avoid the obstacles</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-purple-300/50 uppercase tracking-wide">High Score</p>
            <p className="text-xl font-bold text-purple-400">{gameState.highScore}</p>
          </div>
        </div>
      </div>

      {/* Game Canvas Area */}
      <div className="flex-1 relative flex items-center justify-center p-6 bg-gradient-to-b from-[hsl(263,30%,8%)] to-[hsl(263,25%,6%)]">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={600}
            height={220}
            className="rounded-xl shadow-2xl border border-purple-500/20 max-w-full cursor-pointer"
            style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.15)' }}
            onClick={handleTouch}
            onTouchStart={handleTouch}
          />

          {/* Streak indicator */}
          {gameState.isRunning && gameState.streak >= 5 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold animate-pulse shadow-lg">
              🔥 STREAK x{gameState.streak}
            </div>
          )}

          {/* Start Screen */}
          {!gameState.isRunning && !gameState.isGameOver && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer rounded-xl"
              onClick={handleTouch}
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Ready?</h2>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:from-purple-500 hover:to-purple-600 transition-all">
                  Start Game
                </button>
                <p className="text-xs text-purple-300/60 mt-3">Space / Tap to jump</p>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState.isGameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over</h2>
                <p className="text-4xl font-bold text-white mb-1">{gameState.score}</p>
                <p className="text-sm text-purple-300/60 mb-4">
                  {gameState.score >= gameState.highScore ? '🎉 New High Score!' : `Best: ${gameState.highScore}`}
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:from-purple-500 hover:to-purple-600 transition-all"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="px-4 py-3 border-t border-purple-500/20 flex justify-between items-center bg-[hsl(263,30%,10%)]">
        <div className="text-sm text-purple-300/60">
          <kbd className="px-2 py-0.5 bg-purple-500/20 rounded text-xs mr-1">SPACE</kbd> Jump
          <span className="mx-2">•</span>
          <kbd className="px-2 py-0.5 bg-purple-500/20 rounded text-xs mr-1">R</kbd> Restart
        </div>
        <div className="text-sm">
          <span className="text-purple-300/50">Score: </span>
          <span className="font-bold text-white">{gameState.score}</span>
        </div>
      </div>
    </div>
  );
}
