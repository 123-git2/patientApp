const fetch = require("node-fetch");
const username = "coalition";
const password = "skills-test";
const auth = btoa(`${username}:${password}`);
const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

async function fetchPatientDetails() {
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
        console.log("Patient Details:", data);
    } catch (error) {
        console.error("Error fetching patient details:", error.message);
    }
}

fetchPatientDetails();
