import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import DataTable from '../components/DataTable';
import styles from '../assets/css/table.module.css';

export default function Visits() {
    const { visits, setVisits } = useContext(DataContext);

    return (
        <div>
            <Outlet />
            <h1>Visits</h1>
            <NavLink to={'/visits/add'} className={styles.addBtn}>+</NavLink>
            <DataTable 
                headers={['Client Name', 'Phone', 'Interested In', 'Note', 'Broker ID', 'Scheduled Date', 'Status']} 
                keys={['ClientName', 'Phone', 'InterestedIn', 'Note', 'BrokerID', 'ScheduledDate', 'Status']} 
                data={visits} 
                createAction={'updateVisit'}
                setData={setVisits}
            />
        </div>
    );
}
