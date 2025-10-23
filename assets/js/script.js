// Portfolio JavaScript - Modern & Interactive
document.addEventListener('DOMContentLoaded', function () {

    console.log('DOM Content Loaded - Starting portfolio initialization...')

    // Initialize all components
    initPreloader()
    initProjects3DBackground()
    initScrollAnimations()
    initProjectCards()
    initSkillBars()
    initTiltEffects()
    initSmoothScrolling()
    initNavbarEffects()
    initLazyLoading()

    console.log('All components initialized')

    // Preloader
    function initPreloader() {
        const preloader = document.getElementById('preloader')
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0'
                setTimeout(() => {
                    preloader.style.display = 'none'
                }, 500)
            })
        }
    }


    // 3D Projects Background - Mobile Optimized
    function initProjects3DBackground() {
        const container = document.getElementById('projects-3d-bg')
        if (!container) return

        // Skip 3D background on mobile for performance
        if (window.innerWidth <= 768) {
            container.innerHTML = '<div class="projects-mobile-bg"></div>'
            return
        }

        // Only load for desktop and if Three.js is available
        if (typeof THREE === 'undefined') {
            container.innerHTML = '<div class="projects-mobile-bg"></div>'
            return
        }

        // Create minimal Three.js scene
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })

        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        // Create only 3 simple floating objects
        const objects = []
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 12, 12),
            new THREE.ConeGeometry(0.4, 0.8, 12)
        ]

        for (let i = 0; i < 3; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0x00d4ff : i === 1 ? 0xff6b35 : 0x0099cc,
                transparent: true,
                opacity: 0.4,
                wireframe: true
            })

            const mesh = new THREE.Mesh(geometries[i], material)
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            )

            objects.push(mesh)
            scene.add(mesh)
        }

        camera.position.z = 15

        // Simplified animation loop
        let lastTime = 0
        function animate(currentTime) {
            if (currentTime - lastTime > 32) { // ~30fps max
                requestAnimationFrame(animate)

                objects.forEach((object, index) => {
                    object.rotation.x += 0.01 * (index + 1)
                    object.rotation.y += 0.01 * (index + 1)
                })

                renderer.render(scene, camera)
                lastTime = currentTime
            } else {
                requestAnimationFrame(animate)
            }
        }

        animate()

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container.clientWidth, container.clientHeight)
        })
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, observerOptions)

        // Observe elements for animation
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el)
        })
    }

    // Project Cards
    function initProjectCards() {
        console.log('=== PROJECTS DEBUG START ===')

        const container = document.getElementById('projects-container')
        if (!container) {
            console.error('❌ Projects container not found')
            return
        }

        console.log('✅ Projects container found:', container)

        // Test: Verify we can access the projects data
        const testProjects = [
            "Crystal CRM System",
            "Countries API Module",
            "Wuzzuf Plus - Job Platform",
            "Elmenus - Multi-Vendor SaaS",
            "Medical E-commerce Platform"
        ]
        console.log('🧪 Test projects list:', testProjects)
        console.log('🧪 Expected count: 5 projects')
        console.log('🖼️ Project images:', window.projectImages)

        // Load projects from embedded data
        console.log('🚀 Calling loadProjectsFromData...')
        loadProjectsFromData()

        // Add a fallback check after a short delay
        setTimeout(() => {
            const displayedProjects = container.querySelectorAll('.project-card')
            console.log('🔍 Fallback check - Projects displayed:', displayedProjects.length)
            if (displayedProjects.length < 5) {
                console.warn('⚠️ Not all projects displayed, forcing fallback...')
                displayFallbackProjects()
            }
        }, 1000)

        console.log('=== PROJECTS DEBUG END ===')
    }

    // Project images array - corresponds to the 6 projects in sequence
    window.projectImages = [
        "placeholder/colored/1.png",  // Crystal CRM System
        "placeholder/colored/2.png",  // AI Smartshop - AI-Powered E-Commerce
        "placeholder/colored/3.png",  // Wuzzuf Plus - Job Platform
        "placeholder/colored/4.png",  // Elmenus - Multi-Vendor SaaS
        "placeholder/colored/5.png",  // Medical E-commerce Platform
        "placeholder/colored/6.png"   // Laravel-React E-commerce SPA
    ]

    // Project links array - corresponds to the 6 projects in sequence
    window.projectLinks = [
        "http://crystalcrm.byethost12.com/",           // Crystal CRM System
        "",                                            // AI Smartshop - No live URL
        "http://wuzzuf-plus.byethost8.com/",          // Wuzzuf Plus - Job Platform
        "http://elmenus.byethost18.com/",             // Elmenus - Multi-Vendor SaaS
        "",                                            // Medical E-commerce Platform (no live URL)
        ""                                             // Laravel-React E-commerce SPA (no live URL)
    ]

    // Project GitHub links array - corresponds to the 6 projects in sequence
    window.projectGit = [
        "https://github.com/MuhammedKAldin/php_crystal_crm",           // Crystal CRM System
        "https://github.com/MuhammedKAldin/AI-Smartshop",              // AI Smartshop - AI-Powered E-Commerce
        "https://github.com/MuhammedKAldin/laravel_wuzzuf",            // Wuzzuf Plus - Job Platform
        "https://github.com/MuhammedKAldin/laravel_elmenus",           // Elmenus - Multi-Vendor SaaS
        "https://github.com/MuhammedKAldin/laravel_ecommerce_medicine", // Medical E-commerce Platform
        "https://github.com/MuhammedKAldin/laravel-react-ecommerce"    // Laravel-React E-commerce SPA
    ]

    async function loadProjectsFromData() {
        try {
            console.log('🔄 Loading projects from embedded data...')

            // Use only the 6 specific projects
            const projects = [
                {
                    "name": "AI-Powered E-Commerce Platform",
                    "screenshot": window.projectImages[1],
                    "features": [
                        "Gemini-powered Product Recommendations",
                        "Advanced Shopping Cart with Real-time Updates",
                        "Secure Payment Gateway Integration (Stripe)",
                        "Multi-tenant User & Admin Management",
                        "Complete Order Lifecycle Management",
                        "AI-Driven Personalization Engine",
                        "User Behavior Analytics & Tracking",
                        "Context-Aware Smart Suggestions",
                        "Modern Admin Panel (Filament)",
                        "Responsive Progressive Web App (PWA)"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "AI", "E-commerce", "Stripe", "Gemini"],
                    "skills": ["Laravel", "Alpine.js", "TailwindCSS", "MySQL", "Stripe", "Google Gemini"],
                    "description": "A modern, AI-powered e-commerce platform with intelligent product recommendations, Stripe payments, and a full admin panel.",
                    "instructions": [
                        "Admin Account:",
                        "- Email: admin@smartshop.com / Password: password",
                        "Customer Accounts:",
                        "- customer@smartshop.com / password",
                        "- jane@smartshop.com / password",
                        "- mike@smartshop.com / password",
                        "- moha@gmail.com / password"
                    ],
                    "url": "",
                    "codespace": "https://github.com/MuhammedKAldin/AI-Smartshop"
                },
                {
                    "name": "Healthcare E-Commerce Platform",
                    "screenshot": window.projectImages[4],
                    "features": [
                        "Advanced Product Catalog Management",
                        "Secure Shopping Cart & Checkout",
                        "Guest & User Authentication",
                        "Comprehensive Order Management",
                        "Automated Invoice Generation",
                        "Admin Dashboard & Analytics",
                        "Role-based Access Control (RBAC)",
                        "Image Processing & Optimization",
                        "Inventory Management System",
                        "Compliance & Security Features"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "E-commerce", "Healthcare", "Security", "Compliance"],
                    "skills": ["Laravel", "MySQL", "Blade", "TailwindCSS", "Bootstrap", "JavaScript", "Payment Integration", "Security"],
                    "description": "Specialized healthcare e-commerce platform with advanced security features, compliance management, automated inventory tracking, and secure payment processing designed for medical and pharmaceutical product sales.",
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
                },
                {
                    "name": "Laravel-React E-commerce SPA",
                    "screenshot": window.projectImages[5],
                    "features": [
                        "Modern React Single Page Application",
                        "Laravel Sanctum API Authentication",
                        "Token-based Security System",
                        "Protected Routes & Middleware",
                        "Real-time Cart Management",
                        "Secure Payment Processing",
                        "Responsive Mobile-First Design",
                        "Rate Limiting & Security Headers",
                        "CSRF Protection & XSS Prevention",
                        "Local Storage Token Management"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "React", "SPA", "API", "Security"],
                    "skills": ["Laravel", "React", "Sanctum", "MySQL", "API Development", "Token Authentication", "Security", "SPA"],
                    "description": "Modern full-stack e-commerce application built with Laravel backend API and React frontend SPA, featuring secure token-based authentication, real-time updates, and enterprise-grade security implementation.",
                    "instructions": [
                        "Test Account:",
                        "- Email: muhammedk.aldin@gmail.com / Password: Test@123456",
                        "",
                        "Security Features:",
                        "- Rate limiting on all endpoints",
                        "- Token-based authentication",
                        "- CSRF protection",
                        "- XSS prevention",
                        "- Input validation & sanitization"
                    ],
                    "url": "",
                    "codespace": "https://github.com/MuhammedKAldin/laravel-react-ecommerce"
                },
                {
                    "name": "Advanced Job Portal Platform",
                    "screenshot": window.projectImages[2],
                    "features": [
                        "Intelligent Job Matching Algorithm",
                        "Advanced Applicant Tracking System (ATS)",
                        "Employer Verification & Trust System",
                        "AI-Powered Search & Filtering",
                        "Real-time Messaging & Video Chat",
                        "Automated Interview Scheduling",
                        "Resume Parsing & Management",
                        "Advanced Analytics Dashboard",
                        "Multi-role User Management",
                        "Notification System"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "Job Portal", "Real-time", "AI", "ATS"],
                    "skills": ["Laravel", "MySQL", "Pusher", "WebSockets", "Real-time", "Bootstrap", "JavaScript", "AI Matching"],
                    "description": "Comprehensive job portal platform with intelligent matching algorithms, real-time communication features, advanced applicant tracking system, and AI-powered job recommendations for optimal recruitment efficiency.",
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
                    "name": "Multi-Vendor SaaS Platform",
                    "screenshot": window.projectImages[3],
                    "features": [
                        "Restaurant Menu Management System",
                        "Multi-tenant Architecture",
                        "Advanced Order Processing & Tracking",
                        "Payment Gateway Integration (Paymob)",
                        "Customer Relationship Management",
                        "Business Intelligence & Analytics",
                        "RESTful API & Webhooks",
                        "Real-time Order Updates",
                        "Commission Management System",
                        "Mobile-Responsive Dashboard"
                    ],
                    "tags": ["Fullstack", "Laravel 10", "SaaS", "Multi-Vendor", "API", "Microservices"],
                    "skills": ["Laravel", "MySQL", "Paymob API", "Multi-tenancy", "RESTful API", "Webhooks", "SaaS Architecture"],
                    "description": "Enterprise-grade multi-vendor SaaS platform for restaurant management featuring microservices architecture, advanced payment processing, real-time analytics, and scalable multi-tenant infrastructure for food delivery businesses.",
                    "instructions": [
                        "Test Accounts (email/pw):",
                        "- McDonald's Owner: test@example.com / test12345678",
                        "- McDonald's Owner: test2@gmail.com / test12345678",
                        "- Customer sample: test3@gmail.com / test12345678"
                    ],
                    "url": "http://elmenus.byethost18.com/",
                    "codespace": "https://github.com/MuhammedKAldin/laravel_elmenus"
                }
            ]

            console.log('✅ Projects data loaded successfully:', projects.length, 'projects')
            console.log('📋 Projects:', projects)

            // Verify each project has required fields
            projects.forEach((project, index) => {
                console.log(`Project ${index + 1}:`, project.name)
                if (!project.name || !project.description) {
                    console.warn(`⚠️ Project ${index + 1} missing required fields:`, project)
                }
            })

            displayProjects(projects)
        } catch (error) {
            console.error('❌ Error loading projects:', error)
            console.log('🔄 Falling back to static projects...')
            displayFallbackProjects()
        }
    }

    function displayProjects(projects) {
        const container = document.getElementById('projects-container')
        if (!container) {
            console.error('❌ Projects container not found')
            return
        }

        console.log('🎨 Displaying projects:', projects.length)
        console.log('📍 Container:', container)

        // Clear container first
        container.innerHTML = ''

        // Debug: Log each project being processed
        projects.forEach((project, index) => {
            console.log(`📱 Creating project card ${index + 1}:`, project.name)
            console.log(`   - Tags:`, project.tags)
            console.log(`   - Skills:`, project.skills)
            console.log(`   - Screenshot:`, project.screenshot)

            const projectCard = createProjectCard(project, index)
            if (projectCard) {
                container.appendChild(projectCard)
                console.log(`✅ Project card ${index + 1} added to container`)
            } else {
                console.error(`❌ Failed to create project card ${index + 1}`)
            }
        })

        console.log('✅ All project cards created and added to container')
        console.log('🔍 Final container children count:', container.children.length)

        // No tilt effects needed for expertise-style cards
        console.log('✅ Project cards created in expertise style')
    }

    function createProjectCard(project, index) {
        console.log(`🔨 Creating project card for: ${project.name}`)

        const card = document.createElement('div')
        card.className = 'project-expertise-item'

        // Get appropriate icon based on project type
        const getProjectIcon = (projectName, skills) => {
            const name = projectName.toLowerCase()
            const skillList = skills ? skills.join(' ').toLowerCase() : ''

            if (name.includes('crm') || name.includes('erp') || name.includes('system')) {
                return 'fas fa-cogs'
            } else if (name.includes('e-commerce') || name.includes('ecommerce') || name.includes('shop')) {
                return 'fas fa-shopping-cart'
            } else if (name.includes('chat') || name.includes('messaging')) {
                return 'fas fa-comments'
            } else if (name.includes('lms') || name.includes('learning') || name.includes('education')) {
                return 'fas fa-graduation-cap'
            } else if (name.includes('api') || name.includes('integration')) {
                return 'fas fa-plug'
            } else if (skillList.includes('react') || skillList.includes('vue')) {
                return 'fas fa-desktop'
            } else if (skillList.includes('laravel') || skillList.includes('php')) {
                return 'fas fa-server'
            } else {
                return 'fas fa-code'
            }
        }

        const projectIcon = getProjectIcon(project.name, project.skills)
        console.log(`   - Icon selected: ${projectIcon}`)

        // Create project card with technology badges and buttons
        const technologies = project.skills ? project.skills.slice(0, 6) : []
        const demoButton = project.url && project.url !== '#' ?
            `<a href="${project.url}" target="_blank" class="project-demo-btn" aria-label="View Demo">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>` :
            `<button class="project-demo-btn disabled" disabled aria-label="Demo Not Available">
                <i class="fas fa-external-link-alt"></i> Demo
            </button>`

        card.innerHTML = `
            <div class="project-card-header">
                <i class="${projectIcon}"></i>
                <h4 class="project-title">${project.name}</h4>
            </div>
            <div class="project-technologies">
                ${technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <div class="project-actions">
                <a href="${project.codespace}" target="_blank" class="project-code-btn" aria-label="View Source Code">
                    <i class="fab fa-github"></i> Code
                </a>
                ${demoButton}
            </div>
        `

        // Add click event for project details (but not on buttons)
        card.addEventListener('click', (e) => {
            // Don't trigger modal if clicking on buttons or links
            if (!e.target.closest('.project-actions')) {
                showProjectModal(project)
            }
        })

        console.log(`✅ Project card created successfully for: ${project.name}`)
        return card
    }

    function displayFallbackProjects() {
        const container = document.getElementById('projects-container')
        if (!container) {
            console.error('Container not found for fallback projects')
            return
        }

        console.log('Displaying fallback projects')

        // Clear container first
        container.innerHTML = ''

        const fallbackProjects = [
            {
                "name": "AI-Powered E-Commerce Platform",
                "screenshot": window.projectImages[1],
                "features": [
                    "Gemini-powered Product Recommendations",
                    "Advanced Shopping Cart with Real-time Updates",
                    "Secure Payment Gateway Integration (Stripe)",
                    "Multi-tenant User & Admin Management",
                    "Complete Order Lifecycle Management",
                    "AI-Driven Personalization Engine",
                    "User Behavior Analytics & Tracking",
                    "Context-Aware Smart Suggestions",
                    "Modern Admin Panel (Filament)",
                    "Responsive Progressive Web App (PWA)"
                ],
                "tags": ["Fullstack", "Laravel 10", "AI", "E-commerce", "Stripe", "PWA"],
                "skills": ["Laravel", "Alpine.js", "TailwindCSS", "MySQL", "Stripe API", "Google Gemini AI", "PWA"],
                "description": "Next-generation AI-powered e-commerce platform featuring Gemini-based recommendations, secure payment processing, real-time analytics, and modern PWA architecture for optimal user experience and conversion optimization.",
                "instructions": [
                    "Admin Account:",
                    "- Email: admin@smartshop.com / Password: password",
                    "Customer Accounts:",
                    "- customer@smartshop.com / password",
                    "- jane@smartshop.com / password",
                    "- mike@smartshop.com / password",
                    "- moha@gmail.com / password"
                ],
                "url": "",
                "codespace": "https://github.com/MuhammedKAldin/AI-Smartshop"
            },
            {
                "name": "Advanced Job Portal Platform",
                "screenshot": window.projectImages[2],
                "features": [
                    "Intelligent Job Matching Algorithm",
                    "Advanced Applicant Tracking System (ATS)",
                    "Employer Verification & Trust System",
                    "AI-Powered Search & Filtering",
                    "Real-time Messaging & Video Chat",
                    "Automated Interview Scheduling",
                    "Resume Parsing & Management",
                    "Advanced Analytics Dashboard",
                    "Multi-role User Management",
                    "Notification System"
                ],
                "tags": ["Fullstack", "Laravel 10", "Job Portal", "Real-time", "AI", "ATS"],
                "skills": ["Laravel", "MySQL", "Pusher", "WebSockets", "Real-time", "Bootstrap", "JavaScript", "AI Matching"],
                "description": "Comprehensive job portal platform with intelligent matching algorithms, real-time communication features, advanced applicant tracking system, and AI-powered job recommendations for optimal recruitment efficiency.",
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
                "name": "Multi-Vendor SaaS Platform",
                "screenshot": window.projectImages[3],
                "features": [
                    "Restaurant Menu Management System",
                    "Multi-tenant Architecture",
                    "Advanced Order Processing & Tracking",
                    "Payment Gateway Integration (Paymob)",
                    "Customer Relationship Management",
                    "Business Intelligence & Analytics",
                    "RESTful API & Webhooks",
                    "Real-time Order Updates",
                    "Commission Management System",
                    "Mobile-Responsive Dashboard"
                ],
                "tags": ["Fullstack", "Laravel 10", "SaaS", "Multi-Vendor", "API", "Microservices"],
                "skills": ["Laravel", "MySQL", "Paymob API", "Multi-tenancy", "RESTful API", "Webhooks", "SaaS Architecture"],
                "description": "Enterprise-grade multi-vendor SaaS platform for restaurant management featuring microservices architecture, advanced payment processing, real-time analytics, and scalable multi-tenant infrastructure for food delivery businesses.",
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
                "name": "Healthcare E-Commerce Platform",
                "screenshot": window.projectImages[4],
                "features": [
                    "Advanced Product Catalog Management",
                    "Secure Shopping Cart & Checkout",
                    "Guest & User Authentication",
                    "Comprehensive Order Management",
                    "Automated Invoice Generation",
                    "Admin Dashboard & Analytics",
                    "Role-based Access Control (RBAC)",
                    "Image Processing & Optimization",
                    "Inventory Management System",
                    "Compliance & Security Features"
                ],
                "tags": ["Fullstack", "Laravel 10", "E-commerce", "Healthcare", "Security", "Compliance"],
                "skills": ["Laravel", "MySQL", "Blade", "TailwindCSS", "Bootstrap", "JavaScript", "Payment Integration", "Security"],
                "description": "Specialized healthcare e-commerce platform with advanced security features, compliance management, automated inventory tracking, and secure payment processing designed for medical and pharmaceutical product sales.",
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
            },
            {
                "name": "Laravel-React E-commerce SPA",
                "screenshot": window.projectImages[5],
                "features": [
                    "Modern React Single Page Application",
                    "Laravel Sanctum API Authentication",
                    "Token-based Security System",
                    "Protected Routes & Middleware",
                    "Real-time Cart Management",
                    "Secure Payment Processing",
                    "Responsive Mobile-First Design",
                    "Rate Limiting & Security Headers",
                    "CSRF Protection & XSS Prevention",
                    "Local Storage Token Management"
                ],
                "tags": ["Fullstack", "Laravel 10", "React", "SPA", "API", "Security"],
                "skills": ["Laravel", "React", "Sanctum", "MySQL", "API Development", "Token Authentication", "Security", "SPA"],
                "description": "Modern full-stack e-commerce application built with Laravel backend API and React frontend SPA, featuring secure token-based authentication, real-time updates, and enterprise-grade security implementation.",
                "instructions": [
                    "Test Account:",
                    "- Email: muhammedk.aldin@gmail.com / Password: Test@123456",
                    "",
                    "Security Features:",
                    "- Rate limiting on all endpoints",
                    "- Token-based authentication",
                    "- CSRF protection",
                    "- XSS prevention",
                    "- Input validation & sanitization"
                ],
                "url": "",
                "codespace": "https://github.com/MuhammedKAldin/laravel-react-ecommerce"
            }
        ]

        fallbackProjects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index)
            container.appendChild(projectCard)
        })

        console.log('Fallback projects displayed:', fallbackProjects.length)

        // No tilt effects needed for expertise-style cards
        console.log('✅ Fallback project cards created in expertise style')
    }

    function showProjectModal(project) {
        const modal = new bootstrap.Modal(document.getElementById('projectModal'))
        const modalBody = document.getElementById('modalBody')

        // Get appropriate icon for the modal
        const getProjectIcon = (projectName, skills) => {
            const name = projectName.toLowerCase()
            const skillList = skills ? skills.join(' ').toLowerCase() : ''

            if (name.includes('crm') || name.includes('erp') || name.includes('system')) {
                return 'fas fa-cogs'
            } else if (name.includes('e-commerce') || name.includes('ecommerce') || name.includes('shop')) {
                return 'fas fa-shopping-cart'
            } else if (name.includes('chat') || name.includes('messaging')) {
                return 'fas fa-comments'
            } else if (name.includes('lms') || name.includes('learning') || name.includes('education')) {
                return 'fas fa-graduation-cap'
            } else if (name.includes('api') || name.includes('integration')) {
                return 'fas fa-plug'
            } else if (skillList.includes('react') || skillList.includes('vue')) {
                return 'fas fa-desktop'
            } else if (skillList.includes('laravel') || skillList.includes('php')) {
                return 'fas fa-server'
            } else {
                return 'fas fa-code'
            }
        }

        const projectIcon = getProjectIcon(project.name, project.skills)

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
        `

        modal.show()
    }

    // Skill Bars Animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress')

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target
                    const width = progressBar.style.width
                    progressBar.style.width = '0%'

                    setTimeout(() => {
                        progressBar.style.width = width
                    }, 200)
                }
            })
        }, { threshold: 0.5 })

        skillBars.forEach(bar => observer.observe(bar))
    }

    // Tilt Effects for 3D Cards
    function initTiltEffects() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.card-3d'), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
            })
        }
    }

    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const target = document.querySelector(this.getAttribute('href'))
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            })
        })
    }

    // Navbar Effects
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar')

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)'
                navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)'
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)'
                navbar.style.boxShadow = 'none'
            }
        }, { passive: true })
    }

    // Lazy Loading for Images
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-load')

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target
                        img.src = img.dataset.src
                        img.classList.remove('lazy-load')
                        img.classList.add('loaded')
                        observer.unobserve(img)
                    }
                })
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            })

            lazyImages.forEach(img => imageObserver.observe(img))
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src
                img.classList.remove('lazy-load')
                img.classList.add('loaded')
            })
        }
    }

    // Parallax Effect for Hero Section
    function initParallaxEffect() {
        const heroBg = document.querySelector('.hero-bg')
        if (!heroBg) return

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset
            const rate = scrolled * -0.5
            heroBg.style.transform = `translateY(${rate}px)`
        }, { passive: true })
    }

    // Typing Effect for Hero Title
    function initTypingEffect() {
        const titleElement = document.querySelector('.hero-title .title')
        if (!titleElement) return

        const text = titleElement.textContent
        titleElement.textContent = ''

        let i = 0
        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i)
                i++
                setTimeout(typeWriter, 100)
            }
        }

        // Start typing after a delay
        setTimeout(typeWriter, 1000)
    }

    // Initialize additional effects
    initParallaxEffect()
    initTypingEffect()

    // Add scroll-triggered animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll')

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top
            const elementVisible = 150

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate')
            }
        })
    }

    window.addEventListener('scroll', animateOnScroll, { passive: true })

    // Skip floating particles for mobile performance
    function createFloatingParticles() {
        // Only create particles on desktop
        if (window.innerWidth <= 768) return

        const particlesContainer = document.createElement('div')
        particlesContainer.className = 'floating-particles'
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `

        document.body.appendChild(particlesContainer)

        // Reduced particle count for better performance
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div')
            particle.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                background: ${Math.random() > 0.5 ? '#00d4ff' : '#ff6b35'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: float ${Math.random() * 15 + 15}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `

            particlesContainer.appendChild(particle)
        }

        // Add CSS animation
        const style = document.createElement('style')
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `
        document.head.appendChild(style)
    }

    // Initialize floating particles with delay
    setTimeout(createFloatingParticles, 5000)

    // Skip interactive cursor for mobile performance
    function initInteractiveCursor() {
        // Only add cursor on desktop
        if (window.innerWidth <= 768) return

        const cursor = document.createElement('div')
        cursor.className = 'custom-cursor'
        cursor.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            background: rgba(0, 212, 255, 0.2);
            border: 1px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            transform: translate(-50%, -50%);
        `

        document.body.appendChild(cursor)

        let mouseX = 0, mouseY = 0
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        })

        // Throttled cursor update
        let cursorUpdate = false
        function updateCursor() {
            if (!cursorUpdate) {
                requestAnimationFrame(() => {
                    cursor.style.left = mouseX + 'px'
                    cursor.style.top = mouseY + 'px'
                    cursorUpdate = false
                })
                cursorUpdate = true
            }
        }

        setInterval(updateCursor, 16) // ~60fps
    }

    // Initialize interactive cursor with delay
    setTimeout(initInteractiveCursor, 3000)

    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div')
        progressBar.className = 'scroll-progress'
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00d4ff, #ff6b35);
            z-index: 10000;
            transition: width 0.1s ease;
        `

        document.body.appendChild(progressBar)

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPercent = (scrollTop / scrollHeight) * 100
            progressBar.style.width = scrollPercent + '%'
        })
    }

    // Initialize scroll progress
    initScrollProgress()

    // Add performance optimization
    let ticking = false

    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-based animations here
                ticking = false
            })
            ticking = true
        }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true })

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextSection = document.querySelector('.hero-section').nextElementSibling
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' })
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const prevSection = document.querySelector('.hero-section')
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    })

    // Add loading states for interactive elements
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', function () {
            if (this.classList.contains('btn')) {
                const originalText = this.innerHTML
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
                this.disabled = true

                setTimeout(() => {
                    this.innerHTML = originalText
                    this.disabled = false
                }, 2000)
            }
        })
    })

    // Add error handling for failed image loads
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
        })
    })

    // Add accessibility improvements
    document.querySelectorAll('[tabindex]').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                element.click()
            }
        })
    })

    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0]
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms')
            }, 0)
        })
    }

    // Add service worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration)
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError)
                })
        })
    }

    // Add theme toggle functionality
    function initThemeToggle() {
        const themeToggle = document.createElement('button')
        themeToggle.className = 'btn btn-outline-primary theme-toggle'
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
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
        `

        document.body.appendChild(themeToggle)

        let isDark = true
        themeToggle.addEventListener('click', () => {
            isDark = !isDark
            document.body.classList.toggle('light-theme')
            themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'
        })
    }

    // Initialize theme toggle
    setTimeout(initThemeToggle, 2000)

    // Add smooth reveal animations for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('section')

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top
            const windowHeight = window.innerHeight

            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('revealed')
            }
        })
    }

    window.addEventListener('scroll', revealSections, { passive: true })
    revealSections() // Initial check

    // Add CSS for revealed sections
    const revealStyle = document.createElement('style')
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
    `
    document.head.appendChild(revealStyle)

    console.log('Portfolio initialized successfully! 🚀')
})