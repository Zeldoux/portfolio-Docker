import React, { useState, useRef, useEffect } from 'react';
import 'altcha';

/**
 * Component: Contact
 * Provides a contact form where users can enter their name, email, and message.
 * Includes ALTCHA widget for spam prevention and form validation.
 */
function Contact() {
  // State to manage form data (name, email, message)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // State to display form submission status (e.g., success or error message)
  const [formStatus, setFormStatus] = useState('');

  // State to track the submission process
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref to store the ALTCHA payload (captcha verification token)
  const altchaPayloadRef = useRef(null);

  // Effect to initialize ALTCHA widget and listen for state changes
  useEffect(() => {
    const widget = document.querySelector('altcha-widget');

    if (widget) {
      // Event listener for ALTCHA state changes
      widget.addEventListener('statechange', (ev) => {
        console.log('ALTCHA state:', ev.detail.state);

        if (ev.detail.state === 'verified') {
          // Save verified payload when captcha is successfully completed
          console.log('ALTCHA payload:', ev.detail.payload);
          altchaPayloadRef.current = ev.detail.payload;
        } else if (ev.detail.state === 'error') {
          // Clear the payload if an error occurs
          console.error('ALTCHA error:', ev.detail.error);
          altchaPayloadRef.current = null;
        }
      });

      // Event listener for ALTCHA widget errors
      widget.addEventListener('error', (err) => {
        console.error('ALTCHA widget error:', err);
        altchaPayloadRef.current = null;
      });
    }
  }, []);

  // Update form data state when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Retrieve ALTCHA token
    const altchaToken = altchaPayloadRef.current;

    // Ensure captcha was successfully completed
    if (!altchaToken) {
      setFormStatus('Captcha verification échoué. complétez le CAPTCHA à nouveau.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Send form data and ALTCHA token to the backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, altchaToken }),
      });

      // Handle non-OK responses
      if (!response.ok) {
        let errorMessage;
              // Reset the ALTCHA widget
        const widget = document.querySelector('altcha-widget');
        if (widget) {
          widget.reset();
        }
        // Attempt to parse the error message from the response
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Une erreur est survenue.';
        } catch {
          errorMessage = await response.text(); // Fallback to plain text
        }

        setFormStatus(`Error: ${errorMessage}`); // Display error message
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
        throw new Error(errorMessage);
      }

      // Success: Clear the form and show success message
      setFormStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
      altchaPayloadRef.current = null; // Reset ALTCHA token
      // Reset the ALTCHA widget
      const widget = document.querySelector('altcha-widget');
      if (widget) {
        widget.reset();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Allow further submissions
    }
  };

  return (
    <section className="contact-section section-container">
      <h2 className="title-banner">Me Contacter</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        {/* Name input */}
        <label>
          Nom
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting} // Disable during submission
          />
        </label>

        {/* Email input */}
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting} // Disable during submission
          />
        </label>

        {/* Message input */}
        <label>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting} // Disable during submission
          />
        </label>

        {/* ALTCHA widget for captcha verification */}
        <fieldset>
          <altcha-widget
            style={{ '--altcha-max-width': '100%' }}
            challengeurl="https://eu.altcha.org/api/v1/challenge?apiKey=ckey_01598c0f05beac8a83bb93637c52"
            spamfilter="ipAddress"
          />
        </fieldset>

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'En cours d\'envoi...' : 'Envoyer'}
        </button>
      </form>

      {/* Form status message */}
      {formStatus && <p className="form-status">{formStatus}</p>}
    </section>
  );
}

export default Contact;