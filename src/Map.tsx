import React, { useRef, useEffect, useState } from "react";
import { updatePosition } from "./handleUserInput";

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

  const [playerPos, setPlayerPos] = useState({x: 0, y: 0});
  const playerPosRef = useRef({x:0, y:0});

  const [grid, setGrid] = useState<GridSquare[]>([]);

  useEffect(() => {
    setGrid(initializeMap());
    // // listen for user input
    document.addEventListener('keydown', handleUserInput);
  }, []);

  const handleUserInput = (event: KeyboardEvent) => {
    console.log('handle user input', playerPos);
    const updatedPos = updatePosition(event, playerPosRef.current);
    setPlayerPos(updatedPos);
    playerPosRef.current = updatedPos; 
  }

  const drawPlayer = (context: any, centerX: number, centerY: number) => {
    const radius = 5;
    context.fillStyle = '#7B3F00';
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
  }


  useEffect(() => {
    const drawMap = (context: any) => {
      context.lineWidth = 1;
      for (const square of grid) {
        if (square.digStatus === FULL) {
          context.rect(square.x * 10, square.y * 10, 10, 10)
          context.fill();
          context.stroke();
        }
      }
    }

    console.log('render');
    const canvas: any = canvasRef.current;
    if (!canvas) {
      throw new Error('no canvas!');
    }
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.strokeStyle = "#202020"
    drawMap(context);
    drawPlayer(context, 55, 55);
  }, [grid]);
 

  useEffect(() => {
    console.log('render after position update', playerPos);
    const canvas: any = canvasRef.current;
    if (!canvas) {
      throw new Error('no canvas!');
    }
    const context = canvas.getContext("2d");
    drawPlayer(context, playerPos.x, playerPos.y);


    
  }, [playerPos]);

  return <>
  <p>X: {playerPos.x}</p>
  <p>Y: {playerPos.y}</p>
  <canvas ref={canvasRef} {...props}></canvas>
  </>

};

export default Canvas;