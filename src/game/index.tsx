import { useRef, useEffect, useState } from "react";
import { updatePosition } from "../helpers";
import { DigStatus, GridSquare } from "../models/GridSquare";


export const Game = (props: any) => {

const gameRef = useRef(null);
const [gameStarted, setGameStarted] = useState(false);
const [playerPos, setPlayerPos] = useState({x: 0, y: 0});
const playerPosRef = useRef({x:0, y:0});

const initializeMap = () => {
    const map: any[] = [];
    for (let x = 0; x < 40; x++) {
      for (let y = 0; y < 40; y++) {
        map.push({
          x: x * 10, 
          y: y * 10,
          digStatus: DigStatus.FULL,
          loot: () => { return; },
          style: {
              color: 'brown',
              height: 10,
              width: 10
          }
        })
      }
    }
    return map;
  }

  const [gridLayout, setGridLayout] = useState<GridSquare[]>([]);

  const handleUserInput = (event: KeyboardEvent) => {
    if(!gameStarted) {
        setGameStarted(true);
    }
    const updatedPos = updatePosition(event, playerPosRef.current);
    setPlayerPos(updatedPos);
    playerPosRef.current = updatedPos; 

  }

  const updateGridLayout = () => {
      const updatedGrid = gridLayout.map((square: GridSquare) => {
        if(square.x === playerPos.x && square.y === playerPos.y){
            return {...square, digStatus: DigStatus.EMPTY};
        }
        return square;
      });

      setGridLayout(updatedGrid);
  }

  useEffect(() => {
    setGridLayout(initializeMap());
    document.addEventListener('keydown', handleUserInput);
  },[]);

  useEffect(() => {
      if(gameStarted){
        updateGridLayout();
      }
  },[playerPos, gameStarted]);

  return <>
  <p>X: {playerPos.x}</p>
  <p>Y: {playerPos.y}</p>
  <svg ref={gameRef} {...props} height="400" width="400">
      <g className="tileMapLayer">
          {gridLayout.map((square: GridSquare, i: number) => {
              return <rect key={`square-${square.x}-${square.y}-${i}`} height={square.style.height} width={square.style.width} x={square.x} y={square.y} fill={square.digStatus === DigStatus.FULL ? square.style.color : '#000'} strokeWidth="1px" stroke="black"></rect>
          })}
      </g>
      <g className="playerLayer">
          <circle cx={playerPos.x + 5} cy={playerPos.y + 5} r="5" fill="yellow"></circle>
      </g>
  </svg>
  </>

};

