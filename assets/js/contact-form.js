/**
 * moobilpay Contact Form Handler
 * Handles form submission with AJAX
 */

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.php-email-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      const loadingDiv = this.querySelector('.loading');
      const errorDiv = this.querySelector('.error-message');
      const sentDiv = this.querySelector('.sent-message');
      
      // Reset messages
      if (loadingDiv) loadingDiv.style.display = 'block';
      if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
      }
      if (sentDiv) sentDiv.style.display = 'none';
      if (submitButton) submitButton.disabled = true;
      
      // Send form data
      fetch('forms/contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error || 'Erreur réseau');
          });
        }
        return response.json();
      })
      .then(data => {
        if (loadingDiv) loadingDiv.style.display = 'none';
        
        if (data.success) {
          if (sentDiv) {
            sentDiv.textContent = data.message;
            sentDiv.style.display = 'block';
          }
          
          // Reset form
          contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            if (sentDiv) sentDiv.style.display = 'none';
          }, 5000);
        } else {
          throw new Error(data.error || 'Erreur inconnue');
        }
      })
      .catch(error => {
        if (loadingDiv) loadingDiv.style.display = 'none';
        if (errorDiv) {
          errorDiv.textContent = error.message;
          errorDiv.style.display = 'block';
        }
        console.error('Erreur:', error);
      })
      .finally(() => {
        if (submitButton) submitButton.disabled = false;
      });
    });
  }
});
