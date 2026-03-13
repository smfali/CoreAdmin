/**
 * TailAdmin - Main JavaScript File
 * Version: 1.0.0
 * Description: Common JavaScript functionality for all pages
 */

// ============================================
// 1. Dark Mode Functionality
// ============================================

const DARK_MODE_KEY = 'coreadmin-dark-mode';

/**
 * Check if dark mode is enabled
 */
function isDarkMode() {
    const savedMode = localStorage.getItem(DARK_MODE_KEY);
    if (savedMode !== null) {
        return savedMode === 'dark';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Apply dark mode to the document
 */
function applyDarkMode(isDark) {
    const html = document.documentElement;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (isDark) {
        html.classList.add('dark');
        localStorage.setItem(DARK_MODE_KEY, 'dark');
    } else {
        html.classList.remove('dark');
        localStorage.setItem(DARK_MODE_KEY, 'light');
    }
    
    // Update toggle button icons
    if (darkModeToggle) {
        const moonIcon = darkModeToggle.querySelector('.fa-moon');
        const sunIcon = darkModeToggle.querySelector('.fa-sun');
        if (moonIcon && sunIcon) {
            moonIcon.classList.toggle('hidden', isDark);
            sunIcon.classList.toggle('hidden', !isDark);
        }
    }
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    const isDark = !isDarkMode();
    applyDarkMode(isDark);
}

/**
 * Initialize dark mode
 */
function initDarkMode() {
    // Apply saved preference on page load
    applyDarkMode(isDarkMode());
    
    // Add toggle event listener
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only apply if user hasn't set a preference
        if (localStorage.getItem(DARK_MODE_KEY) === null) {
            applyDarkMode(e.matches);
        }
    });
}

// ============================================
// 2. Sidebar Functionality
// ============================================

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');

/**
 * Open the sidebar
 */
function openSidebar() {
    if (sidebar) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close the sidebar
 */
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/**
 * Initialize sidebar event listeners
 */
function initSidebar() {
    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', openSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
            closeModal();
        }
    });
}

// ============================================
// 2. Modal Functionality
// ============================================

const modal = document.getElementById('modal');

/**
 * Open modal dialog
 */
function openModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close modal dialog
 */
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Initialize modal event listeners
 */
function initModal() {
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// ============================================
// 3. Tab Functionality
// ============================================

/**
 * Switch between tabs
 * @param {HTMLElement} btn - The clicked tab button
 * @param {string} tabId - The ID of the tab content to show
 */
function switchTab(btn, tabId) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    btn.classList.add('active');
    
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Show selected tab content
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
        tabContent.classList.add('active');
    }
}

// ============================================
// 4. Password Toggle Functionality
// ============================================

/**
 * Toggle password visibility
 * @param {string} inputId - The ID of the password input
 */
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(inputId + '-icon');
    
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

// ============================================
// 5. Toggle Switch Functionality
// ============================================

/**
 * Initialize toggle switches
 */
function initToggleSwitches() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// ============================================
// 6. Checkbox Functionality
// ============================================

/**
 * Initialize custom checkboxes
 */
function initCheckboxes() {
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });
}

// ============================================
// 7. Radio Button Functionality
// ============================================

/**
 * Initialize custom radio buttons
 */
function initRadioButtons() {
    document.querySelectorAll('.custom-radio').forEach(radio => {
        radio.addEventListener('click', function() {
            // Get the group name from the radio's class
            const groupClass = Array.from(this.parentElement.classList).find(cls => cls.includes('-radio'));
            if (groupClass) {
                const groupName = groupClass.replace('-radio', '');
                // Remove checked from all radios in the same group
                document.querySelectorAll('.' + groupName).forEach(r => r.classList.remove('checked'));
                // Add checked to clicked radio
                this.classList.add('checked');
            }
        });
    });
}

// ============================================
// 8. Notification Functionality
// ============================================

/**
 * Initialize notification items
 */
function initNotifications() {
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
}

// ============================================
// 9. Calendar Functionality
// ============================================

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Events data (days with events)
const events = [5, 12, 15, 22, 28];

/**
 * Generate calendar grid
 * @param {number} month - Month index (0-11)
 * @param {number} year - Year
 */
function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().getDate();
    const isCurrentMonth = new Date().getMonth() === month && new Date().getFullYear() === year;
    
    const calendarDays = document.getElementById('calendarDays');
    if (!calendarDays) return;
    
    let calendarHTML = '';
    
    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day empty p-2 text-center text-sm text-secondary"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === today;
        const hasEvent = events.includes(day);
        const classes = `calendar-day p-2 text-center text-sm text-dark rounded-lg ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}`;
        calendarHTML += `<div class="${classes}">${day}</div>`;
    }
    
    calendarDays.innerHTML = calendarHTML;
    
    const currentMonthEl = document.getElementById('currentMonth');
    if (currentMonthEl) {
        currentMonthEl.textContent = `${monthNames[month]} ${year}`;
    }
}

