/* ICT251 Activity 3 — interactive features
   Main features: mobile navigation, theme switch, project filter,
   gallery viewer, and contact form validation with a local preview.
*/

"use strict";

// Update the copyright year automatically.
const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Mobile navigation: open/close the menu and keep its state accessible.
const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");

if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", function () {
        const isOpen = primaryNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            primaryNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 850) {
            primaryNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        }
    });
}

// Theme switch: change CSS variables by toggling a class on body.
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isLight = document.body.classList.toggle("light-theme");
        themeToggle.textContent = isLight ? "Dark theme" : "Light theme";
        themeToggle.setAttribute("aria-pressed", String(isLight));
    });
}

// Project search: match the visitor's words against each project's content and keywords.
const projectSearch = document.getElementById("projectSearch");
const resetSearch = document.getElementById("resetSearch");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const noProjects = document.getElementById("noProjects");

function filterProjects() {
    if (!projectSearch || !noProjects) return;

    const query = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const searchableText = (
            card.textContent + " " + (card.dataset.search || "")
        ).toLowerCase();
        const matches = searchableText.includes(query);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
    });

    noProjects.hidden = visibleCount !== 0;
}

if (projectSearch) {
    projectSearch.addEventListener("input", filterProjects);
}
if (resetSearch && projectSearch) {
    resetSearch.addEventListener("click", function () {
        projectSearch.value = "";
        filterProjects();
        projectSearch.focus();
    });
}

// Gallery viewer: on narrow screens, show one photo and update its caption/status.
// On wide screens, all photos remain visible; the buttons still cycle the active item.
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const galleryGrid = document.getElementById("galleryGrid");
const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const galleryStatus = document.getElementById("galleryStatus");
let activePhotoIndex = 0;

function showGalleryPhoto(index) {
    if (galleryItems.length === 0) return;

    // Wrap around at either end so every photo remains reachable.
    activePhotoIndex = (index + galleryItems.length) % galleryItems.length;

    galleryItems.forEach(function (item, itemIndex) {
        item.classList.toggle("is-active", itemIndex === activePhotoIndex);
    });

    if (galleryStatus) {
        galleryStatus.textContent =
            "Showing photo " + (activePhotoIndex + 1) +
            " of " + galleryItems.length;
    }
}

if (galleryItems.length > 0) {
    showGalleryPhoto(0);
}
if (previousPhoto) {
    previousPhoto.addEventListener("click", function () {
        if (galleryGrid) galleryGrid.classList.add("viewer-mode");
        showGalleryPhoto(activePhotoIndex - 1);
    });
}
if (nextPhoto) {
    nextPhoto.addEventListener("click", function () {
        if (galleryGrid) galleryGrid.classList.add("viewer-mode");
        showGalleryPhoto(activePhotoIndex + 1);
    });
}

// Contact form: validate locally, show useful feedback, and never send/store the data.
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formFeedback = document.getElementById("formFeedback");
const messagePreview = document.getElementById("messagePreview");
const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewMessage = document.getElementById("previewMessage");

function showFormFeedback(message, kind) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = "form-feedback " + kind;
    formFeedback.hidden = false;
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (name.length === 0) {
            showFormFeedback("Please enter your name. A name made only of spaces is not valid.", "error");
            nameInput.focus();
            messagePreview.hidden = true;
            return;
        }

        // A practical email pattern: requires text before/after @ and a dot in the domain.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormFeedback("Please enter an email address in a valid format, for example name@example.com.", "error");
            emailInput.focus();
            messagePreview.hidden = true;
            return;
        }

        if (message.length === 0) {
            showFormFeedback("Please write a message. A message made only of spaces is not valid.", "error");
            messageInput.focus();
            messagePreview.hidden = true;
            return;
        }

        // textContent displays the user's input as text, not executable HTML.
        previewName.textContent = name;
        previewEmail.textContent = email;
        previewMessage.textContent = message;

        messagePreview.hidden = false;
        showFormFeedback(
            "Your details passed validation. The preview is shown below; no message has been sent.",
            "success"
        );

        messagePreview.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
}
