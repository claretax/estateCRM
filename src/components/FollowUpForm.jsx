import React, { useState, useContext } from 'react';
import styles from '../assets/css/form.module.css';
import { DataContext } from '../context/DataContext';

const FollowUpForm = () => {

  const {scriptURL, brokers, userID} = useContext(DataContext);

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
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); 
  const [suggestion, setSuggestion] = useState('');

  //   const brokerIDs = [
  //   "B123",
  //   "B456",
  //   "B789",
  //   "B101",
  //   "B112",
  //   "B131",
  //   "B415",
  //   "B161",
  //   "B718",
  //   "B192"
  // ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle suggestions for brokerID
    if (name === 'brokerID') {      
      const filteredSuggestions = brokers.filter(broker =>
       broker.ID.toString().includes(value) || broker.BrokerName.toLowerCase().includes(value.toLowerCase()) || broker.Phone.toString().includes(value)
        );
      // console.log(filteredSuggestions);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };


  const handleSuggestionClick = (suggestion) => {
    setSuggestion(suggestion);
    setFormData(prev => ({
      ...prev,
      brokerID: suggestion.ID
    }));
    setShowSuggestions(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      const params = new URLSearchParams(formData).toString();
        const response = await fetch(
            `${scriptURL}?action=createFollowup&${params}`,
          );

      const result = await response.json();            
      
      if (result.id) {
        setMessage('Follow-up created successfully!, id: ' + result.id);
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
    <div className={styles["form-container"]}>
      <h2>Create New Follow-up</h2>
      <form onSubmit={handleSubmit} action='get'>
        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
          <label>
            Scheduled Date*:
            <input
              type="datetime-local"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
          <label>
            Broker ID: {suggestion && `${suggestion.BrokerName} (${suggestion.Phone})`}
            <input
              type="text"
              name="brokerID"
              value={formData.brokerID}
              onChange={handleChange}
              // onFocus={() => setShowSuggestions(true)
              // }
              // onBlur={() => setShowSuggestions(false)}
            />
          </label>

          {showSuggestions && (
            <div className={styles.suggestions}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={styles["suggestion-item"]}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.BrokerName+` (${suggestion.Phone})`}
                </div>
              ))}
            </div>
          )}

        </div>

        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
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

        <div className={styles["form-group"]}>
          <label>
            Host ID:
            <input
              type="text"
              name="hostID"
              value={userID}
              onChange={handleChange}
              readOnly
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