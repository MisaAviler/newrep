export const ParticleSystem = ({canvasContext, canvasWidth, canvasHeight}) => {
  const particles = [];
  const MAXIMUM_PARTICLES = 350;

  const add = (Particle, amountParticles) => {
    for (let i = 0; i < amountParticles; i++) {
      if (particles.length === MAXIMUM_PARTICLES) {
        return;
      }
      
      const currentParticle = new Particle(canvasWidth, canvasHeight);
      particles.push(currentParticle);
    }
  }

  const refresh = () => { 
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach(particle => {
      particle.render(particle, canvasContext);
      particle.update(particle);
    });

    window.requestAnimationFrame(refresh);
  };

  return { add, refresh };
};

