import React from 'react';
import './HealthBarriersOverview.css'; // Import CSS file for styling

const HealthBarriersOverview = ({patients,patientsAtRisk }) => {
  const getPercentageOfPatientsAtRisk = ()=>{
    return  ((patientsAtRisk/patients.length)*100).toFixed(1);
  }
  return (
    <div className="health-barriers-container">
      <div className="overview-title-container">
        <h1 className="overview-title">Health Barriers Overview</h1>
      </div>
      <div className="sections-container">
        <div className="health-barriers-section">
          <h2>Patients</h2>
          <p>Total Patients:  {patients.length.toLocaleString()}</p>
        </div>
        <div className="health-barriers-section">
          <h2>Patients at Risk</h2>
          <p>Total Patients:{patientsAtRisk.toLocaleString()}  ({getPercentageOfPatientsAtRisk()}%) </p>
          <div className="health-barriers-section-footer">
            {/* Render numbers related to patients at risk here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthBarriersOverview;