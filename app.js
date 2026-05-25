// ==========================================================================
// APP INITIALIZATION & CORE DYNAMICS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initMouseGlow();
    initTypedSubtitle();
    initTerminalSimulation();
    initProjectFilter();
    initCertificationsModal();
    initCertificationsSlider();
    initScrollReveal();
    initContactForm();
    initScrollSpy();
    initAntiGravity();
});

// ==========================================================================
// STICKY HEADER SCROLL EFFECT
// ==========================================================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// MOBILE MENU NAVIGATION
// ==========================================================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// ==========================================================================
// INTERACTIVE MOUSE GLOW ORB
// ==========================================================================
function initMouseGlow() {
    const orb = document.getElementById('glow-orb');
    if (!orb) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Follow mouse coordinates
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Easing animate function
    const animateOrb = () => {
        const ease = 0.08;
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        orb.style.left = `${currentX}px`;
        orb.style.top = `${currentY}px`;

        requestAnimationFrame(animateOrb);
    };

    // Initialize values offscreen first
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    currentX = targetX;
    currentY = targetY;

    animateOrb();
}

// ==========================================================================
// TYPING EFFECT - HERO SUBTITLE
// ==========================================================================
function initTypedSubtitle() {
    const element = document.getElementById('typed-role');
    if (!element) return;

    const roles = [
        "Cloud & DevOps Engineer",
        "SRE / Platform Engineer",
        "AIOps & MLOps Engineer",
        "Systems Automation Developer",
        "SAP Labs BTP Intern"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            charIndex++;
            typingSpeed = 100;
        }

        element.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    };

    type();
}

