/* =========================================================
   CODELAB - MAIN JAVASCRIPT
   ========================================================= */

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. THEME TOGGLE
       ===================================================== */

    const themeToggle = document.getElementById("themeToggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("codelab-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    // Theme button
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const isLight = document.body.classList.contains("light-theme");

            localStorage.setItem(
                "codelab-theme",
                isLight ? "light" : "dark"
            );

            // Change icon
            themeToggle.textContent = isLight ? "☀️" : "🌙";
        });

        // Set initial icon
        themeToggle.textContent =
            document.body.classList.contains("light-theme")
                ? "☀️"
                : "🌙";
    }


    /* =====================================================
       2. SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId &&
                targetId !== "#" &&
                document.querySelector(targetId)
            ) {
                event.preventDefault();

                const target = document.querySelector(targetId);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    /* =====================================================
       3. NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       4. ACTIVE NAVIGATION LINK
       ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* =====================================================
       5. LAB CARD HOVER EFFECT
       ===================================================== */

    const labCards = document.querySelectorAll(".lab-card");

    labCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

        });

    });


    /* =====================================================
       6. FEATURE CARD ANIMATION
       ===================================================== */

    const featureCards =
        document.querySelectorAll(".feature-card");

    featureCards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.1}s`;

    });


    /* =====================================================
       7. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".lab-card, .feature-card, .learning-step, .stat-card"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       8. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       9. COPY CODE BUTTON
       ===================================================== */

    const copyButtons =
        document.querySelectorAll(".copy-code");

    copyButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const codeBlock =
                button.closest(".code-window");

            if (!codeBlock) return;

            const code =
                codeBlock.querySelector("code");

            if (!code) return;

            try {

                await navigator.clipboard.writeText(
                    code.innerText
                );

                const originalText =
                    button.innerHTML;

                button.innerHTML = "✓ Copied";

                setTimeout(() => {

                    button.innerHTML =
                        originalText;

                }, 2000);

            } catch (error) {

                console.error(
                    "Unable to copy code:",
                    error
                );

            }

        });

    });


    /* =====================================================
       10. CODE WINDOW TERMINAL EFFECT
       ===================================================== */

    const terminalDots =
        document.querySelectorAll(".window-dot");

    terminalDots.forEach(dot => {

        dot.addEventListener("click", () => {

            const type =
                dot.dataset.type;

            if (type === "close") {

                const windowBox =
                    dot.closest(".code-window");

                if (windowBox) {

                    windowBox.style.opacity = "0";

                    setTimeout(() => {

                        windowBox.style.opacity = "1";

                    }, 1000);

                }

            }

        });

    });


    /* =====================================================
       11. CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       12. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .lab-btn, .cta-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                button.getBoundingClientRect();

            const size =
                Math.max(
                    rect.width,
                    rect.height
                );

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =====================================================
       13. KEYBOARD SHORTCUT
       ===================================================== */

    document.addEventListener("keydown", event => {

        // Press "/" to focus search
        if (
            event.key === "/" &&
            !["INPUT", "TEXTAREA"].includes(
                document.activeElement.tagName
            )
        ) {

            const searchInput =
                document.querySelector(
                    ".search-input"
                );

            if (searchInput) {

                event.preventDefault();

                searchInput.focus();

            }

        }

        // Press Escape to remove focus
        if (event.key === "Escape") {

            document.activeElement.blur();

        }

    });


    /* =====================================================
       14. SEARCH FUNCTION
       ===================================================== */

    const searchInput =
        document.querySelector(".search-input");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchTerm =
                    this.value.toLowerCase().trim();

                const searchableCards =
                    document.querySelectorAll(
                        ".program-card, .lab-card"
                    );

                searchableCards.forEach(card => {

                    const text =
                        card.innerText.toLowerCase();

                    if (
                        searchTerm === "" ||
                        text.includes(searchTerm)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       15. LEARNING PATH HOVER
       ===================================================== */

    const learningSteps =
        document.querySelectorAll(".learning-step");

    learningSteps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            learningSteps.forEach(item => {

                item.classList.remove("path-active");

            });

            step.classList.add("path-active");

        });

    });


    /* =====================================================
       16. PARALLAX EFFECT FOR HERO
       ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    if (heroVisual) {

        window.addEventListener("mousemove", event => {

            const x =
                (window.innerWidth / 2 - event.clientX)
                / 50;

            const y =
                (window.innerHeight / 2 - event.clientY)
                / 50;

            heroVisual.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =====================================================
       17. MOBILE MENU
       ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-links");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("mobile-open");

            menuToggle.classList.toggle("active");

        });

        // Close menu after clicking a link
        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove(
                    "mobile-open"
                );

                menuToggle.classList.remove(
                    "active"
                );

            });

        });

    }


    /* =====================================================
       18. CONSOLE WELCOME MESSAGE
       ===================================================== */

    console.log(
        "%c🚀 Welcome to CodeLab!",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "%cLearn. Code. Experiment.",
        "font-size: 14px;"
    );

});