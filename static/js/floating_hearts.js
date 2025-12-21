// FLOATING HEARTS ANIMATION - SUPER VISUAL

class FloatingHearts {
    constructor(container) {
        this.container = container || document.body;
        this.hearts = [];
        this.colors = ['#ff6b6b', '#ff8e8e', '#ff5252', '#ff1744', '#f50057'];
        this.init();
    }
    
    init() {
        // Create heart container
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createHeart(x, y) {
        const heart = {
            x: x || Math.random() * this.canvas.width,
            y: y || this.canvas.height,
            size: Math.random() * 15 + 10,
            speed: Math.random() * 2 + 1,
            sway: Math.random() * 2 - 1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.05,
            scale: 1,
            alpha: 1
        };
        this.hearts.push(heart);
        return heart;
    }
    
    drawHeart(ctx, x, y, size, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(this.scale, this.scale);
        
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, size/3);
        
        // Left top curve
        ctx.bezierCurveTo(
            -size/2, size/3 - topCurveHeight,
            -size/2, -size/3,
            0, -size/3
        );
        
        // Right top curve
        ctx.bezierCurveTo(
            size/2, -size/3,
            size/2, size/3 - topCurveHeight,
            0, size/3
        );
        
        // Bottom triangle
        ctx.lineTo(0, size);
        ctx.lineTo(-size/2, size/2);
        ctx.closePath();
        
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.hearts.length - 1; i >= 0; i--) {
            const heart = this.hearts[i];
            
            // Update position
            heart.y -= heart.speed;
            heart.x += heart.sway * 0.5;
            heart.rotation += heart.rotationSpeed;
            
            // Fade out
            if (heart.y < -50) {
                heart.alpha -= 0.02;
            }
            
            // Draw heart with alpha
            this.ctx.globalAlpha = heart.alpha;
            this.drawHeart(this.ctx, heart.x, heart.y, heart.size, heart.rotation, heart.color);
            this.ctx.globalAlpha = 1;
            
            // Remove if completely faded
            if (heart.alpha <= 0) {
                this.hearts.splice(i, 1);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    burst(count = 20, x = null, y = null) {
        for (let i = 0; i < count; i++) {
            this.createHeart(
                x || Math.random() * this.canvas.width,
                y || this.canvas.height * 0.8
            );
        }
        
        if (!this.animationId) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// Global floating hearts system
window.floatingHearts = new FloatingHearts();

// Add to like buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.like-btn') || e.target.closest('.heart-btn')) {
        const rect = e.target.getBoundingClientRect();
        window.floatingHearts.burst(10, rect.left + rect.width/2, rect.top);
    }
});

// Auto-create hearts on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.floatingHearts.burst(5);
    }, 1000);
});
