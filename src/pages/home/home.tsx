import React, { useState } from 'react';
import ReactGA from 'react-ga4';
import './home.css';

const fireLogo = require("../../images/fire_logo.jpg");

const Home = () => {
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [distance, setDistance] = useState('');

    const [confirmHeader, setConfirmHeader] = useState('');
    const [confirmNameLabel, setConfirmNameLabel] = useState('');
    const [confirmPhoneLabel, setConfirmPhoneLabel] = useState('');
    const [confirmAddressLabel, setConfirmAddressLabel] = useState('');
    const [confirmNumberLabel, setConfirmNumberLabel] = useState('');
    const [confirmDistanceLabel, setConfirmDistanceLabel] = useState('');
    
    const [confirmName, setConfirmName] = useState('');
    const [confirmPhone, setConfirmPhone] = useState('');
    const [confirmAddress, setConfirmAddress] = useState('');
    const [confirmNumber, setConfirmNumber] = useState('');
    const [confirmDistance, setConfirmDistance] = useState('');

    const [showCancel, setShowCancel] = useState(false);
    const [showProcess, setShowProcess] = useState(false);

    const [disableProcessButton, setDisableProcessButton] = useState(false);
    const [disableSummaryButton, setDisableSummaryButton] = useState(false);
   
    React.useEffect(() => {
        document.title = "Everwarm Fuel Merchants - Home";
        ReactGA.send({ hitType: "pageview", page: "/everwarm/home", title: "Everwarm Fuel Merchants - Home Page" });
    }, []);

    function processForm() {
        if (validateForm() === true) {
            confirmForm();
        }
    }

    function processOrder() {
        clearForms();
    }

    function createSummary() {
    
    }
    
    function exitProgram() {
    
    } 
    
    function validateForm() {
        let error = '';
        if (name === null || name === '') {
			error += 'First Name must be filled out\n';
        }
		if (phone === null || phone === '') {   
            error += 'Phone Number must be filled out\n';
        }
        if (address === null || address === '') {
            error += 'Delivery Address must be filled out\n';
        }
        if (number === null || number === '') {
            error += '# Bags Sold must be filled out\n';
        }
        if (distance === null || distance === '') {
            error += 'Delivery Distance must be filled out\n';
        }

        let intNumber = parseInt(number);
        let intDistance = parseFloat(distance);

        if (isNaN(intNumber) === true || intNumber <= 0 || intNumber%1 !== 0) {
            error += '# Bags Sold must be a positive whole number greater than zero\n';
        }
		if (isNaN(intDistance) === true || intDistance <= 0) {
            error += 'Delivery Distance must be a positive number greater than zero\n';
        }

        if (error !== '') {
            alert(error);
            return false;
        }
        else {
            return true;
        }
    }

    function confirmForm() {
        setConfirmHeader('Confirm Details');
        setConfirmNameLabel('First Name:');
        setConfirmName(name);
        setConfirmPhoneLabel('Phone Number:');
        setConfirmPhone(phone);
        setConfirmAddressLabel('Delivery Address:');
        setConfirmAddress(address);
        setConfirmNumberLabel('# Bags Sold:');
        setConfirmNumber(number);
        setConfirmDistanceLabel('Delivery Distance:');
        setConfirmDistance(distance);
                
        setDisableProcessButton(true);
        setDisableSummaryButton(true);

        setShowCancel(true);
        setShowProcess(true);
    }

    function clearForms() {
        setName('');
        setPhone('');
        setAddress('');
        setNumber('');
        setDistance('');

        setConfirmHeader('');
        setConfirmNameLabel('');
        setConfirmPhoneLabel('');
        setConfirmAddressLabel('');
        setConfirmNumberLabel('');
        setConfirmDistanceLabel('');
        setConfirmName('');
        setConfirmPhone('');
        setConfirmAddress('');
        setConfirmNumber('');
        setConfirmDistance('');

        setDisableProcessButton(false);
        setDisableSummaryButton(false);

        setShowCancel(false);
        setShowProcess(false);
    }
    
    return (
        <>
            <header>
                <div className="pageHeader">
                    <div className="imgheadleft">
                        <img src={fireLogo} alt="Fire Logo" /> 
                    </div>
                    <div className="headingcont">
                        <h1>
                        Everwarm Fuel Merchants<br/>
                        </h1>
                        <h2>
                        Sales Quotation & Report System
                    </h2>
                    </div>
                    <div className="imgheadright">
                        <img src={fireLogo} alt="Fire Logo"/>
                    </div>
                </div>
                <hr className="fullwidth"/>
            </header>

            <article>
			
                <aside className="menuaside">
                    <div className="menu">
                        <button disabled={disableSummaryButton} type="button" onClick={createSummary} className="summarybutton" id="summarybutton"></button>
                    </div>
                    <div className="menu">
                        <button type="button" onClick={exitProgram} className="exitbutton" id="exitbutton"></button>
                    </div>
                </aside>
                    
                <div className="vertrule"></div>
                    
                <div className="mainpage">
                    <form name="order_form" method="post">
                        <div className="formcontainer">
                            <div>
                                <div className="left">Name:</div>
                                <input type="text" autoComplete="off" id="name" className="input" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <div className="left">Phone Number:</div>
                                <input type="text" autoComplete="off" id="phone" className="input" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>        
                            <div>
                                <div className="left">Delivery Address:</div>
                                <input type="text" autoComplete="off" id="delivery" className="input" value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>        
                            <div>
                                <div className="left"># Bags Sold:</div>
                                <input type="text" autoComplete="off" id="bags" className="input" value={number} onChange={(e) => setNumber(e.target.value)}/>
                            </div>        
                            <div>
                                <div className="left">Delivery Distance (km):</div>
                                <input type="text" autoComplete="off" id="distance" className="input" value={distance} onChange={(e) => setDistance(e.target.value)}/>
                            </div>    
                            <div>
                                <div className="buttoncontainer">
                                    <button disabled={disableProcessButton} type="button" id="submitbutton" className="submitbutton" onClick={processForm}></button>
                                </div>
                            </div>
                        </div>            
                    </form>
                </div>
                
                <hr className="fullwidth"/>
            </article>

            <article>
				
                <aside className="confirmaside"></aside>
                    
                <div className="vertrule"></div>
                    
                <div className="mainpage">
                    <div className="formfield1" id="temptitle"></div>
                    <form name="confirm_order" method="post">
                        <div className="confirmcontainer">
                            <div>
                                <div className="formfield1" >{confirmHeader}</div>
                                <div className="formfield2"></div>
                            </div>    
                            <div>
                                <div className="formfield1">{confirmNameLabel}</div>
                                <div className="formfield2">{confirmName}</div>
                            </div>
                            <div>    
                                <div className="formfield1">{confirmPhoneLabel}</div>
                                <div className="formfield2">{confirmPhone}</div>
                            </div>    
                            <div>
                                <div className="formfield1">{confirmAddressLabel}</div>
                                <div className="formfield2">{confirmAddress}</div>
                            </div>
                            <div>
                                <div className="formfield1">{confirmNumberLabel}</div>
                                <div className="formfield2">{confirmNumber}</div>
                            </div>
                            <div>
                                <div className="formfield1">{confirmDistanceLabel}</div>
                                <div className="formfield2">{confirmDistance}</div>
                            </div>
                            <div>
                                <button type="button" className={showCancel ? "cancelbutton showCancelButton" : "cancelbutton"} onClick={clearForms}></button>
                                <button type="button" className={showProcess ? "processbutton showProcessButton" : "processbutton"} onClick={processOrder}></button>
                            </div>
                        </div>
                    </form>
                </div>
            </article>
        </>
    );
}
export default Home;