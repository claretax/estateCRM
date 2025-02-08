import React, { useState } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa'; // Importing icons
import styles from '../assets/css/table.module.css';
import formStyles from '../assets/css/form.module.css';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

const DataTable = ({ headers, keys, data, setData }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({});

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setFormData(data[index]);
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        const updatedData = [...data];
        updatedData[editingIndex] = formData;
        setData(updatedData); // Update the parent state
        closeModal();
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditingIndex(null);
        setFormData({});
    };

    return (
        <div>
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
                                <td key={cellIndex} onDoubleClick={() => handleEditClick(cellIndex)}>{row[key]}</td>
                            ))}
                            <td>
                                {/* <button onClick={() => handleEditClick(index)}>Edit</button> */}
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
                        <div key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleSaveClick} className={formStyles.submitBtn} >Save</button>
                    <button type="button" onClick={closeModal} style={{ marginLeft: '10px' }} className={formStyles.cancelBtn}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default DataTable;