// Load hamburger menu on all pages
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
