import React from "react";
import { Bar } from "react-chartjs-2";

const PatientAtRiskByNumber = ({ data }) => {
  console.log(data);
const patientsAtRiskByHBS = [data.oneHB,data.twoHBs,data.moreThanThreeHBs]; 
  const chartData = {
    labels: ['1','2','3+'], // Extracting x values for chart labels
    datasets: [
      {
        label: "Number of Patients at Risk",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: patientsAtRiskByHBS, // Extracting y values for chart data
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
        },
        title: {
          display: true,
          text: "Number of Health Barriers",
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          color: "white",
        },
        title: {
          display: true,
          text: "Patient at Risk",
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="patient-at-risk-by-number">
      <h3 className="component-title">Patients at Risk by Number</h3>
      <div className="table-container">
      </div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PatientAtRiskByNumber;
