import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import styles from '../assets/css/table.module.css';

export default function FollowUps() {
    const { followUps, setFollowUps } = useContext(DataContext);

    return (
        <div>
            <Outlet />
            <h1>Follow Ups</h1>
            <NavLink to={'/followups/add'} className={styles.addBtn}>+</NavLink>
            <DataTable 
                headers={['Client Name', 'Phone', 'Interested In', 'Note', 'Br']} 
                keys={['ClientName', 'Phone', 'InterestedIn', 'Note']} 
                data={followUps} 
                createAction={'updateFollowup'}
                setData={setFollowUps}
            />
        </div>
    );
}
