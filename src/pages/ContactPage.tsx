// src/pages/ContactPage.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram
} from 'react-icons/fa'

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Google Form integration config
  const GOOGLE_FORM = {
    formId: '1FAIpQLSf-YxQrLVpKQcaVViRY5KayFGIvS-Mzi6J9DYLP9R4J8U3QeQ',
    fieldIds: {
      name: 'entry.711183719',
      email: 'entry.2091804586',
      subject: 'entry.513638696',
      message: 'entry.1230634780',
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({
      submitted: true,
      success: false,
      message: 'Sending your message...',
    })

    try {
      // Prepare form data for submission
      const formData = new FormData()
      formData.append(GOOGLE_FORM.fieldIds.name, formState.name)
      formData.append(GOOGLE_FORM.fieldIds.email, formState.email)
      formData.append(GOOGLE_FORM.fieldIds.subject, formState.subject)
      formData.append(GOOGLE_FORM.fieldIds.message, formState.message)

      // Submit to Google Form endpoint
      await fetch(
        `https://docs.google.com/forms/d/e/${GOOGLE_FORM.formId}/formResponse`,
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // Required for cross-origin Google Form submission
        }
      )

      // Handle success case
      setStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you shortly.',
      })

      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

    } catch (error) {
      console.error('Form submission error:', error)
      setStatus({
        submitted: true,
        success: false,
        message: 'Something went wrong. Please try again or contact us directly.',
      })
    }
  }

  // Updated Google Maps location link with full place details
  const directionsUrl = "https://www.google.com/maps/place/PRESTIGE+WEST+WOODS,+Gopalapura,+Binnipete,+Bengaluru,+Karnataka+560023,+India/@12.9776301,77.5630992,18z/data=!3m1!4b1!4m6!3m5!1s0x3bae161d4bde1ac1:0xd0454380d2d678cd!8m2!3d12.9775109!4d77.5631957!16s%2Fg%2F11j2zxr1w0?entry=ttu"

  return (
    <main>
      <PageHero title='contact' />
      <Wrapper className='page section section-center'>
        <div className='contact-info'>
          <h2>get in touch</h2>
          <p>We'd love to hear from you! Whether you have questions about our products, want to share your experience, or are interested in wholesale opportunities, our team is here to help.</p>

          <div className='info-container'>
            <div className='info-item'>
              <FaMapMarkerAlt className='icon' />
              <div>
                <h4>Our Location</h4>
                <address className="contact-address">
                  Prestige West Woods<br />
                  Magadi Road, Gopalpura<br />
                  Bengaluru, Karnataka 560023
                </address>
                {/* Directions button moved below the address */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="directions-btn"
                >
                  <span className="directions-text">Get Directions</span>
                </a>
              </div>
            </div>

            <div className='info-item'>
              <FaPhoneAlt className='icon' />
              <div>
                <h4>Phone</h4>
                <p>+91 90984 04225</p>
              </div>
            </div>

            <div className='info-item'>
              <FaEnvelope className='icon' />
              <div>
                <h4>Email</h4>
                <p>natureburst.shop@gmail.com</p>
              </div>
            </div>

            <div className='info-item'>
              <FaInstagram className='icon' />
              <div>
                <h4>Follow Us</h4>
                <a
                  href='https://instagram.com/tropitreats.shop'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  @tropitreats.shop
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='contact-form-container'>
          <h2>send us a message</h2>

          {status.submitted && (
            <div className={`form-message ${status.success ? 'success' : 'error'}`}>
              {status.message}
            </div>
          )}

          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Your Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Your Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='subject'>Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formState.subject}
                onChange={handleChange}
                placeholder="What's this regarding?"
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Your Message</label>
              <textarea
                id='message'
                name='message'
                rows={6}
                value={formState.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type='submit' className='btn submit-btn' disabled={status.submitted && !status.success}>
              {status.submitted && !status.success ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 4px;
      background: var(--clr-primary-5);
    }
  }

  .contact-info {
    p {
      line-height: 1.8;
      color: var(--clr-grey-5);
      margin-bottom: 2rem;
    }
  }

  .info-container {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .info-item {
    display: flex;
    align-items: flex-start;

    .icon {
      color: var(--clr-primary-5);
      font-size: 1.5rem;
      margin-right: 1rem;
      margin-top: 0.25rem;
    }

    h4 {
      margin-bottom: 0.5rem;
      color: var(--clr-grey-3);
    }

    p {
      margin-bottom: 0;
      color: var(--clr-grey-5);
    }
  }

  .contact-address {
    color: var(--clr-grey-5);
    font-style: normal;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  /* Standalone directions button styling */
  .directions-btn {
    text-decoration: none;
    display: inline-block;
  }

  .directions-text {
    display: inline-block;
    background: var(--clr-grey-9);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--clr-grey-5);
    transition: var(--transition);

    &:hover {
      background: var(--clr-primary-5);
      color: var(--clr-white);
    }
  }

  /* Social link styling */
  .social-link {
    color: var(--clr-grey-5);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--clr-primary-5);
    }
  }

  .contact-form-container {
    background: var(--clr-white);
    padding: 2rem;
    border-radius: var(--radius);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  .form-message {
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: var(--radius);

    &.success {
      background: var(--clr-green-light);
      color: var(--clr-green-dark);
    }

    &.error {
      background: var(--clr-red-light);
      color: var(--clr-red-dark);
    }
  }

  .contact-form {
    display: grid;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      color: var(--clr-grey-3);
      font-weight: 500;
    }

    input, select, textarea {
      border: 1px solid var(--clr-grey-8);
      border-radius: var(--radius);
      padding: 0.8rem;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: var(--clr-primary-5);
      }
    }
  }

  .submit-btn {
    background: var(--clr-primary-5);
    color: var(--clr-white);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    margin-top: 0.5rem;

    &:hover {
      background: var(--clr-primary-3);
      transform: translateY(-3px);
    }

    &:disabled {
      background: var(--clr-grey-6);
      cursor: not-allowed;
      transform: none;
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

export default ContactPage