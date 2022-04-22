export const Snow = (width, height) => {
  const SPEED_INCREMENT = 0.5;
  
  const random = (min, max) => {
    return min + Math.random() * (max - min + 1);
  };
  
  const render = (snowflake, ctx) => {
    const gradient = ctx.createRadialGradient(
      snowflake.x,
      snowflake.y,
      0,
      snowflake.x,
      snowflake.y,
      snowflake.radius
    );

    gradient.addColorStop(0, `rgba(255, 255, 255, ${snowflake.opacity})`);
    gradient.addColorStop(.8, `rgba(210, 236, 242, ${snowflake.opacity})`);
    gradient.addColorStop(1, `rgba(237, 247, 249, ${snowflake.opacity})`);

    ctx.beginPath();
    ctx.arc(
      snowflake.x,
      snowflake.y,
      snowflake.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = gradient;
    ctx.fill();
  };
  
  const update = (snowflake) => {
    snowflake.x += snowflake.speedX * SPEED_INCREMENT;
    snowflake.y += snowflake.speedY * SPEED_INCREMENT;
  
    if (snowflake.y > height) {
      snowflake.x = Math.random() * width * 1.5;
      snowflake.y = -20;
    }
  };

  return {
      x: Math.random() * width,
      y: Math.random() * height,
      opacity: Math.random(),
      speedX: random(-11, 11),
      speedY: random(7, 15),
      radius: random(0.5, 4.2),
      render,
      update
    }
}
