import React, { useState, useEffect } from "react";
import styles from "../assets/css/dashboard.module.css";
import tableStyles from "../assets/css/table.module.css";
import { DataContext } from "../context/DataContext";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const { followUps, visits, brokers } = React.useContext(DataContext);
  const [selectedData, setSelectedData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [tableHeaders, setTableHeaders] = useState(["Client Name", "Phone", "Interested In", "Note"]);
  const [tableKeys, setTableKeys] = useState(["ClientName", "Phone", "InterestedIn", "Note"]);


  // Calculate open and closed counts for follow-ups and visits
  const today = new Date();
  const openFollowUps = followUps.filter((f) => f.Status === "Open").length;
  const closedFollowUps = followUps.filter((f) => f.Status === "Closed").length;
  const recommendedFollowups = followUps.filter(
    (f) => new Date(f.ScheduledDate) <= today
  ).length;
  const totalFollowUps = followUps.length;

  const openVisits = visits.filter((v) => v.Status === "Open").length;
  const closedVisits = visits.filter((v) => v.Status === "Closed").length;
  const totalVisits = visits.length;
  const recommendedVisits = visits.filter(
    (f) => new Date(f.ScheduledDate) <= today
  ).length;

  const handleCardClick = (type) => {
    setDataType(type);
    setIsDashboardVisible(false)
    if (type === "openFollowUps") {
      setSelectedData(followUps.filter((f) => f.Status === "Open"));
    } else if (type === "closedFollowUps") {
      setSelectedData(followUps.filter((f) => f.Status === "Closed"));
    } else if (type === "recommendedFollowUps") {
      setSelectedData(
        followUps.filter((f) => new Date(f.ScheduledDate) <= today)
      );
    } else if(type === 'totalFollowUps'){
      setSelectedData(followUps)
    }else if (type === "openVisits") {
      setSelectedData(visits.filter((v) => v.Status === "Open"));
    } else if (type === "closedVisits") {
      setSelectedData(visits.filter((v) => v.Status === "Closed"));
    } else if (type === "recommendedVisits") {
      setSelectedData(visits.filter((f) => new Date(f.ScheduledDate) <= today));
    } else if (type === 'totalVisits'){
        setSelectedData(visits)
    } else if (type === 'brokers'){
      setSelectedData(brokers)
      setTableHeaders(['Name', 'Phone', 'Note'])
      setTableKeys(['BrokerName', 'Phone', "Note"])
  }
  };

  const handleBackToDashboard = () => {
    setIsDashboardVisible(true);
    setSelectedData([]);
    setDataType('');
};


  return (
    <div style={{ padding: "5px" }}>
    {isDashboardVisible ? (
      <>
        <h1>Dashboard</h1>

        {/* Follow-ups Group */}
        <div>
          <h3>Follow-Ups</h3>
        </div>
        <div className={styles.cardsContainer}>
          <div
            className={styles.card}
            onClick={() => handleCardClick("recommendedFollowUps")}
          >
            <p>{recommendedFollowups}</p>
            <h2>Recommended</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("openFollowUps")}
          >
            <p>{openFollowUps}</p>
            <h2>Open</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("closedFollowUps")}
          >
            <p>{closedFollowUps}</p>
            <h2>Closed</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("totalFollowUps")}
          >
            <p>{totalFollowUps}</p>
            <h2>Total</h2>
          </div>
        </div>

        {/* Visits Group */}
        <div>
          <h3>Visits</h3>
        </div>
        <div className={styles.cardsContainer}>
          <div
            className={styles.card}
            onClick={() => handleCardClick("recommendedVisits")}
          >
            <p>{recommendedVisits}</p>
            <h2>Recommended</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("openVisits")}
          >
            <p>{openVisits}</p>
            <h2>Open</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("closedVisits")}
          >
            <p>{closedVisits}</p>
            <h2>Closed</h2>
          </div>
          <div
            className={styles.card}
            onClick={() => handleCardClick("totalVisits")}
          >
            <p>{totalVisits}</p>
            <h2>Total</h2>
          </div>
        </div>

        {/* {brokers group} */}
        <div>
          <h3>Property Agents</h3>
        </div>
        <div className={styles.cardsContainer}>
          <div
            className={styles.card}
            onClick={() => handleCardClick("brokers")}
          >
            <p>{brokers.length}</p>
            <h2>Total</h2>
          </div>
        </div>

        <h2>Follow Ups</h2>
        <DataTable
          headers={["Client Name", "Phone", "Interested In"]}
          keys={["ClientName", "Phone", "InterestedIn"]}
          data={followUps.slice(-5)}
        />

        <h2>Visits</h2>
        <DataTable
          headers={["Client Name", "Phone", "Interested In"]}
          keys={["ClientName", "Phone", "InterestedIn"]}
          data={visits.slice(-5)}
        />
      </>
      ):
      (
        <div className={tableStyles.table}>
            <div className={styles.tableTitle}> 
                <h4>{dataType.toUpperCase()}</h4>
                <button className={styles.backBtn} onClick={handleBackToDashboard}>Back to Dashboard</button>
            </div>
            
            <DataTable
              headers={tableHeaders}
              keys={tableKeys}
              data={selectedData}
            />
          </div>
      )}
    </div>
  );
};

export default Dashboard;
