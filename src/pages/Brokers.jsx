import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import styles from '../assets/css/table.module.css';

export default function Brokers() {
    const { brokers } = useContext(DataContext);

    return (
        <div>
            <Outlet />
            <h1>Brokers</h1>
            <NavLink to={'/brokers/add'} className={styles.addBtn}>+</NavLink>
            <DataTable 
                headers={['Broker Name', 'Phone', 'Note']} 
                keys={['BrokerName', 'Phone', 'Note']} 
                data={brokers} 
            />
        </div>
    );
}
