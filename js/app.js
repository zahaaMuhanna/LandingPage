document.addEventListener('DOMContentLoaded', () => {
    // Navbar Section Logic
    const sections = document.querySelectorAll('section');
    const navbarItemsContainer = document.querySelector('.navbar-items');

    // Dynamically create navbar items
    sections.forEach((section) => {
        const sectionId = section.id; // Get the section's ID
        const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1); // Format section name

        // Create list item and anchor element
        const listItem = document.createElement('li');
        listItem.className = 'navbar-item';

        const anchor = document.createElement('a');
        anchor.href = `#${sectionId}`;
        anchor.textContent = sectionName;
        anchor.className = '';

        // Append anchor to list item, and list item to navbar container
        listItem.appendChild(anchor);
        navbarItemsContainer.appendChild(listItem);
    });

    // Add active link logic
    const navLinks = document.querySelectorAll('.navbar-item a');

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const link = navLinks[index];

            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
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