/**
 * Change calendar month
 * @param {number} delta - Number of months to change (+1 or -1)
 */
function changeMonth(delta) {
    currentMonth += delta;
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    generateCalendar(currentMonth, currentYear);
}

/**
 * Initialize calendar
 */
function initCalendar() {
    generateCalendar(currentMonth, currentYear);
}

// ============================================
// 10. Form Validation Helpers
// ============================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if meets minimum requirements
 */
function validatePassword(password) {
    return password.length >= 8;
}

/**
 * Show error on form field
 * @param {HTMLElement} input - The input element
 */
function showInputError(input) {
    if (input) {
        input.classList.add('input-error');
    }
}

/**
 * Clear error from form field
 * @param {HTMLElement} input - The input element
 */
function clearInputError(input) {
    if (input) {
        input.classList.remove('input-error');
    }
}

// ============================================
// 11. Utility Functions
// ============================================

/**
 * Format date for display
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 12. Initialize All Components
// ============================================

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Initialize sidebar
    initSidebar();
    
    // Initialize modal
    initModal();
    
    // Initialize toggle switches
    initToggleSwitches();
    
    // Initialize checkboxes
    initCheckboxes();
    
    // Initialize radio buttons
    initRadioButtons();
    
    // Initialize notifications
    initNotifications();
    
    // Initialize calendar if on calendar page
    if (document.getElementById('calendarDays')) {
        initCalendar();
    }
    
    console.log('TailAdmin initialized successfully');
});

// ============================================
// 13. Page-Specific Initializations
// ============================================

/**
 * Initialize login page specific functionality
 */
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let isValid = true;
            
            // Email validation
            if (!validateEmail(email.value)) {
                showInputError(email);
                isValid = false;
            } else {
                clearInputError(email);
            }
            
            // Password validation
            if (!validatePassword(password.value)) {
                showInputError(password);
                isValid = false;
            } else {
                clearInputError(password);
            }
            
            if (isValid) {
                alert('Login successful!');
                // window.location.href = 'index.html';
            }
        });
        
        // Remove error styling on input
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                clearInputError(this);
            });
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                clearInputError(this);
            });
        }
    }
}

/**
 * Initialize register page specific functionality
 */
function initRegisterPage() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');
            let isValid = true;
            
            // Full name validation
            if (fullName.value.trim().length < 2) {
                showInputError(fullName);
                isValid = false;
            } else {
                clearInputError(fullName);
            }
            
            // Email validation
            if (!validateEmail(email.value)) {
                showInputError(email);
                isValid = false;
            } else {
                clearInputError(email);
            }
            
            // Password validation
            if (!validatePassword(password.value)) {
                showInputError(password);
                isValid = false;
            } else {
                clearInputError(password);
            }
            
            // Confirm password validation
            if (password.value !== confirmPassword.value) {
                showInputError(confirmPassword);
                isValid = false;
            } else {
                clearInputError(confirmPassword);
            }
            
            // Terms checkbox validation
            if (!terms.checked) {
                showInputError(terms);
                isValid = false;
            } else {
                clearInputError(terms);
            }
            
            if (isValid) {
                alert('Registration successful!');
                // window.location.href = 'index.html';
            }
        });
        
        // Remove error styling on input
        ['fullName', 'email', 'password', 'confirmPassword'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', function() {
                    clearInputError(this);
                });
            }
        });
        
        // Remove error styling on terms checkbox
        const termsCheckbox = document.getElementById('terms');
        if (termsCheckbox) {
            termsCheckbox.addEventListener('change', function() {
                clearInputError(this);
            });
        }
    }
}

/**
 * Initialize forgot password page specific functionality
 */
function initForgotPasswordPage() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            let isValid = true;
            
            // Email validation
            if (!validateEmail(email.value)) {
                showInputError(email);
                isValid = false;
            } else {
                clearInputError(email);
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                }
                forgotPasswordForm.reset();
            }
        });
        
        // Remove error styling on input
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                clearInputError(this);
            });
        }
    }
}

/**
 * Initialize profile page specific functionality
 */
function initProfilePage() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile updated successfully!');
        });
    }
}

/**
 * Initialize settings page specific functionality
 */
function initSettingsPage() {
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    }
}

// ============================================
// 14. Global Export
// ============================================

// Export functions for use in inline scripts
window.TailAdmin = {
    openSidebar,
    closeSidebar,
    openModal,
    closeModal,
    switchTab,
    togglePassword,
    changeMonth,
    validateEmail,
    validatePassword,
    showInputError,
    clearInputError,
    formatDate,
    formatNumber,
    debounce
};