// ==========================================================================
// LIVE TERMINAL LOGS & COMMAND SIMULATOR
// ==========================================================================
function initTerminalSimulation() {
    const body = document.getElementById('terminal-body');
    if (!body) return;

    // Helper: Update individual pod status
    const updatePodStatus = (podId, status) => {
        const cell = document.getElementById(`pod-${podId}`);
        if (!cell) return;
        const dot = cell.querySelector('.pod-dot');
        if (!dot) return;

        cell.className = 'pod-cell';
        dot.className = 'pod-dot';

        if (status === 'error') {
            cell.classList.add('error');
            dot.classList.add('red-flash');
        } else if (status === 'healing') {
            cell.classList.add('healing');
            dot.classList.add('yellow');
        } else {
            dot.classList.add('green');
        }
    };

    // Helper: Fluctuate CPU/RAM metrics
    const startMetricsFluctuation = () => {
        setInterval(() => {
            const cpuBar = document.getElementById('cpu-bar');
            const cpuVal = document.getElementById('cpu-val');
            const memBar = document.getElementById('mem-bar');
            const memVal = document.getElementById('mem-val');

            if (cpuBar && cpuVal) {
                const cpu = Math.floor(40 + Math.random() * 15); // 40% - 55%
                cpuBar.style.width = `${cpu}%`;
                cpuVal.textContent = `${cpu}%`;
            }

            if (memBar && memVal) {
                const mem = Math.floor(68 + Math.random() * 8); // 68% - 76%
                memBar.style.width = `${mem}%`;
                memVal.textContent = `${mem}%`;
            }
        }, 2000);
    };

    const initialLogs = [
        '<span class="t-accent">[INIT]</span> Initializing agentic diagnosis cluster...',
        '<span class="t-accent">[OK]</span> Connection to apiserver established.',
        '<span class="t-warn">[WARN]</span> Pod "payment-gateway-7bcf" health check failed: CrashLoopBackOff',
        '<span class="t-accent">[AGENT]</span> Spawning remediation agents (LangGraph)...',
        '<span class="t-accent">[AGENT]</span> Querying local RAG database (ChromaDB) for RCA...',
        '<span class="t-info">[INFO]</span> Root cause: Redis connection timed out. Auto-restarting dependent stateful sets...',
        '<span class="t-accent">[HEALED]</span> Issue resolved. Alert sent to #incident-logs on Discord.'
    ];

    const commandsToType = [
        "kubectl describe pod payment-gateway-7bcf",
        "python metadata_migration_tool.py --src mongodb --dest postgresql",
        "istioctl analyze -n production",
        "ansible-playbook -i hosts site.yml --check"
    ];
    
    let commandIdx = 0;

    const printLogsSequentially = (logs, index, callback) => {
        if (index < logs.length) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = logs[index];
            body.appendChild(line);
            body.scrollTop = body.scrollHeight;

            // Sync pod status based on log contents
            if (logs[index].includes('health check failed')) {
                updatePodStatus('gateway', 'error');
            } else if (logs[index].includes('Spawning remediation agents')) {
                updatePodStatus('gateway', 'healing');
            } else if (logs[index].includes('Issue resolved')) {
                updatePodStatus('gateway', 'running');
            }

            setTimeout(() => {
                printLogsSequentially(logs, index + 1, callback);
            }, 600); // 600ms per log line for a swift but readable animation
        } else {
            callback();
        }
    };

    const resetTerminal = () => {
        body.innerHTML = '';
        
        // Reset pod state to running if we aren't about to run the troubleshooting cycle
        if (commandIdx !== 0) {
            updatePodStatus('gateway', 'running');
        }

        // Print initial logs sequentially
        printLogsSequentially(initialLogs, 0, () => {
            // Add prompt line
            const promptLine = document.createElement('div');
            promptLine.className = 'terminal-line';
            promptLine.innerHTML = '<span class="t-accent">$</span> <span class="typing-placeholder"></span>';
            body.appendChild(promptLine);
            body.scrollTop = body.scrollHeight;

            // Trigger typing after a brief delay
            setTimeout(() => {
                typeCommand(promptLine.querySelector('.typing-placeholder'));
            }, 1000);
        });
    };

    const typeCommand = (targetEl) => {
        if (!targetEl) return;
        const fullCommand = commandsToType[commandIdx];
        let charIdx = 0;
        
        const typeChar = () => {
            if (charIdx < fullCommand.length) {
                targetEl.textContent += fullCommand.charAt(charIdx);
                charIdx++;
                setTimeout(typeChar, 50 + Math.random() * 30); // slightly faster typing
            } else {
                // Command fully typed - trigger stdout simulation
                setTimeout(() => {
                    executeCommandResponse(targetEl);
                }, 800);
            }
        };
        
        typeChar();
    };

    const executeCommandResponse = (typedCommandEl) => {
        typedCommandEl.classList.remove('typing-placeholder');
        
        const responseDiv = document.createElement('div');
        responseDiv.className = 'terminal-line';
        
        const currentCommand = commandsToType[commandIdx];
        if (currentCommand.includes("kubectl")) {
            responseDiv.innerHTML = `<span class="t-info">Name:         payment-gateway-7bcf
Status:       Running (Healed 45s ago)
Containers:   gateway-app (Restart Count: 2)
Conditions:   Ready=True, Initialized=True</span>`;
        } else if (currentCommand.includes("metadata")) {
            responseDiv.innerHTML = `<span class="t-info">Migration toolkit spawned...
Connecting:   MongoDB (Source) -> PostgreSQL (Dest)
Processing:   [■■■■■■■■■■■■■■■■■■■■] 100% migrated
Migration:    24,582 records synchronized successfully (Time: 3.42s)</span>`;
            // Pulse redis / db during migration
            updatePodStatus('cache', 'healing');
            setTimeout(() => updatePodStatus('cache', 'running'), 2000);
        } else if (currentCommand.includes("istioctl")) {
            responseDiv.innerHTML = `<span class="t-healed">✔ No validation issues found in "production" namespace. VirtualServices match DestinationRules.</span>`;
            // Flash ingress green
            updatePodStatus('ingress', 'running');
        } else {
            responseDiv.innerHTML = `<span class="t-accent">PLAY RECAP *****************************************************************
localhost                  : ok=14   changed=3    unreachable=0    failed=0</span>`;
            // Refresh worker node
            updatePodStatus('worker', 'healing');
            setTimeout(() => updatePodStatus('worker', 'running'), 1500);
        }
        
        body.appendChild(responseDiv);
        body.scrollTop = body.scrollHeight;
        
        // Cycle to next command
        commandIdx = (commandIdx + 1) % commandsToType.length;
        
        // Set timeout to reset/restart cycle after 6 seconds of display
        setTimeout(resetTerminal, 6000);
    };

    // Initialize telemetry animations
    startMetricsFluctuation();
    resetTerminal();
}

