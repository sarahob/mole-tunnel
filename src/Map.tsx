import React, { useRef, useEffect, useState } from "react";

const Canvas = (props: any) => {

  const canvasRef = useRef(null);

  const [grid, setGrid] = useState([]);

  const drawMap = () => {

  }

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (!canvas) {
      throw new Error('no canvas!');
    }
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.strokeStyle = "#202020"
    context.delay = 0
    context.rect(0, 0, 10, 10)
    context.fill();
    context.stroke();
  }, [grid]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;