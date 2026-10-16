document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const scrollUpButton = document.querySelector(".scroll-up-btn");
    const menu = document.querySelector(".navbar .menu");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuIcon = menuToggle.querySelector("i");

    function updateScrollState() {
        navbar.classList.toggle("sticky", window.scrollY > 20);
        scrollUpButton.classList.toggle("show", window.scrollY > 500);
    }

    function closeMenu() {
        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    scrollUpButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.querySelectorAll(".navbar .menu-link").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    menuToggle.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuIcon.classList.toggle("fa-bars", !isOpen);
        menuIcon.classList.toggle("fa-times", isOpen);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.getElementById("download-link").addEventListener("click", function () {
        alert("Your CV is downloading...");
    });
});

let emailServiceReady = false;

window.addEventListener("load", function () {
    if (typeof window.emailjs === "undefined") {
        console.error("EmailJS is not loaded.");
        return;
    }
    try {
        window.emailjs.init("b52NgaxoZ_gG25iie");
        emailServiceReady = true;
    } catch (error) {
        console.error("EmailJS initialization failed:", error);
    }
});

function sendMail(event) {
    event.preventDefault();

    const form = document.getElementById("contact-form");
    const submitButton = form.querySelector('button[type="submit"]');
    const status = document.getElementById("contact-status");

    if (!emailServiceReady || typeof window.emailjs === "undefined") {
        status.textContent = "Email service is unavailable. Please try again later or email me directly.";
        status.classList.add("is-error");
        return;
    }

    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const messageValue = document.getElementById("message").value;

    const params = {
        to_email: "midhunshanmugam2004@gmail.com",
        name: nameValue,
        email: emailValue,
        message: messageValue
    };

    status.textContent = "Sending your message...";
    status.classList.remove("is-error", "is-success");
    submitButton.disabled = true;

    window.emailjs.send("service_lzbac4x", "template_yr2zo6k", params)
        .then(function (response) {
            console.log("Message sent successfully!", response);
            form.reset();
            status.textContent = "Message sent successfully. Thanks for reaching out!";
            status.classList.add("is-success");
        })
        .catch(function (error) {
            console.error("Failed to send message:", error);
            const errorMessage = error && error.text ? error.text : "Please check your EmailJS service, template, and allowed domains.";
            status.textContent = "Could not send message: " + errorMessage;
            status.classList.add("is-error");
        })
        .finally(function () {
            submitButton.disabled = false;
        });
}
