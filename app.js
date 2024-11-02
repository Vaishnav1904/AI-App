// Updated hospital data with 8 hospitals and available specialists
const hospitals = [
    { 
        name: "City Hospital", 
        distance: 3, 
        beds: 50, 
        icuBeds: 10, 
        oxygenCylinders: 5, 
        surgeons: 5, 
        bloodAvailability: true, 
        ventilation: true, 
        medicines: true, 
        nurseService: true, 
        doctorService: true,
        specialists: ["Cardiologist", "Neurologist", "Pulmonologist", "General Physician"]
    },
    { 
        name: "General Medical Center", 
        distance: 5, 
        beds: 100, 
        icuBeds: 20, 
        oxygenCylinders: 15, 
        surgeons: 10, 
        bloodAvailability: true, 
        ventilation: true, 
        medicines: true, 
        nurseService: true, 
        doctorService: true,
        specialists: ["Cardiologist", "Nephrologist", "Orthopedic Surgeon", "Pulmonologist"]
    },
    { 
        name: "Sunshine Clinic", 
        distance: 2, 
        beds: 20, 
        icuBeds: 5, 
        oxygenCylinders: 3, 
        surgeons: 2, 
        bloodAvailability: true, 
        ventilation: false, 
        medicines: true, 
        nurseService: true, 
        doctorService: false,
        specialists: ["General Physician", "Pulmonologist"]
    },
    { 
        name: "Metro Hospital", 
        distance: 8, 
        beds: 80, 
        icuBeds: 15, 
        oxygenCylinders: 10, 
        surgeons: 7, 
        bloodAvailability: false, 
        ventilation: true, 
        medicines: true, 
        nurseService: true, 
        doctorService: true,
        specialists: ["Endocrinologist", "Cardiologist", "Orthopedic Surgeon", "Trauma Surgeon"]
    },
    { 
        name: "County Hospital", 
        distance: 10, 
        beds: 30, 
        icuBeds: 7, 
        oxygenCylinders: 5, 
        surgeons: 3, 
        bloodAvailability: true, 
        ventilation: false, 
        medicines: true, 
        nurseService: false, 
        doctorService: true,
        specialists: ["Plastic Surgeon", "Trauma Surgeon", "General Surgeon"]
    },
    { 
        name: "Lakeside Medical Center", 
        distance: 6, 
        beds: 40, 
        icuBeds: 10, 
        oxygenCylinders: 8, 
        surgeons: 6, 
        bloodAvailability: true, 
        ventilation: true, 
        medicines: false, 
        nurseService: true, 
        doctorService: false,
        specialists: ["Nephrologist", "Pulmonologist", "Cardiologist"]
    },
    { 
        name: "Apollo Clinic", 
        distance: 4, 
        beds: 60, 
        icuBeds: 12, 
        oxygenCylinders: 10, 
        surgeons: 8, 
        bloodAvailability: true, 
        ventilation: true, 
        medicines: true, 
        nurseService: true, 
        doctorService: true,
        specialists: ["Obstetrician", "Pulmonologist", "Cardiologist", "Neurologist"]
    },
    { 
        name: "Hope Hospital", 
        distance: 7, 
        beds: 25, 
        icuBeds: 5, 
        oxygenCylinders: 3, 
        surgeons: 2, 
        bloodAvailability: true, 
        ventilation: false, 
        medicines: true, 
        nurseService: true, 
        doctorService: true,
        specialists: ["General Physician", "Plastic Surgeon", "Endocrinologist"]
    }
];

