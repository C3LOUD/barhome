import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

import baseRender from '../../utils/base-render';

export default function ImageCropper({ onCanvas, src }) {
  const canvas = useRef();
  const [isEditing, setIsEditing] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, moveX: 0, moveY: 0 });
  const [initialize, setInitialize] = useState({ init: false });

  const startEditingHandler = (e) => {
    const { x, y, right, bottom } = canvas.current.getBoundingClientRect();
    const [clientX, clientY] =
      e.type === 'mousedown'
        ? [e.clientX, e.clientY]
        : [e.changedTouches[0].clientX, e.changedTouches[0].clientY];

    const { moveX, moveY } = mousePos;
    const relativeX = ((clientX - x) * initialize.canvasSize) / (right - x);
    const relativeY = ((clientY - y) * initialize.canvasSize) / (bottom - y);

    const leftCheck = Math.abs(initialize.initialCanvasX + moveX - relativeX);
    const rightCheck = Math.abs(
      initialize.initialCanvasX + initialize.resizeRectSize + moveX - relativeX,
    );
    const topCheck = Math.abs(initialize.initialCanvasY + moveY - relativeY);
    const bottomCheck = Math.abs(
      initialize.initialCanvasY + initialize.resizeRectSize + moveY - relativeY,
    );

    if (topCheck <= 30 && leftCheck <= 30) setIsEditing('lt');
    else if (topCheck <= 30 && rightCheck <= 30) setIsEditing('rt');
    else if (bottomCheck <= 30 && leftCheck <= 30) setIsEditing('lb');
    else if (bottomCheck <= 30 && rightCheck <= 30) setIsEditing('rb');
    else {
      const checkX =
        initialize.initialCanvasX + moveX <= relativeX &&
        relativeX <=
          initialize.initialCanvasX + initialize.resizeRectSize + moveX;
      const checkY =
        initialize.initialCanvasY + moveY <= relativeY &&
        relativeY <=
          initialize.initialCanvasY + initialize.resizeRectSize + moveY;

      if (!checkX && initialize.init) return;
      if (!checkY && initialize.init) return;
      setIsEditing('moving');
    }

    setMousePos((prev) => ({
      x: clientX,
      y: clientY,
      moveX: prev.moveX || 0,
      moveY: prev.moveY || 0,
    }));
  };

  const finishEditingHandler = () => {
    setIsEditing('');
  };

  const editHandler = (e) => {
    if (!isEditing) return;
    const [clientX, clientY] =
      e.type === 'mousemove'
        ? [e.clientX, e.clientY]
        : [e.changedTouches[0].clientX, e.changedTouches[0].clientY];

    if (clientX === mousePos.x && clientY === mousePos.y) return;

    const boundaryCheckX = (moveX) =>
      initialize.initialCanvasX + moveX < 0 ||
      initialize.initialCanvasX + moveX + initialize.resizeRectSize >
        initialize.canvasSize;

    const boundaryCheckY = (moveY) =>
      initialize.initialCanvasY + moveY < 0 ||
      initialize.initialCanvasY + moveY + initialize.resizeRectSize >
        initialize.canvasSize;

    if (isEditing === 'moving') {
      setMousePos((prev) => {
        const moveX = boundaryCheckX(clientX - prev.x + prev.moveX)
          ? prev.moveX
          : clientX - prev.x + prev.moveX;
        const moveY = boundaryCheckY(clientY - prev.y + prev.moveY)
          ? prev.moveY
          : clientY - prev.y + prev.moveY;
        return { x: clientX, y: clientY, moveX, moveY };
      });
    } else {
      setMousePos((prev) => {
        const [lr, tb] = isEditing.split('');
        const deltaX = lr === 'l' ? clientX - prev.x : prev.x - clientX;
        const deltaY = tb === 't' ? clientY - prev.y : prev.y - clientY;

        if (Math.abs(deltaX) - Math.abs(deltaY) > 0) {
          const moveX = prev.moveX + deltaY;
          const moveY = prev.moveY + deltaY;
          setInitialize((p) => ({
            ...p,
            resizeRectSize: p.resizeRectSize - deltaY,
          }));
          return {
            x: prev.x - deltaY,
            y: clientY,
            moveX: lr === 'l' ? moveX : prev.moveX,
            moveY: tb === 't' ? moveY : prev.moveY,
          };
        }
        const moveX = prev.moveX + deltaX;
        const moveY = prev.moveY + deltaX;
        setInitialize((p) => ({
          ...p,
          resizeRectSize: p.resizeRectSize - deltaX,
        }));
        return {
          x: clientX,
          y: prev.y - deltaX,
          moveX: lr === 'l' ? moveX : prev.moveX,
          moveY: tb === 't' ? moveY : prev.moveY,
        };
      });
    }
  };

  useEffect(() => {
    const img = new Image();
    const ctx = canvas.current.getContext('2d');
    img.onload = () => {
      const { moveX, moveY } = mousePos;
      const {
        rectSize,
        initialX,
        initialY,
        resizeRectSize,
        initialCanvasX,
        initialCanvasY,
      } = baseRender(img, ctx);

      if (!initialize.init) {
        setInitialize({
          init: true,
          canvasSize: ctx.canvas.width,
          initialCanvasX,
          initialCanvasY,
          resizeRectSize,
        });
      }

      //* target area
      const scale = rectSize / resizeRectSize;
      const imageRectScale =
        (initialize.resizeRectSize - resizeRectSize) * scale || 0;

      ctx.drawImage(
        img,
        initialX + moveX * scale,
        initialY + moveY * scale,
        rectSize + imageRectScale,
        rectSize + imageRectScale,
        initialCanvasX + moveX,
        initialCanvasY + moveY,
        initialize.resizeRectSize || resizeRectSize,
        initialize.resizeRectSize || resizeRectSize,
      );

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 5;
      ctx.strokeRect(
        initialCanvasX + moveX,
        initialCanvasY + moveY,
        initialize.resizeRectSize || resizeRectSize,
        initialize.resizeRectSize || resizeRectSize,
      );

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.canvas.width = 600;
      tempCtx.canvas.height = 600;
      tempCtx.fillStyle = 'rgba(102, 91, 121, 0.5)';
      tempCtx.fillRect(0, 0, tempCtx.canvas.width, tempCtx.canvas.height);
      tempCtx.drawImage(
        img,
        initialX + moveX * scale,
        initialY + moveY * scale,
        rectSize + imageRectScale,
        rectSize + imageRectScale,
        0,
        0,
        tempCtx.canvas.width,
        tempCtx.canvas.height,
      );
      const tempImg = tempCanvas.toDataURL('image/png');
      onCanvas(tempImg);
    };
    img.src = src;
  }, [mousePos]);

  return (
    <div className="my-auto aspect-square min-h-0 min-w-0 px-4">
      <canvas
        className={twMerge(
          'h-full w-full',
          !isEditing
            ? 'cursor-pointer'
            : isEditing === 'moving'
            ? 'cursor-all-scroll'
            : ['lt', 'rb'].some((text) => text === isEditing)
            ? 'cursor-nwse-resize'
            : 'cursor-nesw-resize',
        )}
        width="1200px"
        height="1200px"
        ref={canvas}
        onMouseDown={startEditingHandler}
        onMouseUp={finishEditingHandler}
        onMouseMove={editHandler}
        onTouchStart={startEditingHandler}
        onTouchEnd={finishEditingHandler}
        onTouchMove={editHandler}
      />
    </div>
  );
}

ImageCropper.propTypes = {
  onCanvas: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
