/**
 * AURA HAUTE BOTANIQUE & ACADÉMIE - MASTER ENGINE
 * Aesthetic: Dark Haute Botanique & Liquid Gold
 * Features:
 *  - Interactive Cuticle Strand Scanner (Live Microscopy Simulation)
 *  - Interactive Before / After Split Slider
 *  - Botanical Pharmacopoeia & Alchemy Lab Vials
 *  - Diagnostic Hair Bio-Quiz with Prescribed Regimen
 *  - Dynamic Course & Product Details View
 *  - Slide-Over Luxury Apothecary Cart & 256-Bit Checkout
 *  - Student Workspace & Live Embossed Wax-Seal Certificate
 *  - Director Hub Analytics & Catalog CRUD
 */

// Global State
const state = {
    currentPage: 'home',
    currentUserRole: 'student',
    currentUser: {
        id: 'u_101',
        name: 'Elena Vance',
        email: 'elena.vance@aurahairacademy.com',
        role: 'student',
        avatar: 'images/image-1.png',
        enrolledCourses: ['c1', 'c3'],
        completedCourses: ['c2'],
        certificates: [
            {
                id: 'AUR-2026-98598',
                title: 'Certificate of Trichology Mastery',
                issueDate: 'October 2026',
                instructor: 'Dr. Vivienne Roux'
            }
        ],
        hairProfile: {
            texture: 'Curly (Type 3B)',
            porosity: 'High Porosity',
            scalp: 'Dry & Sensitive',
            goal: 'Bond Repair & Anti-Breakage'
        },
        subscriptions: [
            {
                id: 'sub-881',
                productId: 'p3',
                name: 'Rosemary & Multi-Peptide Scalp Elixir',
                image: 'images/image-18.png',
                price: 35.70,
                frequency: 'Every 30 Days',
                status: 'Active',
                nextDelivery: 'Nov 12, 2026'
            },
            {
                id: 'sub-882',
                productId: 'p2',
                name: 'Bio-Ferment Deep Moisture Masque',
                image: 'images/image-19.png',
                price: 40.80,
                frequency: 'Every 60 Days',
                status: 'Active',
                nextDelivery: 'Dec 05, 2026'
            }
        ],
        orders: [
            {
                id: 'AUR-91823',
                date: 'Oct 02, 2026',
                items: 'Clinical Scalp Course + Peptide Elixir',
                total: '$284.70',
                status: 'Delivered',
                tracking: 'USPS #9400100093821'
            }
        ]
    },
    cart: [
        {
            id: 'p3',
            type: 'product',
            name: 'Rosemary & Multi-Peptide Scalp Elixir',
            price: 42.00,
            image: 'images/image-18.png',
            qty: 1,
            isSubscription: true,
            discountedPrice: 35.70
        }
    ],
    wishlist: ['c2', 'p1', 'p4'],
    discountPercent: 0,
    activePromo: null,
    currentQuizStep: 1,
    quizAnswers: {
        texture: 'Curly (Type 3)',
        porosity: 'High Porosity',
        scalp: 'Dry & Flaky',
        chemical: 'Bleached / Color Treated',
        goal: 'Bond Repair & Anti-Breakage'
    },
    selectedDetailItem: null,
    selectedDetailType: 'course',
    scannerState: {
        porosity: 'medium',
        damage: 45,
        treatmentApplied: false
    }
};

// Course Data
const coursesData = [
    {
        id: 'c1',
        title: 'Clinical Scalp Ecosystem & Advanced Restoration',
        category: 'Trichology & Scalp',
        level: 'Masterclass / Pro',
        duration: '8 Weeks • 24 Modules',
        studentsCount: 1420,
        rating: 4.9,
        reviewsCount: 382,
        price: 249,
        oldPrice: 499,
        instructor: {
            name: 'Dr. Vivienne Roux',
            title: 'Lead Trichologist & Botanical Chemist',
            avatar: 'images/image-7.png'
        },
        image: 'images/image-6.png',
        featured: true,
        description: 'Microscopic follicle diagnostics, sebaceous regulation, adaptogenic botanical formulation, and restorative trichology clinical blueprints.',
        modules: [
            { title: 'Module 1: Cellular Anatomy of the Follicle', lessons: ['Follicle cycling & Anagen optimization', 'Sebaceous gland biomechanics', 'Microscopy diagnostics lab'] },
            { title: 'Module 2: Scalp Pathology & Inflammation Protocols', lessons: ['Seborrheic dermatitis vs dry scalp', 'Follicular occlusion mechanisms', 'Herbal adaptogen extraction'] },
            { title: 'Module 3: Clinical Scalp Restoration in Salon Practice', lessons: ['Micro-needling & peptide infusions', 'Formulating bespoke scalp tonics', 'Client consultation blueprint'] }
        ]
    },
    {
        id: 'c2',
        title: 'Precision French Balayage & Low-Ammonia Glossing',
        category: 'Color & Balayage',
        level: 'Intermediate',
        duration: '6 Weeks • 18 Modules',
        studentsCount: 2890,
        rating: 4.95,
        reviewsCount: 610,
        price: 189,
        oldPrice: 349,
        instructor: {
            name: 'Camille Dupont',
            title: 'Master Colorist, Paris Studio',
            avatar: 'images/image-13.png'
        },
        image: 'images/image-20.png',
        featured: true,
        description: 'Seamless clay-lightener blending, negative space foil placement, root shadow melting, and damage-free glossing tones.',
        modules: [
            { title: 'Module 1: Color Theory & Pigment Neutralization', lessons: ['Underlying pigment mapping', 'Low-ammonia lightener chemistry'] },
            { title: 'Module 2: Hand-Painting Geometry & Elevation', lessons: ['V and W sectioning blueprints', 'Feathered root transitions'] }
        ]
    },
    {
        id: 'c3',
        title: 'Curly, Coily & Textured Hair Science (Types 3A - 4C)',
        category: 'Texture & Curls',
        level: 'Beginner',
        duration: '5 Weeks • 16 Modules',
        studentsCount: 3100,
        rating: 4.88,
        reviewsCount: 440,
        price: 149,
        oldPrice: 280,
        instructor: {
            name: 'Aaliyah Woods',
            title: 'Texture Specialist & Salon Founder',
            avatar: 'images/image-14.png'
        },
        image: 'images/image-21.png',
        featured: true,
        description: 'Porosity hydration layering, curl clumping dynamics, dry curl tension sculpting, and protective style maintenance.',
        modules: [
            { title: 'Module 1: The Keratin Disulfide Matrix in Textured Hair', lessons: ['Porosity testing and lipid barriers', 'L.O.C. and L.G.O. layering methods'] },
            { title: 'Module 2: Dry Curl Sculpting & Tension Cutting', lessons: ['Curl-by-curl shape creation', 'Diffusing and cast breaking'] }
        ]
    },
    {
        id: 'c4',
        title: 'Modern Bridal & High-Fashion Runway Styling',
        category: 'Styling & Bridal',
        level: 'Intermediate',
        duration: '4 Weeks • 12 Modules',
        studentsCount: 1650,
        rating: 4.92,
        reviewsCount: 215,
        price: 129,
        oldPrice: 220,
        instructor: {
            name: 'Julian Sterling',
            title: 'Editorial Director, London & NYFW',
            avatar: 'images/image-15.png'
        },
        image: 'images/image-22.png',
        featured: false,
        description: 'Architecture of textured up-dos, hollywood red carpet waves, veil anchor mechanics, and 12-hour durability styling methods.',
        modules: [
            { title: 'Module 1: Hollywood Waves & Thermal Direction', lessons: ['S-bend thermal iron techniques', 'Setting sprays and brush-out magic'] }
        ]
    },
    {
        id: 'c5',
        title: 'Salon Freelance Business, Pricing & Client Retention',
        category: 'Salon Business',
        level: 'Beginner',
        duration: '3 Weeks • 10 Modules',
        studentsCount: 980,
        rating: 4.9,
        reviewsCount: 130,
        price: 99,
        oldPrice: 199,
        instructor: {
            name: 'Elena Vance & Guests',
            title: 'Salon Growth Strategist',
            avatar: 'images/image-1.png'
        },
        image: 'images/image-23.png',
        featured: false,
        description: 'Transform from hourly stylist to high-ticket booked-out hair authority. Master consultation closing scripts and retail upsells.',
        modules: [
            { title: 'Module 1: High-Ticket Service Menu Packaging', lessons: ['Eliminating hourly traps', 'Consultation closing scripts'] }
        ]
    },
    {
        id: 'c6',
        title: 'Chemical Smoothing & Japanese Bond Straightening',
        category: 'Trichology & Scalp',
        level: 'Masterclass / Pro',
        duration: '6 Weeks • 18 Modules',
        studentsCount: 820,
        rating: 4.85,
        reviewsCount: 98,
        price: 219,
        oldPrice: 380,
        instructor: {
            name: 'Sofia Alvarez',
            title: 'Senior Texture Specialist',
            avatar: 'images/image-5.png'
        },
        image: 'images/image-24.png',
        featured: false,
        description: 'Formaldehyde-free glyoxylic acid smoothing systems, cysteamine rebonding, and safe neutralization methods.',
        modules: [
            { title: 'Module 1: Safety & Ventilation Chemistry', lessons: ['Understanding pH levels', 'Flat iron pass temperature calibration'] }
        ]
    }
];

