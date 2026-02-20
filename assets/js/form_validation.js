document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const guestsInput = document.getElementById('guests');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    
    function validateName() {
      const name = nameInput.value.trim();
      const errorElement = document.getElementById('nameError');
      
      if (name.length < 2) {
        showError(nameInput, errorElement, 'Name must be at least 2 characters');
        return false;
      } else if (!/^[a-zA-Z\s]*$/.test(name)) {
        showError(nameInput, errorElement, 'Name can only contain letters');
        return false;
      } else {
        hideError(nameInput, errorElement);
        return true;
      }
    }
    
    function validateEmail() {
      const email = emailInput.value.trim();
      const errorElement = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Please enter a valid email address');
        return false;
      } else {
        hideError(emailInput, errorElement);
        return true;
      }
    }
    
    function validatePhone() {
      const phone = phoneInput.value.trim();
      const errorElement = document.getElementById('phoneError');
      const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
      
      if (phone && !phoneRegex.test(phone)) {
        showError(phoneInput, errorElement, 'Please enter a valid phone number');
        return false;
      } else {
        hideError(phoneInput, errorElement);
        return true;
      }
    }
    
    function showError(input, errorElement, message) {
      input.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    
    function hideError(input, errorElement) {
      input.classList.remove('error');
      errorElement.style.display = 'none';
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      
      if (isNameValid && isEmailValid && isPhoneValid) {
        // Show success message
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Display success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Thank you! Your booking request has been sent. We\'ll confirm shortly.';
        successMessage.style.cssText = `
          background: #4CAF50;
          color: white;
          padding: 1rem;
          border-radius: 4px;
          margin-top: 1rem;
          text-align: center;
        `;
        
        contactForm.reset();
        contactForm.appendChild(successMessage);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  // Date picker min date (today)
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});