import React, { useEffect, useRef, useState } from 'react';

import baseRender from '../../utils/base-render';

const ImageCropper = (props) => {
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
      initialize.initialCanvasX + initialize.resizeRectSize + moveX - relativeX
    );
    const topCheck = Math.abs(initialize.initialCanvasY + moveY - relativeY);
    const bottomCheck = Math.abs(
      initialize.initialCanvasY + initialize.resizeRectSize + moveY - relativeY
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

    setMousePos((prev) => {
      return {
        x: clientX,
        y: clientY,
        moveX: prev.moveX || 0,
        moveY: prev.moveY || 0,
      };
    });
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

    if (isEditing === 'moving') {
      setMousePos((prev) => {
        const moveX = clientX - prev.x + prev.moveX;
        const moveY = clientY - prev.y + prev.moveY;
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
          setInitialize((prev) => {
            return {
              ...prev,
              resizeRectSize: prev.resizeRectSize - deltaY,
            };
          });
          return {
            x: prev.x - deltaY,
            y: clientY,
            moveX: lr === 'l' ? moveX : prev.moveX,
            moveY: tb === 't' ? moveY : prev.moveY,
          };
        } else {
          const moveX = prev.moveX + deltaX;
          const moveY = prev.moveY + deltaX;
          setInitialize((prev) => {
            return {
              ...prev,
              resizeRectSize: prev.resizeRectSize - deltaX,
            };
          });
          return {
            x: clientX,
            y: prev.y - deltaX,
            moveX: lr === 'l' ? moveX : prev.moveX,
            moveY: tb === 't' ? moveY : prev.moveY,
          };
        }
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
        initialize.resizeRectSize || resizeRectSize
      );

      ctx.strokeStyle = 'purple';
      ctx.lineWidth = 5;
      ctx.strokeRect(
        initialCanvasX + moveX,
        initialCanvasY + moveY,
        initialize.resizeRectSize || resizeRectSize,
        initialize.resizeRectSize || resizeRectSize
      );
    };
    img.src = props.src;
  }, [mousePos]);

  const cursorStyle = !isEditing
    ? 'cursor-pointer'
    : isEditing === 'moving'
    ? 'cursor-all-scroll'
    : ['lt', 'rb'].some((text) => text === isEditing)
    ? 'cursor-nwse-resize'
    : 'cursor-nesw-resize';

  return (
    <canvas
      className={`min-h-0 min-w-0 ${cursorStyle}`}
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
  );
};

export default ImageCropper;
