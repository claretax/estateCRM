import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [followUps, setFollowUps] = useState([]);
    const [visits, setVisits] = useState([]);
    const [brokers, setBrokers] = useState([]);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwEd69lvFyF50SM0pBTPZ9bPi_UHhVXnHHpMUG5QcAPO_ZYZvpAuIMhavtBEG1EumKwKw/exec'
    const userID = 'USER123';

    // Utility function to format ISO date to dd/mm/yyyy
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const fetchFollowUps = async () => {
            try {
                const response = await fetch(`${scriptURL}?action=getFollowups`);
                const data = await response.json();
                // Format dates before setting state
                const formattedData = data.map(item => ({
                    ...item,
                    ScheduledDate: formatDate(item.ScheduledDate)
                }));
                setFollowUps(formattedData);
            } catch (error) {
                console.error('Error fetching follow-ups:', error);
            }
        };

        const fetchVisits = async () => {
            try {
                const response = await fetch(`${scriptURL}?action=getVisits`);
                const data = await response.json();
                // Format dates if visits also have ScheduledDate
                const formattedData = data.map(item => ({
                    ...item,
                    ScheduledDate: formatDate(item.ScheduledDate)
                }));
                setVisits(formattedData);
            } catch (error) {
                console.error('Error fetching visits:', error);
            }
        };

        const fetchBrokers = async () => {
            try {
                const response = await fetch(`${scriptURL}?action=getBrokers`);
                const data = await response.json();
                setBrokers(data);
            } catch (error) {
                console.error('Error fetching brokers:', error);
            }
        };

        fetchFollowUps();
        fetchVisits();
        fetchBrokers();
    }, []);

    return (
        <DataContext.Provider value={{ followUps, visits, brokers, setFollowUps, setBrokers, setVisits, scriptURL, userID }}>
            {children}
        </DataContext.Provider>
    );
};