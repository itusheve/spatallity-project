import React, { useState, useEffect } from "react";
import HealthBarriersOverview from "./components/HealthBarriersOverview/HealthBarriersOverview";
import PatientByHealthBarrier from "./components/patient-by-health-barrier/PatientByHealthBarrier";
import PatientAtRiskByNumber from "./components/patient-at-risk-by-number/PatientAtRiskByNumber";
import { fetchData } from "./utils/ParseExcelData";
import "./App.css";

function App() {
  const [healthBarriers, setHealthBarriers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientsAtRisk,setPatientsAtRisk] = useState([]);
  const [percentageByHBS,setPercentageByHBS] = useState([]);
  const [_totalByHBS,setTotalByHBS] = useState({});
  const [totalUniquePatients,setTotalUniquePatients] = useState(0);

  const filterPatientsAtRisk = (patients)=>patients.filter((item)=>item.barrier_id!==undefined);
  const groupPercentageByRisk = (patients,healthBarriers)=>{
    const results = {};
    healthBarriers.forEach((hbs)=>{
      results[hbs.barrier_name]= +((patients.filter((patient)=>patient.barrier_id===hbs.barrier_id).length/patients.length)*100).toFixed(2);

    })
    return results;
  }

  const countUniquePatients = (patients)=>{

    const totalUniquePatients = new Set(patients.map((patient)=>patient.patient_id));
    return Array.from(totalUniquePatients);

  }
  const countUniqueHBSPatients = (wholePatientsData)=>{
    let totalNoHBS = 0;
    wholePatientsData.forEach((patient)=>{
      if(patient.barrier_id==undefined){
        totalNoHBS++;
      }
    })
    return (patients.length - totalNoHBS);
    
  }
  const groupTotalsByHBS = (patientsRisked)=>{
    let patientsWithOneHB = 0;
    let patientsWithTwoHBs = 0;
    let patientsWithMoreThanThreeHBs = 0;

    // Create a map to store unique patient IDs and their associated barrier IDs
    const barrierCounts = new Map();

    // Iterate through each patient
    patientsRisked.forEach(patient => {
      const patientId = patient.patient_id;
      const barrierId = patient.barrier_id;
        // If patient is not in the map, add it with its barrier ID
        if (!barrierCounts.has(patientId)) {
          barrierCounts.set(patientId, new Set([barrierId]));
      } else { // If patient is already in the map, add new barrier ID
          barrierCounts.get(patientId).add(barrierId);
      }
    });
    console.log(barrierCounts)

    barrierCounts.forEach(barrierSet => {
      const numHBs = barrierSet.size;
        if (numHBs === 1) {
          patientsWithOneHB++;
      } else if (numHBs === 2) {
          patientsWithTwoHBs++;
      } else if (numHBs > 3) {
          patientsWithMoreThanThreeHBs++;
      }

    });
    console.log(patientsWithOneHB)

    return {
        oneHB: patientsWithOneHB,
        twoHBs: patientsWithTwoHBs,
        moreThanThreeHBs: patientsWithMoreThanThreeHBs
    };
  }
  useEffect( () => {
    const callFetchData = async() => {
      const data = await fetchData();
      setHealthBarriers(data.hbs);
      const totalPatients = countUniquePatients(data.patients);
      setTotalUniquePatients(totalPatients);
      setPatients(data.patients);
      const filterByRisk = countUniqueHBSPatients(data.patients)
      setPatientsAtRisk(filterByRisk);
      setPercentageByHBS(groupPercentageByRisk(data.patients,data.hbs));
      const totalByHBS = groupTotalsByHBS(filterPatientsAtRisk(data.patients))
      setTotalByHBS(totalByHBS);

    };
      callFetchData();
  }, []);
  return (
    <div className="app">
      <div className="health-barriers-overview">
        <HealthBarriersOverview  patients={totalUniquePatients} patientsAtRisk={patientsAtRisk} />
      </div>
      <div className="patient-by-health-barrier">
        <PatientByHealthBarrier data={percentageByHBS} />
      </div>
     
      <div className="patient-at-risk-by-number">
        <PatientAtRiskByNumber data={_totalByHBS} />
      </div>
    </div>
  );
}

export default App;
