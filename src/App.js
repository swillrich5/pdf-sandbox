import React, { useState, useEffect } from 'react';
import './App.css';
import jsPDF from 'jspdf'
import cartoonplane from './cartoonplane.jpeg';
import emailjs from 'emailjs-com';


function App() {


    const [arrivalCity, setArrivalCity] = useState('');
    const [departureCity, setDepartureCity] = useState('');
    const [emailAddress, setEmailAddress] = useState('');

    const onArrivalCityChange = e => setArrivalCity(e.target.value);
    const onDepartureCityChange = e => setDepartureCity(e.target.value);
    const onEmailAddressChange = e => setEmailAddress(e.target.value);


  const generatePDF = () => {
    var doc = new jsPDF();
    
    doc.line(20, 20, 80, 20)
    doc.addImage(cartoonplane, 'JPEG', 85, 10, 40, 20, 'NONE', 0);
    doc.line(130, 20, 190, 20);

    doc.setFontSize(15);
    doc.text(83, 35, '<App Name Here>')

    doc.setFontSize(12);
    doc.text(95, 45, "Itinerary");
    doc.text(20, 55, `Departure City: ${departureCity}`);
    doc.text(20, 60, `Arrival City: ${arrivalCity}`);

    doc.save('itinerary.pdf')

    setDepartureCity("");
    setArrivalCity("");
  }


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    var templateParams = {
        arrival_city: arrivalCity,
        to_email: emailAddress,
        message: "This will eventually be set for the itinerary",
        from_email: 'tripster@tripster.com'
    };
     
    emailjs.send('service_7cx135v', 'template_vvwh5h7', templateParams, 'user_qT1H0zVw19dibPaEUTxA1')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
    });
}


  return (

      <div className="container mt-5 pt-3 bg-primary text-white">
          <div className="container">
            <div className="App">
                <form>
                    <div className="form-group mt-3">
                        <h3 className="text-center">Flight Information</h3>
                        <label htmlFor="departure-city">Departure City</label>
                        <input 
                            type="text" 
                            className="form-control mb-1" 
                            id="departure-city" 
                            name="departure-city" 
                            aria-describedby="Departure City" 
                            value={departureCity}
                            onChange={onDepartureCityChange}/>

                        <label htmlFor="arrival-city">Arrival City</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="arrival-city" 
                            name="arrival-city" 
                            aria-describedby="Departure City" 
                            value={arrivalCity}
                            onChange={onArrivalCityChange}/>

                        <label htmlFor="email-address">Email Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email-address" 
                            name="email-address" 
                            aria-describedby="Email Address" 
                            value={emailAddress}
                            onChange={onEmailAddressChange}/>
                    </div>

                    <button className="btn btn-light mb-3 mr-2" onClick={generatePDF} type="primary">Download Itinerary</button> 
                    <button className="btn btn-light mb-3" onClick={handleEmailSubmit} type="primary">Email Itinerary</button> 

                </form>
            </div>
        </div>
    </div>
  );
}

export default App;

