// Form Toggle Functionality
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
}

function showSignup() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
}

// Donation Modal Functions
function showDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Reset amount selection
        const amountButtons = document.querySelectorAll('.amount-option');
        amountButtons.forEach(btn => btn.classList.remove('active'));
        const customAmount = document.querySelector('.custom-amount input');
        if (customAmount) customAmount.value = '';
    }
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Share functionality
function shareCampaign(campaignTitle) {
    const campaignUrl = window.location.href;
    const shareText = `Check out this campaign on CrowdConnect: ${campaignTitle}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareText + '\n' + campaignUrl).then(() => {
        showNotification('Campaign link copied to clipboard! Share it with your network.', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText + '\n' + campaignUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Campaign link copied to clipboard! Share it with your network.', 'success');
    });
}

// Form Submission Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login process
            simulateLogin(email, password);
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signup');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate signup process
            simulateSignup(name, email, password);
        });
    }

    // Campaign Form Handler
    const campaignForm = document.querySelector('.campaign-form');
    if (campaignForm) {
        campaignForm.addEventListener('submit', function(e) {
            e.preventDefault();
            createCampaign();
        });
    }

    // Image Upload Preview
    const imageUpload = document.getElementById('campaignImage');
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            previewImage(e);
        });
    }

    // Donation amount selection
    setupDonationButtons();

    // Close modal when clicking outside
    setupModalClose();

    // Support option selection
    setupSupportOptions();
});

// Setup donation amount buttons
function setupDonationButtons() {
    const amountButtons = document.querySelectorAll('.amount-option');
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // Confirm donation button
    const confirmBtn = document.querySelector('.btn-confirm');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            processDonation();
        });
    }
}

// Setup modal close functionality
function setupModalClose() {
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('donationModal');
        if (e.target === modal) {
            closeDonationModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDonationModal();
        }
    });
}

// Setup support options
function setupSupportOptions() {
    const supportOptions = document.querySelectorAll('.support-option input');
    supportOptions.forEach(option => {
        option.addEventListener('change', function() {
            const card = this.closest('.support-option').querySelector('.option-card');
            if (this.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    });
}

// Simulate Login
function simulateLogin(email, password) {
    showLoading('Logging in...');
    
    setTimeout(() => {
        hideLoading();
        // Redirect to dashboard (in real app, this would be after successful authentication)
        window.location.href = 'dashboard.html';
    }, 1500);
}

// Simulate Signup
function simulateSignup(name, email, password) {
    showLoading('Creating your account...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Account created successfully! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 2000);
}

// Create Campaign
function createCampaign() {
    const title = document.getElementById('campaignTitle').value;
    const goal = document.getElementById('campaignGoal').value;
    
    showLoading('Launching your campaign...');
    
    setTimeout(() => {
        hideLoading();
        showNotification('Campaign launched successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }, 2000);
}

// Process Donation
function processDonation() {
    const selectedAmount = document.querySelector('.amount-option.active');
    const customAmount = document.querySelector('.custom-amount input').value;
    
    let amount = '0';
    if (selectedAmount) {
        amount = selectedAmount.textContent;
    } else if (customAmount) {
        amount = `₹${customAmount}`;
    }
    
    if (amount === '0') {
        showNotification('Please select or enter a donation amount.', 'error');
        return;
    }
    
    showLoading('Processing your donation...');
    
    setTimeout(() => {
        hideLoading();
        closeDonationModal();
        showNotification(`Thank you for your donation of ${amount}!`, 'success');
    }, 2000);
}

// Image Preview Function
function previewImage(event) {
    const input = event.target;
    const placeholder = input.nextElementSibling;
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            placeholder.innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 100%; border-radius: 8px;">
                <p>Image uploaded successfully</p>
            `;
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Loading Indicator
function showLoading(message = 'Loading...') {
    // Remove existing loader if any
    hideLoading();
    
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add show class after a delay
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Image Upload Functionality
function previewImage(input) {
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Check file type
        if (!file.type.match('image.*')) {
            showNotification('Please select a valid image file (PNG, JPG, GIF).', 'error');
            return;
        }
        
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Image size should be less than 10MB.', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            imagePreview.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
        showNotification('Image uploaded successfully!', 'success');
    }
}

function removeImage() {
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const fileInput = document.getElementById('campaignImage');
    
    fileInput.value = '';
    uploadPlaceholder.style.display = 'flex';
    imagePreview.style.display = 'none';
    showNotification('Image removed.', 'info');
}

// Drag and drop functionality
function setupImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('campaignImage');
    
    if (uploadArea) {
        // Click to upload
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                previewImage(fileInput);
            }
        });
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
}

