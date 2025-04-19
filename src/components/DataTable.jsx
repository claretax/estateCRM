import React, { useState, useContext } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import styles from '../assets/css/table.module.css';
import formStyles from '../assets/css/form.module.css';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import { DataContext } from '../context/DataContext';

// Set the app element for accessibility
Modal.setAppElement('#root');

const DataTable = ({ headers, keys, data, createAction, setData }) => {
    const { scriptURL } = useContext(DataContext);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Define dropdown options for specific fields
    const fieldOptions = {
        Status: ['Pending', 'Progress', 'Closed'],
        InterestedIn: ['Flat', 'Villa', 'Plot', 'Commercial'],
    };

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setFormData(data[index]);
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = async (e) => {
        e.preventDefault();
        setIsError(false);
        setMessage('');

        const updatedData = [...data];
        updatedData[editingIndex] = formData;

        try {
            const params = new URLSearchParams(formData).toString();
            const response = await fetch(
                `${scriptURL}?action=${createAction}&${params}`,
            );
            const result = await response.json();
            if (result.id) {
                setData(updatedData);
                setModalIsOpen(false);
                setMessage('Data saved successfully');
                closeModal();
            } else {
                setIsError(true);
                setMessage(result.message || 'Failed to save data');
            }
        } catch (error) {
            setIsError(true);
            setMessage('An error occurred while saving data');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditingIndex(null);
        setFormData({});
    };

    // Determine the input type for a given key
    const renderInput = (key) => {
        if (key.toLowerCase().includes('date')) {
            return (
                <input
                    type="date"
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleInputChange}
                />
            );
        } else if (fieldOptions[key]) {
            return (
                <select
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleInputChange}
                >
                    <option value="">Select an option</option>
                    {fieldOptions[key].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        } else {
            return (
                <input
                    type="text"
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <div>
            {message && <p className={isError ? formStyles.error : formStyles.success}>{message}</p>}
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {keys.map((key, cellIndex) => (
                                <td key={cellIndex} onDoubleClick={() => handleEditClick(index)}>
                                    {row[key]}
                                </td>
                            ))}
                            <td>
                                <NavLink to={`https://wa.me/${row.Phone}`} target='_blank'>
                                    <FaWhatsapp style={{ marginRight: '10px', color: 'green', fontSize: '20px' }} />
                                </NavLink>
                                <NavLink to={`tel:${row.Phone}`} target='_blank'>
                                    <FaPhone style={{ marginLeft: '10px', color: 'green', fontSize: '20px' }} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for Editing */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Item"
            >
                <h2>Edit Item</h2>
                <form>
                    {keys.map((key) => (
                        <div key={key} style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </label>
                            {renderInput(key)}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleSaveClick}
                        className={formStyles.submitBtn}
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        style={{ marginLeft: '10px' }}
                        className={formStyles.cancelBtn}
                    >
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default DataTable;