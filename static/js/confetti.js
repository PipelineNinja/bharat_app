// CONFETTI EFFECT - PERFECT FOR CELEBRATIONS

class Confetti {
    constructor(options = {}) {
        this.options = {
            particleCount: 150,
            spread: 70,
            startVelocity: 30,
            decay: 0.9,
            gravity: 1,
            drift: 0,
            ticks: 200,
            colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'],
            shapes: ['circle', 'square'],
            scalar: 1,
            ...options
        };
        
        this.particles = [];
        this.animationId = null;
        this.canvas = null;
        this.ctx = null;
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles(x, y) {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: x || this.canvas.width / 2,
                y: y || this.canvas.height / 2,
                velocity: {
                    x: (Math.random() - 0.5) * this.options.startVelocity,
                    y: (Math.random() - 0.5) * this.options.startVelocity - 5
                },
                color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)],
                shape: this.options.shapes[Math.floor(Math.random() * this.options.shapes.length)],
                size: Math.random() * 10 + 5,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                life: this.options.ticks
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);
        
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.life / this.options.ticks;
        
        if (particle.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        }
        
        this.ctx.restore();
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update physics
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            particle.velocity.y += this.options.gravity;
            particle.velocity.x *= this.options.decay;
            particle.velocity.y *= this.options.decay;
            particle.velocity.x += this.options.drift;
            
            particle.rotation += particle.rotationSpeed;
            particle.life--;
            
            // Remove dead particles
            if (particle.life <= 0 || 
                particle.y > this.canvas.height + 100 ||
                particle.x < -100 || 
                particle.x > this.canvas.width + 100) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        
        // Draw all particles
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Continue animation if particles remain
        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.stop();
        }
    }
    
    shoot(x, y) {
        if (!this.canvas) {
            this.createCanvas();
        }
        
        this.createParticles(x, y);
        
        if (!this.animationId) {
            this.animate();
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
            this.ctx = null;
        }
        
        this.particles = [];
    }
    
    // Fireworks effect
    fireworks(count = 3) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.3;
                this.shoot(x, y);
            }, i * 300);
        }
    }
}

// Global confetti instance
window.confetti = new Confetti();

// Auto-trigger on page load for demo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.confetti.shoot();
    }, 1000);
});

// Add confetti to buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.confetti-btn')) {
        const rect = e.target.getBoundingClientRect();
        window.confetti.shoot(rect.left + rect.width/2, rect.top);
    }
    
    if (e.target.closest('.fireworks-btn')) {
        window.confetti.fireworks(5);
    }
});
