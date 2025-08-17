// Portfolio JavaScript - Modern & Interactive
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('DOM Content Loaded - Starting portfolio initialization...');
    
    // Initialize all components
    initPreloader();
    init3DHero();
    initProjects3DBackground();
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
    
    // 3D Projects Background
    function initProjects3DBackground() {
        const container = document.getElementById('projects-3d-bg');
        if (!container) return;
        
        // Create Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);
        
        // Create floating objects with more variety
        const objects = [];
        const objectTypes = [
            { geometry: new THREE.BoxGeometry(0.5, 0.5, 0.5), color: 0x00d4ff, name: 'cube' },
            { geometry: new THREE.SphereGeometry(0.3, 16, 16), color: 0xff6b35, name: 'sphere' },
            { geometry: new THREE.ConeGeometry(0.4, 0.8, 16), color: 0x0099cc, name: 'cone' },
            { geometry: new THREE.TorusGeometry(0.3, 0.1, 8, 24), color: 0x00d4ff, name: 'torus' },
            { geometry: new THREE.OctahedronGeometry(0.4), color: 0xff6b35, name: 'octahedron' },
            { geometry: new THREE.DodecahedronGeometry(0.3), color: 0x0099cc, name: 'dodecahedron' },
            { geometry: new THREE.TetrahedronGeometry(0.4), color: 0x00d4ff, name: 'tetrahedron' },
            { geometry: new THREE.IcosahedronGeometry(0.3), color: 0xff6b35, name: 'icosahedron' }
        ];
        
        // Create multiple floating objects
        for (let i = 0; i < 20; i++) {
            const type = objectTypes[Math.floor(Math.random() * objectTypes.length)];
            const material = new THREE.MeshPhongMaterial({
                color: type.color,
                transparent: true,
                opacity: 0.6,
                wireframe: true,
                emissive: type.color,
                emissiveIntensity: 0.1
            });
            
            const mesh = new THREE.Mesh(type.geometry, material);
            
            // Random position
            mesh.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            );
            
            // Random rotation
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            // Store animation properties
            mesh.userData = {
                speed: 0.001 + Math.random() * 0.002,
                rotationSpeed: 0.01 + Math.random() * 0.02,
                floatSpeed: 0.001 + Math.random() * 0.002,
                floatRange: 2 + Math.random() * 3,
                originalPosition: mesh.position.clone(),
                pulseSpeed: 0.002 + Math.random() * 0.003
            };
            
            objects.push(mesh);
            scene.add(mesh);
        }
        
        // Add particle system with more particles
        const particleCount = 80;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
            
            colors[i * 3] = Math.random() * 0.5 + 0.5;
            colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
            colors[i * 3 + 2] = 1;
            
            sizes[i] = Math.random() * 0.2 + 0.05;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        // Add enhanced lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0xff6b35, 0.6, 20);
        pointLight.position.set(-10, -10, -10);
        scene.add(pointLight);
        
        // Add colored point lights for dynamic lighting
        const colorLights = [
            { color: 0x00d4ff, position: [15, 15, 15] },
            { color: 0xff6b35, position: [-15, -15, -15] },
            { color: 0x0099cc, position: [15, -15, 15] },
            { color: 0xff6b35, position: [-15, 15, -15] }
        ];
        
        colorLights.forEach(light => {
            const pointLight = new THREE.PointLight(light.color, 0.3, 15);
            pointLight.position.set(...light.position);
            scene.add(pointLight);
        });
        
        camera.position.z = 20;
        
        // Animation loop with enhanced effects
        function animate() {
            requestAnimationFrame(animate);
            
            const time = Date.now();
            
            // Animate floating objects with enhanced movement
            objects.forEach((object, index) => {
                const data = object.userData;
                
                // Rotation
                object.rotation.x += data.rotationSpeed;
                object.rotation.y += data.rotationSpeed * 0.7;
                object.rotation.z += data.rotationSpeed * 0.5;
                
                // Enhanced floating movement
                object.position.y = data.originalPosition.y + Math.sin(time * data.floatSpeed + index) * data.floatRange;
                object.position.x = data.originalPosition.x + Math.cos(time * data.floatSpeed * 0.7 + index) * (data.floatRange * 0.5);
                object.position.z = data.originalPosition.z + Math.sin(time * data.floatSpeed * 0.5 + index) * (data.floatRange * 0.8);
                
                // Pulse effect
                const scale = 1 + Math.sin(time * data.pulseSpeed + index) * 0.1;
                object.scale.setScalar(scale);
                
                // Color pulsing
                if (object.material.emissiveIntensity !== undefined) {
                    object.material.emissiveIntensity = 0.1 + Math.sin(time * data.pulseSpeed + index) * 0.05;
                }
            });
            
            // Animate particles with more dynamic movement
            particleSystem.rotation.y += 0.001;
            particleSystem.rotation.x += 0.0005;
            
            // Move particles in a wave pattern
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time * 0.001 + i) * 0.01;
                positions[i] += Math.cos(time * 0.0008 + i) * 0.005;
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        // Enhanced mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            targetRotationX = mouseY * 0.5;
            targetRotationY = mouseX * 0.5;
        });
        
        // Smooth camera movement based on mouse
        function updateCamera() {
            camera.position.x += (mouseX * 3 - camera.position.x) * 0.01;
            camera.position.y += (mouseY * 3 - camera.position.y) * 0.01;
            
            // Add subtle rotation based on mouse
            scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.02;
            scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.02;
        }
        
        // Add camera update to animation loop
        const originalAnimate = animate;
        animate = function() {
            updateCamera();
            originalAnimate();
        };
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
        
        // Test: Verify we can access the projects data
        const testProjects = [
            "Crystal CRM System",
            "Countries API Module", 
            "Wuzzuf Plus - Job Platform",
            "Elmenus - Multi-Vendor SaaS",
            "Medical E-commerce Platform"
        ];
        console.log('🧪 Test projects list:', testProjects);
        console.log('🧪 Expected count: 5 projects');
        console.log('🖼️ Project images:', window.projectImages);
        
        // Load projects from embedded data
        console.log('🚀 Calling loadProjectsFromData...');
        loadProjectsFromData();
        
        // Add a fallback check after a short delay
        setTimeout(() => {
            const displayedProjects = container.querySelectorAll('.project-card');
            console.log('🔍 Fallback check - Projects displayed:', displayedProjects.length);
            if (displayedProjects.length < 5) {
                console.warn('⚠️ Not all projects displayed, forcing fallback...');
                displayFallbackProjects();
            }
        }, 1000);
        
        console.log('=== PROJECTS DEBUG END ===');
    }
    
    // Project images array - corresponds to the 5 projects in sequence
    window.projectImages = [
        "placeholder/colored/1.png",  // Crystal CRM System
        "placeholder/colored/1.png",  // Countries API Module
        "placeholder/colored/1.png",  // Wuzzuf Plus - Job Platform
        "placeholder/colored/1.png",  // Elmenus - Multi-Vendor SaaS
        "placeholder/colored/1.png"   // Medical E-commerce Platform
    ];
    
    // Project links array - corresponds to the 5 projects in sequence
    window.projectLinks = [
        "http://crystalcrm.byethost12.com/",           // Crystal CRM System
        "http://countries-api.byethost15.com/",        // Countries API Module
        "http://wuzzuf-plus.byethost8.com/",          // Wuzzuf Plus - Job Platform
        "http://elmenus.byethost18.com/",             // Elmenus - Multi-Vendor SaaS
        ""                                              // Medical E-commerce Platform (no live URL)
    ];
    
    // Project GitHub links array - corresponds to the 5 projects in sequence
    window.projectGit = [
        "https://github.com/MuhammedKAldin/php_crystal_crm",           // Crystal CRM System
        "https://github.com/MuhammedKAldin/laravel_countries_api_crud", // Countries API Module
        "https://github.com/MuhammedKAldin/laravel_wuzzuf",            // Wuzzuf Plus - Job Platform
        "https://github.com/MuhammedKAldin/laravel_elmenus",           // Elmenus - Multi-Vendor SaaS
        "https://github.com/MuhammedKAldin/laravel_ecommerce_medicine" // Medical E-commerce Platform
    ];
    
    async function loadProjectsFromData() {
        try {
            console.log('🔄 Loading projects from embedded data...');
            
            // Use only the 5 specific projects
            const projects = [
                {
                    "name": "Crystal CRM System",
                    "screenshot": window.projectImages[0],
                    "features": [
                        "Dynamic Customer Management Dashboard",
                        "Sales Pipeline Tracking",
                        "Lead Management System",
                        "Customer Communication Logs",
                        "Reporting & Analytics",
                        "Role-based Access Control"
                    ],
                    "tags": ["Fullstack", "PHP", "CRM"],
                    "skills": ["PHP", "MySQL", "Bootstrap", "JavaScript", "AJAX"],
                    "description": "A comprehensive CRM system built with PHP and MySQL, featuring customer management, sales tracking, and detailed reporting capabilities.",
                    "instructions": [
                        "Admin account (email/pw):",
                        "- admin@gmail.com / 12345"
                    ],
                    "url": "http://crystalcrm.byethost12.com/",
                    "codespace": "https://github.com/MuhammedKAldin/php_crystal_crm"
                },
                {
                    "name": "Countries API Module",
                    "screenshot": window.projectImages[1],
                    "features": [
                        "RESTful API with OAuth2 Authentication",
                        "SOAP API Support",
                        "Database Logging & Monitoring",
                        "Automated External Gateway Notifications",
                        "CRUD Operations via Web Dashboard",
                        "API Rate Limiting & Security"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "API", "SOAP", "OAuth 2"],
                    "skills": ["Laravel", "Passport", "MySQL", "REST API", "SOAP", "OAuth2"],
                    "description": "Advanced API module built with Laravel 10, featuring OAuth2 authentication, SOAP support, and comprehensive logging for enterprise applications.",
                    "instructions": [
                        "Web Routes:",
                        "- GET /: Displays all countries",
                        "- GET /create: Form to add a new country",
                        "- POST /store: Saves a new country to the database",
                        "- GET /edit/{id}: Form to edit an existing country by ID",
                        "- PUT /edit/update/{id}: Updates the country record",
                        "- DELETE /destroy/{id}: Deletes a country record",
                        "",
                        "API Routes and Logging:",
                        "- POST /register: User registration",
                        "- GET /countries: Fetch all countries (supports XML response for SOAP)",
                        "- POST /countries: Add a new country",
                        "- PUT /countries/{id}: Update an existing country",
                        "- GET /countries/{id}: Retrieve a country by ID",
                        "- DELETE /countries/{id}: Delete a country",
                        "- Logging Requests [API requests are logged to the database, including dynamic callback URLs provided externally]"
                    ],
                    "url": "http://countries-api.byethost15.com/",
                    "codespace": "https://github.com/MuhammedKAldin/laravel_countries_api_crud"
                },
                {
                    "name": "Wuzzuf Plus - Job Platform",
                    "screenshot": window.projectImages[2],
                    "features": [
                        "Job Posting & Application Management",
                        "Applicant Tracking System",
                        "Employer Verification System",
                        "Advanced Search & Filtering",
                        "Real-time Messaging System",
                        "Interview Scheduling",
                        "Resume Management",
                        "Analytics Dashboard"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "Job Platform", "Real-time"],
                    "skills": ["Laravel", "MySQL", "Pusher", "Real-time", "Bootstrap", "JavaScript"],
                    "description": "A comprehensive job platform built with Laravel 10, featuring job posting, applicant tracking, real-time messaging, and advanced search capabilities.",
                    "instructions": [
                        "Test Accounts (email/pw):",
                        "- Applicant Account: test@example.com / 3244039",
                        "- Recruiter Account: recruitment@microsoft.com / 3244039",
                        "Note: The chat Feature is available between recruiters and applicants at all stages, except during the screening and declined stages."
                    ],
                    "url": "http://wuzzuf-plus.byethost8.com/",
                    "codespace": "https://github.com/MuhammedKAldin/laravel_wuzzuf"
                },
                {
                    "name": "Elmenus - Multi-Vendor SaaS",
                    "screenshot": window.projectImages[3],
                    "features": [
                        "Restaurant Menu Management",
                        "Multi-Vendor Support",
                        "Order Processing & Tracking",
                        "Payment Integration (Paymob)",
                        "Customer Management",
                        "Analytics & Reporting",
                        "API Endpoints",
                        "Real-time Order Updates"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "SaaS", "Multi-Vendor", "Paymob"],
                    "description": "A comprehensive SaaS platform for restaurant management, featuring multi-vendor support, order processing, and integrated payment systems.",
                    "instructions": [
                        "Test Accounts (email/pw):",
                        "- McDonald's Owner: test@example.com / test12345678",
                        "- McDonald's Owner: test2@gmail.com / test12345678",
                        "- Customer sample: test3@gmail.com / test12345678"
                    ],
                    "url": "http://elmenus.byethost18.com/",
                    "codespace": "https://github.com/MuhammedKAldin/laravel_elmenus"
                },
                {
                    "name": "Medical E-commerce Platform",
                    "screenshot": window.projectImages[4],
                    "features": [
                        "Product Catalog Management",
                        "Shopping Cart & Checkout",
                        "Guest & User Checkout",
                        "Order Management System",
                        "Invoice Generation",
                        "Admin Dashboard",
                        "Role-based Access Control",
                        "Product Image Handling",
                        "Inventory Management"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "E-commerce", "Medical", "Healthcare"],
                    "skills": ["Laravel", "MySQL", "Blade", "TailwindCSS", "Bootstrap", "JavaScript", "Payment Integration"],
                    "description": "A specialized e-commerce platform for medical and healthcare products, featuring comprehensive product management, secure checkout, and administrative tools.",
                    "instructions": [
                        "Admin account:",
                        "- Email: admin@gmail.com / Password: password",
                        "User account:",
                        "- Email: mohamed@gmail.com / Password: password",
                        "",
                        "Public Routes:",
                        "- / : Home page",
                        "- /products : Products listing",
                        "- /products/{id} : Single product",
                        "- /cart : Cart management",
                        "- /checkout : Checkout",
                        "- /order-confirmation : Order confirmation",
                        "",
                        "Admin Routes:",
                        "- /admin/dashboard : Admin dashboard",
                        "- /admin/products : Product management",
                        "- /admin/products/logs : Product logs",
                        "- /admin/invoices : Invoice management"
                    ],
                    "url": "",
                    "codespace": "https://github.com/MuhammedKAldin/laravel_ecommerce_medicine"
                }
            ];
            
            console.log('✅ Projects data loaded successfully:', projects.length, 'projects');
            console.log('📋 Projects:', projects);
            
            // Verify each project has required fields
            projects.forEach((project, index) => {
                console.log(`Project ${index + 1}:`, project.name);
                if (!project.name || !project.description) {
                    console.warn(`⚠️ Project ${index + 1} missing required fields:`, project);
                }
            });
            
            displayProjects(projects);
        } catch (error) {
            console.error('❌ Error loading projects:', error);
            console.log('🔄 Falling back to static projects...');
            displayFallbackProjects();
        }
    }
    
    function displayProjects(projects) {
        const container = document.getElementById('projects-container');
        if (!container) {
            console.error('❌ Projects container not found');
            return;
        }
        
        console.log('🎨 Displaying projects:', projects.length);
        console.log('📍 Container:', container);
        
        // Clear container first
        container.innerHTML = '';
        
        // Debug: Log each project being processed
        projects.forEach((project, index) => {
            console.log(`📱 Creating project card ${index + 1}:`, project.name);
            console.log(`   - Tags:`, project.tags);
            console.log(`   - Skills:`, project.skills);
            console.log(`   - Screenshot:`, project.screenshot);
            
            const projectCard = createProjectCard(project, index);
            if (projectCard) {
            container.appendChild(projectCard);
                console.log(`✅ Project card ${index + 1} added to container`);
            } else {
                console.error(`❌ Failed to create project card ${index + 1}`);
            }
        });
        
        console.log('✅ All project cards created and added to container');
        console.log('🔍 Final container children count:', container.children.length);
        
        // Initialize tilt effects for the new project cards
        if (typeof VanillaTilt !== 'undefined') {
            console.log('🎯 Initializing VanillaTilt for project cards...');
            const tiltCards = document.querySelectorAll('.project-card.card-3d');
            console.log('🎯 Found tilt cards:', tiltCards.length);
            VanillaTilt.init(tiltCards, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            });
            console.log('✅ VanillaTilt initialized for project cards');
        } else {
            console.warn('⚠️ VanillaTilt not available for 3D effects');
        }
    }
    
    function createProjectCard(project, index) {
        console.log(`🔨 Creating project card for: ${project.name}`);
        
        const card = document.createElement('div');
        card.className = 'project-card card-3d fade-in';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Get appropriate icon based on project type
        const getProjectIcon = (projectName, skills) => {
            const name = projectName.toLowerCase();
            const skillList = skills ? skills.join(' ').toLowerCase() : '';
            
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
        console.log(`   - Icon selected: ${projectIcon}`);
        
        // Create project card with image and 3D effects
        card.innerHTML = `
            <div class="project-image-container">
                <div class="project-image">
                    <img src="${project.screenshot || 'images/app1.PNG'}" alt="${project.name}" onerror="this.src='app1.PNG'">
                    <div class="project-overlay">
                        <div class="project-overlay-content">
                <i class="${projectIcon}"></i>
                            <h4>${project.name}</h4>
            </div>
                    </div>
                </div>
            </div>
            <div class="project-content">
            <h3 class="project-title">${project.name}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                    ${project.tags ? project.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('') : ''}
                    ${project.skills ? project.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('') : ''}
            </div>
            <div class="project-actions">
                    <a href="${project.codespace}" target="_blank" class="project-btn primary">
                        <i class="fab fa-github"></i> Code
                    </a>
                    ${project.url && project.url !== '#' ? `
                        <a href="${project.url}" target="_blank" class="project-btn secondary">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Add click event for project details
        card.addEventListener('click', () => {
            showProjectModal(project);
        });
        
        console.log(`✅ Project card created successfully for: ${project.name}`);
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
                "name": "Crystal CRM System",
                "screenshot": window.projectImages[0],
                "features": [
                    "Dynamic Customer Management Dashboard",
                    "Sales Pipeline Tracking",
                    "Lead Management System",
                    "Customer Communication Logs",
                    "Reporting & Analytics",
                    "Role-based Access Control"
                ],
                "tags": ["Fullstack", "PHP", "CRM"],
                "skills": ["PHP", "MySQL", "Bootstrap", "JavaScript", "AJAX"],
                "description": "A comprehensive CRM system built with PHP and MySQL, featuring customer management, sales tracking, and detailed reporting capabilities.",
                "instructions": [
                    "Admin account (email/pw):",
                    "- admin@gmail.com / 12345"
                ],
                "url": "http://crystalcrm.byethost12.com/",
                "codespace": "https://github.com/MuhammedKAldin/php_crystal_crm"
            },
            {
                "name": "Countries API Module",
                "screenshot": window.projectImages[1],
                "features": [
                    "RESTful API with OAuth2 Authentication",
                    "SOAP API Support",
                    "Database Logging & Monitoring",
                    "Automated External Gateway Notifications",
                    "CRUD Operations via Web Dashboard",
                    "API Rate Limiting & Security"
                ],
                "tags": ["Fullstack", "Laravel 10", "API", "SOAP", "OAuth 2"],
                "skills": ["Laravel", "Passport", "MySQL", "REST API", "SOAP", "OAuth2"],
                "description": "Advanced API module built with Laravel 10, featuring OAuth2 authentication, SOAP support, and comprehensive logging for enterprise applications.",
                "instructions": [
                    "Web Routes:",
                    "- GET /: Displays all countries",
                    "- GET /create: Form to add a new country",
                    "- POST /store: Saves a new country to the database",
                    "- GET /edit/{id}: Form to edit an existing country by ID",
                    "- PUT /edit/update/{id}: Updates the country record",
                    "- DELETE /destroy/{id}: Deletes a country record",
                    "",
                    "API Routes and Logging:",
                    "- POST /register: User registration",
                    "- GET /countries: Fetch all countries (supports XML response for SOAP)",
                    "- POST /countries: Add a new country",
                    "- PUT /countries/{id}: Update an existing country",
                    "- GET /countries/{id}: Retrieve a country by ID",
                    "- DELETE /countries/{id}: Delete a country",
                    "- Logging Requests [API requests are logged to the database, including dynamic callback URLs provided externally]"
                ],
                "url": "http://countries-api.byethost15.com/",
                "codespace": "https://github.com/MuhammedKAldin/laravel_countries_api_crud"
            },
            {
                "name": "Wuzzuf Plus - Job Platform",
                "screenshot": window.projectImages[2],
                "features": [
                    "Job Posting & Application Management",
                    "Applicant Tracking System",
                    "Employer Verification System",
                    "Advanced Search & Filtering",
                    "Real-time Messaging System",
                    "Interview Scheduling",
                    "Resume Management",
                    "Analytics Dashboard"
                ],
                "tags": ["Fullstack", "Laravel 10", "Job Platform", "Real-time"],
                "skills": ["Laravel", "MySQL", "Pusher", "Real-time", "Bootstrap", "JavaScript"],
                "description": "A comprehensive job platform built with Laravel 10, featuring job posting, applicant tracking, real-time messaging, and advanced search capabilities.",
                "instructions": [
                    "Test Accounts (email/pw):",
                    "- Applicant Account: test@example.com / 3244039",
                    "- Recruiter Account: recruitment@microsoft.com / 3244039",
                    "Note: The chat Feature is available between recruiters and applicants at all stages, except during the screening and declined stages."
                ],
                "url": "http://wuzzuf-plus.byethost8.com/",
                "codespace": "https://github.com/MuhammedKAldin/laravel_wuzzuf"
            },
            {
                "name": "Elmenus - Multi-Vendor SaaS",
                "screenshot": window.projectImages[3],
                "features": [
                    "Restaurant Menu Management",
                    "Multi-Vendor Support",
                    "Order Processing & Tracking",
                    "Payment Integration (Paymob)",
                    "Customer Management",
                    "Analytics & Reporting",
                    "API Endpoints",
                    "Real-time Order Updates"
                ],
                "tags": ["Fullstack", "Laravel 10", "SaaS", "Multi-Vendor", "Paymob"],
                "description": "A comprehensive SaaS platform for restaurant management, featuring multi-vendor support, order processing, and integrated payment systems.",
                "instructions": [
                    "Test Accounts (email/pw):",
                    "- McDonald's Owner: test@example.com / test12345678",
                    "- McDonald's Owner: test2@gmail.com / test12345678",
                    "- Customer sample: test3@gmail.com / test12345678"
                ],
                "url": "http://elmenus.byethost18.com/",
                "codespace": "https://github.com/MuhammedKAldin/laravel_elmenus"
            },
            {
                "name": "Medical E-commerce Platform",
                "screenshot": window.projectImages[4],
                "features": [
                    "Product Catalog Management",
                    "Shopping Cart & Checkout",
                    "Guest & User Checkout",
                    "Order Management System",
                    "Invoice Generation",
                    "Admin Dashboard",
                    "Role-based Access Control",
                    "Product Image Handling",
                    "Inventory Management"
                ],
                "tags": ["Fullstack", "Laravel 10", "E-commerce", "Medical", "Healthcare"],
                "skills": ["Laravel", "MySQL", "Blade", "TailwindCSS", "Bootstrap", "JavaScript", "Payment Integration"],
                "description": "A specialized e-commerce platform for medical and healthcare products, featuring comprehensive product management, secure checkout, and administrative tools.",
                "instructions": [
                    "Admin account:",
                    "- Email: admin@gmail.com / Password: password",
                    "User account:",
                    "- Email: mohamed@gmail.com / Password: password",
                    "",
                    "Public Routes:",
                    "- / : Home page",
                    "- /products : Products listing",
                    "- /products/{id} : Single product",
                    "- /cart : Cart management",
                    "- /checkout : Checkout",
                    "- /order-confirmation : Order confirmation",
                    "",
                    "Admin Routes:",
                    "- /admin/dashboard : Admin dashboard",
                    "- /admin/products : Product management",
                    "- /admin/products/logs : Product logs",
                    "- /admin/invoices : Invoice management"
                ],
                "url": "",
                "codespace": "https://github.com/MuhammedKAldin/laravel_ecommerce_medicine"
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
            const skillList = skills ? skills.join(' ').toLowerCase() : '';
            
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
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="project-modal-image">
                        <img src="${project.screenshot || 'app1.PNG'}" alt="${project.name}" class="img-fluid rounded" onerror="this.src='app1.PNG'">
                    </div>
                </div>
                <div class="col-12 mb-4">
                    <div class="project-modal-content">
                        <div class="project-modal-header mb-4">
                            <div class="project-modal-icon mb-3">
                                <i class="${projectIcon}"></i>
                            </div>
                            <h3 class="text-primary mb-2">${project.name}</h3>
                            <p class="text">${project.description}</p>
                        </div>
                        
                        ${project.skills ? `
                            <div class="mb-4">
                                <h6 class="text-primary mb-2">Technologies Used:</h6>
                                <div class="d-flex flex-wrap gap-2">
                                    ${project.skills.map(skill => `<span class="badge bg-secondary">${skill}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${project.features ? `
                            <div class="mb-4">
                                <h6 class="text-primary mb-2">Key Features:</h6>
                                <ul class="list-unstyled">
                                    ${project.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div class="row mt-4">
                <div class="col-6">
                    <div class="project-modal-actions">
                        <div class="d-grid gap-2 d-md-flex">
                            <a href="${project.codespace}" target="_blank" class="btn btn-primary btn-lg w-100">
                                <i class="fab fa-github me-2"></i>View Source Code
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="project-modal-actions">
                        <div class="d-grid gap-2 d-md-flex">
                            ${project.url && project.url !== '#' ? `
                                <a href="${project.url}" target="_blank" class="btn btn-outline-primary btn-lg w-100">
                                    <i class="fas fa-external-link-alt me-2"></i>Live Demo
                                </a>
                            ` : `
                                <button class="btn btn-outline-secondary btn-lg w-100" disabled>
                                    <i class="fas fa-external-link-alt me-2"></i>Demo Not Available
                                </button>
                            `}
                        </div>
                    </div>
                </div>
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
            --nav-text: #00d4ff;
            --card-bg: rgba(0, 0, 0, 0.05);
            --border-color: rgba(0, 0, 0, 0.1);
        }
        
        .light-theme .navbar {
            background: rgba(255, 255, 255, 0.95) !important;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(20px);
        }
        
        .light-theme .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
    `;
    document.head.appendChild(revealStyle);
    
    console.log('Portfolio initialized successfully! 🚀');
});