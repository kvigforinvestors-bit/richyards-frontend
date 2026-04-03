// Load hamburger menu on all pages
(function() {
    // Check if menu already loaded
    if (document.getElementById('hamburger-menu-loaded')) {
        return;
    }
    
    // Function to create and show menu button
    function loadMenu() {
        // Create menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'hamburger-menu-loaded';
        
        // Menu HTML structure
        menuContainer.innerHTML = `
            <style>
                /* Menu Button (Three White Lines) */
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
                
                /* Overlay */
                .menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10001;
                    display: none;
                }
                .menu-overlay.active {
                    display: block;
                }
                
                /* Menu Panel */
                .menu-panel {
                    position: fixed;
                    top: 0;
                    left: -100%;
                    width: 85%;
                    max-width: 350px;
                    height: 100%;
                    background: linear-gradient(135deg, #0b5d1e 0%, #094a18 100%);
                    z-index: 10002;
                    transition: left 0.3s ease;
                    padding: 80px 25px 30px;
                    overflow-y: auto;
                }
                .menu-panel.open {
                    left: 0;
                }
                
                .menu-logo {
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #c9a227;
                }
                .menu-logo h2 {
                    color: #c9a227;
                    font-family: 'Playfair Display', serif;
                    font-size: 24px;
                }
                .menu-nav {
                    list-style: none;
                    margin-bottom: 30px;
                }
                .menu-nav li {
                    margin-bottom: 5px;
                }
                .menu-nav a {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 14px 18px;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 12px;
                    transition: 0.3s;
                }
                .menu-nav a:hover, .menu-nav a:active {
                    background: #c9a227;
                    color: #0a0a0a;
                }
                .menu-nav a i {
                    width: 22px;
                    height: 22px;
                }
                .menu-search {
                    margin-bottom: 30px;
                }
                .menu-search h4 {
                    color: #c9a227;
                    font-size: 14px;
                    margin-bottom: 12px;
                }
                .search-box {
                    display: flex;
                    background: rgba(255,255,255,0.1);
                    border-radius: 30px;
                    overflow: hidden;
                }
                .search-box input {
                    flex: 1;
                    padding: 12px 15px;
                    background: transparent;
                    border: none;
                    color: #fff;
                    outline: none;
                }
                .search-box button {
                    padding: 12px 15px;
                    background: #c9a227;
                    border: none;
                    cursor: pointer;
                }
                .search-results {
                    margin-top: 15px;
                    background: rgba(0,0,0,0.3);
                    border-radius: 12px;
                    display: none;
                }
                .search-results.active {
                    display: block;
                }
                .search-result-item {
                    padding: 10px 12px;
                    color: #fff;
                    text-decoration: none;
                    display: block;
                    border-radius: 8px;
                }
                .search-result-item:hover {
                    background: #c9a227;
                    color: #0a0a0a;
                }
                .menu-info {
                    background: rgba(0,0,0,0.2);
                    border-radius: 16px;
                    padding: 20px;
                    margin-top: 20px;
                }
                .menu-info h4 {
                    color: #c9a227;
                    margin-bottom: 15px;
                }
                .info-item {
                    margin-bottom: 15px;
                }
                .info-label {
                    font-size: 11px;
                    color: #c9a227;
                    margin-bottom: 4px;
                }
                .info-value {
                    font-size: 13px;
                    color: #fff;
                }
                .info-value a {
                    color: #f5e6a3;
                    text-decoration: none;
                }
                .menu-social {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 25px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(201,162,39,0.3);
                }
                .menu-social a {
                    color: #c9a227;
                }
                .swipe-indicator {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: rgba(255,255,255,0.5);
                }
                @media (min-width: 851px) {
                    .menu-trigger { display: none !important; }
                }
            </style>
            
            <button class="menu-trigger" id="menuTrigger">
                <span></span><span></span><span></span>
            </button>
            <div class="menu-overlay" id="menuOverlay"></div>
            <div class="menu-panel" id="menuPanel">
                <div class="menu-logo"><h2>RICHYARDS</h2></div>
                <ul class="menu-nav">
                    <li><a href="index.html"><i data-lucide="home"></i> Home</a></li>
                    <li><a href="about.html"><i data-lucide="building-2"></i> About Us</a></li>
                    <li><a href="sectors.html"><i data-lucide="pie-chart"></i> Sectors</a></li>
                    <li><a href="opportunities.html"><i data-lucide="trending-up"></i> Opportunities</a></li>
                    <li><a href="partnerships.html"><i data-lucide="handshake"></i> Partnerships</a></li>
                    <li><a href="expansion.html"><i data-lucide="map"></i> Expansion</a></li>
                    <li><a href="contact.html"><i data-lucide="mail"></i> Contact</a></li>
                </ul>
                <div class="menu-search">
                    <h4>🔍 Search Pages</h4>
                    <div class="search-box">
                        <input type="text" id="searchInput" placeholder="Type to search...">
                        <button id="searchBtn"><i data-lucide="search"></i></button>
                    </div>
                    <div class="search-results" id="searchResults"></div>
                </div>
                <div class="menu-info">
                    <h4>📞 Vital Information</h4>
                    <div class="info-item"><div class="info-label">📧 Email</div><div class="info-value"><a href="mailto:richyardsinvestors@gmail.com">richyardsinvestors@gmail.com</a></div></div>
                    <div class="info-item"><div class="info-label">📱 Phone</div><div class="info-value"><a href="https://wa.me/254115777999">+254 115 777 999</a></div></div>
                    <div class="info-item"><div class="info-label">📍 Address</div><div class="info-value">Flamingo Towers, Nairobi</div></div>
                </div>
                <div class="swipe-indicator">← Swipe to close</div>
            </div>
        `;
        
        document.body.insertBefore(menuContainer, document.body.firstChild);
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Menu functionality
        const trigger = document.getElementById('menuTrigger');
        const panel = document.getElementById('menuPanel');
        const overlay = document.getElementById('menuOverlay');
        
        function openMenu() {
            panel.classList.add('open');
            overlay.classList.add('active');
            trigger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            panel.classList.remove('open');
            overlay.classList.remove('active');
            trigger.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (trigger) trigger.addEventListener('click', openMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);
        
        // Swipe to close
        let touchStart = 0;
        panel.addEventListener('touchstart', e => touchStart = e.changedTouches[0].screenX);
        panel.addEventListener('touchend', e => {
            if (e.changedTouches[0].screenX - touchStart > 50) closeMenu();
        });
        
        // Close on link click
        document.querySelectorAll('.menu-nav a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const url = link.getAttribute('href');
                closeMenu();
                setTimeout(() => window.location.href = url, 200);
            });
        });
        
        // Search
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const pages = [
            { name: "Home", url: "index.html" },
            { name: "About Us", url: "about.html" },
            { name: "Sectors", url: "sectors.html" },
            { name: "Opportunities", url: "opportunities.html" },
            { name: "Partnerships", url: "partnerships.html" },
            { name: "Expansion", url: "expansion.html" },
            { name: "Contact", url: "contact.html" }
        ];
        
        function search() {
            const query = searchInput.value.toLowerCase();
            if (!query) { searchResults.classList.remove('active'); return; }
            const results = pages.filter(p => p.name.toLowerCase().includes(query));
            if (results.length) {
                searchResults.innerHTML = results.map(r => `<a href="${r.url}" class="search-result-item">🔍 ${r.name}</a>`).join('');
                searchResults.classList.add('active');
                document.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', e => {
                        e.preventDefault();
                        const url = item.getAttribute('href');
                        closeMenu();
                        setTimeout(() => window.location.href = url, 200);
                    });
                });
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results</div>';
                searchResults.classList.add('active');
            }
        }
        
        if (searchInput) searchInput.addEventListener('keyup', search);
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) searchBtn.addEventListener('click', search);
        
        // Escape key
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel?.classList.contains('open')) closeMenu(); });
    }
    
    // Load menu when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMenu);
    } else {
        loadMenu();
    }
})();
