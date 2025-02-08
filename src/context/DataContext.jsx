import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [followUps, setFollowUps] = useState([]);
    const [visits, setVisits] = useState([]);
    const [brokers, setBrokers] = useState([]);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzdjAHXq1EABvjJfzd1fde4UNBUQO15WJkoXOGSguuUz0K4_tgyM8ak1drw1pxGd7lXxg/exec'
    const userID = 'USER123';

    useEffect(() => {
        const fetchFollowUps = async () => {
            try {
                const response = await fetch(`${scriptURL}?action=getFollowups`);
                const data = await response.json();
                setFollowUps(data);
            } catch (error) {
                console.error('Error fetching follow-ups:', error);
            }
        };

        const fetchVisits = async () => {
            try {
                const response = await fetch(`${scriptURL}?action=getVisits`);
                const data = await response.json();
                setVisits(data);
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
        fetchBrokers()
    }, []);

    return (
        <DataContext.Provider value={{ followUps, visits, brokers, setFollowUps, setBrokers, setVisits, scriptURL, userID }}>
            {children}
        </DataContext.Provider>
    );
};
