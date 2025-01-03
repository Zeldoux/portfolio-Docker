import React, { useEffect, useRef } from 'react';
/**
 * Component: ParticleBackground
 * Creates an animated particle background with a dynamic gradient effect.
 * Features two waves of particles that move and interact with a pulsing gradient.
 */
const ParticleBackground = () => {
  // Reference to the canvas element
  const canvasRef = useRef(null);
  
  // References for animation parameters
  const pulseFactorRef = useRef(0.01); // Initial pulse factor for the background gradient
  const pulseVariationSpeed = 0.001; // Speed of pulse variation (for gradient animation)
  const waveAmplitude = 15; // Amplitude of the wave effect for particles
  const particleDensity = 300; // Number of particles in each wave
  const particlesWave1 = useRef([]); // First wave of particles
  const particlesWave2 = useRef([]); // Second wave of particles

  useEffect(() => {
    // Setup canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let animationFrameId; // For managing animation frames

    // Function to create particles with random properties
    const createParticles = () => 
      Array.from({ length: particleDensity }, (_, index) => ({
        x: (index / particleDensity) * canvas.width, // Evenly distributed across the width
        y: canvas.height / 2 + (Math.random() * 10 - 5), // Slight random vertical offset
        size: Math.random() * 2 + 1, // Random size between 1 and 3
        baseY: canvas.height / 2 + (Math.random() * 10 - 5), // Base vertical position
        color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`, // Random opacity
        speed: Math.random() * 0.5 + 0.5, // Horizontal speed
        waveOffset: Math.random() * 100, // Offset for wave motion
      }));

    // Initialize particles for both waves
    particlesWave1.current = createParticles();
    particlesWave2.current = createParticles();

    // Function to animate particles
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.fillStyle = createGradient(ctx, pulseFactorRef.current); // Set gradient background
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with gradient

      // Function to animate a single wave of particles
      const animateWave = (particles) => {
        particles.forEach((p, index) => {
          // Update particle position for wave motion
          p.y = p.baseY + Math.sin(Date.now() * 0.0005 + index * 0.05) * waveAmplitude;
          p.x += p.speed * 0.05; // Move horizontally
          if (p.x > canvas.width) p.x = 0; // Loop particle back to the left if it moves offscreen

          // Draw the particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        });
      };

      // Animate both waves
      animateWave(particlesWave1.current);
      animateWave(particlesWave2.current);

      // Update the pulse factor for the gradient animation
      pulseFactorRef.current = 0.06 + Math.sin(Date.now() * pulseVariationSpeed) * 0.03;
      animationFrameId = requestAnimationFrame(animateParticles); // Schedule next animation frame
    }

    // Start the animation
    animateParticles();

    // Handle window resizing to adjust canvas size and reinitialize particles
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesWave1.current = createParticles();
      particlesWave2.current = createParticles();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Canvas element styled to cover the entire background
    <canvas
      className="background-container"
      ref={canvasRef}
      style={{
        position: 'fixed', // Fixes the canvas to the viewport
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Places the canvas behind other elements
      }}
    />
  );
};

export default ParticleBackground;

// Function to create a dynamic gradient background
function createGradient(ctx, pulseFactor) {
  const gradient = ctx.createRadialGradient(
    ctx.canvas.width * 0.5, // Center X
    ctx.canvas.height * 0.5, // Center Y
    0, // Inner radius
    ctx.canvas.width * 0.5 + pulseFactor * 100, // Outer X position
    ctx.canvas.height * 0.5 + pulseFactor * 100, // Outer Y position
    ctx.canvas.width // Outer radius
  );

  // Gradient color stops
  gradient.addColorStop(0, `rgba(15, 15, 15, ${pulseFactor + 0.1})`);
  gradient.addColorStop(0.4, `rgba(50, 50, 50, ${pulseFactor + 0.4})`);
  gradient.addColorStop(0.7, `rgba(30, 30, 30, ${pulseFactor + 0.6})`);
  gradient.addColorStop(1, 'rgba(15, 15, 15, 0.9)');

  return gradient;
}
