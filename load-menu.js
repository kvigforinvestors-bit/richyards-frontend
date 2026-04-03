// Load hamburger menu on all pages
(function() {
    if (document.getElementById('mobile-menu-injected')) return;
    
    function initMobileMenu() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        // Check if button already exists
        if (document.getElementById('mobileMenuTrigger')) return;
        
        // Create hamburger button
        const trigger = document.createElement('button');
        trigger.id = 'mobileMenuTrigger';
        trigger.className = 'mobile-menu-trigger';
        trigger.setAttribute('aria-label', 'Menu');
        trigger.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert button into nav at the end
        nav.appendChild(trigger);
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'mobileMenuOverlay';
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Create menu panel
        const panel = document.createElement('div');
        panel.id = 'mobileMenuPanel';
        panel.className = 'mobile-menu-panel';
        panel.innerHTML = `
            <div class="mobile-menu-logo"><h2>RICHYARDS</h2></div>
            <ul class="mobile-menu-nav">
                <li><a href="index.html"><i data-lucide="home"></i> Home</a></li>
                <li><a href="about.html"><i data-lucide="building-2"></i> About Us</a></li>
                <li><a href="sectors.html"><i data-lucide="pie-chart"></i> Sectors</a></li>
                <li><a href="opportunities.html"><i data-lucide="trending-up"></i> Opportunities</a></li>
                <li><a href="partnerships.html"><i data-lucide="handshake"></i> Partnerships</a></li>
                <li><a href="expansion.html"><i data-lucide="map"></i> Expansion</a></li>
                <li><a href="contact.html"><i data-lucide="mail"></i> Contact</a></li>
            </ul>
            <div class="mobile-menu-search">
                <h4>🔍 Search Pages</h4>
                <div class="mobile-search-box">
                    <input type="text" id="mobileSearchInput" placeholder="Type to search...">
                    <button id="mobileSearchBtn"><i data-lucide="search"></i></button>
                </div>
                <div class="mobile-search-results" id="mobileSearchResults"></div>
            </div>
            <div class="mobile-menu-info">
                <h4>📞 Vital Information</h4>
                <div class="mobile-info-item"><div class="mobile-info-label">📧 Email</div><div class="mobile-info-value"><a href="mailto:richyardsinvestors@gmail.com">richyardsinvestors@gmail.com</a></div></div>
                <div class="mobile-info-item"><div class="mobile-info-label">📱 Phone</div><div class="mobile-info-value"><a href="https://wa.me/254115777999">+254 115 777 999</a></div></div>
                <div class="mobile-info-item"><div class="mobile-info-label">📍 Address</div><div class="mobile-info-value">Flamingo Towers, Nairobi</div></div>
            </div>
            <div class="mobile-swipe-indicator">← Swipe to close</div>
        `;
        document.body.appendChild(panel);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-trigger {
                background: transparent;
                border: none;
                cursor: pointer;
                display: none;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 6px;
                padding: 10px;
                margin-left: auto;
            }
            .mobile-menu-trigger span {
                display: block;
                width: 25px;
                height: 3px;
                background: #ffffff;
                border-radius: 3px;
                transition: all 0.3s ease;
            }
            .mobile-menu-trigger.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }
            .mobile-menu-trigger.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-trigger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 10001;
                display: none;
            }
            .mobile-menu-overlay.active {
                display: block;
            }
            .mobile-menu-panel {
                position: fixed;
                top: 0;
                right: -100%;
                width: 85%;
                max-width: 350px;
                height: 100%;
                background: linear-gradient(135deg, #0b5d1e 0%, #094a18 100%);
                z-index: 10002;
                transition: right 0.3s ease;
                padding: 80px 25px 30px;
                overflow-y: auto;
                box-shadow: -5px 0 30px rgba(0,0,0,0.5);
            }
            .mobile-menu-panel.open {
                right: 0;
            }
            .mobile-menu-logo {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #c9a227;
            }
            .mobile-menu-logo h2 {
                color: #c9a227;
                font-family: 'Playfair Display', serif;
                font-size: 24px;
            }
            .mobile-menu-nav {
                list-style: none;
                margin-bottom: 30px;
            }
            .mobile-menu-nav li {
                margin-bottom: 5px;
            }
            .mobile-menu-nav a {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 14px 18px;
                color: #fff;
                text-decoration: none;
                font-size: 16px;
                border-radius: 12px;
                transition: 0.3s;
            }
            .mobile-menu-nav a:hover, .mobile-menu-nav a:active {
                background: #c9a227;
                color: #0a0a0a;
            }
            .mobile-menu-nav a i {
                width: 22px;
                height: 22px;
            }
            .mobile-menu-search {
                margin-bottom: 30px;
            }
            .mobile-menu-search h4 {
                color: #c9a227;
                font-size: 14px;
                margin-bottom: 12px;
            }
            .mobile-search-box {
                display: flex;
                background: rgba(255,255,255,0.1);
                border-radius: 30px;
                overflow: hidden;
            }
            .mobile-search-box input {
                flex: 1;
                padding: 12px 15px;
                background: transparent;
                border: none;
                color: #fff;
                outline: none;
            }
            .mobile-search-box button {
                padding: 12px 15px;
                background: #c9a227;
                border: none;
                cursor: pointer;
            }
            .mobile-search-results {
                margin-top: 15px;
                background: rgba(0,0,0,0.3);
                border-radius: 12px;
                display: none;
            }
            .mobile-search-results.active {
                display: block;
            }
            .mobile-search-result-item {
                padding: 10px 12px;
                color: #fff;
                text-decoration: none;
                display: block;
                border-radius: 8px;
            }
            .mobile-search-result-item:hover {
                background: #c9a227;
                color: #0a0a0a;
            }
            .mobile-menu-info {
                background: rgba(0,0,0,0.2);
                border-radius: 16px;
                padding: 20px;
                margin-top: 20px;
            }
            .mobile-menu-info h4 {
                color: #c9a227;
                margin-bottom: 15px;
            }
            .mobile-info-item {
                margin-bottom: 15px;
            }
            .mobile-info-label {
                font-size: 11px;
                color: #c9a227;
                margin-bottom: 4px;
            }
            .mobile-info-value {
                font-size: 13px;
                color: #fff;
            }
            .mobile-info-value a {
                color: #f5e6a3;
                text-decoration: none;
            }
            .mobile-swipe-indicator {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: rgba(255,255,255,0.5);
            }
            @media (max-width: 850px) {
                .mobile-menu-trigger {
                    display: flex !important;
                }
            }
            @media (min-width: 851px) {
                .mobile-menu-trigger {
                    display: none !important;
                }
                .mobile-menu-overlay, .mobile-menu-panel {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Menu functionality
        const triggerBtn = document.getElementById('mobileMenuTrigger');
        const panelEl = document.getElementById('mobileMenuPanel');
        const overlayEl = document.getElementById('mobileMenuOverlay');
        
        function openMenu() {
            panelEl.classList.add('open');
            overlayEl.classList.add('active');
            triggerBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            panelEl.classList.remove('open');
            overlayEl.classList.remove('active');
            triggerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        triggerBtn.addEventListener('click', openMenu);
        overlayEl.addEventListener('click', closeMenu);
        
        // Swipe to close
        let touchStart = 0;
        panelEl.addEventListener('touchstart', e => touchStart = e.changedTouches[0].screenX);
        panelEl.addEventListener('touchend', e => {
            if (touchStart - e.changedTouches[0].screenX > 50) closeMenu();
        });
        
        // Close on link click
        document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const url = link.getAttribute('href');
                closeMenu();
                setTimeout(() => window.location.href = url, 200);
            });
        });
        
        // Search
        const searchInput = document.getElementById('mobileSearchInput');
        const searchResults = document.getElementById('mobileSearchResults');
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
                searchResults.innerHTML = results.map(r => `<a href="${r.url}" class="mobile-search-result-item">🔍 ${r.name}</a>`).join('');
                searchResults.classList.add('active');
                document.querySelectorAll('.mobile-search-result-item').forEach(item => {
                    item.addEventListener('click', e => {
                        e.preventDefault();
                        const url = item.getAttribute('href');
                        closeMenu();
                        setTimeout(() => window.location.href = url, 200);
                    });
                });
            } else {
                searchResults.innerHTML = '<div class="mobile-search-result-item">No results</div>';
                searchResults.classList.add('active');
            }
        }
        
        searchInput.addEventListener('keyup', search);
        document.getElementById('mobileSearchBtn').addEventListener('click', search);
        
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && panelEl.classList.contains('open')) closeMenu(); });
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
