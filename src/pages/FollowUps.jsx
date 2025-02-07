import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import styles from '../assets/css/table.module.css';

export default function FollowUps() {
    const { followUps } = useContext(DataContext);

    return (
        <div>
            <Outlet />
            <h1>Follow Ups</h1>
            <NavLink to={'/followups/add'} className={styles.addBtn}>+</NavLink>
            <DataTable 
                headers={['Client Name', 'Phone', 'Interested In']} 
                keys={['ClientName', 'Phone', 'InterestedIn']} 
                data={followUps} 
            />
        </div>
    );
}