// Product Data
const productsData = [
    {
        id: 'p1',
        name: 'Sulfate-Free Botanical Scalp Clarifying Wash',
        category: 'Shampoos & Cleansers',
        price: 34.00,
        rating: 4.9,
        reviewsCount: 420,
        image: 'images/image-25.png',
        tag: 'Clean Formula',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: 'Willow Bark & Fermented Apple Amino Acids',
        stock: 180,
        description: 'Micellar scalp cleanse that lifts styling residue, sebum buildup, and minerals without disturbing cuticle alignment.',
        usage: 'Massage into soaking wet scalp for 2 minutes. Rinse thoroughly.'
    },
    {
        id: 'p2',
        name: 'Bio-Ferment Deep Moisture & Keratin Repair Masque',
        category: 'Deep Conditioners & Masks',
        price: 48.00,
        rating: 4.95,
        reviewsCount: 890,
        image: 'images/image-19.png',
        tag: 'Bestseller',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: 'Bio-Fermented Pea Peptide & Cupuaçu Butter',
        stock: 95,
        description: 'Intensive restorative lipid treatment clinically proven to reduce breakage by 94% after 3 applications.',
        usage: 'Apply to damp hair from mid-lengths to ends. Leave for 15 minutes, then rinse.'
    },
    {
        id: 'p3',
        name: 'Rosemary & Multi-Peptide Follicle Density Elixir',
        category: 'Scalp & Growth Serums',
        price: 42.00,
        rating: 4.92,
        reviewsCount: 1120,
        image: 'images/image-18.png',
        tag: 'Clinical Grade',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: 'Cold-Pressed Rosemary CO2 & Copper Tripeptide-1',
        stock: 240,
        description: 'Weightless water-based leave-in scalp serum to reactivate dormant hair follicles in 60 days.',
        usage: 'Apply 1 full dropper onto clean scalp nightly. Gently massage in circles.'
    },
    {
        id: 'p4',
        name: 'Cold-Pressed Golden Argan & Marula Sealing Oil',
        category: 'Oils & Elixirs',
        price: 38.00,
        rating: 4.88,
        reviewsCount: 310,
        image: 'images/image-26.png',
        tag: 'Clean Formula',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: '100% Pure Virgin Argan & Marula Lipids',
        stock: 120,
        description: 'Ultra-lightweight dry oil elixir creating a glass-like thermal barrier up to 450°F.',
        usage: 'Warm 2-3 drops between palms and smooth over finished hair.'
    },
    {
        id: 'p5',
        name: 'Clinical Porosity & Damage Recovery 4-Piece Starter Kit',
        category: 'Bundles & Starter Kits',
        price: 114.00,
        discountedBundlePrice: 88.00,
        rating: 4.98,
        reviewsCount: 560,
        image: 'images/image-27.png',
        tag: 'Curated Bundle',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: 'Full Clinical Regimen (Cleanser + Masque + Elixir + Thermal Oil)',
        stock: 60,
        description: 'The complete diagnostic routine prescribed by AURA Trichologists for high porosity hair.',
        usage: 'Follow the diagnostic routine sequence provided.'
    },
    {
        id: 'p6',
        name: 'Silk Keratin Thermal Shield & Glossing Serum',
        category: 'Scalp & Growth Serums',
        price: 36.00,
        rating: 4.85,
        reviewsCount: 220,
        image: 'images/image-28.png',
        tag: 'Stylist Choice',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: 'Hydrolyzed Vegan Keratin & Camellia Seed',
        stock: 110,
        description: 'Smooths unruly frizz instantly and reflects high mirror gloss.',
        usage: 'Distribute 1 pump through towel-dried hair prior to blow-drying.'
    }
];

// Freelance Stylists
const stylistsData = [
    {
        id: 'st1',
        name: 'Dr. Vivienne Roux',
        specialty: 'Trichology & Scalp Medicine',
        location: 'Paris, France & Virtual Consultations',
        rate: '$175 / session',
        avatar: 'images/image-7.png',
        tags: ['Trichology', 'Scalp Restoration', 'Clinical Formulations'],
        bio: 'Board-certified trichologist with 14+ years experience in chronic scalp recovery and formulation chemistry.'
    },
    {
        id: 'st2',
        name: 'Camille Dupont',
        specialty: 'French Balayage & Blonde Specialist',
        location: 'Paris, France & Los Angeles, CA',
        rate: '$250 / service',
        avatar: 'images/image-13.png',
        tags: ['Balayage', 'Color Correction', 'French Glossing'],
        bio: 'Celebrity master colorist known for seamless dimensional lightener blending.'
    },
    {
        id: 'st3',
        name: 'Aaliyah Woods',
        specialty: 'Curly & Textured Hair Architecture',
        location: 'Atlanta, GA / Virtual Routine Coaching',
        rate: '$150 / session',
        avatar: 'images/image-14.png',
        tags: ['Curly & Textured', 'Type 4 Coils', 'Hydration Layering'],
        bio: 'Founder of Texture Lab. Specializes in curl cut dynamics and moisture retention.'
    },
    {
        id: 'st4',
        name: 'Julian Sterling',
        specialty: 'Bridal & High-Fashion Editorial',
        location: 'London, UK & Worldwide Travel',
        rate: '$300 / booking',
        avatar: 'images/image-15.png',
        tags: ['Bridal', 'Editorial Styling', 'Runway Master'],
        bio: 'Session stylist for Vogue editorials and luxury destination weddings.'
    },
    {
        id: 'st5',
        name: 'Mateo Rossi',
        specialty: 'Precision Cutting & Geometric Architecture',
        location: 'Milan, Italy',
        rate: '$210 / service',
        avatar: 'images/image-10.png',
        tags: ['Precision Cuts', 'Bob Architecture', 'Editorial'],
        bio: 'Award-winning stylist recognized for geometric precision and personalized face-framing techniques.'
    },
    {
        id: 'st6',
        name: 'Isabella Chen',
        specialty: 'Vivid & Creative Color Formulations',
        location: 'Tokyo, Japan & Virtual Consultations',
        rate: '$180 / session',
        avatar: 'images/image-23.png',
        tags: ['Creative Color', 'Vivids', 'Color Theory'],
        bio: 'International platform artist specializing in fashion shades and vivid color longevity without cuticle damage.'
    }
];

const adminQuizLeads = [
    { name: 'Elena Vance', email: 'elena.vance@aurahairacademy.com', hairType: 'Curly (Type 3B)', porosity: 'High Porosity', goal: 'Bond Repair & Anti-Breakage', bundle: '4-Piece Starter Kit', converted: 'Yes (Active Sub)' },
    { name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', hairType: 'Straight (Type 1)', porosity: 'Low Porosity', goal: 'Density & Rapid Growth', bundle: 'Peptide Elixir + Wash', converted: 'Yes' },
    { name: 'Monique Laurent', email: 'monique@atelierparis.com', hairType: 'Wavy (Type 2B)', porosity: 'Medium Porosity', goal: 'Moisture Retention', bundle: 'Deep Masque Kit', converted: 'Pending' }
];

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderHomeCourses();
    renderHomeProducts();
    renderAllCourses();
    renderAllProducts();
    renderStylists();
    renderDashboard();
    renderAdminViews();
    initSplitSlider();
    initCuticleScanner();
    initDnaNavbar();
    updateCartUI();
    updateWishlistCount();
    
    // Auto-close mobile menu when clicking any navlink or button
    const mobileDropdown = document.getElementById('mobileDropdown');
    if (mobileDropdown) {
        mobileDropdown.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) {
                mobileDropdown.classList.remove('mobile-active');
            }
        });
    }

    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/* ==========================================================================
   ROUTING & DNA ACTIVE NODE STATE
   ========================================================================== */

