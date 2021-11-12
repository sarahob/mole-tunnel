import React, { useRef, useEffect, useState } from "react";

enum DigStatus {
  EMPTY = 0,
  FULL = 1
};

interface GridSquare {
  x: number;
  y: number;
  digStatus: DigStatus;
  loot: () => any;
};

const Canvas = (props: any) => {

  const EMPTY = 0;
  const FULL = 1;

  const canvasRef = useRef(null);

  const initializeMap = () => {
    const map: any[] = [];
    for (let x = 0; x < 40; x++) {
      for (let y = 0; y < 40; y++) {
        map.push({
          x: x, y: y,
          digStatus: FULL,
          loot: () => { return; }
        })
      }
    }
    return map;
  }

  const [grid, setGrid] = useState<GridSquare[]>([]);

  useEffect(() => {
    setGrid(initializeMap());
  }, []);

  useEffect(() => {
    const drawMap = (context: any) => {
      for (const square of grid) {
        if (square.digStatus === FULL) {
          context.rect(square.x * 10, square.y * 10, 10, 10)
          context.fill();
          context.stroke();
        }
      }
    }

    const canvas: any = canvasRef.current;
    if (!canvas) {
      throw new Error('no canvas!');
    }
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.strokeStyle = "#202020"
    drawMap(context);
  }, [grid]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;