// Vital parameters ranges
const vitalRanges = {
    heartRate: { low: 60, high: 100 }, // bpm
    bloodPressure: { low: 90, high: 120 }, // systolic
    glucose: { low: 70, high: 140 }, // mg/dL
    temperature: { low: 97, high: 99 }, // Fahrenheit
    oxygenSaturation: { low: 95, high: 100 }, // Percentage
    respiratoryRate: { low: 12, high: 20 }, // Breaths per minute
};
// Function to generate the analysis report
function generateReport() {
    const heartRate = parseInt(document.getElementById("heart-rate").value);
    const bloodPressure = document.getElementById("blood-pressure").value;
    const glucose = parseInt(document.getElementById("glucose-level").value);
    const temperature = parseInt(document.getElementById("temperature").value);
    const oxygenSaturation = parseInt(document.getElementById("oxygen-saturation").value);
    const respiratoryRate = parseInt(document.getElementById("respiratory-rate").value);
    const patientType = document.getElementById("patient-type").value;

    const heartRateCondition = assessVitals(heartRate, vitalRanges.heartRate);
    const bloodPressureCondition = assessVitals(parseInt(bloodPressure.split("/")[0]), vitalRanges.bloodPressure); // systolic
    const glucoseCondition = assessVitals(glucose, vitalRanges.glucose);
    const temperatureCondition = assessVitals(temperature, vitalRanges.temperature);
    const oxygenSaturationCondition = assessVitals(oxygenSaturation, vitalRanges.oxygenSaturation);
    const respiratoryRateCondition = assessVitals(respiratoryRate, vitalRanges.respiratoryRate);

    // Display the vitals analysis report
    const report = `
        <ul>
            <li><strong>Heart Rate:</strong> ${heartRate} bpm (${heartRateCondition})</li>
            <li><strong>Blood Pressure:</strong> ${bloodPressure} (${bloodPressureCondition})</li>
            <li><strong>Glucose Level:</strong> ${glucose} mg/dL (${glucoseCondition})</li>
            <li><strong>Body Temperature:</strong> ${temperature}°F (${temperatureCondition})</li>
            <li><strong>Oxygen Saturation:</strong> ${oxygenSaturation}% (${oxygenSaturationCondition})</li>
            <li><strong>Respiratory Rate:</strong> ${respiratoryRate} breaths/min (${respiratoryRateCondition})</li>
        </ul>
    `;

    // Get the top 8 hospitals and show the available specialists
    const availableHospitals = hospitals.slice(0, 8).map(hospital => `
        <li style="border: 1px solid #ccc; padding: 10px; border-radius: 8px; ${hospital.selected ? 'background-color: #e3f2fd;' : ''}">
            <strong>${hospital.name}</strong>
            <ul>
                <li>Distance: ${hospital.distance} km</li>
                <li>Number of Beds: ${hospital.beds}</li>
                <li>ICU Beds: ${hospital.icuBeds}</li>
                <li>Oxygen Cylinders Available: ${hospital.oxygenCylinders}</li>
                <li>Number of Surgeons: ${hospital.surgeons}</li>
                <li>Blood Availability: ${hospital.bloodAvailability ? "Yes" : "No"}</li>
                <li>Ventilation Available: ${hospital.ventilation ? "Yes" : "No"}</li>
                <li>Medicines Available: ${hospital.medicines ? "Yes" : "No"}</li>
                <li>24 hrs Nurse Service: ${hospital.nurseService ? "Yes" : "No"}</li>
                <li>24 hrs Doctor Service: ${hospital.doctorService ? "Yes" : "No"}</li>
                <li>Available Specialists: ${hospital.specialists.join(", ")}</li>
            </ul>
        </li>
    `).join('');

    // Choose the best hospital based on patient type and resources (e.g., oxygen cylinders, distance)
    const requiredSpecialist = getSpecialist(patientType);
    const selectedHospital = hospitals.find(hospital => hospital.oxygenCylinders > 5 && hospital.distance <= 5 && hospital.specialists.includes(requiredSpecialist));

    selectedHospital.selected = true; // Mark the selected hospital

    // Create the AI-Choosen Hospital section without listing available specialists
    const selectedHospitalReport = `
        <h3>AI-Choosen Hospital</h3>
        <ul>
            <li><strong>Hospital Name:</strong> ${selectedHospital.name}</li>
            <li><strong>Distance:</strong> ${selectedHospital.distance} km</li>
            <li><strong>ICU Beds:</strong> ${selectedHospital.icuBeds}</li>
            <li><strong>Required Specialist:</strong> ${requiredSpecialist}</li>
        </ul>
    `;

    // Display the vitals analysis, AI-Choosen Hospital, and available hospitals
    document.getElementById("analysis-report").innerHTML = report + selectedHospitalReport + `<h3>Available Hospitals</h3><ul>${availableHospitals}</ul>`;
    document.getElementById("analysis-report-section").style.display = "block";
}

// Function to assess each vital parameter (same as before)
function assessVitals(value, range) {
    if (value < range.low) return "Low";
    if (value > range.high) return "High";
    return "Normal";
}

// Function to get the specialist for a patient type
function getSpecialist(patientType) {
    const specialists = {
        "Cardiac Arrest": "Cardiologist",
        "Stroke": "Neurologist",
        "Severe Asthma Attack": "Pulmonologist",
        "Diabetic Emergency": "Endocrinologist",
        "Severe Allergic Reaction": "Allergist",
        "Fracture": "Orthopedic Surgeon",
        "Appendicitis": "General Surgeon",
        "Pneumonia": "Pulmonologist",
        "Heart Attack": "Cardiologist",
        "Kidney Failure": "Nephrologist",
        "Sepsis": "Infectious Disease Specialist",
        "Pregnancy Complications": "Obstetrician",
        "Burns": "Plastic Surgeon",
        "Mental Health Crisis": "Psychiatrist",
        "Trauma": "Trauma Surgeon",
    };
    return specialists[patientType] || "General Physician";
}

// Event listeners for generating the report and resetting the form
document.getElementById("submit-btn").addEventListener("click", generateReport);
document.getElementById("reset-btn").addEventListener("click", () => location.reload());
