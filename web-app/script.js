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

window.addEventListener("load", function () {
    if (typeof window.emailjs === "undefined") {
        console.error("EmailJS is not loaded.");
        return;
    }
    window.emailjs.init("b52NgaxoZ_gG25iie");
    console.log("EmailJS initialized successfully.");
});

function sendMail(event) {
    event.preventDefault();

    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const messageValue = document.getElementById("message").value;

    const params = {
        to_email: "midhunshanmugam2004@gmail.com",
        name: nameValue,
        email: emailValue,
        message: messageValue
    };

    if (typeof window.emailjs === "undefined") {
        console.error("EmailJS is not loaded.");
        alert("Email service is unavailable. Please try again later.");
        return;
    }

    window.emailjs.send("service_lzbac4x", "template_yr2zo6k", params)
        .then(function (response) {
            console.log("Message sent successfully!", response);
            alert("Message sent successfully! Check your email.");
            document.getElementById("contact-form").reset();
        })
        .catch(function (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please check the console for errors.");
        });
}
