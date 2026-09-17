
// ==============================
// PAGE LOADER
// ==============================

const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
    if (!pageLoader) return;

    setTimeout(() => {
        pageLoader.classList.add("loaded");
    }, 1200);
});


// ==============================
// MOBILE MENU
// ==============================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ==============================
// DARK / LIGHT MODE
// ==============================

const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    html.classList.add("light");
}

function updateThemeIcon() {
    if (!themeToggle) return;

    themeToggle.textContent = html.classList.contains("light")
        ? "☾"
        : "☼";
}

updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        html.classList.toggle("light");

        const isLight = html.classList.contains("light");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();
    });
}



// ==============================
// ACTIVE NAVIGATION ON SCROLL
// ==============================

const navLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const updateActiveNav = () => {
    let currentSection = "";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );
    });
};

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

window.addEventListener(
    "load",
    updateActiveNav
);


// ==============================
// SCROLLED NAVBAR
// ==============================

const siteHeader = document.querySelector(".site-header");

const updateHeader = () => {
    if (!siteHeader) return;

    siteHeader.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );
};

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

window.addEventListener(
    "load",
    updateHeader
);


// ==============================
// AUTOMATIC FOOTER YEAR
// ==============================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ==============================
// CONTACT FORM
// ==============================

const contactEmail = "your-email@example.com";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.elements.name?.value.trim();
        const email = contactForm.elements.email?.value.trim();
        const message = contactForm.elements.message?.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        const subject = `Portfolio Enquiry from ${name}`;

        const body = `
Hello Faithfulness,

My name is ${name}.

Email: ${email}

Message:
${message}
        `;

        const mailtoURL =
            `mailto:${contactEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoURL;
    });
}


// ==============================
// TESTIMONIAL CAROUSEL
// ==============================

const testimonialTrack =
    document.querySelector(".testimonials-track");

if (testimonialTrack) {

    // Store original cards
    const originalCards = [
        ...testimonialTrack.children
    ];

    // Duplicate cards for endless movement
    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");

        testimonialTrack.appendChild(clone);
    });


    // ==============================
    // CENTER CARD FOCUS
    // ==============================

    const updateFocusedCard = () => {

        const cards =
            testimonialTrack.querySelectorAll(
                ".testimonial-card"
            );

        const viewportCenter =
            window.innerWidth / 2;

        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach((card) => {

            const rect =
                card.getBoundingClientRect();

            const cardCenter =
                rect.left + rect.width / 2;

            const distance =
                Math.abs(
                    viewportCenter - cardCenter
                );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach((card) => {
            card.classList.toggle(
                "is-focused",
                card === closestCard
            );
        });
    };


    // Keep the center card updated
    let focusTimer = null;

    const startFocusTracking = () => {

        if (focusTimer) return;

        focusTimer = setInterval(
            updateFocusedCard,
            100
        );
    };

    const stopFocusTracking = () => {

        clearInterval(focusTimer);
        focusTimer = null;
    };

    startFocusTracking();
    updateFocusedCard();


    // ==============================
    // MOMENTARY TOUCH / CLICK PAUSE
    // ==============================

    let resumeTimer = null;

    const momentaryPause = () => {

        testimonialTrack.classList.add(
            "is-paused"
        );

        clearTimeout(resumeTimer);

        resumeTimer = setTimeout(() => {

            testimonialTrack.classList.remove(
                "is-paused"
            );

        }, 450);
    };


    testimonialTrack.addEventListener(
        "pointerdown",
        momentaryPause,
        { passive: true }
    );


    testimonialTrack.addEventListener(
        "click",
        momentaryPause
    );


    // Also briefly pause with keyboard focus
    testimonialTrack.addEventListener(
        "focusin",
        momentaryPause
    );


    // Recalculate after resize
    window.addEventListener(
        "resize",
        updateFocusedCard
    );
}


// ==============================
// DESKTOP CURSOR GLOW
// ==============================

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);

const finePointer =
    window.matchMedia("(pointer: fine)").matches;

if (finePointer) {

    document.body.classList.add("cursor-active");

    window.addEventListener(
        "pointermove",
        (event) => {
            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;
        },
        { passive: true }
    );

    document.addEventListener(
        "mouseleave",
        () => {
            document.body.classList.remove(
                "cursor-active"
            );
        }
    );

    document.addEventListener(
        "mouseenter",
        () => {
            document.body.classList.add(
                "cursor-active"
            );
        }
    );
}




// ==============================
// SCROLL REVEAL
// ==============================

const revealElements = document.querySelectorAll(
    "section > .container, .service-card, .tool-card, .strength-card, .work-card, .testimonial-card, .contact-card"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});





// ==============================
// BACK TO TOP
// ==============================

const backToTop = document.querySelector(".back-to-top");

const updateBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 60) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
};

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

window.addEventListener(
    "load",
    updateBackToTop
);


// ==============================
// ALWAYS START AT TOP ON RELOAD
// ==============================

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


