/* ==========================================================================
   Bella Vista Restaurant Management JavaScript Engine
   Includes:
   - Food Menu Category Filter (Starters, Main Course, Desserts, Beverages)
   - Table Reservation Form Client-Side Validation
   - Confirmation Alert Preview Message Generator
   - Mobile Drawer Navigation Toggle
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM References
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    // Validation Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // ==========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        });
    });

    // ==========================================
    // 2. FOOD MENU CATEGORY FILTER
    // ==========================================
    menuTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            menuTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Set today's date as min date for reservation picker
    const resDateInput = document.getElementById('resDate');
    if (resDateInput) {
        const today = new Date().toISOString().split('T')[0];
        resDateInput.setAttribute('min', today);
    }

    // ==========================================
    // 3. TABLE RESERVATION FORM VALIDATION
    // ==========================================
    const reservationForm = document.getElementById('reservationForm');
    const resName = document.getElementById('resName');
    const resEmail = document.getElementById('resEmail');
    const resPhone = document.getElementById('resPhone');
    const resGuests = document.getElementById('resGuests');
    const resDate = document.getElementById('resDate');
    const resTime = document.getElementById('resTime');
    const confirmationAlert = document.getElementById('confirmationAlert');
    const confirmationText = document.getElementById('confirmationText');

    function showError(inputEl, errorId, message) {
        const errEl = document.getElementById(errorId);
        errEl.innerText = message;
        errEl.classList.add('show');
    }

    function clearError(errorId) {
        const errEl = document.getElementById(errorId);
        errEl.classList.remove('show');
    }

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name Validation
        if (resName.value.trim().length < 3) {
            showError(resName, 'resNameError', 'Full name is required (min 3 characters).');
            isValid = false;
        } else {
            clearError('resNameError');
        }

        // Email Validation
        if (!emailRegex.test(resEmail.value.trim())) {
            showError(resEmail, 'resEmailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError('resEmailError');
        }

        // Phone Validation
        if (!phoneRegex.test(resPhone.value.trim())) {
            showError(resPhone, 'resPhoneError', 'Please enter a valid 10-digit phone number.');
            isValid = false;
        } else {
            clearError('resPhoneError');
        }

        // Guests Validation
        if (resGuests.value === '') {
            showError(resGuests, 'resGuestsError', 'Please select number of guests.');
            isValid = false;
        } else {
            clearError('resGuestsError');
        }

        // Date Validation
        if (resDate.value === '') {
            showError(resDate, 'resDateError', 'Please select a reservation date.');
            isValid = false;
        } else {
            clearError('resDateError');
        }

        // Time Validation
        if (resTime.value === '') {
            showError(resTime, 'resTimeError', 'Please select a time slot.');
            isValid = false;
        } else {
            clearError('resTimeError');
        }

        // Success Confirmation
        if (isValid) {
            const refCode = `BV-${Math.floor(1000 + Math.random() * 9000)}`;
            confirmationText.innerText = `Thank you, ${resName.value.trim()}! Your table for ${resGuests.value} on ${resDate.value} at ${resTime.value} has been requested. Confirmation Reference Code: #${refCode}. (Client-side validation preview demo).`;
            
            confirmationAlert.style.display = 'block';
            reservationForm.reset();

            // Scroll confirmation alert into view
            confirmationAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                confirmationAlert.style.display = 'none';
            }, 8000);
        }
    });
});
