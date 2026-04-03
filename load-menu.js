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
                margin: 0;
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
                font-size: 20px;
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
                padding: 10px 15px;
                color: #fff;
                text-decoration: none;
                font-size: 13px;
                border-radius: 12px;
                transition: 0.3s;
            }
            .mobile-menu-nav a:hover, .mobile-menu-nav a:active {
                background: #c9a227;
                color: #0a0a0a;
            }
            .mobile-menu-nav a i {
                width: 18px;
                height: 18px;
            }
            .mobile-menu-search {
                margin-bottom: 30px;
            }
            .mobile-menu-search h4 {
                color: #c9a227;
                font-size: 12px;
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
                padding: 10px 15px;
                background: transparent;
                border: none;
                color: #fff;
                outline: none;
                font-size: 12px;
            }
            .mobile-search-box input::placeholder {
                font-size: 11px;
            }
            .mobile-search-box button {
                padding: 10px 15px;
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
                padding: 8px 12px;
                color: #fff;
                text-decoration: none;
                display: block;
                border-radius: 8px;
                font-size: 12px;
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
                font-size: 12px;
            }
            .mobile-info-item {
                margin-bottom: 15px;
            }
            .mobile-info-label {
                font-size: 9px;
                color: #c9a227;
                margin-bottom: 4px;
            }
            .mobile-info-value {
                font-size: 11px;
                color: #fff;
            }
            .mobile-info-value a {
                color: #f5e6a3;
                text-decoration: none;
                font-size: 11px;
            }
            .mobile-swipe-indicator {
                text-align: center;
                margin-top: 20px;
                font-size: 10px;
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