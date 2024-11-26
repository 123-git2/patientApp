import React from "react";
import "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/css-styles/Overview.css"

function Overview (){
    return(
        <div className="doctor-overview-container">
      <header className="doctor-header">
        <h1>Dr. Jose Simmons</h1>
        <p>Specialization: General Medical Practitioner</p>
        <p>Experience: 10 years</p>
      </header>

      <section className="doctor-bio">
        <h2>About the Doctor</h2>
        <p>
          Dr. Jose Simmons is a highly skilled General Medical Practitioner with over 10 years of
          experience. He specializes in heart disease, hypertension, and other
          related conditions. He believes in providing personalized care to his
          patients, ensuring that each one receives the best possible treatment.
        </p>
      </section>

      <section className="doctor-schedule">
        <h2>Availability</h2>
        <ul>
          <li>Monday: 9:00 AM - 5:00 PM</li>
          <li>Tuesday: 9:00 AM - 5:00 PM</li>
          <li>Wednesday: 9:00 AM - 5:00 PM</li>
          <li>Thursday: 9:00 AM - 5:00 PM</li>
          <li>Friday: 9:00 AM - 3:00 PM</li>
        </ul>
      </section>

      <section className="doctor-contact">
        <h2>Contact Information</h2>
        <p>Email: dr.josesimmones@techcare.co.za</p>
        <p>Phone: +1 (555) 432-9105</p>
        <p>Office Address: 668 Tech Care, New York City, USA</p>
      </section>
    </div>
  );
    
}

export default Overview;