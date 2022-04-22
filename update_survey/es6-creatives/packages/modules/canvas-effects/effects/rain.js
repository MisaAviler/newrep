export const Rain = (width, height) => {
  const SPEED_INCREMENT = 2;

  const random = (min, max) => {
    return min + Math.random() * (max - min + 1);
  };
  
  const render = (raindrop, ctx) => {
    const startpoint = { x: raindrop.x, y: raindrop.y };
    const endpoint = {
      x: raindrop.x + raindrop.speedX * raindrop.length,
      y: raindrop.y + raindrop.speedY * raindrop.length
    };
    const gradient = ctx.createLinearGradient(
      startpoint.x,
      startpoint.y,
      endpoint.x,
      endpoint.y
    );

    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, `rgba(255, 255, 255, ${raindrop.opacity})`);

    ctx.beginPath();
    ctx.moveTo(startpoint.x, startpoint.y);
    ctx.lineTo(endpoint.x, endpoint.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const update = (raindrop) => {
    raindrop.y += raindrop.speedY * SPEED_INCREMENT;

    if (raindrop.y > height) {
      raindrop.x = Math.random() * width;
      raindrop.y = -50;
    }
  };

  return {
    x: Math.random() * width, 
    y: Math.random() * height,
    width: random(1, 1),
    length: Math.random() * 4,
    opacity: random(0.1, 0.3),
    speedX: 0,
    speedY: random(7, 15),
    render,
    update
  }
}