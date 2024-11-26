import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/css-styles/Patients.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const url = "https://fedskillstest.coalitiontechnologies.workers.dev";
            const username = "coalition";
            const password = "skills-test";
            const auth = btoa(`${username}:${password}`);

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Authorization": `Basic ${auth}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPatients(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, []);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const downloadLabResult = (result) => {
        const blob = new Blob([`Lab Result: ${result}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${result.replace(/\s+/g, "_")}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filterBloodPressureData = (history) => {
        const filteredData = [];
        history.forEach(diagnosis => {
            const diagnosisDate = new Date(`${diagnosis.month} 1, ${diagnosis.year}`);
            if (diagnosisDate >= new Date('2023-09-01') && diagnosisDate <= new Date('2024-03-31')) {
                filteredData.push(diagnosis);
            }
        });
        return filteredData;
    };

    const getChartData = () => {
        if (!selectedPatient || !selectedPatient.diagnosis_history) return null;

        const filteredData = filterBloodPressureData(selectedPatient.diagnosis_history);
        const labels = filteredData.map(diagnosis => `${diagnosis.month} ${diagnosis.year}`);
        const systolicData = filteredData.map(diagnosis => diagnosis.blood_pressure.systolic.value);
        const diastolicData = filteredData.map(diagnosis => diagnosis.blood_pressure.diastolic.value);

        return {
            labels,
            datasets: [
                {
                    label: 'Systolic (Highest)',
                    data: systolicData,
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointStyle: 'rect',
                    pointBorderColor: '#FF69B4',
                    pointBackgroundColor: '#FF69B4',
                },
                {
                    label: 'Diastolic (Lowest)',
                    data: diastolicData,
                    borderColor: '#9370DB',
                    backgroundColor: 'rgba(147, 112, 219, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointStyle: 'circle',
                    pointBorderColor: '#9370DB',
                    pointBackgroundColor: '#9370DB',
                }
            ]
        };
    };

    if (loading) {
        return (
            <div className="loading">
                <p>Searching for patients...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="page-container">
            <div className="patients-card">
                <div className="patients-header">
                    <h2>Patients</h2>
                    <i className="search-icon fas fa-search"></i>
                </div>
                <div className="patient-list">
                    {patients.map((patient, index) => (
                        <div key={index} className="patient-card" onClick={() => handleSelectPatient(patient)}>
                            <div className="patient-info">
                                <div className="patient-details">
                                    <img src={patient.profile_picture || 'https://via.placeholder.com/50'} alt={patient.name} className="patient-image" />
                                    <div>
                                        <p className="patient-name">{patient.name}</p>
                                        <p>{`${patient.gender}, ${patient.age}`}</p>
                                    </div>
                                </div>
                                <i className="more-options fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPatient && (
                <div className="side-by-side">
                    <div className="chart-container">
                        <h3>Diagnosis History (Oct 2023 - Mar 2024)</h3>
                        {selectedPatient && getChartData() && (
                            <Line
                                data={getChartData()}
                                options={{
                                    responsive: true,
                                    plugins: { title: { display: true, text: 'Blood Pressure History' } },
                                }}
                            />
                        )}
                        <div className="vital-signs-container">
                            <div className="vital-card respiratory-card">
                                <h4>Respiratory Rate</h4>
                                <p>
                                    {selectedPatient.diagnosis_history &&
                                        selectedPatient.diagnosis_history[0]?.respiratory_rate
                                        ? `${selectedPatient.diagnosis_history[0].respiratory_rate.value} ${selectedPatient.diagnosis_history[0].respiratory_rate.unit || 'bpm'}`
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="vital-card temperature-card">
                                <h4>Temperature</h4>
                                <p>
                                    {selectedPatient.diagnosis_history &&
                                        selectedPatient.diagnosis_history[0]?.temperature
                                        ? `${selectedPatient.diagnosis_history[0].temperature.value} ${selectedPatient.diagnosis_history[0].temperature.unit || '°F'}`
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="vital-card heart-rate-card">
                                <h4>Heart Rate</h4>
                                <p>
                                    {selectedPatient.diagnosis_history &&
                                        selectedPatient.diagnosis_history[0]?.heart_rate
                                        ? `${selectedPatient.diagnosis_history[0].heart_rate.value} ${selectedPatient.diagnosis_history[0].heart_rate.unit || 'bpm'}`
                                        : 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="diagnostic-card">
                            <h4>Diagnosis List</h4>
                            {selectedPatient.diagnostic_list && selectedPatient.diagnostic_list.length > 0 ? (
                                <div className="diagnostic-table-container">
                                    <table className="diagnostic-table">
                                        <thead>
                                            <tr>
                                                <th>Diagnosis</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPatient.diagnostic_list.map((diagnosis, index) => (
                                                <tr key={index}>
                                                    <td>{diagnosis.name || 'N/A'}</td>
                                                    <td>{diagnosis.description || 'N/A'}</td>
                                                    <td>{diagnosis.status || 'N/A'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No diagnostic history available.</p>
                            )}
                        </div>

                    </div>

                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <div className="contact-details">
                            <div className="patient-image-container">
                                <img src={selectedPatient.profile_picture || 'https://via.placeholder.com/50'} alt={selectedPatient.name} className="patient-image" />
                            </div>
                            <p className="patient-name">{selectedPatient.name}</p>
                            <p><strong>Date of Birth:</strong> {selectedPatient.date_of_birth || 'N/A'}</p>
                            <p><strong>Gender:</strong> {selectedPatient.gender || 'N/A'}</p>
                            <p><strong>Phone:</strong> {selectedPatient.phone_number || 'N/A'}</p>
                            <p><strong>Emergency Contact:</strong> {selectedPatient.emergency_contact || 'N/A'}</p>
                            <p><strong>Insurance Provider:</strong> {selectedPatient.insurance_type || 'N/A'}</p>
                        </div>
                        <div className="lab-results">
                            <h2>Lab Results</h2>
                            <div className="lab-results-container">
                                {selectedPatient.lab_results && selectedPatient.lab_results.length > 0 ? (
                                    selectedPatient.lab_results.map((result, index) => (
                                        <div key={index} className="lab-result-item">
                                            <p>{result}</p>
                                            <button
                                                className="download-button"
                                                onClick={() => downloadLabResult(result)}
                                            >
                                                Download
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No lab results available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!selectedPatient && <p>Select a patient to view details.</p>}
        </div>
    );
}

export default Patients;
