// INSANE PARTICLE NETWORK ANIMATION
class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0, radius: 100 };
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = 0;
            this.mouse.y = 0;
        });
        
        this.createParticles();
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.particles = [];
        this.createParticles();
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        
        const colors = [
            '#667eea', '#764ba2', '#f093fb', '#f5576c',
            '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
        ];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                },
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.velocity.x *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.velocity.y *= -1;
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                
                particle.velocity.x -= Math.cos(angle) * force * 0.1;
                particle.velocity.y -= Math.sin(angle) * force * 0.1;
                
                // Draw connection to mouse
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = particle.color;
                this.ctx.globalAlpha = 0.1 * (1 - distance/this.mouse.radius);
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
                this.ctx.globalAlpha = 1;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            // Create gradient fill
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Draw connections between particles
            this.particles.forEach(other => {
                if (particle === other) return;
                
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    
                    // Gradient line
                    const lineGradient = this.ctx.createLinearGradient(
                        particle.x, particle.y,
                        other.x, other.y
                    );
                    lineGradient.addColorStop(0, particle.color);
                    lineGradient.addColorStop(1, other.color);
                    
                    this.ctx.strokeStyle = lineGradient;
                    this.ctx.globalAlpha = 0.1 * (1 - distance/150);
                    this.ctx.lineWidth = 0.3;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    new ParticleNetwork('particleCanvas');
    
    // Create starry night
    createStarryNight();
});

function createStarryNight() {
    const containers = document.querySelectorAll('.starry-night');
    
    containers.forEach(container => {
        const starCount = Math.floor((container.offsetWidth * container.offsetHeight) / 1000);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            
            star.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            container.appendChild(star);
        }
    });
}

// 3D Card flip interaction
document.querySelectorAll('.card-3d-flip').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});
