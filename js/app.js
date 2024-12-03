document.addEventListener('DOMContentLoaded', () => {
    // Navbar Section Logic
    const header = document.querySelector('header'); // Select the header section
    const sections = document.querySelectorAll('section'); // Select all sections
    const navbarItemsContainer = document.querySelector('.navbar-items');

    // Create a function to add navbar items dynamically
    const createNavbarItem = (sectionId, sectionName) => {
        const listItem = document.createElement('li');
        listItem.className = 'navbar-item';

        const anchor = document.createElement('a');
        anchor.href = `#${sectionId}`;
        anchor.textContent = sectionName;

        listItem.appendChild(anchor);
        navbarItemsContainer.appendChild(listItem);
    };

    // Add "Home" for the header section as the first item
    createNavbarItem('header', 'Home');

    // Dynamically create navbar items for all sections
    sections.forEach((section) => {
        const sectionId = section.id;
        const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        createNavbarItem(sectionId, sectionName);
    });

    // Add active link logic
    const navLinks = document.querySelectorAll('.navbar-item a');
    const allSections = [header, ...sections]; // Include the header in the sections list

    const updateActiveState = () => {
        allSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();

            // Check if the section is in the viewport
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                section.classList.add('active-section'); // Add active class to section
                navLinks[index].classList.add('active'); // Add active class to nav link
            } else {
                section.classList.remove('active-section'); // Remove active class from section
                navLinks[index].classList.remove('active'); // Remove active class from nav link
            }
        });
    };

    window.addEventListener('scroll', updateActiveState);
    updateActiveState(); // Initialize on page load

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