// ==========================================================================
// REGISTRY PROJECT CATEGORY FILTERS
// ==========================================================================
function initProjectFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Reset card displays with animations
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95) translateY(10px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue || (filterValue === 'cloud' && (category === 'cloud' || category === 'architecture'))) {
                        card.style.display = 'flex';
                        // trigger reflow
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// ==========================================================================
// CERTIFICATIONS DETAIL MODAL VIEW SYSTEM
// ==========================================================================
function initCertificationsModal() {
    const cards = document.querySelectorAll('.cert-card');
    const modal = document.getElementById('cert-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close');
    const bodyContent = document.getElementById('modal-body-content');

    const certData = {
        "AWS Academy Cloud Architecting": {
            title: "AWS Academy Cloud Architecting",
            issuer: "AWS Academy",
            desc: "Validates technical expertise in designing and deploying secure, robust, and cost-optimized distributed systems on the AWS platform.",
            bullets: [
                "In-depth design strategies for VPC networking, subnets, gateways, and routing tables.",
                "High availability architecture configurations with Auto Scaling and Elastic Load Balancing (ELB).",
                "Managed database implementations (Amazon RDS, DynamoDB, ElastiCache).",
                "Infrastructure automation blueprints using AWS CloudFormation.",
                "Serverless workflows mapping API Gateway, Lambda, and SQS queues."
            ]
        },
        "AWS Academy Cloud Security & Builder": {
            title: "AWS Academy Cloud Security and Builder Course",
            issuer: "AWS Academy",
            desc: "Focuses on security operations, secure-by-default architecture strategies, infrastructure auditing, and access control management.",
            bullets: [
                "Deep dive into AWS Identity and Access Management (IAM) permissions, roles, and resource policies.",
                "Auditing cloud deployments using AWS CloudTrail and AWS Config logging frameworks.",
                "Data protection policies covering AWS KMS key management and S3 server-side encryption.",
                "Setting up perimeter security utilizing Web Application Firewalls (WAF) and Shield protection.",
                "Infrastructure validation scanning with AWS Inspector and Amazon GuardDuty."
            ]
        },
        "AWS Academy Cloud Operations": {
            title: "AWS Academy Cloud Operations",
            issuer: "AWS Academy",
            desc: "Validates competence in system administration, application deployment, configuration management, and system operations in an AWS cloud environment.",
            bullets: [
                "Automating server setups, configuration drifts, and patches via AWS Systems Manager.",
                "Establishing real-time observability matrices using CloudWatch Dashboards and custom alarms.",
                "Cloud optimization, monitoring resource runtimes, and cost budgeting models.",
                "Backup strategies and business continuity setups (AWS Backup, AMI lifecycle management).",
                "Cloud environment governance utilizing AWS Organizations and Service Control Policies (SCPs)."
            ]
        },
        "AWS Academy Cloud Foundations": {
            title: "AWS Academy Cloud Foundations",
            issuer: "AWS Academy",
            desc: "Covers the fundamental principles of cloud computing, security models, billing, and core AWS resource constructs.",
            bullets: [
                "Clear understanding of public cloud models, virtualization principles, and global infrastructure.",
                "Overview of EC2 instances, S3 storage buckets, VPC architectures, and RDS databases.",
                "Understanding the Shared Responsibility Model and Cloud Compliance metrics.",
                "Navigating billing structures, cost estimators, and standard support frameworks."
            ]
        },
        "DevOps and AI on AWS": {
            title: "DevOps and AI on AWS",
            issuer: "Coursera (AWS Authorized)",
            desc: "Focuses on incorporating Artificial Intelligence workloads, machine learning lifecycle workflows, and automated deployment engines inside AWS.",
            bullets: [
                "Setting up automated CI/CD pipelines deploying containerized models via AWS CodePipeline.",
                "Configuring training infrastructures and serving endpoints using Amazon SageMaker.",
                "Monitoring model drift, prediction logs, and system load profiles.",
                "Integrating pre-trained AI cognitive services (Lex, Rekognition, Comprehend) into enterprise applications."
            ]
        },
        "DevOps & Kubernetes Credentials": {
            title: "KodeKloud DevOps & GitOps Credentials",
            issuer: "KodeKloud",
            desc: "Practical hands-on lab achievements validating core configuration, administration, scripting, and pipeline skills.",
            bullets: [
                "Kubernetes Cluster Setup, Pod creation, Service bindings, and ConfigMaps/Secrets management.",
                "Writing Dockerfiles and optimizing image dimensions for containerized services.",
                "Developing Ansible playbooks to automate multi-node system installations and configuration management.",
                "Writing Jenkinsfile pipelines containing build, test, and release GitOps stages.",
                "Linux system maintenance, shell scripting, cron setups, and network validations."
            ]
        }
    };

    const openModal = (certKey) => {
        const data = certData[certKey] || {
            title: certKey,
            issuer: "AWS Academy / KodeKloud",
            desc: "Technical credential proving hands-on capabilities. Check the verification directory.",
            bullets: ["Hands-on lab achievements", "Verified credentials repository"]
        };

        let bulletsHtml = data.bullets.map(b => `<li>${b}</li>`).join('');

        bodyContent.innerHTML = `
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-desc"><strong>Issuer:</strong> ${data.issuer}</p>
            <p class="modal-desc">${data.desc}</p>
            <h4 style="margin-bottom:10px; font-size:1rem; color:var(--color-text-primary)">Key Knowledge Areas:</h4>
            <ul class="modal-bullets">
                ${bulletsHtml}
            </ul>
            <a href="https://drive.google.com/drive/folders/1w7olNVTp16XGdCM8M6207m_hozTK3fGh?usp=sharing" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-action-btn">
                <span>View Drive Verification Directory</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const certTitle = card.querySelector('.cert-title').textContent.trim();
            // Match substring or full title
            let matchedKey = Object.keys(certData).find(key => certTitle.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(certTitle.toLowerCase()));
            openModal(matchedKey || certTitle);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================================================
// CERTIFICATIONS HORIZONTAL SLIDER/CAROUSEL LOGIC
// ==========================================================================
function initCertificationsSlider() {
    const track = document.getElementById('cert-track');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    if (!track || !prevBtn || !nextBtn) return;

    const getScrollOffset = () => {
        const firstCard = track.firstElementChild;
        if (!firstCard) return 300;
        return firstCard.getBoundingClientRect().width + 24; // Width + gap
    };

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    });
}

// ==========================================================================
// SCROLL-REVEAL SLIDING SECTIONS (INTERSECTION OBSERVER)
// ==========================================================================
function initScrollReveal() {
    const revealSections = document.querySelectorAll('.scroll-reveal-section');
    if (!revealSections.length) return;

    const observerOptions = {
        root: null, // Default viewport
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -40px 0px' // Slightly offset trigger point
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });
}

// ==========================================================================
// INTERACTIVE CONTACT FORM & WEBMAIL GATEWAY
// ==========================================================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');
    const statusText = document.getElementById('form-status');
    const btnSpan = submitBtn.querySelector('span');

    if (!form) return;

    const RECIPIENT_EMAIL = 'bharathac5775@gmail.com';

    const buildMailtoFallback = (name, email, message) =>
        `<a href="mailto:${RECIPIENT_EMAIL}?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AReply to: ${encodeURIComponent(email)}" class="btn btn-secondary btn-sm" style="margin-top:10px; display:inline-flex;"><span>Open Direct Webmail Link</span></a>`;

    const isLocalDev = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(window.location.hostname)
        || window.location.protocol === 'file:';

    // On localhost there's no Netlify backend — keep the simulated "dev mode"
    // notice with a mailto fallback so dev isn't silently broken.
    if (isLocalDev) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;
            submitBtn.disabled = true;
            btnSpan.textContent = 'Transmitting...';
            statusText.className = 'form-status';
            statusText.innerHTML = '<span class="t-accent">[SEND]</span> Uploading payload variables to smtp.gateway...';
            setTimeout(() => {
                btnSpan.textContent = 'Execute Transmission';
                submitBtn.disabled = false;
                statusText.className = 'form-status error';
                statusText.innerHTML = `
                    <span class="t-error">[ERR] Transmission failed:</span> local dev mode (deploy to Netlify for live form)<br>
                    <span>Use the direct webmail fallback below.</span><br>
                    ${buildMailtoFallback(name, email, message)}
                `;
            }, 1200);
        });
        return;
    }

    // Production (Netlify): use AJAX fetch submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent native navigation which causes 404s
        
        submitBtn.disabled = true;
        btnSpan.textContent = 'Transmitting...';
        statusText.className = 'form-status';
        statusText.innerHTML = '<span class="t-accent">[SEND]</span> Uploading payload variables to smtp.gateway...';

        const formData = new FormData(form);
        const searchParams = new URLSearchParams();
        
        // Explicitly append the form-name so Netlify knows which form is submitting
        searchParams.append('form-name', 'contact');
        
        for (const pair of formData) {
            // Prevent duplicate form-name if FormData already picked it up from the hidden input
            if (pair[0] !== 'form-name') {
                searchParams.append(pair[0], pair[1]);
            }
        }

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: searchParams.toString()
        })
        .then(() => {
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                btnSpan.textContent = 'Execute Transmission';
                statusText.className = 'form-status success';
                statusText.innerHTML = '<span class="t-accent">[OK]</span> Status 202 — message accepted. I\'ll reply shortly.';
            }, 800);
        })
        .catch((error) => {
            setTimeout(() => {
                submitBtn.disabled = false;
                btnSpan.textContent = 'Execute Transmission';
                statusText.className = 'form-status error';
                statusText.innerHTML = `
                    <span class="t-error">[ERR] Transmission failed.</span><br>
                    <span>Please use the direct webmail fallback below.</span><br>
                    ${buildMailtoFallback(
                        document.getElementById('form-name').value, 
                        document.getElementById('form-email').value, 
                        document.getElementById('form-message').value
                    )}
                `;
            }, 800);
        });
    });
}

// ==========================================================================
// SCROLLSPY NAVIGATION HIGHLIGHTS
// ==========================================================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Custom check for bottom of screen to highlight Contact
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#contact') {
                    link.classList.add('active');
                }
            });
        }
    });
}


// ==========================================================================
// TECH ECOSYSTEM — ANTI-GRAVITY ORBIT
// Four quadrant hubs (DevOps / Cloud / AI / Data); logos float around each
// hub on randomized swarm-float animations. Hub label sits in the center.
// Improvements over the original: jittered grid scatter (no overlap),
// keyboard focus support, prefers-reduced-motion guard, mobile-aware sizing.
// ==========================================================================
function initAntiGravity() {
    const canvas = document.getElementById('orbit-canvas');
    if (!canvas) return;

    canvas.innerHTML = '';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const techCategories = {
        devops: {
            title: 'DevOps & CI/CD',
            pos: { top: '6%', left: '6%' },
            items: [
                { name: 'Jenkins', file: 'jenkins' },
                { name: 'Docker', file: 'docker' },
                { name: 'Kubernetes', file: 'kubernetes' },
                { name: 'Helm', file: 'helm' },
                { name: 'Terraform', file: 'terraform' },
                { name: 'Ansible', file: 'ansible' },
                { name: 'GitHub', file: 'github', ext: '.png' },
                { name: 'GitLab', file: 'gitlab' },
                { name: 'CircleCI', file: 'circleci' },
                { name: 'ArgoCD', file: 'argocd' },
                { name: 'GitHub Actions', file: 'githubactions' }
            ]
        },
        cloud: {
            title: 'Cloud & Infra',
            pos: { top: '6%', right: '6%' },
            items: [
                { name: 'AWS', file: 'aws' },
                { name: 'Azure', file: 'azure' },
                { name: 'GCP', file: 'gcp' },
                { name: 'Linux', file: 'linux' },
                { name: 'Nginx', file: 'nginx' },
                { name: 'Prometheus', file: 'prometheus' },
                { name: 'Grafana', file: 'grafana' },
                { name: 'Fluentd', file: 'fluentd' },
                { name: 'Elasticsearch', file: 'elasticsearch' },
                { name: 'Datadog', file: 'datadog' },
                { name: 'Jaeger', file: 'jaeger' },
                { name: 'Kibana', file: 'kibana' },
                { name: 'Loki', file: 'loki', ext: '.png' },
                { name: 'OpenTelemetry', file: 'opentelemetry' },
                { name: 'SAP', file: 'sap' },
                { name: 'SAP Kyma', file: 'sapkyma', ext: '.png' }
            ]
        },
        aiml: {
            title: 'AI & Agents',
            pos: { bottom: '6%', left: '6%' },
            items: [
                { name: 'Python', file: 'python' },
                { name: 'LangChain', file: 'langchain' },
                { name: 'Anthropic', file: 'anthropic' },
                { name: 'PyTorch', file: 'pytorch' },
                { name: 'TensorFlow', file: 'tensorflow' },
                { name: 'Gemini', file: 'gemini', ext: '.png' },
                { name: 'Ollama', file: 'ollama' },
                { name: 'CrewAI', file: 'crewai' },
                { name: 'Claude', file: 'claude', ext: '.png' },
                { name: 'Hermes Agent', file: 'hermes-agent', ext: '.png' },
                { name: 'OpenClaw', file: 'openclaw', ext: '.png' }
            ]
        },
        programming: {
            title: 'Code & Data',
            pos: { bottom: '6%', right: '6%' },
            items: [
                { name: 'Java', file: 'java' },
                { name: 'Shell', file: 'shell' },
                { name: 'PostgreSQL', file: 'postgresql' },
                { name: 'MongoDB', file: 'mongodb' },
                { name: 'Redis', file: 'redis' },
                { name: 'Kafka', file: 'kafka' },
                { name: 'SQL', file: 'sql' },
                { name: 'Apache', file: 'apache' },
                { name: 'Hadoop', file: 'hadoop' },
                { name: 'PySpark', file: 'pyspark' }
            ]
        }
    };

    // Jittered-grid scatter: prevents the random overlap that plagued the original.
    // Cells overlapping the central 35-65% box are skipped (hub-core lives there).
    const scatterPositions = (count) => {
        // Bias to more columns so we always have enough cells after the central
        // dead-zone is removed. count*2 gives a safe upper bound.
        const cols = Math.max(4, Math.ceil(Math.sqrt(count * 2)));
        const rows = Math.max(4, Math.ceil((count * 2) / cols));
        const cellW = 100 / cols;
        const cellH = 100 / rows;
        const positions = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cx = (c + 0.5) * cellW;
                const cy = (r + 0.5) * cellH;
                if (cx > 35 && cx < 65 && cy > 35 && cy < 65) continue;
                positions.push({ cx, cy, cellW, cellH });
            }
        }

        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }

        return positions.slice(0, count).map(({ cx, cy, cellW, cellH }) => ({
            left: cx + (Math.random() - 0.5) * cellW * 0.45,
            top:  cy + (Math.random() - 0.5) * cellH * 0.45,
        }));
    };

    Object.entries(techCategories).forEach(([key, category]) => {
        const hub = document.createElement('div');
        hub.className = 'tech-hub';

        if (category.pos.top) hub.style.top = category.pos.top;
        if (category.pos.bottom) hub.style.bottom = category.pos.bottom;
        if (category.pos.left) hub.style.left = category.pos.left;
        if (category.pos.right) hub.style.right = category.pos.right;

        if (!reduceMotion) {
            hub.style.animationDelay = `${(Math.random() * -10).toFixed(2)}s`;
        }

        const core = document.createElement('div');
        core.className = 'hub-core';
        core.textContent = category.title;
        hub.appendChild(core);

        const positions = scatterPositions(category.items.length);

        category.items.forEach((tech, i) => {
            const wrapper = document.createElement('button');
            wrapper.type = 'button';
            wrapper.className = 'swarm-item';
            wrapper.setAttribute('aria-label', tech.name);
            wrapper.setAttribute('data-tooltip', tech.name);

            const { left, top } = positions[i];
            wrapper.style.left = `calc(${left}% - 25px)`;
            wrapper.style.top  = `calc(${top}% - 25px)`;

            if (!reduceMotion) {
                const duration = 9 + Math.random() * 9;
                const delay = Math.random() * -20;
                wrapper.style.animationDuration = `${duration}s`;
                wrapper.style.animationDelay = `${delay}s`;
                if (Math.random() > 0.5) {
                    wrapper.style.animationName = 'swarmFloatReverse';
                }
            }

            const img = document.createElement('img');
            img.src = `assets/tech-logos/${tech.file}${tech.ext || '.svg'}`;
            img.alt = '';
            img.loading = 'lazy';

            const randomScale = 0.85 + (Math.random() * 0.3);
            img.style.transform = `scale(${randomScale})`;

            img.onerror = () => { wrapper.style.display = 'none'; };

            wrapper.appendChild(img);

            wrapper.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.swarm-item.is-tapped').forEach(el => {
                    if (el !== wrapper) el.classList.remove('is-tapped');
                });
                wrapper.classList.toggle('is-tapped');
            });

            hub.appendChild(wrapper);
        });

        canvas.appendChild(hub);
    });

    canvas.addEventListener('click', (e) => {
        if (!e.target.closest('.swarm-item')) {
            document.querySelectorAll('.swarm-item.is-tapped').forEach(el => el.classList.remove('is-tapped'));
        }
    });
}
