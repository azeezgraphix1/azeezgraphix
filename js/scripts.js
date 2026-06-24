/* ============================================================
 * scripts.js — AzeezgraphiX shared utilities & data-driven UI
 * ============================================================
 * Centralizes repeated values and renders card sections from
 * data arrays so each card structure is defined once.
 * ============================================================ */

// --------------- Shared constants ---------------
const WHATSAPP_URL = 'https://wa.me/233551101847';
const WHATSAPP_PHONE = '+233 551 101 847';

// --------------- Navigation links (single source for desktop + mobile) ---------------
const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#work', label: 'Work' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
];

// --------------- SVG icon paths (reusable, previously duplicated inline) ---------------
const SVG_ICONS = {
    whatsappFill: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.98 1.429 10.02 10.02 0 00-3.066 2.59 10.042 10.042 0 00-1.483 3.689 9.86 9.86 0 00-.435 4.178 10.023 10.023 0 00.577 3.08l-.052 1.862 1.912-.618a10.043 10.043 0 004.76 1.237 10.02 10.02 0 003.766-.73 10.018 10.018 0 002.823-1.952 10.027 10.027 0 001.938-2.825 10.016 10.016 0 00.727-3.766 10.013 10.013 0 00-.728-3.766A9.98 9.98 0 0012 5.98a10.01 10.01 0 00-4.05.82',
    location: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>',
    bolt: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
    check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    eye: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>',
};

// --------------- Service cards data ---------------
const SERVICES = [
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6M9 16h6"/>',
        title: 'Flyer & Poster Design',
        desc: 'Eye-catching designs for events, announcements, and promotions. Print-ready files optimized for perfect reproduction.',
    },
    {
        icon: '<rect x="3" y="3" width="18" height="14" rx="2"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 17h18"/>',
        title: 'Banner & Billboard Design',
        desc: 'Large-format designs that command attention. We design for real-world spaces and high-traffic zones.',
    },
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
        title: 'Vehicle Wraps',
        desc: 'Turn vehicles into mobile advertisements. Full-wrap or partial designs that maximize brand visibility.',
    },
    {
        icon: '<rect x="3" y="4" width="7" height="10" rx="1"/><rect x="14" y="4" width="7" height="10" rx="1"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 16h18"/>',
        title: 'Business Branding',
        desc: 'Business cards, letterheads, and brand identity systems. Professional collateral that builds credibility.',
    },
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 008.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>',
        title: 'Packaging Design',
        desc: 'Product labels, cartons, and containers. Designs that appeal on shelves and tell your brand\'s story.',
    },
    {
        icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
        title: 'Uniforms & Apparel',
        desc: 'Embroidery designs and screen-print layouts for uniforms, t-shirts, and branded apparel.',
    },
];

// --------------- Portfolio cards data ---------------
const PORTFOLIO = [
    {
        img: 'images/portfolio-1.jpg',
        title: 'Memorial T-Shirt Print',
        desc: 'Custom memorial t-shirt with portrait photos, worn at funeral gathering in Bolgatanga.',
    },
    {
        img: 'images/portfolio-2.jpg',
        title: 'Believers Afterwash Label',
        desc: 'Product label design on bottle, displayed on retail shelf in a local shop.',
    },
    {
        img: 'images/portfolio-3.jpg',
        title: 'Celebration of Life Booklet',
        desc: 'Funeral and burial service booklet \u2014 Produced by AzeezgraphiX Design & Printing Services.',
    },
    {
        img: 'images/portfolio-4.jpg',
        title: 'Dem Fake \u2014 Album Billboard',
        desc: 'Large-format album release billboard installed on a busy Bolgatanga road.',
    },
    {
        img: 'images/portfolio-5.jpg',
        title: 'Banner & Display Print',
        desc: 'Roll-up banners, teardrop flags, and exhibition backdrops \u2014 print-ready large format output.',
    },
    {
        img: null,
        title: 'Celebration of Life Booklet',
        desc: 'Luxury funeral booklet mockup with gold and cream finish \u2014 Produced by AzeezgraphiX.',
        placeholder: true,
    },
    {
        img: 'images/portfolio-6.jpg',
        title: 'Royal Bread Van Wrap',
        desc: 'Full vehicle branding for Royal Bread delivery van \u2014 designed and produced in Bolgatanga.',
    },
    {
        img: 'images/portfolio-7.jpg',
        title: 'Corporate Uniform \u2014 Adamu Ventures',
        desc: 'Embroidered polo uniform design for a corporate team, worn on site in the field.',
    },
    {
        img: 'images/portfolio-8.jpg',
        title: 'NAM Surgical Business Card',
        desc: 'Business card design for NAM Surgical and Medical Ghana Limited \u2014 printed and ready.',
    },
];

// --------------- Testimonial cards data ---------------
const TESTIMONIALS = [
    {
        initial: 'K',
        name: 'Dr. Kwame Mensah',
        role: 'Government Agency Director',
        quote: '\u201CAzeezgraphiX transformed our brand identity with exceptional attention to detail. Their understanding of government communication needs was outstanding. Highly recommended.\u201D',
    },
    {
        initial: 'A',
        name: 'Ama Osei',
        role: 'Transport Business Owner',
        quote: '\u201CThe vehicle wrap design was stunning and has attracted significant attention on the roads. Professional, timely delivery, and great value. Perfect execution.\u201D',
    },
    {
        initial: 'K',
        name: 'Kofi Adjei',
        role: 'FMCG Company Director',
        quote: '\u201CFrom concept to print-ready files, AzeezgraphiX delivered professional packaging design that elevated our product shelf presence. Outstanding work.\u201D',
    },
    {
        initial: 'A',
        name: 'Abena Boateng',
        role: 'CEO, Creative Agency',
        quote: '\u201CWorking with AzeezgraphiX was seamless and professional. They asked the right questions, understood our vision, and delivered work that exceeded expectations.\u201D',
    },
];

