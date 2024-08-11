import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: '',
        description: ''
      });
    
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
        name:formData.name,
        reply_to: formData.email,    // Sender's email address
        to_email: 'himanshunraj12@gmail.com',    // Your email address
        message: formData.description
      };

      emailjs.send(
        'service_93vzmcs',          // Replace with your EmailJS Service ID
        'template_76t1xkb',         // Replace with your EmailJS Template ID
        templateParams,
        'ntWNEOHc-ijbxd0Ya'              // Replace with your EmailJS User ID
      ).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMessage('Congratulation Message sent successfully, we will contact you soon! ');
      }).catch((err) => {
        console.error('FAILED...', err);
        setMessage('Failed to send message');
      });
    };

  return (
    <div className="contact">
      <div className="contact-info">
      <h1>Contact Us</h1>
        <p>Email: himanshunraj12@gmail.com</p>
        <p>Phone: +91-8877290422</p>
        <p>Address: 246 New York City,United States</p>
      </div>
      <div className="contact-form">
        <form onSubmit={sendEmail}>
        <label htmlFor='email'>Name</label>
          <input 
            type="name" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <label htmlFor='email'>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <label htmlFor="description">Description</label>
          <textarea 
          name="description"
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows="10"
            cols="50"
          />
          <button type="submit">Send Message</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Contact;
