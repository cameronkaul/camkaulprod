import { useEffect, useRef, useState, useCallback } from 'react';
import { useWindows } from '@/contexts/WindowContext';

interface GameState {
  isRunning: boolean;
  isGameOver: boolean;
  score: number;
  highScore: number;
  speed: number;
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
  type: 'camera' | 'tripod' | 'computer';
}

const GRAVITY = 0.8;
const JUMP_FORCE = -14;
const GROUND_Y = 180;
const INITIAL_SPEED = 5;
const SPEED_INCREMENT = 0.001;
const MAX_SPEED = 15;

export function RunnerWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const runnerRef = useRef<Runner>({
    x: 60,
    y: GROUND_Y,
    width: 30,
    height: 50,
    velocityY: 0,
    isJumping: false,
  });
  const { closeWindow } = useWindows();
  
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    isGameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('runnerHighScore') || '0', 10),
    speed: INITIAL_SPEED,
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
    setGameState(prev => ({
      ...prev,
      isRunning: true,
      isGameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
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

  // Draw runner (stylized character with backpack)
  const drawRunner = useCallback((ctx: CanvasRenderingContext2D, runner: Runner) => {
    ctx.save();
    
    // Body
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(runner.x + 5, runner.y - 35, 20, 30);
    
    // Backpack
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(runner.x + 20, runner.y - 30, 10, 20);
    ctx.fillStyle = '#718096';
    ctx.fillRect(runner.x + 22, runner.y - 28, 6, 8);
    
    // Head
    ctx.fillStyle = '#f6e05e';
    ctx.beginPath();
    ctx.arc(runner.x + 15, runner.y - 42, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Legs (animated based on movement)
    const legOffset = Math.sin(Date.now() / 80) * 5;
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(runner.x + 7, runner.y - 5, 6, 10);
    ctx.fillRect(runner.x + 17, runner.y - 5, 6, 10);
    
    // Arms
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(runner.x + 5, runner.y - 25);
    ctx.lineTo(runner.x - 2, runner.y - 15 + legOffset);
    ctx.stroke();
    
    ctx.restore();
  }, []);

  // Draw obstacle (camera, tripod, or computer)
  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    ctx.fillStyle = '#e53e3e';
    
    switch (obstacle.type) {
      case 'camera':
        // Camera body
        ctx.fillStyle = '#1a202c';
        ctx.fillRect(obstacle.x, obstacle.y - 25, 30, 20);
        // Lens
        ctx.beginPath();
        ctx.arc(obstacle.x + 35, obstacle.y - 15, 8, 0, Math.PI * 2);
        ctx.fill();
        // Flash
        ctx.fillStyle = '#f6e05e';
        ctx.fillRect(obstacle.x + 8, obstacle.y - 32, 10, 7);
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
    runner.velocityY += GRAVITY;
    runner.y += runner.velocityY;
    
    if (runner.y >= GROUND_Y) {
      runner.y = GROUND_Y;
      runner.velocityY = 0;
      runner.isJumping = false;
    }

    // Draw runner
    drawRunner(ctx, runner);

    // Spawn obstacles
    const spawnChance = 0.015 + (state.speed - INITIAL_SPEED) * 0.001;
    if (Math.random() < spawnChance && (obstaclesRef.current.length === 0 || 
        obstaclesRef.current[obstaclesRef.current.length - 1].x < canvas.width - 200)) {
      const types: ('camera' | 'tripod' | 'computer')[] = ['camera', 'tripod', 'computer'];
      const type = types[Math.floor(Math.random() * types.length)];
      obstaclesRef.current.push({
        x: canvas.width,
        y: GROUND_Y,
        width: type === 'tripod' ? 30 : 35,
        height: type === 'tripod' ? 55 : type === 'camera' ? 35 : 45,
        type,
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

    // Update score and speed
    setGameState(prev => ({
      ...prev,
      score: prev.score + 1,
      speed: Math.min(prev.speed + SPEED_INCREMENT, MAX_SPEED),
    }));

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
    drawRunner(ctx, runnerRef.current);
  }, [drawRunner]);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-100 to-slate-200">
      {/* Instructions */}
      <div className="px-4 py-2 text-center text-sm text-muted-foreground border-b border-border/30">
        <span className="font-medium">How to play:</span> Space or ↑ to jump • R to restart • ESC to close
      </div>

      {/* Game Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={220}
          className="rounded-lg shadow-inner border border-border/30 bg-slate-100 max-w-full cursor-pointer"
          onClick={handleTouch}
          onTouchStart={handleTouch}
        />

        {/* Start Screen */}
        {!gameState.isRunning && !gameState.isGameOver && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm cursor-pointer m-4"
            onClick={handleTouch}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Runner</h2>
              <p className="text-muted-foreground mb-4">Avoid the obstacles!</p>
              <p className="text-sm text-muted-foreground">Press Space or Tap to Start</p>
              {gameState.highScore > 0 && (
                <p className="mt-2 text-sm text-primary">High Score: {gameState.highScore}</p>
              )}
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState.isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm m-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-destructive mb-2">Game Over</h2>
              <p className="text-xl mb-1">Score: {gameState.score}</p>
              <p className="text-lg text-muted-foreground mb-4">High Score: {gameState.highScore}</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Play Again
              </button>
              <p className="text-xs text-muted-foreground mt-3">Press R to restart</p>
            </div>
          </div>
        )}
      </div>

      {/* Score Display */}
      <div className="px-4 py-3 border-t border-border/30 flex justify-between items-center bg-muted/30">
        <div className="text-sm">
          <span className="text-muted-foreground">Score: </span>
          <span className="font-bold">{gameState.score}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">High Score: </span>
          <span className="font-bold text-primary">{gameState.highScore}</span>
        </div>
      </div>
    </div>
  );
}
