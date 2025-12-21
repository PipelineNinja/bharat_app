// TYPEWRITER EFFECT FOR HERO TEXT

class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typingSpeed: 100,
            deletingSpeed: 50,
            delayBetweenTexts: 2000,
            loop: true,
            cursor: '|',
            ...options
        };
        
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        // Add cursor to element
        this.cursorSpan = document.createElement('span');
        this.cursorSpan.className = 'typewriter-cursor';
        this.cursorSpan.textContent = this.options.cursor;
        this.cursorSpan.style.cssText = `
            animation: blink 1s infinite;
            color: #667eea;
            font-weight: bold;
        `;
        
        this.element.appendChild(this.cursorSpan);
        
        // Add blink animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        this.type();
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentText = this.texts[this.currentTextIndex];
        
        if (!this.isDeleting) {
            // Typing
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.options.delayBetweenTexts);
                return;
            }
        } else {
            // Deleting
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            }
        }
        
        const speed = this.isDeleting ? this.options.deletingSpeed : this.options.typingSpeed;
        setTimeout(() => this.type(), speed);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
        this.type();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const heroText = document.getElementById('heroText');
    if (heroText) {
        const texts = [
            'Connect with Friends',
            'Share Your Story',
            'Discover Communities',
            'Join Bharat Today!'
        ];
        
        new Typewriter(heroText, texts, {
            typingSpeed: 100,
            deletingSpeed: 50,
            delayBetweenTexts: 1500
        });
    }
    
    // Also add to any element with data-typewriter attribute
    document.querySelectorAll('[data-typewriter]').forEach(el => {
        const texts = JSON.parse(el.dataset.typewriter);
        new Typewriter(el, texts);
    });
});
