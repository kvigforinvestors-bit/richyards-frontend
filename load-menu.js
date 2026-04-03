<style>
    /* Ensure menu button is visible on all pages */
    .menu-trigger {
        position: fixed !important;
        top: 15px !important;
        left: 20px !important;
        width: 45px !important;
        height: 45px !important;
        background: transparent !important;
        border: none !important;
        cursor: pointer !important;
        z-index: 10000 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 10px !important;
    }
    .menu-trigger span {
        display: block !important;
        width: 25px !important;
        height: 3px !important;
        background: #ffffff !important;
        border-radius: 3px !important;
        transition: all 0.3s ease !important;
    }
    .menu-trigger.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px) !important;
    }
    .menu-trigger.active span:nth-child(2) {
        opacity: 0 !important;
    }
    .menu-trigger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px) !important;
    }
</style>
(function() {
    // Only load if not already loaded
    if (document.getElementById('hamburger-menu-loaded')) return;
    
    const menuURL = window.location.origin + '/hamburger-menu.html';
    
    fetch(menuURL)
        .then(response => response.text())
        .then(html => {
            const menuContainer = document.createElement('div');
            menuContainer.id = 'hamburger-menu-loaded';
            menuContainer.innerHTML = html;
            document.body.insertBefore(menuContainer, document.body.firstChild);
            
            // Re-initialize scripts in the loaded content
            const scripts = menuContainer.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            });
        })
        .catch(err => console.log('Menu not loaded:', err));
})();