function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validPages = ['home', 'courses', 'scanner', 'quiz', 'shop', 'details', 'freelance', 'dashboard'];
    
    if (validPages.includes(hash)) {
        navigateTo(hash, false);
    }
}

function navigateTo(pageId, updateHash = true) {
    state.currentPage = pageId;
    
    document.querySelectorAll('.app-page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    // Update active state in DNA Connected Nodes
    document.querySelectorAll('.dna-node').forEach(node => {
        node.classList.remove('active');
        if (node.dataset.page === pageId) {
            node.classList.add('active');

            const energyBeam = document.getElementById('dnaEnergyBeam');
            if (window.gsap && energyBeam) {
                const targetLeft = node.offsetLeft + (node.offsetWidth / 2) - 30;
                gsap.to(energyBeam, {
                    left: targetLeft,
                    opacity: 0.85,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        }
    });

    if (updateHash) window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'scanner') {
        initCuticleScanner();
    }

    if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   🧬 GSAP DNA NAVBAR RIPPLE WAVE ENGINE
   ========================================================================== */

function initDnaNavbar() {
    const nodes = document.querySelectorAll('.dna-node');
    const energyBeam = document.getElementById('dnaEnergyBeam');

    // Continuous subtle DNA helix wave breathing
    if (window.gsap) {
        gsap.to('.dna-wave-1', {
            strokeDashoffset: 100,
            duration: 10,
            repeat: -1,
            ease: 'none'
        });
        gsap.to('.dna-wave-2', {
            strokeDashoffset: -100,
            duration: 10,
            repeat: -1,
            ease: 'none'
        });
    }

    nodes.forEach((node, targetIndex) => {
        // Hovering a node creates a ripple wave through all connected nodes!
        node.addEventListener('mouseenter', () => {
            nodes.forEach((otherNode, i) => {
                const distance = Math.abs(i - targetIndex);
                const delay = distance * 0.045; // 45ms stagger per node distance

                if (window.gsap) {
                    const nucleus = otherNode.querySelector('.node-nucleus');
                    const glow = otherNode.querySelector('.node-glow');

                    gsap.timeline()
                        .to(nucleus, {
                            scale: i === targetIndex ? 1.45 : 1 + (0.28 / (distance + 1)),
                            y: i === targetIndex ? -5 : -(3 / (distance + 1)),
                            duration: 0.22,
                            delay: delay,
                            ease: 'back.out(2.2)'
                        })
                        .to(nucleus, {
                            scale: otherNode.classList.contains('active') ? 1.15 : 1,
                            y: 0,
                            duration: 0.35,
                            ease: 'power2.out'
                        });

                    if (glow) {
                        gsap.timeline()
                            .to(glow, {
                                opacity: 1,
                                scale: 1.5,
                                duration: 0.2,
                                delay: delay
                            })
                            .to(glow, {
                                opacity: otherNode.classList.contains('active') ? 0.9 : 0,
                                scale: 1,
                                duration: 0.4
                            });
                    }
                }
            });

            // Traveling bioluminescent beam along the DNA connector strand
            if (window.gsap && energyBeam) {
                const targetLeft = node.offsetLeft + (node.offsetWidth / 2) - 30;
                gsap.to(energyBeam, {
                    left: targetLeft,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        node.addEventListener('mouseleave', () => {
            if (window.gsap && energyBeam) {
                const activeNode = document.querySelector('.dna-node.active');
                if (activeNode) {
                    const activeLeft = activeNode.offsetLeft + (activeNode.offsetWidth / 2) - 30;
                    gsap.to(energyBeam, {
                        left: activeLeft,
                        opacity: 0.6,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                }
            }
        });
    });
}

function toggleMobileMenu() {
    document.getElementById('mobileDropdown')?.classList.toggle('mobile-active');
}

/* ==========================================================================
   SIGNATURE FEATURE 1: INTERACTIVE BEFORE / AFTER SPLIT SLIDER
   ========================================================================== */

function initSplitSlider() {
    const slider = document.getElementById('beforeAfterSlider');
    const afterImg = document.getElementById('splitAfterImage');
    const handle = document.getElementById('splitHandle');
    if (!slider || !afterImg || !handle) return;

    let isDragging = false;

    const updateSliderPos = (clientX) => {
        const rect = slider.getBoundingClientRect();
        let offsetX = clientX - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        const pct = (offsetX / rect.width) * 100;
        afterImg.style.clipPath = `polygon(${pct}% 0, 100% 0, 100% 100%, ${pct}% 100%)`;
        handle.style.left = `${pct}%`;
    };

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSliderPos(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSliderPos(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support for mobile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSliderPos(e.touches[0].clientX);
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSliderPos(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
}

/* ==========================================================================
   SIGNATURE FEATURE 2: INTERACTIVE CUTICLE STRAND SCANNER
   ========================================================================== */

function initCuticleScanner() {
    renderCuticleTiles(state.scannerState.porosity, state.scannerState.damage);
}

function renderCuticleTiles(porosity, damage) {
    const container = document.getElementById('cuticleTilesContainer');
    if (!container) return;

    // Angle calculation based on porosity and damage
    let baseAngle = 6;
    if (porosity === 'low') baseAngle = 2;
    if (porosity === 'medium') baseAngle = 10;
    if (porosity === 'high') baseAngle = 24;

    const damageFactor = (damage / 100) * 15;
    const finalAngle = Math.min(baseAngle + damageFactor, 38);

    let tilesHTML = '';
    const totalTiles = 12;

    for (let i = 0; i < totalTiles; i++) {
        const topPos = i * 22 + 10;
        // Left side tile
        tilesHTML += `<div class="cuticle-tile" style="top:${topPos}px; left:20px; transform: rotate(-${finalAngle}deg); ${damage > 70 && i % 3 === 0 ? 'opacity:0.3; border-color:#FF4444;' : ''}"></div>`;
        // Right side tile
        tilesHTML += `<div class="cuticle-tile" style="top:${topPos}px; right:20px; transform: rotate(${finalAngle}deg); ${damage > 70 && i % 4 === 0 ? 'opacity:0.3; border-color:#FF4444;' : ''}"></div>`;
    }

    container.innerHTML = tilesHTML;

    // Update Telemetry log
    const logCuticle = document.getElementById('logCuticle');
    const logTensile = document.getElementById('logTensile');
    const logLipid = document.getElementById('logLipid');
    const logBonds = document.getElementById('logBonds');

    if (logCuticle) logCuticle.textContent = `${finalAngle.toFixed(1)}° (${porosity === 'high' ? 'High Flare / Lifted' : porosity === 'low' ? 'Flat / Sealed' : 'Balanced'})`;
    
    const tensileVal = Math.max(220 - (damage * 1.2), 65);
    if (logTensile) logTensile.textContent = `${Math.round(tensileVal)} MPa`;

    const lipidVal = Math.max(100 - damage, 15);
    if (logLipid) logLipid.textContent = `${Math.round(lipidVal)}% Intact`;

    const bondsVal = Math.max(100 - (damage * 0.8), 25);
    if (logBonds) logBonds.textContent = `${Math.round(bondsVal)}%`;
}

function setPorosityScan(porosityLevel, btnEl) {
    state.scannerState.porosity = porosityLevel;
    document.querySelectorAll('.scan-pill').forEach(p => p.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    renderCuticleTiles(porosityLevel, state.scannerState.damage);
}

function updateStrandSimulation(damageValue) {
    state.scannerState.damage = parseInt(damageValue);
    renderCuticleTiles(state.scannerState.porosity, state.scannerState.damage);
}

function applyTreatmentSimulation(treatmentType) {
    const statusBadge = document.getElementById('scannerStatusBadge');
    const recTitle = document.getElementById('scanRecTitle');
    const recDesc = document.getElementById('scanRecDesc');

    if (treatmentType === 'bio_peptides') {
        state.scannerState.damage = 10;
        state.scannerState.porosity = 'medium';
        renderCuticleTiles('medium', 10);
        if (statusBadge) statusBadge.innerHTML = '<span class="pulse-dot"></span> BIOMIMETIC PEPTIDE FUSION ACTIVE';
        if (recTitle) recTitle.innerHTML = '<i data-lucide="shield-check" class="gold-text"></i> Disulfide Keratin Matrix Sealed';
        if (recDesc) recDesc.textContent = 'Peptide chains successfully cross-linked cortex fibers. Tensile strength increased to 208 MPa.';
        showToast('Applied Bio-Ferment Keratin Treatment to strand!');
    } else if (treatmentType === 'rosemary_lipids') {
        state.scannerState.damage = 18;
        renderCuticleTiles(state.scannerState.porosity, 18);
        if (statusBadge) statusBadge.innerHTML = '<span class="pulse-dot"></span> 450°F THERMAL LIPID SHIELD ENGAGED';
        if (recDesc) recDesc.textContent = 'Virgin Marula lipids formed an impermeable moisture barrier over outer cuticle plates.';
        showToast('Engaged Rosemary & Marula Thermal Shield!');
    } else {
        state.scannerState.damage = 45;
        state.scannerState.porosity = 'medium';
        renderCuticleTiles('medium', 45);
        if (statusBadge) statusBadge.innerHTML = '<span class="pulse-dot"></span> LIVE MICROSCOPY • 1,200X MAGNIFICATION';
        showToast('Reset strand to base diagnostic state.');
    }

    if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   SIGNATURE FEATURE 3: BOTANICAL ALCHEMY LAB VIALS
   ========================================================================== */

const vialData = {
    rosemary: {
        tag: 'SUPERCRITICAL CO2 EXTRACTION',
        title: 'Rosemary & Multi-Peptide Follicle Density Elixir',
        image: 'images/image-18.png',
        desc: 'In clinical trials, supercritical rosemary CO2 extract demonstrated equivalent efficacy to 2% minoxidil in microcirculation stimulation without scalp dryness or irritation.',
        metric1: '+46%', metric1Lbl: 'Follicle Vascularization',
        metric2: '92%', metric2Lbl: 'Reported Thicker Density',
        metric3: '100%', metric3Lbl: 'Clean Water-Base',
        prodId: 'p3'
    },
    copper: {
        tag: 'PEPTIDE PROLIFERATION',
        title: 'Copper Tripeptide-1 Scalp Bio-Serum',
        image: 'images/image-28.png',
        desc: 'GHK-Cu copper peptides signal cellular regeneration in follicular dermal papilla, stimulating collagen synthesis and increasing follicle bulb size.',
        metric1: '+38%', metric1Lbl: 'Papilla Cell Growth',
        metric2: '89%', metric2Lbl: 'Decreased Shedding',
        metric3: '2.5x', metric3Lbl: 'Collagen Synthesis',
        prodId: 'p3'
    },
    pea: {
        tag: 'DISULFIDE KERATIN FUSION',
        title: 'Bio-Fermented Pea Peptide Repair Masque',
        image: 'images/image-19.png',
        desc: 'Fermented pea amino acids mimic human keratin chain structures, fusing microscopic cuticle gaps and restoring 94% of native tensile elasticity.',
        metric1: '94%', metric1Lbl: 'Breakage Reduction',
        metric2: '3x', metric2Lbl: 'Lipid Hydration Depth',
        metric3: '15 min', metric3Lbl: 'Rapid Cuticle Seal',
        prodId: 'p2'
    },
    marula: {
        tag: 'COLD-PRESSED SEED LIPIDS',
        title: 'Virgin Marula & Golden Argan Thermal Oil',
        image: 'images/image-26.png',
        desc: 'Rich in oleic acid and polyphenols, virgin marula oil forms a weightless thermal armor up to 450°F while locking in cortex hydration without greasy residue.',
        metric1: '450°F', metric1Lbl: 'Thermal Protection',
        metric2: 'Zero', metric2Lbl: 'Silicone Buildup',
        metric3: '88%', metric3Lbl: 'Specular Shine Increase',
        prodId: 'p4'
    }
};

function selectVial(vialKey, element) {
    document.querySelectorAll('.alchemy-vial').forEach(v => v.classList.remove('active'));
    if (element) element.classList.add('active');

    const v = vialData[vialKey];
    if (!v) return;

    document.getElementById('vialFeaturedImg').src = v.image;
    document.getElementById('vialCompoundTag').textContent = v.tag;
    document.getElementById('vialTitle').textContent = v.title;
    document.getElementById('vialDescription').textContent = v.desc;

    const metricsContainer = document.querySelector('.vial-metrics-row');
    if (metricsContainer) {
        metricsContainer.innerHTML = `
            <div class="vm-box"><strong>${v.metric1}</strong><span>${v.metric1Lbl}</span></div>
            <div class="vm-box"><strong>${v.metric2}</strong><span>${v.metric2Lbl}</span></div>
            <div class="vm-box"><strong>${v.metric3}</strong><span>${v.metric3Lbl}</span></div>
        `;
    }
}

/* ==========================================================================
   COURSES CATALOG (PAGE 02)
   ========================================================================== */

function createCourseCardHTML(c) {
    return `
        <div class="couture-course-card glass-card-couture">
            <div class="course-thumb-wrapper" onclick="viewCourseDetails('${c.id}')" style="cursor:pointer;">
                <img src="${c.image}" alt="${c.title}">
            </div>
            <div class="course-card-content">
                <div class="category-row">
                    <span class="tag-gold">${c.category}</span>
                    <span class="tag-emerald">${c.level}</span>
                </div>
                <h3 class="course-title-text" onclick="viewCourseDetails('${c.id}')">${c.title}</h3>
                <div class="inst-row-mini">
                    <img src="${c.instructor.avatar}" alt="${c.instructor.name}">
                    <span>${c.instructor.name}</span>
                </div>
                <div class="course-footer-row">
                    <div class="pricing-duo">
                        <span class="price-main">$${c.price}</span>
                        <span class="price-struck">$${c.oldPrice}</span>
                    </div>
                    <button class="btn btn-gold-foil btn-sm" onclick="quickEnroll('${c.id}')">Enroll</button>
                </div>
            </div>
        </div>
    `;
}

function renderHomeCourses() {
    const container = document.getElementById('homeCoursesGrid');
    if (container) {
        container.innerHTML = coursesData.slice(0, 3).map(c => createCourseCardHTML(c)).join('');
    }
}

function renderAllCourses(list = coursesData) {
    const container = document.getElementById('allCoursesGrid');
    const countEl = document.getElementById('courseCountText');
    if (!container) return;

    container.innerHTML = list.map(c => createCourseCardHTML(c)).join('');
    if (countEl) countEl.textContent = `Showing ${list.length} Masterclasses`;

    if (window.lucide) window.lucide.createIcons();
}

let activeCourseCategory = 'all';

function setCourseCategory(category, btnElement) {
    activeCourseCategory = category;
    document.querySelectorAll('#courseCategoryPills .pill-couture').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    filterCourses();
}

function filterCourses() {
    const search = (document.getElementById('courseSearchInput')?.value || '').toLowerCase();
    const level = document.getElementById('courseLevelSelect')?.value || 'all';
    const sortBy = document.getElementById('courseSortSelect')?.value || 'popular';

    let list = coursesData.filter(c => {
        const matchesCategory = (activeCourseCategory === 'all' || c.category === activeCourseCategory);
        const matchesLevel = (level === 'all' || c.level === level);
        const matchesSearch = c.title.toLowerCase().includes(search) || c.category.toLowerCase().includes(search) || c.description.toLowerCase().includes(search);
        return matchesCategory && matchesLevel && matchesSearch;
    });

    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.studentsCount - a.studentsCount);

    renderAllCourses(list);
}

/* ==========================================================================
   PRODUCT CATALOG (PAGE 04)
   ========================================================================== */

function createProductCardHTML(p) {
    const isWish = state.wishlist.includes(p.id);
    const subPrice = (p.price * 0.85).toFixed(2);

    return `
        <div class="couture-prod-card glass-card-couture">
            <div class="prod-thumb-wrapper">
                <button class="prod-wish-icon ${isWish ? 'active' : ''}" onclick="toggleWishlist('${p.id}')">
                    <i data-lucide="heart"></i>
                </button>
                <img src="${p.image}" alt="${p.name}" onclick="viewProductDetails('${p.id}')" style="cursor:pointer;">
            </div>
            <div class="prod-body-couture">
                <span class="tag-gold mb-2" style="width:fit-content;">${p.category}</span>
                <h4 class="prod-title-text" onclick="viewProductDetails('${p.id}')">${p.name}</h4>
                <div class="sub-choice-box">
                    <label class="sub-choice-opt">
                        <input type="radio" name="sub_${p.id}" value="onetime" checked onchange="updateProductPriceDisplay('${p.id}', ${p.price})">
                        <span>One-time purchase ($${p.price.toFixed(2)})</span>
                    </label>
                    <label class="sub-choice-opt">
                        <input type="radio" name="sub_${p.id}" value="sub" onchange="updateProductPriceDisplay('${p.id}', ${subPrice})">
                        <span>Subscribe & Save 15% ($${subPrice}) <span class="save-pill-tag">Auto-Ship</span></span>
                    </label>
                </div>
                <div class="course-footer-row">
                    <div class="price-main" id="prodPriceDisplay_${p.id}">$${p.price.toFixed(2)}</div>
                    <button class="btn btn-gold-foil btn-sm" onclick="addProductToCartFromCard('${p.id}')">
                        <i data-lucide="shopping-bag"></i> Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateProductPriceDisplay(prodId, price) {
    const el = document.getElementById(`prodPriceDisplay_${prodId}`);
    if (el) el.textContent = `$${parseFloat(price).toFixed(2)}`;
}

function addProductToCartFromCard(prodId) {
    const prod = productsData.find(p => p.id === prodId);
    if (!prod) return;

    const subRadio = document.querySelector(`input[name="sub_${prodId}"]:checked`);
    const isSubscription = subRadio ? subRadio.value === 'sub' : false;
    const discountedPrice = isSubscription ? (prod.price * 0.85) : prod.price;

    addToCart({
        id: prod.id,
        type: 'product',
        name: prod.name,
        price: prod.price,
        discountedPrice: discountedPrice,
        image: prod.image,
        isSubscription: isSubscription
    });
}

function renderHomeProducts() {
    const container = document.getElementById('homeProductsGrid');
    if (container) {
        container.innerHTML = productsData.slice(0, 4).map(p => createProductCardHTML(p)).join('');
    }
}

function renderAllProducts(list = productsData) {
    const container = document.getElementById('allProductsGrid');
    if (!container) return;
    container.innerHTML = list.map(p => createProductCardHTML(p)).join('');

    if (window.lucide) window.lucide.createIcons();
}

let activeShopCategory = 'all';

function setShopCategory(category, btnElement) {
    activeShopCategory = category;
    document.querySelectorAll('#shopCategoryPills .pill-couture').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    filterShopProducts();
}

function filterShopProducts() {
    const search = (document.getElementById('shopSearchInput')?.value || '').toLowerCase();
    const sulfateFree = document.getElementById('filterSulfateFree')?.checked;
    const vegan = document.getElementById('filterVegan')?.checked;
    const colorSafe = document.getElementById('filterColorSafe')?.checked;

    let list = productsData.filter(p => {
        const matchesCategory = (activeShopCategory === 'all' || p.category === activeShopCategory);
        const matchesSearch = p.name.toLowerCase().includes(search) || p.activeIngredient.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
        const matchesSulfate = !sulfateFree || p.isSulfateFree;
        const matchesVegan = !vegan || p.isVegan;
        const matchesColor = !colorSafe || p.isColorSafe;
        return matchesCategory && matchesSearch && matchesSulfate && matchesVegan && matchesColor;
    });

    renderAllProducts(list);
}

/* ==========================================================================
   PAGE 03: DIAGNOSTIC HAIR BIO-QUIZ
   ========================================================================== */

function openHairQuiz() {
    navigateTo('quiz');
    restartQuiz();
}

function nextQuizStep() {
    if (state.currentQuizStep < 5) {
        saveQuizStepChoice(state.currentQuizStep);
        state.currentQuizStep++;
        updateQuizStepUI();
    } else {
        saveQuizStepChoice(5);
        generateQuizResults();
    }
}

function prevQuizStep() {
    if (state.currentQuizStep > 1) {
        state.currentQuizStep--;
        updateQuizStepUI();
    }
}

function saveQuizStepChoice(step) {
    if (step === 1) state.quizAnswers.texture = document.querySelector('input[name="hairTexture"]:checked')?.value || state.quizAnswers.texture;
    if (step === 2) state.quizAnswers.porosity = document.querySelector('input[name="hairPorosity"]:checked')?.value || state.quizAnswers.porosity;
    if (step === 3) state.quizAnswers.scalp = document.querySelector('input[name="scalpType"]:checked')?.value || state.quizAnswers.scalp;
    if (step === 4) state.quizAnswers.chemical = document.querySelector('input[name="chemicalHistory"]:checked')?.value || state.quizAnswers.chemical;
    if (step === 5) state.quizAnswers.goal = document.querySelector('input[name="primaryGoal"]:checked')?.value || state.quizAnswers.goal;
}

function updateQuizStepUI() {
    document.querySelectorAll('.quiz-step-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(`quizStep${state.currentQuizStep}`)?.classList.add('active');

    document.getElementById('quizCurrentStep').textContent = state.currentQuizStep;
    document.getElementById('quizProgressFill').style.width = `${(state.currentQuizStep / 5) * 100}%`;

    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');

    prevBtn.style.display = state.currentQuizStep === 1 ? 'none' : 'inline-flex';
    nextBtn.innerHTML = state.currentQuizStep === 5 ? 'Analyze Bio-Profile ➔' : 'Continue ➔';

    if (window.lucide) window.lucide.createIcons();
}

function restartQuiz() {
    state.currentQuizStep = 1;
    document.getElementById('quizWizardCard').classList.remove('hidden');
    document.getElementById('quizResultsContainer').classList.add('hidden');
    updateQuizStepUI();
}

function generateQuizResults() {
    document.getElementById('quizWizardCard').classList.add('hidden');
    document.getElementById('quizResultsContainer').classList.remove('hidden');

    document.getElementById('resHairType').textContent = state.quizAnswers.texture;
    document.getElementById('resPorosity').textContent = state.quizAnswers.porosity;
    document.getElementById('resScalpType').textContent = state.quizAnswers.scalp;
    document.getElementById('resPrimaryGoal').textContent = state.quizAnswers.goal;

    const bundleItemsContainer = document.getElementById('quizBundleItems');
    const bundle = [productsData[0], productsData[1], productsData[2]];
    bundleItemsContainer.innerHTML = bundle.map(item => `
        <div class="bundle-item-box">
            <img src="${item.image}" alt="${item.name}">
            <h5>${item.name}</h5>
            <span>$${(item.price * 0.85).toFixed(2)} / auto-ship</span>
        </div>
    `).join('');

    adminQuizLeads.unshift({
        name: state.currentUser.name,
        email: state.currentUser.email,
        hairType: state.quizAnswers.texture,
        porosity: state.quizAnswers.porosity,
        goal: state.quizAnswers.goal,
        bundle: 'Prescribed Routine Kit',
        converted: 'Just Submitted'
    });
    renderAdminQuizLeads();

    showToast('Trichology Bio-Profile calculated successfully!');
    if (window.lucide) window.lucide.createIcons();
}

function addQuizBundleToCart() {
    addToCart({
        id: 'p5',
        type: 'product',
        name: 'Prescribed 4-Piece Clinical Hair Routine Kit',
        price: 114.00,
        discountedPrice: 88.00,
        image: 'images/image-27.png',
        isSubscription: true
    });
    toggleCartDrawer();
}

function saveRoutineToDashboard() {
    state.currentUser.hairProfile = { ...state.quizAnswers };
    showToast('Prescribed Routine saved to your Student Workspace!');
}

/* ==========================================================================
   PAGE 05: DYNAMIC DETAIL VIEW
   ========================================================================== */

function viewCourseDetails(courseId) {
    const c = coursesData.find(item => item.id === courseId);
    if (!c) return;

    state.selectedDetailItem = c;
    state.selectedDetailType = 'course';
    renderDetailView();
    navigateTo('details');
}

function viewProductDetails(prodId) {
    const p = productsData.find(item => item.id === prodId);
    if (!p) return;

    state.selectedDetailItem = p;
    state.selectedDetailType = 'product';
    renderDetailView();
    navigateTo('details');
}

function renderDetailView() {
    const container = document.getElementById('dynamicDetailContent');
    if (!container || !state.selectedDetailItem) return;

    if (state.selectedDetailType === 'course') {
        const c = state.selectedDetailItem;
        container.innerHTML = `
            <div class="glass-card-couture p-4" style="display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:flex-start;">
                <div>
                    <img src="${c.image}" alt="${c.title}" style="width:100%; height:400px; object-fit:cover; border-radius:var(--radius-lg); border:1px solid var(--obsidian-border);">
                    <div class="mt-4 p-3 glass-card-couture" style="display:flex; align-items:center; gap:1rem;">
                        <img src="${c.instructor.avatar}" alt="${c.instructor.name}" style="width:50px;height:50px;border-radius:50%;border:1px solid var(--gold-foil);">
                        <div>
                            <strong>${c.instructor.name}</strong>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${c.instructor.title}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="tag-gold">${c.category} • ${c.level}</span>
                    <h1 class="page-couture-title" style="font-size:2.5rem; margin:0.5rem 0 1rem; text-align:left;">${c.title}</h1>
                    <div class="pricing-duo mb-3">
                        <span class="price-main">$${c.price}</span>
                        <span class="price-struck">$${c.oldPrice}</span>
                    </div>
                    <p class="section-sub-desc mb-4" style="margin:0 0 1.5rem 0;">${c.description}</p>
                    <div style="display:flex; gap:1rem;">
                        <button class="btn btn-gold-foil btn-lg" onclick="quickEnroll('${c.id}')"><i data-lucide="graduation-cap"></i> Enroll in Masterclass ($${c.price})</button>
                        <button class="btn btn-outline-gold" onclick="openReviewModal('${c.title}')">Peer Review</button>
                    </div>
                    <div class="mt-4">
                        <h4 class="mb-2">Accredited Modules (${c.duration})</h4>
                        ${c.modules ? c.modules.map(m => `
                            <div class="glass-card-couture p-3 mb-2">
                                <strong>${m.title}</strong>
                                <ul style="margin-top:0.5rem; padding-left:1.25rem; font-size:0.85rem; color:var(--text-secondary);">
                                    ${m.lessons.map(l => `<li>${l}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('') : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        const p = state.selectedDetailItem;
        const subPrice = (p.price * 0.85).toFixed(2);
        container.innerHTML = `
            <div class="glass-card-couture" style="display:flex; flex-wrap:wrap; align-items:stretch; overflow:hidden;">
                <div style="flex: 1 1 400px; height:100%; min-height:450px;">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
                </div>
                <div style="flex: 1 1 400px; padding: 2.5rem;">
                    <span class="tag-gold">${p.category}</span>
                    <h1 class="page-couture-title" style="font-size:2.5rem; margin:0.5rem 0 1rem; text-align:left;">${p.name}</h1>
                    <div class="price-main mb-3">$${p.price.toFixed(2)}</div>
                    <p class="section-sub-desc mb-4" style="margin:0 0 1.5rem 0;">${p.description}</p>
                    <div class="glass-card-couture p-3 mb-3">
                        <strong class="gold-text"><i data-lucide="sparkles"></i> Active Biomolecule:</strong>
                        <p style="margin:0.25rem 0 0; font-size:0.9rem;">${p.activeIngredient}</p>
                    </div>
                    <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                        <button class="btn btn-gold-foil btn-lg" onclick="addProductToCartFromCard('${p.id}'); toggleCartDrawer();">
                            <i data-lucide="shopping-bag"></i> Add Formulation to Bag
                        </button>
                        <button class="btn btn-outline-gold" onclick="openReviewModal('${p.name}')">Review</button>
                    </div>
                    <div class="mt-4">
                        <h4>Application Routine</h4>
                        <p style="color:var(--text-secondary); font-size:0.9rem;">${p.usage}</p>
                    </div>
                </div>
            </div>
        `;
    }

    if (window.lucide) window.lucide.createIcons();
}

/* ==========================================================================
   PAGE 06: MASTER STYLISTS
   ========================================================================== */

function renderStylists(list = stylistsData) {
    const container = document.getElementById('stylistsGrid');
    if (!container) return;

    container.innerHTML = list.map(s => `
        <div class="glass-card-couture p-4 text-center" style="display:flex; flex-direction:column; align-items:center;">
            <img src="${s.avatar}" alt="${s.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; border:2px solid var(--gold-foil); margin-bottom:1rem;">
            <h3 style="font-size:1.35rem; margin-bottom:0.25rem;">${s.name}</h3>
            <span style="font-size:0.82rem; color:var(--gold-foil); margin-bottom:0.5rem;">${s.specialty}</span>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:1rem;"><i data-lucide="map-pin" style="width:14px;height:14px;display:inline;"></i> ${s.location}</div>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.25rem;">${s.bio}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; border-top:1px solid var(--obsidian-border); padding-top:1rem; margin-top:auto;">
                <strong class="gold-text">${s.rate}</strong>
                <button class="btn btn-gold-foil btn-sm" onclick="showToast('Booking calendar opened for ${s.name}')">Book</button>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

function filterStylists() {
    const search = (document.getElementById('stylistSearchInput')?.value || '').toLowerCase();
    const filtered = stylistsData.filter(s => s.name.toLowerCase().includes(search) || s.specialty.toLowerCase().includes(search) || s.location.toLowerCase().includes(search));
    renderStylists(filtered);
}

function filterStylistSpecialty(spec, btn) {
    document.querySelectorAll('#page-freelance .pill-couture').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (spec === 'all') renderStylists(stylistsData);
    else renderStylists(stylistsData.filter(s => s.tags.some(t => t.toLowerCase().includes(spec.toLowerCase()))));
}

/* ==========================================================================
   CART & CHECKOUT
   ========================================================================== */

function toggleCartDrawer() {
    document.getElementById('cartBackdrop')?.classList.toggle('active');
    document.getElementById('cartDrawer')?.classList.toggle('active');
}

function addToCart(item) {
    const existing = state.cart.find(i => i.id === item.id && i.isSubscription === item.isSubscription);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    showToast(`Added "${item.name}" to Apothecary bag!`);
}

function quickEnroll(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    addToCart({
        id: course.id,
        type: 'course',
        name: course.title,
        price: course.price,
        discountedPrice: course.price,
        image: course.image,
        isSubscription: false
    });
    toggleCartDrawer();
}

function changeCartQty(index, delta) {
    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) state.cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const countBadges = [document.getElementById('cartCount'), document.getElementById('drawerItemCount')];
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscount');

    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    countBadges.forEach(b => { if (b) b.textContent = totalCount; });

    if (!container) return;

    if (state.cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty-state">
                <i data-lucide="shopping-bag"></i>
                <h4>Your Bag is Empty</h4>
                <p>Select clean clinical botanicals or accredited masterclasses.</p>
            </div>
        `;
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        if (totalEl) totalEl.textContent = '$0.00';
    } else {
        container.innerHTML = state.cart.map((item, idx) => `
            <div class="cart-item-row">
                <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    ${item.isSubscription ? '<span class="cart-item-sub-tag">✦ Auto-Replenish (15% Off)</span>' : ''}
                    <div class="cart-item-price">$${(item.discountedPrice * item.qty).toFixed(2)}</div>
                </div>
                <div class="cart-qty-ctrl">
                    <button onclick="changeCartQty(${idx}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeCartQty(${idx}, 1)">+</button>
                </div>
            </div>
        `).join('');

        const subtotal = state.cart.reduce((sum, item) => sum + (item.discountedPrice * item.qty), 0);
        let discount = 0;
        if (state.discountPercent > 0) {
            discount = subtotal * (state.discountPercent / 100);
            if (discountRow) discountRow.style.display = 'flex';
            if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
        }

        const total = subtotal - discount;
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    if (window.lucide) window.lucide.createIcons();
}

function applyCartPromo() {
    const input = document.getElementById('cartPromoInput');
    const code = (input?.value || '').trim().toUpperCase();

    if (code === 'TRANSFORM15') {
        state.discountPercent = 15;
        state.activePromo = 'TRANSFORM15';
        showToast('Benefit TRANSFORM15 applied! (15% Off)');
        updateCartUI();
    } else {
        showToast('Invalid code. Try TRANSFORM15');
    }
}

function toggleWishlist(itemId) {
    const idx = state.wishlist.indexOf(itemId);
    if (idx > -1) {
        state.wishlist.splice(idx, 1);
        showToast('Removed from Wishlist');
    } else {
        state.wishlist.push(itemId);
        showToast('Saved to Wishlist!');
    }
    updateWishlistCount();
    renderAllProducts();
}

function updateWishlistCount() {
    const el = document.getElementById('wishlistCount');
    if (el) el.textContent = state.wishlist.length;
}

function openWishlistModal() {
    navigateTo('dashboard');
    switchDashTab('tab-wishlist', document.querySelector('[data-tab="tab-wishlist"]'));
}

/* ==========================================================================
   CHECKOUT SIMULATION
   ========================================================================== */

function openCheckoutModal() {
    if (state.cart.length === 0) {
        showToast('Bag is empty!');
        return;
    }
    toggleCartDrawer();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.discountedPrice * item.qty), 0);
    const discount = subtotal * (state.discountPercent / 100);
    const total = subtotal - discount;

    document.getElementById('coSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('coTotal').textContent = `$${total.toFixed(2)}`;

    document.getElementById('checkoutMiniItems').innerHTML = state.cart.map(item => `
        <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.4rem;">
            <span>${item.qty}x ${item.name}</span>
            <strong>$${(item.discountedPrice * item.qty).toFixed(2)}</strong>
        </div>
    `).join('');

    document.getElementById('checkoutModal')?.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
}

function closeCheckoutModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('checkoutModal')?.classList.remove('active');
}

function processOrderCheckout() {
    const newOrderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;

    state.cart.forEach(item => {
        if (item.type === 'course' && !state.currentUser.enrolledCourses.includes(item.id)) {
            state.currentUser.enrolledCourses.push(item.id);
        }
    });

    state.currentUser.orders.unshift({
        id: newOrderId,
        date: 'Just now',
        items: state.cart.map(i => i.name).join(', '),
        total: document.getElementById('coTotal').textContent,
        status: 'Formulating in Lab',
        tracking: 'Complimentary Express'
    });

    state.cart = [];
    updateCartUI();
    closeCheckoutModal();

    document.getElementById('successOrderId').textContent = newOrderId;
    document.getElementById('orderSuccessModal')?.classList.add('active');

    renderDashboard();
    renderAdminViews();

    if (window.lucide) window.lucide.createIcons();
}

function closeSuccessModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('orderSuccessModal')?.classList.remove('active');
}

function viewOrderInDashboard() {
    closeSuccessModal();
    navigateTo('dashboard');
    switchDashTab('tab-orders', document.querySelector('[data-tab="tab-orders"]'));
}

/* ==========================================================================
   DASHBOARDS & ROLES
   ========================================================================== */

function switchUserRole(role) {
    state.currentUserRole = role;
    document.getElementById('demoRoleUser')?.classList.toggle('active', role === 'student');
    document.getElementById('demoRoleAdmin')?.classList.toggle('active', role === 'admin');

    if (role === 'admin') {
        state.currentUser.name = 'Directrice Vivienne Roux';
        state.currentUser.email = 'director@aurahairacademy.com';
        document.getElementById('headerUserRole').textContent = 'Académie Directrice';
        showToast('Director Hub Enabled');
    } else {
        state.currentUser.name = 'Elena Vance';
        state.currentUser.email = 'elena.vance@aurahairacademy.com';
        document.getElementById('headerUserRole').textContent = 'Certified Scholar';
        showToast('Scholar Workspace Active');
    }

    document.getElementById('headerUserName').textContent = state.currentUser.name;
    document.getElementById('dashUserName').textContent = state.currentUser.name;
    document.getElementById('dashUserEmail').textContent = state.currentUser.email;

    switchDashboardRole(role);
}

function switchDashboardRole(role) {
    const isStudent = role === 'student';
    document.getElementById('btnViewStudent')?.classList.toggle('active', isStudent);
    document.getElementById('btnViewAdmin')?.classList.toggle('active', !isStudent);

    document.getElementById('studentSidebarMenu')?.classList.toggle('hidden', !isStudent);
    document.getElementById('adminSidebarMenu')?.classList.toggle('hidden', isStudent);

    if (isStudent) switchDashTab('tab-courses', document.querySelector('[data-tab="tab-courses"]'));
    else switchDashTab('tab-admin-analytics', document.querySelector('[data-tab="tab-admin-analytics"]'));
}

function switchDashTab(tabId, btn) {
    document.querySelectorAll('.dash-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.dash-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(tabId)?.classList.add('active');
    if (btn) btn.classList.add('active');

    if (window.lucide) window.lucide.createIcons();
}

function renderDashboard() {
    // Render Enrolled Courses
    const enrolledContainer = document.getElementById('enrolledCoursesList');
    if (enrolledContainer) {
        const enrolled = coursesData.filter(c => state.currentUser.enrolledCourses.includes(c.id));
        enrolledContainer.innerHTML = enrolled.map(c => `
            <div class="enrolled-card glass-card-couture">
                <img src="${c.image}" alt="${c.title}" class="enrolled-thumb">
                <div>
                    <span class="tag-gold">${c.category}</span>
                    <h4 style="margin:0.25rem 0;">${c.title}</h4>
                    <div class="progress-track-bar">
                        <div class="progress-fill-bar" style="width: 65%;"></div>
                    </div>
                    <div class="progress-label-flex">
                        <span>14 / 24 Modules Completed</span>
                        <strong>65% Accredited</strong>
                    </div>
                </div>
                <button class="btn btn-gold-foil btn-sm" onclick="showToast('Loaded 4K lesson stream for ${c.title}')">
                    <i data-lucide="play"></i> Resume
                </button>
            </div>
        `).join('');
    }

    // Render Subscriptions
    const subContainer = document.getElementById('subscriptionsList');
    if (subContainer) {
        subContainer.innerHTML = state.currentUser.subscriptions.map(s => `
            <div class="sub-item-card glass-card-couture">
                <div class="sub-item-left">
                    <img src="${s.image}" alt="${s.name}">
                    <div class="sub-info">
                        <span class="tag-emerald">${s.status}</span>
                        <h4>${s.name}</h4>
                        <span>${s.frequency} • Next dispatch: ${s.nextDelivery}</span>
                    </div>
                </div>
                <div>
                    <div class="price-main mb-2">$${s.price.toFixed(2)}</div>
                    <button class="btn btn-outline-gold btn-sm" onclick="showToast('Auto-ship paused')">Pause</button>
                </div>
            </div>
        `).join('');
    }

    // Render Orders
    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        ordersContainer.innerHTML = state.currentUser.orders.map(o => `
            <div class="order-item-card glass-card-couture">
                <div>
                    <span class="tag-gold">${o.id}</span>
                    <h4 style="margin:0.25rem 0;">${o.items}</h4>
                    <span style="font-size:0.8rem; color:var(--text-muted);">${o.date} • ${o.tracking}</span>
                </div>
                <div style="text-align:right;">
                    <div class="price-main mb-1">${o.total}</div>
                    <span class="tag-emerald">${o.status}</span>
                </div>
            </div>
        `).join('');
    }
}

function printCertificate() {
    window.print();
}

function shareCertificate() {
    showToast('Accredited credential link copied to clipboard!');
}

function saveSettings() {
    state.currentUser.name = document.getElementById('settingFullName').value;
    state.currentUser.email = document.getElementById('settingEmail').value;
    document.getElementById('headerUserName').textContent = state.currentUser.name;
    document.getElementById('dashUserName').textContent = state.currentUser.name;
    document.getElementById('certStudentName').textContent = state.currentUser.name;
    showToast('Preferences updated!');
}

function togglePlaySimulation() {
    showToast('Streaming 4K Macro Trichology Demonstration...');
}

function downloadLessonNotes() {
    showToast('Downloading "Clinical_Trichology_Curriculum_Notes.pdf"...');
}

/* ==========================================================================
   ADMIN HUB VIEWS
   ========================================================================== */

function renderAdminViews() {
    const cTable = document.getElementById('adminCoursesTableBody');
    if (cTable) {
        cTable.innerHTML = coursesData.map(c => `
            <tr>
                <td><div class="table-img-cell"><img src="${c.image}"><strong>${c.title}</strong></div></td>
                <td>${c.category}</td>
                <td><span class="tag-gold">${c.level}</span></td>
                <td>${c.studentsCount}</td>
                <td><strong class="gold-text">$${c.price}</strong></td>
                <td><button class="btn btn-outline-gold btn-sm" onclick="showToast('Editing module...')">Edit</button></td>
            </tr>
        `).join('');
    }

    const pTable = document.getElementById('adminProductsTableBody');
    if (pTable) {
        pTable.innerHTML = productsData.map(p => `
            <tr>
                <td><div class="table-img-cell"><img src="${p.image}"><strong>${p.name}</strong></div></td>
                <td>${p.category}</td>
                <td><strong class="gold-text">$${p.price.toFixed(2)}</strong></td>
                <td>${p.stock} units</td>
                <td>${p.isSulfateFree ? '✓ 100%' : 'No'}</td>
                <td><button class="btn btn-outline-gold btn-sm" onclick="showToast('Restocked 50 units')">Restock</button></td>
            </tr>
        `).join('');
    }

    const stTable = document.getElementById('adminStudentsTableBody');
    if (stTable) {
        stTable.innerHTML = `
            <tr>
                <td><strong>Elena Vance</strong><br><span style="font-size:0.75rem;color:var(--text-muted);">elena.vance@aurahairacademy.com</span></td>
                <td><span class="tag-gold">Scholar</span></td>
                <td>2 Enrolled</td>
                <td>1 Verified</td>
                <td><span class="tag-emerald">Active</span></td>
            </tr>
        `;
    }

    const oTable = document.getElementById('adminOrdersTableBody');
    if (oTable) {
        oTable.innerHTML = `
            <tr>
                <td><strong>AUR-91823</strong></td>
                <td>Elena Vance</td>
                <td>Clinical Scalp Course + Peptide Elixir</td>
                <td><strong>$284.70</strong></td>
                <td><span class="tag-emerald">Fulfilled</span></td>
            </tr>
        `;
    }

    renderAdminQuizLeads();
}

function renderAdminQuizLeads() {
    const qTable = document.getElementById('adminQuizTableBody');
    if (qTable) {
        qTable.innerHTML = adminQuizLeads.map(l => `
            <tr>
                <td><strong>${l.name}</strong></td>
                <td>${l.hairType}</td>
                <td><span class="tag-gold">${l.porosity}</span></td>
                <td>${l.goal}</td>
                <td><span class="tag-emerald">${l.converted}</span></td>
            </tr>
        `).join('');
    }
}

function openAddCourseModal() { document.getElementById('addCourseModal')?.classList.add('active'); }
function closeAddCourseModal(e) { if (!e || e.target === e.currentTarget) document.getElementById('addCourseModal')?.classList.remove('active'); }

function submitNewCourse(e) {
    e.preventDefault();
    const title = document.getElementById('newCourseTitle').value;
    const cat = document.getElementById('newCourseCategory').value;
    const lvl = document.getElementById('newCourseLevel').value;
    const price = parseFloat(document.getElementById('newCoursePrice').value);
    const dur = document.getElementById('newCourseDuration').value;
    const inst = document.getElementById('newCourseInstructor').value;
    const desc = document.getElementById('newCourseDesc').value;

    coursesData.unshift({
        id: `c_${Date.now()}`,
        title: title,
        category: cat,
        level: lvl,
        duration: dur,
        studentsCount: 1,
        rating: 5.0,
        reviewsCount: 1,
        price: price,
        oldPrice: price * 1.5,
        instructor: { name: inst, title: 'Master Educator', avatar: 'images/image-1.png' },
        image: 'images/image-6.png',
        featured: false,
        description: desc
    });

    renderAllCourses();
    renderAdminViews();
    closeAddCourseModal();
    showToast(`Masterclass "${title}" published!`);
}

function openAddProductModal() { document.getElementById('addProductModal')?.classList.add('active'); }
function closeAddProductModal(e) { if (!e || e.target === e.currentTarget) document.getElementById('addProductModal')?.classList.remove('active'); }

function submitNewProduct(e) {
    e.preventDefault();
    const name = document.getElementById('newProdName').value;
    const cat = document.getElementById('newProdCategory').value;
    const price = parseFloat(document.getElementById('newProdPrice').value);
    const stock = parseInt(document.getElementById('newProdStock').value);
    const active = document.getElementById('newProdActive').value;
    const desc = document.getElementById('newProdDesc').value;

    productsData.unshift({
        id: `p_${Date.now()}`,
        name: name,
        category: cat,
        price: price,
        rating: 5.0,
        reviewsCount: 0,
        image: 'images/image-25.png',
        tag: 'New Formulation',
        isSulfateFree: true,
        isVegan: true,
        isColorSafe: true,
        activeIngredient: active,
        stock: stock,
        description: desc,
        usage: 'Apply per routine instructions.'
    });

    renderAllProducts();
    renderAdminViews();
    closeAddProductModal();
    showToast(`Formulation "${name}" added!`);
}

/* ==========================================================================
   AUTHENTICATION & REVIEWS
   ========================================================================== */

function openAuthModal(mode = 'login') {
    document.getElementById('authModal')?.classList.add('active');
    switchAuthMode(mode);
}

function closeAuthModal(e) {
    if (!e || e.target === e.currentTarget) document.getElementById('authModal')?.classList.remove('active');
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');

    loginForm.classList.add('hidden');
    regForm.classList.add('hidden');
    forgotForm.classList.add('hidden');
    tabLogin.classList.remove('active');
    tabReg.classList.remove('active');

    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        tabLogin.classList.add('active');
    } else if (mode === 'register') {
        regForm.classList.remove('hidden');
        tabReg.classList.add('active');
    } else {
        forgotForm.classList.remove('hidden');
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    closeAuthModal();
    showToast('Signed in to Académie workspace!');
    navigateTo('dashboard');
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    state.currentUser.name = document.getElementById('regName').value;
    closeAuthModal();
    showToast(`Welcome, ${state.currentUser.name}!`);
    navigateTo('dashboard');
}

function handleForgotSubmit(e) {
    e.preventDefault();
    closeAuthModal();
    showToast('Reset verification token dispatched to inbox.');
}

function loginDemoAs(role) {
    switchUserRole(role);
    closeAuthModal();
    navigateTo('dashboard');
}

function openReviewModal(itemName) {
    document.getElementById('reviewItemName').value = itemName;
    document.getElementById('writeReviewModal')?.classList.add('active');
}

function closeReviewModal(e) {
    if (!e || e.target === e.currentTarget) document.getElementById('writeReviewModal')?.classList.remove('active');
}

function setReviewRating(r) {
    document.querySelectorAll('#starRatingSelect span').forEach((s, idx) => {
        s.classList.toggle('active', idx < r);
    });
}

function submitReviewForm(e) {
    e.preventDefault();
    closeReviewModal();
    showToast('Verified review submitted for peer moderation.');
}

/* ==========================================================================
   GLOBAL SEARCH & TOASTS
   ========================================================================== */

function toggleGlobalSearch() {
    const el = document.getElementById('searchOverlay');
    el.classList.toggle('active');
    if (el.classList.contains('active')) document.getElementById('globalSearchInput')?.focus();
}

function closeGlobalSearch(e) {
    if (!e || e.target === e.currentTarget) document.getElementById('searchOverlay')?.classList.remove('active');
}

function quickSearchTerm(t) {
    document.getElementById('globalSearchInput').value = t;
    handleGlobalSearch(t);
}

function handleGlobalSearch(q) {
    const query = (q || '').toLowerCase().trim();
    const container = document.getElementById('searchResultsList');
    if (!container) return;

    if (!query) {
        container.innerHTML = '<div class="search-placeholder-state"><p>Search through accredited courses and clean formulas.</p></div>';
        return;
    }

    const matchC = coursesData.filter(c => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query));
    const matchP = productsData.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

    container.innerHTML = [...matchC.map(c => `
        <div class="glass-card-couture p-3 mb-2" onclick="toggleGlobalSearch(); viewCourseDetails('${c.id}');" style="cursor:pointer; display:flex; align-items:center; gap:1rem;">
            <img src="${c.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;">
            <div><strong>${c.title}</strong><div style="font-size:0.75rem;color:var(--gold-foil);">Masterclass • $${c.price}</div></div>
        </div>
    `), ...matchP.map(p => `
        <div class="glass-card-couture p-3 mb-2" onclick="toggleGlobalSearch(); viewProductDetails('${p.id}');" style="cursor:pointer; display:flex; align-items:center; gap:1rem;">
            <img src="${p.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;">
            <div><strong>${p.name}</strong><div style="font-size:0.75rem;color:var(--gold-foil);">Formulation • $${p.price.toFixed(2)}</div></div>
        </div>
    `)].join('') || '<p class="text-center p-3 text-muted">No formulations or masterclasses matched.</p>';
}

function showToast(msg) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i data-lucide="sparkles" style="width:16px;height:16px;color:var(--gold-foil);"></i> <span>${msg}</span>`;
    container.appendChild(toast);

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* ==========================================================================
   BACK TO TOP BUTTON (GLOBAL - ALL PAGES)
   ========================================================================== */
(function initBackToTop() {
    const setup = () => {
        const btn = document.getElementById('backToTopBtn');
        const ring = document.getElementById('backToTopRing');
        if (!btn) return;

        const CIRCUMFERENCE = 2 * Math.PI * 26; // matches r="26"
        const SHOW_AFTER = 300;
        let ticking = false;

        const update = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

            btn.classList.toggle('visible', scrollTop > SHOW_AFTER);
            if (ring) ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
        window.addEventListener('resize', update);
        window.addEventListener('hashchange', () => setTimeout(update, 50));

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            btn.blur();
        });

        update();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
