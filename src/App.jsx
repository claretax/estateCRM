import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import FollowUps from './pages/FollowUps';
import Visits from './pages/Visits';
import FollowUpForm from './components/FollowUpForm';
import VisitForm from './components/VisitForm';
import Dashboard from './pages/Dashboard';
import FormComponent from './components/BrokerForm';
import BrokerForm from './components/BrokerForm';
import Brokers from './pages/Brokers';

function App() {
  const formFields = [
    { name: 'clientName', type: 'text', label: 'Client Name', required: true },
    { name: 'phone', type: 'tel', label: 'Phone', required: true },
    { name: 'interestedIn', type: 'text', label: 'Interested In', required: true },
    { name: 'note', type: 'textarea', label: 'Note', required: true },
    { name: 'scheduledDate', type: 'datetime-local', label: 'Scheduled Date', required: true },
    { name: 'clientEmail', type: 'email', label: 'Client Email', required: false },
    { name: 'brokerID', type: 'text', label: 'Broker ID', required: false },
    { name: 'propertyID', type: 'text', label: 'Property ID', required: false },
    { name: 'status', type: 'select', label: 'Status', required: true, options: ['pending', 'completed', 'canceled'] },
    { name: 'hostID', type: 'text', label: 'Host ID', required: false, readOnly: true }
  ];

  return (
    <div>
    <BrowserRouter basename='/estateCRM/'>
    <Navbar />
      <Routes>
        <Route path='/' element= { <Dashboard /> } />
        <Route path='/followups' element={ <FollowUps /> } >
              <Route path='add' element={ <FollowUpForm /> }></Route>
        </Route>
        <Route path='/visits' element={ <Visits /> } >
              <Route path='add' element={ <VisitForm /> }></Route>
        </Route>
        <Route path='/addVisit' element={ <VisitForm /> } ></Route>

        <Route path='/brokers' element={ <Brokers /> } >
            <Route path='add' element={ <BrokerForm /> }></Route>
        </Route>
        {/* <Route path='/test' element={ <BrokerForm /> }></Route> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;