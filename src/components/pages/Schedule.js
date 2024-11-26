import React from "react";
import "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/css-styles/Schedule.css"

function Schedule(){
    const schedule = [
        { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
        { day: 'Saturday', hours: 'Closed' },
        { day: 'Sunday', hours: 'Closed' },
      ];
    
      return (
        <div className="doctor-schedule-container">
          <header className="schedule-header">
            <h1>Dr Jose Simmons Schedule</h1>
            <p>Check the available times for appointments</p>
          </header>
    
          <section className="schedule-list">
            <ul>
              {schedule.map((entry, index) => (
                <li key={index} className={entry.hours === 'Closed' ? 'closed' : ''}>
                  <span className="day">{entry.day}</span>
                  <span className="hours">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      );
}

export default Schedule;