// --------------- Helper: create WhatsApp CTA SVG (used in multiple buttons) ---------------
function whatsappIconSVG(cls) {
    return `<svg class="${cls || 'w-5 h-5 mr-2'}" viewBox="0 0 24 24" fill="currentColor"><path d="${SVG_ICONS.whatsappFill}" /></svg>`;
}

// --------------- Render: navigation links ---------------
function renderNavLinks() {
    const desktopNav = document.getElementById('desktopNav');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!desktopNav || !mobileMenu) return;

    NAV_LINKS.forEach(({ href, label }) => {
        const desktopLink = document.createElement('a');
        desktopLink.href = href;
        desktopLink.className = 'text-sm font-medium text-gray-300 hover:text-cyan-400 transition';
        desktopLink.textContent = label;
        desktopNav.appendChild(desktopLink);

        const mobileLink = document.createElement('a');
        mobileLink.href = href;
        mobileLink.textContent = label;
        mobileLink.addEventListener('click', closeMobileMenu);
        mobileMenu.appendChild(mobileLink);
    });

    // Mobile WhatsApp CTA
    const mobileCTA = document.createElement('a');
    mobileCTA.href = WHATSAPP_URL;
    mobileCTA.target = '_blank';
    mobileCTA.rel = 'noopener noreferrer';
    mobileCTA.className = 'btn-primary text-center mt-4';
    mobileCTA.textContent = 'Chat on WhatsApp';
    mobileMenu.appendChild(mobileCTA);
}

// --------------- Render: service cards ---------------
function renderServiceCards() {
    const container = document.getElementById('servicesGrid');
    if (!container) return;

    SERVICES.forEach((s) => {
        container.insertAdjacentHTML('beforeend', `
            <div class="service-card card-base group relative">
                <div class="icon-svg text-cyan-400 group-hover:text-cyan-300">
                    <svg viewBox="0 0 24 24" class="w-full h-full">${s.icon}</svg>
                </div>
                <h3 class="text-xl font-bold mb-3">${s.title}</h3>
                <p class="text-gray-400">${s.desc}</p>
            </div>
        `);
    });
}

// --------------- Render: portfolio cards ---------------
function renderPortfolioCards() {
    const container = document.getElementById('portfolioGrid');
    if (!container) return;

    PORTFOLIO.forEach((p, i) => {
        const delay = i * 0.1;
        let inner;
        if (p.placeholder) {
            inner = `
                <div class="bg-gradient-to-br from-indigo-500/40 to-purple-500/40 w-full h-full flex items-center justify-center relative">
                    <svg class="w-20 h-20 text-cyan-400 opacity-40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                    <div class="absolute bottom-4 left-4 right-4 text-center">
                        <p class="text-xs font-bold text-cyan-300 bg-black/40 backdrop-blur px-2 py-1 rounded">Booklet / Print</p>
                    </div>
                </div>`;
        } else {
            inner = `
                <div class="w-full h-full relative overflow-hidden">
                    <img src="${p.img}" alt="${p.title}" loading="lazy">
                </div>`;
        }

        container.insertAdjacentHTML('beforeend', `
            <div class="portfolio-card fade-in group"${delay ? ` style="animation-delay: ${delay}s;"` : ''}>
                ${inner}
                <div class="portfolio-overlay">
                    <h3 class="text-xl font-bold">${p.title}</h3>
                    <p class="text-sm mt-2 text-gray-300">${p.desc}</p>
                </div>
            </div>
        `);
    });
}

// --------------- Render: testimonial cards ---------------
function renderTestimonialCards() {
    const container = document.getElementById('testimonialsGrid');
    if (!container) return;

    TESTIMONIALS.forEach((t) => {
        container.insertAdjacentHTML('beforeend', `
            <div class="testimonial-card group hover:border-cyan-400">
                <div class="flex items-start gap-4 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">${t.initial}</div>
                    <div>
                        <p class="font-bold text-white">${t.name}</p>
                        <p class="text-sm text-gray-400">${t.role}</p>
                    </div>
                </div>
                <p class="text-gray-300 leading-relaxed">${t.quote}</p>
            </div>
        `);
    });
}

// --------------- Render: WhatsApp links (inject href from constant) ---------------
function hydrateWhatsAppLinks() {
    document.querySelectorAll('[data-wa-link]').forEach((el) => {
        el.href = WHATSAPP_URL;
    });
    document.querySelectorAll('[data-wa-icon]').forEach((el) => {
        el.innerHTML = whatsappIconSVG(el.dataset.waIcon || undefined);
    });
    document.querySelectorAll('[data-wa-phone]').forEach((el) => {
        el.textContent = WHATSAPP_PHONE;
    });
}

// --------------- Mobile menu toggle ---------------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
    }
});

// --------------- Smooth scroll ---------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// --------------- Intersection Observer for animations ---------------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function observeFadeIns() {
    document.querySelectorAll('.fade-in').forEach((el) => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// --------------- Init ---------------
document.addEventListener('DOMContentLoaded', () => {
    renderNavLinks();
    renderServiceCards();
    renderPortfolioCards();
    renderTestimonialCards();
    hydrateWhatsAppLinks();
    observeFadeIns();
});
