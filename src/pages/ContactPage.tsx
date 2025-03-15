// src/pages/ContactPage.tsx
import React, { useState } from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterest
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, you would send the form data to your server here
    // For demonstration purposes, we'll just simulate a successful submission

    setStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
    })

    // Reset form after submission
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

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
                <p>123 Nature Way, Green Valley, CA 95123</p>
              </div>
            </div>

            <div className='info-item'>
              <FaPhoneAlt className='icon' />
              <div>
                <h4>Phone</h4>
                <p>(555) 123-4567</p>
              </div>
            </div>

            <div className='info-item'>
              <FaEnvelope className='icon' />
              <div>
                <h4>Email</h4>
                <p>hello@natureburst.com</p>
              </div>
            </div>

            <div className='info-item'>
              <FaClock className='icon' />
              <div>
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9AM - 5PM PST</p>
              </div>
            </div>
          </div>

          <div className='social-links'>
            <h4>Follow Us</h4>
            <div className='social-icons'>
              <a href='https://instagram.com' className='social-icon'>
                <FaInstagram />
              </a>
              <a href='https://facebook.com' className='social-icon'>
                <FaFacebookF />
              </a>
              <a href='https://twitter.com' className='social-icon'>
                <FaTwitter />
              </a>
              <a href='https://pinterest.com' className='social-icon'>
                <FaPinterest />
              </a>
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
              <select
                id='subject'
                name='subject'
                value={formState.subject}
                onChange={handleChange}
                required
              >
                <option value=''>Select a subject</option>
                <option value='Product Inquiry'>Product Inquiry</option>
                <option value='Wholesale'>Wholesale Opportunities</option>
                <option value='Feedback'>Feedback</option>
                <option value='Other'>Other</option>
              </select>
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

            <button type='submit' className='btn submit-btn'>
              Send Message
            </button>
          </form>
        </div>
      </Wrapper>

      <MapSection>
        <div className='map-container'>
          {/* In a real application, you would include a Google Maps embed or similar map service here */}
          <div className='map-placeholder'>
            <p>Map Location of NatureBurst</p>
            <small>Google Maps integration would be implemented here</small>
          </div>
        </div>
      </MapSection>
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
    }
  }

  .social-links {
    h4 {
      margin-bottom: 1rem;
      color: var(--clr-grey-3);
    }

    .social-icons {
      display: flex;
      gap: 1rem;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--clr-primary-5);
      color: var(--clr-white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;

      &:hover {
        background: var(--clr-primary-3);
        transform: translateY(-3px);
      }
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
    transition: all 0.3s ease;
    margin-top: 0.5rem;

    &:hover {
      background: var(--clr-primary-3);
      transform: translateY(-3px);
    }
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

const MapSection = styled.section`
  margin-top: 5rem;

  .map-container {
    width: 100%;
    height: 400px;
  }

  .map-placeholder {
    width: 100%;
    height: 100%;
    background: var(--clr-grey-9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--clr-grey-5);
    font-size: 1.2rem;

    small {
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  }
`

export default ContactPage