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

    const [gst] = useState(10);
    const [storedDailySummary, setStoredDailySummary] = useState([0, 0, 0, 0, 0, 0]);
   
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
        let calcDistance = parseFloat(distance.toString());
        outputOrder();
        
        let dailySummary = [...storedDailySummary];
        dailySummary[0]++;
        dailySummary[1] = dailySummary[1] + parseInt(number);
        if (isNaN(calcDistance) === false && calcDistance >= 0) {
            dailySummary[2] = dailySummary[2] + calcDistance;
        }
        else {
            calcDistance = 0;
            dailySummary[2] = dailySummary[2] + calcDistance;
        }
        dailySummary[3] = dailySummary[3] + parseFloat(deliveryCost());
        dailySummary[4] = dailySummary[4] + parseFloat(calcGst());
        dailySummary[5] = dailySummary[5] + parseFloat(totalValue());
        setStoredDailySummary(dailySummary);
        clearForms();
    }

    function createSummary() {
        setConfirmHeader('Daily Summary');
        setConfirmNameLabel('Total Orders:');
        setConfirmName(storedDailySummary[0].toString()); // Convert the number to a string
        setConfirmPhoneLabel('Total Bags Sold:');
        setConfirmPhone(storedDailySummary[1].toString());
        setConfirmAddressLabel('Total Delivery Distance:');
        setConfirmAddress(storedDailySummary[2].toString() + ' km');
        setConfirmNumberLabel('Total Delivery Cost:');
        setConfirmNumber('$' + storedDailySummary[3].toString());
        setConfirmDistanceLabel('Total GST:');
        setConfirmDistance('$' + storedDailySummary[4].toString());
        setDisableSummaryButton(true);
        setDisableProcessButton(true);
        setShowCancel(true);
        setShowProcess(false);
    }
    
    function exitProgram() {
        window.alert('Closing!');
        window.close();
    } 

    function outputOrder() {
        if (parseFloat(confirmDistance)%1 !== 0) {
            setConfirmDistance(parseFloat(confirmDistance).toFixed(2));
        }
        window.alert("*** ORDER DETAILS ***\n\n" 
        + "NAME: " + confirmName + "\n" 
        + "PHONE: " + confirmPhone + "\n" 
        + "DELIVERY ADDRESS: " + confirmAddress + "\n" 
        + "# BAGS SOLD: " + confirmNumber + "\n" 
        + "DELIVERY DISTANCE (km): " + confirmDistance + "\n" 
        + "TOTAL BAG COST: $" + bagTotal() + "\n" 
        + "DELIVERY COST: $" + deliveryCost() + "\n" 
        + "GST: $" + calcGst() + "\n" 
        + "TOTAL ORDER VALUE: $" + totalValue());
        
    }

    function bagTotal() {
        var bagcost=8.8;
        var discount=0;
        var bags=parseInt(confirmNumber);
        if (bags<=50)
            discount=1;
        else if (bags > 50 && bags <100)
            discount=.96;
        else
            discount=.93;
        var bagtotal=parseFloat(((bagcost * bags) * discount).toFixed(2));
        return bagtotal.toFixed(2);
    }

    function deliveryCost() {
        var distance=parseFloat(confirmDistance);
        var delcost;
        if (distance <= 20)
            delcost=20;
        else
            delcost=30;
        return delcost.toFixed(2);
    }

    function calcGst() {
        const totalgst = ((parseFloat(bagTotal()) + parseFloat(deliveryCost())) * (gst/100)).toFixed(2);
        return totalgst;
    }

    function totalValue () {
        var total=parseFloat(bagTotal() + deliveryCost() + calcGst());
        return total.toFixed(2).toString();
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
        setConfirmDistanceLabel('Delivery Distance (km):');
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
                                <div className="left formfield1" >{confirmHeader}</div>
                                <div className="formfield2"></div>
                            </div>    
                            <div>
                                <div className="left formfield1">{confirmNameLabel}</div>
                                <div className="formfield2">{confirmName}</div>
                            </div>
                            <div>    
                                <div className="left formfield1">{confirmPhoneLabel}</div>
                                <div className="formfield2">{confirmPhone}</div>
                            </div>    
                            <div>
                                <div className="left formfield1">{confirmAddressLabel}</div>
                                <div className="formfield2">{confirmAddress}</div>
                            </div>
                            <div>
                                <div className="left formfield1">{confirmNumberLabel}</div>
                                <div className="formfield2">{confirmNumber}</div>
                            </div>
                            <div>
                                <div className="left formfield1">{confirmDistanceLabel}</div>
                                <div className="formfield2">{confirmDistance}</div>
                            </div>
                            <div className="buttoncontainer">
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