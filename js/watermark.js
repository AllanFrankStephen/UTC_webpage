/**
 * Watermark Module - Unique Technologies & Consultancy
 * Creates visual watermarks to protect content
 */

(function () {
    'use strict';

    const isSecurePage = document.body.classList.contains('secure-page');

    if (!isSecurePage) {
        // Light watermark for SEO pages (already in HTML)
        return;
    }

    // Full watermark overlay for secure pages
    createWatermarkOverlay();

    function createWatermarkOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'watermark-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            overflow: hidden;
        `;

        // Create multiple watermark texts
        const watermarkText = 'UNIQUE TECHNOLOGIES';
        const rows = Math.ceil(window.innerHeight / 200);
        const cols = Math.ceil(window.innerWidth / 400);

        for (let i = 0; i < rows * cols; i++) {
            const text = document.createElement('span');
            text.textContent = watermarkText;
            text.style.cssText = `
                position: absolute;
                font-size: 24px;
                color: rgba(127, 255, 0, 0.04);
                white-space: nowrap;
                transform: rotate(-30deg);
                font-weight: bold;
                pointer-events: none;
                user-select: none;
            `;

            const row = Math.floor(i / cols);
            const col = i % cols;
            text.style.top = (row * 200 - 50) + 'px';
            text.style.left = (col * 400 - 100 + (row % 2) * 200) + 'px';

            overlay.appendChild(text);
        }

        document.body.appendChild(overlay);

        // Update on resize
        window.addEventListener('resize', function () {
            overlay.remove();
            createWatermarkOverlay();
        });
    }

})();
