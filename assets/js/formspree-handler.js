// Formspree Form Handler for moobilpay
(function() {
    'use strict';

    const form = document.querySelector('.php-email-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const loadingDiv = form.querySelector('.loading');
        const errorDiv = form.querySelector('.error-message');
        const sentDiv = form.querySelector('.sent-message');
        const submitButton = form.querySelector('button[type="submit"]');

        // Reset messages
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        sentDiv.style.display = 'none';
        errorDiv.textContent = '';
        
        // Disable submit button
        submitButton.disabled = true;

        // Send to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(async (response) => {
            loadingDiv.style.display = 'none';

            const contentType = response.headers.get('content-type') || '';
            const isJson = contentType.includes('application/json');
            const data = isJson ? await response.json() : null;

            if (response.ok) {
                // Success
                sentDiv.style.display = 'block';
                form.reset();

                // If Formspree provides a redirect path, follow it
                if (data && data.next) {
                    const nextUrl = new URL(data.next, form.action);
                    window.location.href = nextUrl.toString();
                    return;
                }

                // Otherwise, keep the success message visible and re-enable button
                setTimeout(() => {
                    submitButton.disabled = false;
                    sentDiv.style.display = 'none';
                }, 5000);
                return;
            }

            // Error from Formspree
            if (data && (data.error || data.errors)) {
                throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi du message.');
            }

            throw new Error('Une erreur est survenue lors de l\'envoi du message.');
        })
        .catch(error => {
            loadingDiv.style.display = 'none';
            errorDiv.style.display = 'block';
            errorDiv.textContent = error.message || 'Une erreur est survenue. Veuillez réessayer.';
            submitButton.disabled = false;
        });
    });
})();
