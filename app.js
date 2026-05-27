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
    initCertificationsSlider();
    initCertificationsModal();
    initScrollReveal();
    initContactForm();
    initScrollSpy();
    initAntiGravity();
    initPlatformPipeline();
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
        "SRE & Platform Engineering",
        "AIOps & MLOps Developer",
        "Systems Automation",
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
        "DevOps and Cloud Certificate": {
            title: "KodeKloud DevOps and Cloud Certificate",
            issuer: "KodeKloud",
            desc: "Bundle of KodeKloud course completions covering the core DevOps and cloud-native toolchain — configuration management, containers, CI/CD, source control, infrastructure-as-code, and Linux foundations.",
            bullets: [
                "Ansible — playbook authoring, inventories, roles, and multi-node configuration management.",
                "AWS 100 Days Challenge — daily hands-on labs spanning compute, storage, networking, IAM, and serverless.",
                "Docker — image building, Dockerfile optimization, multi-stage builds, and container runtime fundamentals.",
                "Git — branching workflows, rebases, conflict resolution, and team collaboration patterns.",
                "Jenkins — declarative pipelines, build/test/deploy stages, and GitOps integration.",
                "Kubernetes — cluster setup, Pods, Services, ConfigMaps, Secrets, and Deployments.",
                "Linux — system administration, shell scripting, cron jobs, and networking diagnostics.",
                "Terraform — provider configuration, state management, modules, and IaC for AWS resources."
            ],
            link: "https://drive.google.com/drive/folders/1CljZFmNypH4roDqPuLuryDTzVpWEpi7v?usp=sharing"
        }
    };

    const DEFAULT_VERIFY_LINK = "https://drive.google.com/drive/folders/1w7olNVTp16XGdCM8M6207m_hozTK3fGh?usp=sharing";

    let modalIsOpen = false;
    let pushedHistory = false;

    const openModal = (certKey) => {
        const data = certData[certKey] || {
            title: certKey,
            issuer: "AWS Academy / KodeKloud",
            desc: "Technical credential proving hands-on capabilities. Check the verification directory.",
            bullets: ["Hands-on lab achievements", "Verified credentials repository"]
        };

        let bulletsHtml = data.bullets.map(b => `<li>${b}</li>`).join('');
        const verifyLink = data.link || DEFAULT_VERIFY_LINK;

        bodyContent.innerHTML = `
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-desc"><strong>Issuer:</strong> ${data.issuer}</p>
            <p class="modal-desc">${data.desc}</p>
            <h4 style="margin-bottom:10px; font-size:1rem; color:var(--color-text-primary)">Key Knowledge Areas:</h4>
            <ul class="modal-bullets">
                ${bulletsHtml}
            </ul>
            <a href="${verifyLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary modal-action-btn">
                <span>View Drive Verification Directory</span>
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        // Reset scroll position so new cards start from the top.
        bodyContent.scrollTop = 0;
        // Push a history entry so the OS / browser back button closes the
        // modal instead of leaving the site. Only push once per modal session;
        // re-opens while already open just swap content.
        if (!modalIsOpen) {
            modalIsOpen = true;
            try {
                history.pushState({ certModal: true }, '');
                pushedHistory = true;
            } catch (_) {
                pushedHistory = false;
            }
        }
    };

    // Closes the modal without touching history. Used by the popstate handler
    // (history is already moving backward) and as the underlying close path.
    const performClose = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        modalIsOpen = false;
        pushedHistory = false;
    };

    // User-initiated close paths (X, backdrop, Escape) prefer history.back()
    // so the pushed state is unwound — keeps history clean and consistent.
    const closeModal = () => {
        if (!modalIsOpen) return;
        if (pushedHistory) {
            history.back(); // popstate handler will run performClose()
        } else {
            performClose();
        }
    };

    window.addEventListener('popstate', () => {
        if (modalIsOpen) performClose();
    });

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
    const container = document.querySelector('.cert-slider-container');
    const prevBtn = document.getElementById('cert-prev');
    const nextBtn = document.getElementById('cert-next');
    if (!track || !container) return;

    // Duplicate cards once so the marquee loops seamlessly: when the offset
    // hits the end of the original set, we wrap back to 0 and the duplicates
    // are visually identical, so there's no visible jump.
    const originals = Array.from(track.children);
    originals.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.dataset.clone = 'true';
        track.appendChild(clone);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let offset = 0;          // current translateX in px (negative = scrolled left)
    let originalWidth = 0;   // width of one full set of cards (originals only)
    let paused = reduceMotion;
    const SPEED = 30;        // px per second
    let lastTs = 0;

    const measure = () => {
        // Half of total scrollWidth = width of one full original set,
        // since we duplicated the children exactly once.
        originalWidth = track.scrollWidth / 2;
    };

    const apply = () => {
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (ts) => {
        if (!lastTs) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;
        if (!paused && originalWidth > 0) {
            offset -= SPEED * dt;
            if (offset <= -originalWidth) offset += originalWidth;
            apply();
        }
        requestAnimationFrame(tick);
    };

    // Pause/resume on hover (desktop)
    container.addEventListener('mouseenter', () => { paused = true; });
    container.addEventListener('mouseleave', () => {
        if (!dragging) { paused = false; lastTs = 0; }
    });

    // Pointer-drag (works for both touch and mouse). The track follows the
    // finger 1:1, then resumes auto-scrolling from wherever it was released.
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let dragMoved = false;

    const onPointerDown = (e) => {
        dragging = true;
        dragMoved = false;
        paused = true;
        track.style.transition = '';
        dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
        dragStartOffset = offset;
        track.classList.add('is-dragging');
    };

    const onPointerMove = (e) => {
        if (!dragging) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const dx = x - dragStartX;
        if (Math.abs(dx) > 4) dragMoved = true;
        offset = dragStartOffset + dx;
        if (originalWidth > 0) {
            while (offset <= -originalWidth) offset += originalWidth;
            while (offset > 0) offset -= originalWidth;
        }
        apply();
    };

    const onPointerUp = () => {
        if (!dragging) return;
        dragging = false;
        track.classList.remove('is-dragging');
        // If the user actually dragged, suppress the click that would otherwise
        // open the cert modal on touch-end.
        if (dragMoved) {
            const block = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
            track.addEventListener('click', block, { capture: true, once: true });
        }
        // Resume auto-scroll unless still hovered (desktop). On mobile we
        // resume immediately since there's no hover state.
        const stillHovered = container.matches(':hover');
        if (!stillHovered) { paused = false; lastTs = 0; }
    };

    track.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    track.addEventListener('touchstart', onPointerDown, { passive: true });
    track.addEventListener('touchmove', onPointerMove, { passive: true });
    track.addEventListener('touchend', onPointerUp);
    track.addEventListener('touchcancel', onPointerUp);

    // Manual step buttons
    const stepWidth = () => {
        const firstCard = track.firstElementChild;
        if (!firstCard) return 300;
        return firstCard.getBoundingClientRect().width + 24; // card + gap
    };

    const step = (direction) => {
        offset += direction * stepWidth();
        // Keep offset in the canonical range [-originalWidth, 0] so the loop
        // wrap stays seamless after manual nudges.
        if (originalWidth > 0) {
            while (offset <= -originalWidth) offset += originalWidth;
            while (offset > 0) offset -= originalWidth;
        }
        track.style.transition = 'transform 0.45s ease';
        apply();
        // Drop the transition after it finishes so the rAF loop resumes
        // pixel-by-pixel without easing artifacts.
        setTimeout(() => { track.style.transition = ''; }, 480);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => step(+1)); // prev = move right
    if (nextBtn) nextBtn.addEventListener('click', () => step(-1)); // next = move left

    // Re-measure when images/fonts settle or the viewport resizes.
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    if (!reduceMotion) requestAnimationFrame(tick);
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
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setTimeout(() => {
                form.reset();
                submitBtn.disabled = false;
                btnSpan.textContent = 'Execute Transmission';
                statusText.className = 'form-status success';
                statusText.innerHTML = '<span class="t-accent">[OK]</span> Status 200 — message accepted. I\'ll reply shortly.';
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
                { name: 'GitHub Actions', file: 'githubactions' },
                { name: 'SonarQube', file: 'sonarqube' },
                { name: 'Trivy', file: 'trivy', ext: '.png' },
                { name: 'Snyk (SAST/DAST)', file: 'snyk', ext: '.png' }
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
                { name: 'OpenAI', file: 'openai', ext: '.png' },
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

// ==========================================================================
// PLATFORM ENGINEERING — LIVE VIEW
// Orchestrates a continuous loop: a commit lands on the GitOps graph,
// the pipeline (commit → build → test → scan → iac plan/apply → config →
// deploy → observe) runs stage-by-stage with realistic logs, and the
// observability strip reacts (latency dips, RPS climbs, SLO pills toggle,
// deploy marker fires). Occasional fail/retry paths add believability.
// ==========================================================================
function initPlatformPipeline() {
    const stagesRoot = document.getElementById('pipeline-stages');
    if (!stagesRoot) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const flowCanvas = document.getElementById('flow-canvas');
    const flowStageLabel = document.getElementById('flow-stage-label');
    const flowPacket = document.getElementById('flow-packet');
    const pipelineConsole = document.querySelector('.pipeline-console');
    const pipelineTitle = document.getElementById('pipeline-title');
    const pipelineStatusLabel = document.getElementById('pipeline-status-label');
    const logEl = document.getElementById('pipeline-log');
    const stages = Array.from(stagesRoot.querySelectorAll('.pipe-stage'));

    const obsP95 = document.getElementById('obs-p95');
    const obsErr = document.getElementById('obs-err');
    const obsRps = document.getElementById('obs-rps');
    const obsSlo = document.getElementById('obs-slo');
    const obsMarker = document.getElementById('obs-deploy-marker');
    const sparkP95 = document.getElementById('spark-p95');
    const sparkErr = document.getElementById('spark-err');
    const sparkRps = document.getElementById('spark-rps');

    // ------- Commit catalog (cycles, story-driven) -------
    const commits = [
        { type: 'feat',  msg: 'add HPA + PDB to payment-gateway',         tag: null },
        { type: 'fix',   msg: 'redis connection timeout under burst load', tag: null },
        { type: 'feat',  msg: 'argocd app-of-apps for staging cluster',   tag: null },
        { type: 'chore', msg: 'helm chart values for canary rollout',     tag: null },
        { type: 'feat',  msg: 'prometheus servicemonitor + recording rules', tag: 'v1.4.3' },
        { type: 'fix',   msg: 'terraform: tighten eks node_group IAM',    tag: null },
        { type: 'feat',  msg: 'opentelemetry collector sidecar',          tag: null },
        { type: 'chore', msg: 'bump istio 1.22 → 1.23 mesh upgrade',      tag: null },
        { type: 'feat',  msg: 'loki: structured logs + log-based alerts', tag: null },
        { type: 'fix',   msg: 'ansible: idempotent kernel sysctls',       tag: null },
    ];
    let commitIdx = 0;
    let runNumber = 142;
    const HASH_CHARS = '0123456789abcdef';
    const randHash = () => Array.from({ length: 7 }, () => HASH_CHARS[Math.floor(Math.random() * 16)]).join('');

    // ------- Flow diagram: stage → nodes that should glow + edges to traverse -------
    // Each pipeline stage maps to which left-panel nodes light up and which edge
    // the packet flies along, so the diagram visually narrates what's happening.
    const flowMap = {
        commit:     { nodes: ['dev', 'scm'],          edges: ['edge-dev-scm'],                          cluster: null },
        build:      { nodes: ['scm', 'ci-build'],     edges: ['edge-scm-ci'],                           cluster: 'cluster-ci' },
        test:       { nodes: ['ci-build'],            edges: [],                                        cluster: 'cluster-ci' },
        scan:       { nodes: ['ci-scan'],             edges: ['edge-ci-build-scan'],                    cluster: 'cluster-ci' },
        'iac-plan': { nodes: ['scm', 'tf'],           edges: ['edge-scm-iac'],                          cluster: 'cluster-cfg' },
        'iac-apply':{ nodes: ['tf', 'ans', 'k8s'],    edges: ['edge-iac-k8s'],                          cluster: 'cluster-cfg' },
        config:     { nodes: ['ans', 'ci-img'],       edges: ['edge-ci-scan-img'],                      cluster: 'cluster-ci' },
        deploy:     { nodes: ['ci-img', 'scm', 'registry', 'cd', 'k8s'], edges: ['edge-img-scm', 'edge-ci-registry', 'edge-registry-cd', 'edge-scm-cd', 'edge-cd-k8s'], cluster: null },
        observe:    { nodes: ['k8s', 'obs-metrics', 'obs-logs', 'obs-trace'], edges: ['edge-k8s-obs'], cluster: 'cluster-obs', telemetry: true },
    };

    const allFlowNodes = Array.from(flowCanvas.querySelectorAll('.flow-node'));
    const allFlowEdges = Array.from(flowCanvas.querySelectorAll('.flow-edge'));
    const allFlowClusters = Array.from(flowCanvas.querySelectorAll('.flow-cluster'));

    const clearFlowState = () => {
        allFlowNodes.forEach(n => n.classList.remove('is-active', 'is-success', 'is-fail'));
        allFlowEdges.forEach(e => e.classList.remove('is-active'));
        allFlowClusters.forEach(c => c.classList.remove('is-active'));
    };

    const markFlowSuccess = (stageKey) => {
        const m = flowMap[stageKey];
        if (!m) return;
        m.nodes.forEach(id => {
            const n = flowCanvas.querySelector(`[data-node="${id}"]`);
            if (n) {
                n.classList.remove('is-active');
                n.classList.add('is-success');
            }
        });
        m.edges.forEach(eid => {
            const e = document.getElementById(eid);
            if (e) e.classList.remove('is-active');
        });
        if (m.cluster) {
            const c = flowCanvas.querySelector(`.${m.cluster}`);
            if (c) c.classList.remove('is-active');
        }
    };

    const markFlowFail = (stageKey) => {
        const m = flowMap[stageKey];
        if (!m) return;
        m.nodes.forEach(id => {
            const n = flowCanvas.querySelector(`[data-node="${id}"]`);
            if (n) {
                n.classList.remove('is-active');
                n.classList.add('is-fail');
            }
        });
    };

    // Animate the packet along an edge path. JS uses the SVG path's
    // getPointAtLength API to compute exact (x,y) along the curve.
    const flyPacket = (edgeId, kind = 'data', durationMs = 900) => {
        if (reduceMotion) return Promise.resolve();
        const path = document.getElementById(edgeId);
        if (!path) return Promise.resolve();
        const total = path.getTotalLength();
        if (!total) return Promise.resolve();

        flowPacket.classList.remove('is-telemetry', 'is-alert', 'is-gitops');
        if (kind === 'telemetry') flowPacket.classList.add('is-telemetry');
        if (kind === 'alert') flowPacket.classList.add('is-alert');
        if (kind === 'gitops') flowPacket.classList.add('is-gitops');

        return new Promise((resolve) => {
            const start = performance.now();
            flowPacket.classList.add('is-flying');
            const tick = (now) => {
                const t = Math.min(1, (now - start) / durationMs);
                const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                const pt = path.getPointAtLength(eased * total);
                flowPacket.setAttribute('cx', pt.x);
                flowPacket.setAttribute('cy', pt.y);
                if (t < 1) requestAnimationFrame(tick);
                else {
                    flowPacket.classList.remove('is-flying');
                    resolve();
                }
            };
            requestAnimationFrame(tick);
        });
    };

    // Activate a stage on the left flow diagram (light up nodes, glow the edge,
    // fly a packet along it). This runs in parallel with the right-panel logs.
    const activateFlowStage = async (stageKey) => {
        const m = flowMap[stageKey];
        if (!m) return;
        flowStageLabel.textContent = stageKey.replace('-', ' ');

        // Activate nodes + cluster
        m.nodes.forEach(id => {
            const n = flowCanvas.querySelector(`[data-node="${id}"]`);
            if (n) {
                n.classList.remove('is-success', 'is-fail');
                n.classList.add('is-active');
            }
        });
        if (m.cluster) {
            const c = flowCanvas.querySelector(`.${m.cluster}`);
            if (c) c.classList.add('is-active');
        }

        // Activate edges, then fly packets along them sequentially
        for (const eid of m.edges) {
            const e = document.getElementById(eid);
            if (e) e.classList.add('is-active');
            const isGitops = e && e.classList.contains('edge-gitops');
            const kind = m.telemetry ? 'telemetry' : (isGitops ? 'gitops' : 'data');
            await flyPacket(eid, kind, 700);
        }
    };

    // ------- Logging helpers -------
    const now = () => {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    };

    const log = (tag, tagClass, msg) => {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `
            <span class="log-time">${now()}</span>
            <span class="log-tag ${tagClass}">${tag}</span>
            <span class="log-msg">${msg}</span>
        `;
        logEl.appendChild(line);
        logEl.scrollTop = logEl.scrollHeight;
        // Trim very old lines so the DOM stays light
        while (logEl.children.length > 80) logEl.removeChild(logEl.firstChild);
    };

    const clearLogs = () => { logEl.innerHTML = ''; };

    // ------- Stage state machine -------
    const setStageState = (stageEl, state) => {
        stageEl.classList.remove('active', 'success', 'fail', 'retry');
        if (state) stageEl.classList.add(state);
    };

    const resetStages = () => stages.forEach(s => setStageState(s, ''));

    const setRunStatus = (state, label) => {
        pipelineConsole.classList.remove('is-running', 'is-failed', 'is-success');
        pipelineConsole.classList.add(`is-${state}`);
        if (label) pipelineStatusLabel.textContent = label;
    };

    // ------- Stage drivers — what each stage logs and how long it takes -------
    const stageScripts = {
        commit: (ctx) => [
            ['t-info', `webhook received: push origin main (${ctx.hash})`],
            ['t-accent', `author: ${ctx.author}  ·  msg: "${ctx.msg}"`],
        ],
        build: (ctx) => [
            ['t-accent', `docker buildx build --platform linux/amd64 -t ${ctx.image} .`],
            ['t-info', `Step 4/9 : COPY requirements.txt /app/`],
            ['t-info', `Step 7/9 : RUN go test ./... -short`],
            ['t-healed', `✔ image pushed: registry.io/${ctx.image}  (sha256:${ctx.imageSha}…)`],
        ],
        test: (ctx) => [
            ['t-accent', `pytest -n auto --cov=src tests/`],
            ['t-info', `collected 412 items · ran 412 passed · 0 failed · 12.4s`],
            ['t-healed', `✔ coverage: 87.3%  (gate: 80%)`],
        ],
        scan: (ctx) => [
            ['t-accent', `trivy image --severity HIGH,CRITICAL ${ctx.image}`],
            ['t-info', `${ctx.scanFindings} HIGH · 0 CRITICAL · sonar quality gate: PASSED`],
            ['t-healed', `✔ supply chain attest signed (cosign)`],
        ],
        'iac-plan': (ctx) => [
            ['t-accent', `terraform plan -out=tfplan  (workspace: prod-eks)`],
            ['t-info', `Plan: ${ctx.tfAdd} to add, ${ctx.tfChange} to change, 0 to destroy.`],
            ['t-info', `+ aws_eks_node_group.workers["${ctx.az}"]  (count: 3 → 4)`],
            ['t-info', `~ aws_security_group_rule.api_ingress     (cidr_blocks)`],
        ],
        'iac-apply': (ctx) => [
            ['t-accent', `terraform apply tfplan`],
            ['t-info', `aws_eks_node_group.workers: Modifying... [10s elapsed]`],
            ['t-info', `aws_eks_node_group.workers: Modifications complete after 1m42s`],
            ['t-healed', `✔ Apply complete! Resources: ${ctx.tfAdd} added, ${ctx.tfChange} changed.`],
        ],
        config: (ctx) => [
            ['t-accent', `ansible-playbook -i aws_ec2.yml site.yml --tags configmap,secrets`],
            ['t-info', `TASK [k8s : reconcile ConfigMap payment-gateway-cfg] *********`],
            ['t-info', `helm upgrade --install payment-gateway ./charts/api -f values.prod.yaml`],
            ['t-healed', `✔ PLAY RECAP — ok=23 changed=4 unreachable=0 failed=0`],
        ],
        deploy: (ctx) => [
            ['t-accent', `argocd app sync payment-gateway --prune --strategy=blue-green`],
            ['t-info', `Sync status: OutOfSync → Syncing → Synced`],
            ['t-info', `rollout: 25% canary → 50% → 100%   (analysisRun: SUCCESS)`],
            ['t-healed', `✔ revision ${ctx.hash} healthy on prod-eks (${ctx.replicas} replicas)`],
        ],
        observe: (ctx) => [
            ['t-accent', `prometheus: deploy annotation pushed`],
            ['t-info', `loki: log volume +${ctx.logSurge}% (post-deploy normalisation)`],
            ['t-info', `grafana: dashboard "API SLO" — error budget burn rate stable`],
            ['t-healed', `✔ run #${ctx.run} — green across all SLOs`],
        ],
    };

    // ------- Observability state — sparklines + live values -------
    const sparkData = { p95: [], err: [], rps: [] };
    const SPARK_LEN = 40;

    const seedSparks = () => {
        for (let i = 0; i < SPARK_LEN; i++) {
            sparkData.p95.push(80 + Math.random() * 18);
            sparkData.err.push(0.01 + Math.random() * 0.05);
            sparkData.rps.push(1100 + Math.random() * 240);
        }
        renderSparks();
    };

    const pointsFor = (data, max, min) => {
        const range = max - min || 1;
        return data.map((v, i) => {
            const x = (i / (SPARK_LEN - 1)) * 100;
            const y = 22 - ((v - min) / range) * 20;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        }).join(' ');
    };

    const renderSparks = () => {
        sparkP95.setAttribute('points', pointsFor(sparkData.p95, 140, 60));
        sparkErr.setAttribute('points', pointsFor(sparkData.err, 0.25, 0));
        sparkRps.setAttribute('points', pointsFor(sparkData.rps, 1800, 800));
    };

    const flashValue = (el, kind) => {
        el.classList.remove('flash-up', 'flash-bad', 'flash-good');
        el.classList.add(`flash-${kind}`);
        setTimeout(() => el.classList.remove(`flash-${kind}`), 600);
    };

    // Drift the values continuously so the strip always feels alive
    const startObservabilityDrift = () => {
        if (reduceMotion) return;
        setInterval(() => {
            const p95Last = sparkData.p95[sparkData.p95.length - 1];
            const errLast = sparkData.err[sparkData.err.length - 1];
            const rpsLast = sparkData.rps[sparkData.rps.length - 1];

            const nextP95 = Math.max(60, Math.min(140, p95Last + (Math.random() - 0.5) * 6));
            const nextErr = Math.max(0, Math.min(0.25, errLast + (Math.random() - 0.5) * 0.015));
            const nextRps = Math.max(800, Math.min(1800, rpsLast + (Math.random() - 0.5) * 80));

            sparkData.p95.push(nextP95); sparkData.p95.shift();
            sparkData.err.push(nextErr); sparkData.err.shift();
            sparkData.rps.push(nextRps); sparkData.rps.shift();

            obsP95.firstChild.textContent = Math.round(nextP95);
            obsErr.firstChild.textContent = nextErr.toFixed(2);
            obsRps.firstChild.textContent = (nextRps / 1000).toFixed(2);

            renderSparks();
        }, 1100);
    };

    // ------- Deploy reaction — fired when DEPLOY stage succeeds -------
    const reactToDeploy = () => {
        // Brief latency dip + RPS bump + deploy marker
        for (let i = 0; i < 6; i++) {
            sparkData.p95[SPARK_LEN - 1 - i] = 70 + Math.random() * 8;
            sparkData.rps[SPARK_LEN - 1 - i] = 1500 + Math.random() * 200;
        }
        renderSparks();
        flashValue(obsP95, 'good');
        flashValue(obsRps, 'good');
        obsMarker.classList.add('visible');
        setTimeout(() => obsMarker.classList.remove('visible'), 1800);

        obsSlo.className = 'slo-pill';
        obsSlo.textContent = 'healthy';
    };

    const reactToFail = () => {
        flashValue(obsErr, 'bad');
        obsSlo.className = 'slo-pill breaching';
        obsSlo.textContent = 'breaching';
        for (let i = 0; i < 5; i++) {
            sparkData.err[SPARK_LEN - 1 - i] = 0.18 + Math.random() * 0.05;
        }
        renderSparks();
    };

    // ------- Run a single stage -------
    const runStage = (stageEl, ctx, opts = {}) => new Promise((resolve) => {
        setStageState(stageEl, 'active');
        const stageKey = stageEl.dataset.stage;
        // Light up the matching nodes + edges on the left flow diagram
        activateFlowStage(stageKey);

        const lines = (stageScripts[stageKey] || (() => []))(ctx);
        const interLine = reduceMotion ? 0 : 380;
        const stageDuration = reduceMotion ? 80 : 700 + lines.length * interLine;

        // Stagger log lines for that "live tail" feel
        lines.forEach((entry, i) => {
            const [tagClass, msg] = entry;
            const tag = '[' + stageKey.toUpperCase().replace('-', ' ') + ']';
            setTimeout(() => log(tag, tagClass, msg), i * interLine);
        });

        setTimeout(() => {
            if (opts.fail) {
                setStageState(stageEl, 'fail');
                markFlowFail(stageKey);
                log('[ERROR]', 't-error', `stage "${stageKey}" failed: ${opts.failReason}`);
                reactToFail();
                // Fly an alert packet back to the dev (loops back the error)
                flyPacket('edge-obs-dev', 'alert', 1100);
                document.getElementById('edge-obs-dev').classList.add('is-active');
                setTimeout(() => document.getElementById('edge-obs-dev').classList.remove('is-active'), 1400);
                resolve('fail');
            } else {
                setStageState(stageEl, 'success');
                markFlowSuccess(stageKey);
                if (stageKey === 'deploy') reactToDeploy();
                resolve('success');
            }
        }, stageDuration);
    });

    // ------- One full pipeline run -------
    const runPipeline = async () => {
        runNumber++;
        const commit = commits[commitIdx % commits.length];
        commitIdx++;

        const hash = randHash();

        const ctx = {
            run: runNumber,
            hash,
            msg: commit.msg,
            author: 'bharath',
            image: `payment-gateway:${hash}`,
            imageSha: randHash() + randHash(),
            scanFindings: Math.floor(Math.random() * 3),
            tfAdd: 1 + Math.floor(Math.random() * 4),
            tfChange: Math.floor(Math.random() * 5),
            az: ['us-east-1a', 'us-east-1b', 'eu-west-1a'][Math.floor(Math.random() * 3)],
            replicas: 4 + Math.floor(Math.random() * 4),
            logSurge: 8 + Math.floor(Math.random() * 14),
        };

        clearLogs();
        clearFlowState();
        resetStages();
        setRunStatus('running', `running #${runNumber}`);
        pipelineTitle.textContent = `pipeline.run #${runNumber}`;

        // 18% chance of an injected failure (NOT on commit/observe; those are bookends)
        const failableStages = stages.filter(s => !['commit', 'observe'].includes(s.dataset.stage));
        const willFail = Math.random() < 0.18;
        const failStage = willFail ? failableStages[Math.floor(Math.random() * failableStages.length)] : null;
        const failReasons = {
            build: 'image too large (>1.2GB) — multi-stage cleanup required',
            test: '3 integration tests failed — flaky postgres fixture',
            scan: '1 CRITICAL CVE detected (CVE-2025-1337) — base image bump',
            'iac-plan': 'drift detected on aws_eks_cluster.platform — manual review',
            'iac-apply': 'aws throttling: RequestLimitExceeded — retrying',
            config: 'helm: schema validation failed for values.prod.yaml',
            deploy: 'argocd: app health degraded — auto-rolling back',
        };

        for (const stage of stages) {
            const isFail = (stage === failStage);
            const result = await runStage(stage, ctx, isFail ? { fail: true, failReason: failReasons[stage.dataset.stage] } : {});
            if (result === 'fail') {
                // Retry path: pause, retry once, succeed.
                await new Promise(r => setTimeout(r, reduceMotion ? 80 : 900));
                setStageState(stage, 'retry');
                log('[RETRY]', 't-warn', `auto-retry ${stage.dataset.stage} (attempt 2/2)…`);
                await new Promise(r => setTimeout(r, reduceMotion ? 80 : 1200));
                await runStage(stage, ctx, {});
                obsSlo.className = 'slo-pill';
                obsSlo.textContent = 'recovered';
            }
        }

        setRunStatus('success', `✔ run #${runNumber} green`);
        await new Promise(r => setTimeout(r, reduceMotion ? 200 : 3500));
    };

    // ------- Boot -------
    seedSparks();
    startObservabilityDrift();

    // Only run when section is in viewport — saves CPU on a long page
    let isRunning = false;
    const startLoop = async () => {
        if (isRunning) return;
        isRunning = true;
        // Run forever (or until tab hidden — see visibilitychange below)
        while (isRunning) {
            await runPipeline();
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) startLoop();
            else isRunning = false;
        });
    }, { threshold: 0.15 });
    observer.observe(document.getElementById('platform'));

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) isRunning = false;
        else if (document.getElementById('platform').getBoundingClientRect().top < window.innerHeight) startLoop();
    });
}
