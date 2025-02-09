import React, { useState, useContext } from 'react';
import styles from '../assets/css/form.module.css';
import { DataContext } from '../context/DataContext';

const FollowUpForm = () => {
  const {scriptURL} = useContext(DataContext);

  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    interestedIn: '',
    note: '',
    scheduledDate: '',
    brokerID: '',
    clientEmail: '',
    propertyID: '',
    status: 'pending',
    hostID: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      const params = new URLSearchParams(formData).toString();
        const response = await fetch(
            `${scriptURL}?action=createVisit&${params}`,
          );

      const result = await response.json();            
      
      if (result.id) {
        setMessage('Follow-up created successfully!');
        setFormData({
          clientName: '',
          phone: '',
          interestedIn: '',
          note: '',
          scheduledDate: '',
          brokerID: '',
          clientEmail: '',
          propertyID: '',
          status: 'pending',
          hostID: ''
        });
      } else {
        throw new Error(result.message || 'Failed to create follow-up');
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Visit</h2>
      <form onSubmit={handleSubmit} action='get'>
        <div className="form-group">
          <label>
            Client Name*:
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Phone*:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Interested In*:
            <input
              type="text"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Note*:
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Scheduled Date*:
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Client Email:
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Broker ID:
            <input
              type="text"
              name="brokerID"
              value={formData.brokerID}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Property ID:
            <input
              type="text"
              name="propertyID"
              value={formData.propertyID}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Host ID:
            <input
              type="text"
              name="hostID"
              value={formData.hostID}
              onChange={handleChange}
            />
          </label>
        </div>

        <button className={styles.submitBtn} type="submit">Create Follow-up</button>
        
        {message && (
          <div className={`${styles.success} ${styles.message}`}>
            {message}
          </div>
        )}
      </form>


    </div>
  );
};

export default FollowUpForm;