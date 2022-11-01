export default (img, ctx) => {
  const portraitRatio = img.width / img.height;
  const landscapeRatio = img.height / img.width;
  const isLandscape = img.width > img.height;
  const canvasX = isLandscape
    ? ctx.canvas.width
    : ctx.canvas.height * portraitRatio;
  const canvasY = isLandscape
    ? ctx.canvas.width * landscapeRatio
    : ctx.canvas.height;

  //* add background
  const rectDense = 50;
  const rect = ctx.canvas.width / rectDense;
  for (let i = 0; i < rectDense; i++) {
    for (let j = 0; j < rectDense; j++) {
      ctx.fillStyle = (i + j) % 2 === 0 ? '#5a5b5e' : '#b8b9ba';
      ctx.fillRect(rect * j, rect * i, rect, rect);
    }
  }

  const offSetX = (ctx.canvas.width - canvasX) / 2;
  const offSetY = (ctx.canvas.height - canvasY) / 2;

  //* add image
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    offSetX,
    offSetY,
    canvasX,
    canvasY
  );

  //* dimmiing modal
  ctx.fillStyle = 'rgba(19, 21, 25, 0.7)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //* initialize
  const rectSize = Math.min(img.width, img.height);
  const initialX = isLandscape ? (img.width - img.height) / 2 : 0;
  const initialY = isLandscape ? 0 : (img.height - img.width) / 2;

  const resizeRectSize = Math.min(canvasX, canvasY);
  const initialCanvasX = isLandscape ? (canvasX - resizeRectSize) / 2 : offSetX;
  const initialCanvasY = isLandscape ? offSetY : (canvasY - resizeRectSize) / 2;

  return {
    rectSize,
    initialX,
    initialY,
    resizeRectSize,
    initialCanvasX,
    initialCanvasY,
  };
};
