/**
 * Security Module - Unique Technologies & Consultancy
 * Full security features for protected pages (NOT homepage)
 * 
 * Features:
 * - Disable right-click context menu
 * - Block text selection
 * - Block keyboard shortcuts (Ctrl+C, Ctrl+V, Ctrl+P, Ctrl+S)
 * - DevTools detection and blocking
 * - Console clearing
 */

(function () {
    'use strict';

    // Check if this is a secure page (not homepage)
    const isSecurePage = document.body.classList.contains('secure-page');

    if (!isSecurePage) {
        console.log('🔓 SEO Mode: Security features disabled for crawler accessibility');
        return;
    }

    console.log('🔒 Secure Mode: Content protection active');

    // ============ DISABLE RIGHT-CLICK ============
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        showSecurityNotification('Right-click is disabled on this page');
        return false;
    });

    // ============ DISABLE TEXT SELECTION ============
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('mousedown', function (e) {
        if (e.detail > 1) {
            e.preventDefault(); // Prevent double-click selection
        }
    });

    // ============ BLOCK KEYBOARD SHORTCUTS ============
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + C (Copy)
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            showSecurityNotification('Copy is disabled on this page');
            return false;
        }

        // Ctrl/Cmd + V (Paste)
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + P (Print)
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            showSecurityNotification('Printing is disabled on this page');
            return false;
        }

        // Ctrl/Cmd + S (Save)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showSecurityNotification('Save is disabled on this page');
            return false;
        }

        // Ctrl/Cmd + U (View Source)
        if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + Shift + I (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + Shift + J (Console)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }

        // F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });

    // ============ DEVTOOLS DETECTION ============
    let devtoolsOpen = false;

    // Method 1: Window size detection
    function checkDevTools() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                onDevToolsOpen();
            }
        } else {
            devtoolsOpen = false;
        }
    }

    // Method 2: Console log detection
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                onDevToolsOpen();
            }
        }
    });

    function onDevToolsOpen() {
        showSecurityNotification('Developer tools detected - Content protected');
        // Add extra watermark when devtools open
        addExtraWatermark();
    }

    // Check periodically
    setInterval(checkDevTools, 1000);

    // ============ DISABLE DRAG ============
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // ============ SECURITY NOTIFICATION ============
    function showSecurityNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.security-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'security-notification';
        notification.innerHTML = `
            <span style="margin-right: 10px;">🔒</span>
            ${message}
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(127, 255, 0, 0.15);
            border: 1px solid rgba(127, 255, 0, 0.5);
            color: #7FFF00;
            padding: 15px 30px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 99999;
            backdrop-filter: blur(10px);
            animation: slideUp 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
    `;
    document.head.appendChild(style);

    // ============ EXTRA WATERMARK FOR DEVTOOLS ============
    function addExtraWatermark() {
        if (document.querySelector('.extra-watermark')) return;

        const watermark = document.createElement('div');
        watermark.className = 'extra-watermark';
        watermark.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 99998;
            background: repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 50px,
                rgba(127, 255, 0, 0.03) 50px,
                rgba(127, 255, 0, 0.03) 100px
            );
        `;
        document.body.appendChild(watermark);
    }

    // ============ DISABLE PRINT ============
    window.addEventListener('beforeprint', function (e) {
        document.body.style.display = 'none';
    });

    window.addEventListener('afterprint', function (e) {
        document.body.style.display = '';
    });

    // Also intercept via CSS media query
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            body * {
                display: none !important;
            }
            body::before {
                content: 'Printing is disabled for this content.';
                display: block !important;
                text-align: center;
                padding: 50px;
                font-size: 24px;
            }
        }
    `;
    document.head.appendChild(printStyle);

})();
