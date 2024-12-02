document.addEventListener('DOMContentLoaded', () => {
    // Navbar Section Logic
    const sections = document.querySelectorAll('header, section');
    const navLinks = document.querySelectorAll('.navbar-item a'); 

    // Function to update the active link based on the scroll position
    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let activeIndex = -1; 

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeIndex = index;
            }
        });

        if (
            activeIndex === -1 &&
            window.scrollY + window.innerHeight >= document.body.scrollHeight
        ) {
            activeIndex = sections.length - 1; // Set the last section active
        }

        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        });
    };

    window.addEventListener('scroll', updateActiveLink);

    updateActiveLink();

    // Form Validation Logic
    const form = document.querySelector('.contact-form form');
    const nameInput = document.querySelector('.form-group input[type="text"]');
    const emailInput = document.querySelector('.form-group input[type="email"]');
    const subjectInput = document.querySelector('.contact-form input[type="text"]:not(.form-group input)');
    const messageArea = document.querySelector('.contact-form textarea');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        clearErrors();

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name.');
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Please enter your email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email.');
            isValid = false;
        }

        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Please enter a subject.');
            isValid = false;
        }

        if (messageArea.value.trim() === '') {
            showError(messageArea, 'Please enter a message.');
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset(); // Reset the form
        }
    });

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
        input.classList.add('error-input');
        input.focus(); 
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach((error) => error.remove());
        const inputs = document.querySelectorAll('.error-input');
        inputs.forEach((input) => input.classList.remove('error-input'));
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
