import React from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa'; // Importing icons
import styles from '../assets/css/table.module.css';
import { NavLink } from 'react-router-dom';

const DataTable = ({ headers, keys, data }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                        <th> Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {keys.map((key, cellIndex) => (
                            <td key={cellIndex}>{row[key]}</td>
                        ))}

                        <td>
                            <NavLink to={`https://wa.me/${row.Phone}`} target='_blank'>
                                <FaWhatsapp style={{ marginRight: '10px', color: 'green', fontSize: '20px' }} />
                            </NavLink>
                            <NavLink to={`tel:${row.Phone}`} target='_blank'>
                                <FaPhone style={{ marginLeft: '10px' , color: 'green', fontSize: '20px'}} />
                            </NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
