// Portfolio JavaScript - Modern & Interactive
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('DOM Content Loaded - Starting portfolio initialization...');
    
    // Initialize all components
    initPreloader();
    init3DHero();
    initScrollAnimations();
    initProjectCards();
    initSkillBars();
    initTiltEffects();
    initSmoothScrolling();
    initNavbarEffects();
    
    console.log('All components initialized');
    
    // Preloader
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }
    
    // 3D Hero Section
    function init3DHero() {
        const container = document.getElementById('hero-3d-container');
        if (!container) return;
        
        // Create Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Create floating geometric shapes
        const geometries = [];
        const materials = [];
        const meshes = [];
        
        // Add different geometric shapes
        const shapes = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.ConeGeometry(0.5, 1, 32),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100)
        ];
        
        shapes.forEach((geometry, index) => {
            const material = new THREE.MeshPhongMaterial({
                color: index === 0 ? 0x00d4ff : 
                       index === 1 ? 0xff6b35 : 
                       index === 2 ? 0x0099cc : 0x00d4ff,
                transparent: true,
                opacity: 0.8,
                wireframe: true
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            
            geometries.push(geometry);
            materials.push(material);
            meshes.push(mesh);
            scene.add(mesh);
        });
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01 * (index + 1);
                mesh.rotation.y += 0.01 * (index + 1);
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Project Cards
    function initProjectCards() {
        console.log('=== PROJECTS DEBUG START ===');
        
        const container = document.getElementById('projects-container');
        if (!container) {
            console.error('❌ Projects container not found');
            return;
        }
        
        console.log('✅ Projects container found:', container);
        console.log('✅ Static projects are already visible in HTML');
        
        // Initialize tilt effects for the project cards if VanillaTilt is available
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.project-card'), {
                max: 10,
                speed: 300,
                glare: true,
                "max-glare": 0.2,
            });
            console.log('✅ Tilt effects initialized for project cards');
        }
        
        console.log('=== PROJECTS DEBUG END ===');
    }
    
    function displayProjects(projects) {
        const container = document.getElementById('projects-container');
        if (!container) return;
        
        console.log('Displaying projects:', projects.length);
        
        // Clear container first
        container.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            container.appendChild(projectCard);
        });
        
        // Initialize tilt effects for the new project cards
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.project-card.card-3d'), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
        }
    }
    
    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card card-3d fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Get appropriate icon based on project type
        const getProjectIcon = (projectName, skills) => {
            const name = projectName.toLowerCase();
            const skillList = skills.join(' ').toLowerCase();
            
            if (name.includes('crm') || name.includes('erp') || name.includes('system')) {
                return 'fas fa-cogs';
            } else if (name.includes('e-commerce') || name.includes('ecommerce') || name.includes('shop')) {
                return 'fas fa-shopping-cart';
            } else if (name.includes('chat') || name.includes('messaging')) {
                return 'fas fa-comments';
            } else if (name.includes('lms') || name.includes('learning') || name.includes('education')) {
                return 'fas fa-graduation-cap';
            } else if (name.includes('api') || name.includes('integration')) {
                return 'fas fa-plug';
            } else if (skillList.includes('react') || skillList.includes('vue')) {
                return 'fas fa-desktop';
            } else if (skillList.includes('laravel') || skillList.includes('php')) {
                return 'fas fa-server';
            } else {
                return 'fas fa-code';
            }
        };
        
        const projectIcon = getProjectIcon(project.name, project.skills);
        
        card.innerHTML = `
            <div class="project-icon">
                <i class="${projectIcon}"></i>
            </div>
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.skills.slice(0, 3).map(skill => `<span class="project-tag">${skill}</span>`).join('')}
                ${project.skills.length > 3 ? `<span class="project-tag">+${project.skills.length - 3}</span>` : ''}
            </div>
            <div class="project-actions">
                <a href="${project.codespace}" target="_blank" class="project-btn primary">View Code</a>
                ${project.url ? `<a href="${project.url}" target="_blank" class="project-btn secondary">Live Demo</a>` : ''}
            </div>
        `;
        
        // Add click event for project details
        card.addEventListener('click', () => {
            showProjectModal(project);
        });
        
        return card;
    }
    
    function displayFallbackProjects() {
        const container = document.getElementById('projects-container');
        if (!container) {
            console.error('Container not found for fallback projects');
            return;
        }
        
        console.log('Displaying fallback projects');
        
        // Clear container first
        container.innerHTML = '';
        
        const fallbackProjects = [
            {
                name: "Enterprise Resource Planning (ERP) System",
                description: "A comprehensive ERP system designed for enterprise-level businesses, featuring integrated modules for all major business operations.",
                skills: ["Laravel", "PHP", "MySQL", "Vue.js", "Redis", "Microservices"],
                screenshot: "app1.PNG"
            },
            {
                name: "Learning Management System (LMS)",
                description: "A modern Learning Management System built for educational institutions and corporate training, featuring advanced content delivery and student engagement tools.",
                skills: ["Laravel", "PHP", "MySQL", "React", "Video Streaming", "WebRTC"],
                screenshot: "app2.PNG"
            },
            {
                name: "Real-time Chat Application",
                description: "A modern real-time chat application with advanced features like file sharing, group chats, and end-to-end encryption for secure communication.",
                skills: ["Laravel", "PHP", "MySQL", "Vue.js", "Pusher", "WebSockets"],
                screenshot: "app3.PNG"
            },
            {
                name: "Crystal CRM System",
                description: "A comprehensive CRM system with sales pipeline tracking, lead management, customer communication logs, and advanced reporting capabilities.",
                skills: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript", "AJAX"],
                screenshot: "app1.PNG"
            },
            {
                name: "E-commerce Multi-vendor Platform",
                description: "A full-featured multi-vendor e-commerce platform with order processing, customer management, analytics, and real-time updates.",
                skills: ["Laravel", "PHP", "MySQL", "Vue.js", "Payment Integration", "Real-time"],
                screenshot: "app2.PNG"
            },
            {
                name: "Payment Gateway Integration System",
                description: "A robust payment integration system supporting multiple gateways including Paymob, Stripe, and PayPal with secure transaction handling.",
                skills: ["Laravel", "PHP", "MySQL", "API Integration", "Security", "Webhooks"],
                screenshot: "app3.PNG"
            }
        ];
        
        fallbackProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            container.appendChild(projectCard);
        });
        
        console.log('Fallback projects displayed:', fallbackProjects.length);
        
        // Initialize tilt effects for the new cards
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.project-card.card-3d'), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
        }
    }
    
    function showProjectModal(project) {
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));
        const modalBody = document.getElementById('modalBody');
        
        // Get appropriate icon for the modal
        const getProjectIcon = (projectName, skills) => {
            const name = projectName.toLowerCase();
            const skillList = skills.join(' ').toLowerCase();
            
            if (name.includes('crm') || name.includes('erp') || name.includes('system')) {
                return 'fas fa-cogs';
            } else if (name.includes('e-commerce') || name.includes('ecommerce') || name.includes('shop')) {
                return 'fas fa-shopping-cart';
            } else if (name.includes('chat') || name.includes('messaging')) {
                return 'fas fa-comments';
            } else if (name.includes('lms') || name.includes('learning') || name.includes('education')) {
                return 'fas fa-graduation-cap';
            } else if (name.includes('api') || name.includes('integration')) {
                return 'fas fa-plug';
            } else if (skillList.includes('react') || skillList.includes('vue')) {
                return 'fas fa-desktop';
            } else if (skillList.includes('laravel') || skillList.includes('php')) {
                return 'fas fa-server';
            } else {
                return 'fas fa-code';
            }
        };
        
        const projectIcon = getProjectIcon(project.name, project.skills);
        
        modalBody.innerHTML = `
            <div class="text-center mb-4">
                <div class="project-modal-icon" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;">
                    <i class="${projectIcon}"></i>
                </div>
            </div>
            <h4 class="text-primary mb-3">${project.name}</h4>
            <p class="mb-3">${project.description}</p>
            
            <h5 class="text-primary mb-2">Technologies Used:</h5>
            <div class="mb-3">
                ${project.skills.map(skill => `<span class="badge bg-primary me-2">${skill}</span>`).join('')}
            </div>
            
            ${project.features ? `
                <h5 class="text-primary mb-2">Key Features:</h5>
                <ul class="mb-3">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            ` : ''}
            
            <div class="d-flex gap-3 justify-content-center">
                <a href="${project.codespace}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github me-2"></i>View Code
                </a>
                ${project.url ? `
                    <a href="${project.url}" target="_blank" class="btn btn-outline-primary">
                        <i class="fas fa-external-link-alt me-2"></i>Live Demo
                    </a>
                ` : ''}
            </div>
        `;
        
        modal.show();
    }
    
    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // Tilt Effects for 3D Cards
    function initTiltEffects() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.card-3d'), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
        }
    }
    
    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Navbar Effects
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Parallax Effect for Hero Section
    function initParallaxEffect() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Typing Effect for Hero Title
    function initTypingEffect() {
        const titleElement = document.querySelector('.hero-title .title');
        if (!titleElement) return;
        
        const text = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Initialize additional effects
    initParallaxEffect();
    initTypingEffect();
    
    // Add scroll-triggered animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Add floating particles effect
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${Math.random() > 0.5 ? '#00d4ff' : '#ff6b35'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize floating particles
    setTimeout(createFloatingParticles, 2000);
    
    // Add interactive cursor effect
    function initInteractiveCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 212, 255, 0.3);
            border: 2px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect
        document.querySelectorAll('a, button, .project-card, .card-3d').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'rgba(0, 212, 255, 0.6)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(0, 212, 255, 0.3)';
            });
        });
    }
    
    // Initialize interactive cursor
    setTimeout(initInteractiveCursor, 1000);
    
    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00d4ff, #ff6b35);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Add performance optimization
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextSection = document.querySelector('.hero-section').nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevSection = document.querySelector('.hero-section');
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Add loading states for interactive elements
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', function() {
            if (this.classList.contains('btn')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Add error handling for failed image loads
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
        });
    });
    
    // Add accessibility improvements
    document.querySelectorAll('[tabindex]').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
    
    // Add service worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // Add theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'btn btn-outline-primary theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(themeToggle);
        
        let isDark = true;
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            document.body.classList.toggle('light-theme');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });
    }
    
    // Initialize theme toggle
    setTimeout(initThemeToggle, 2000);
    
    // Add smooth reveal animations for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealSections);
    revealSections(); // Initial check
    
    // Add CSS for revealed sections
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .light-theme {
            --dark-bg: #f8f9fa;
            --darker-bg: #e9ecef;
            --light-text: #212529;
            --gray-text: #6c757d;
            --card-bg: rgba(0, 0, 0, 0.05);
            --border-color: rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(revealStyle);
    
    console.log('Portfolio initialized successfully! 🚀');
});