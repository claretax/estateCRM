import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from '../assets/css/form.module.css';
import { DataContext } from '../context/DataContext';

const BrokerForm = () => {
  const { scriptURL, userID } = useContext(DataContext);

  const [formData, setFormData] = useState({
    brokerName: '',
    phone: '',
    brokerEmail: '',
    note: '',
    company: '',
    profileImage: '',
    active: false,
    createdAt: '',
    hostID: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      const params = new URLSearchParams(formData).toString();
      const response = await fetch(
        `${scriptURL}?action=createBroker&${params}`,
      );

      const result = await response.json();

      if (result.id) {
        setMessage('Broker created successfully!, id: ' + result.id);
        setFormData({
          brokerName: '',
          phone: '',
          brokerEmail: '',
          note: '',
          company: '',
          profileImage: '',
          active: false,
          createdAt: '',
          hostID: ''
        });
      } else {
        throw new Error(result.message || 'Failed to create broker');
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Create New Broker</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label>
            Broker Name*:
            <input
              type="text"
              name="brokerName"
              value={formData.brokerName}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
          <label>
            Broker Email:
            <input
              type="email"
              name="brokerEmail"
              value={formData.brokerEmail}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
          <label>
            Note:
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
          <label>
            Profile Image URL:
            <input
              type="text"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
          <label>
            Active:
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
          <label>
            Host ID:
            <input
              type="text"
              name="hostID"
              value={userID}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className={styles["submitBtn"]}>
          Submit
        </button>

        {message && (
          <div className={`${styles["message"]} ${isError ? styles["error"] : styles["success"]}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default BrokerForm;