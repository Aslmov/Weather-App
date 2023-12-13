import './mainPage.css';
import {BsDash, BsDashLg, BsList} from "react-icons/bs";
import {FaCloudRain} from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { formattedDate } from '../Services/dateService';
import {WiCloud, WiDayCloudy, WiDaySunny} from "react-icons/wi";
import {MdNavigateNext} from "react-icons/md";
import axios from 'axios';
import {Link} from "react-router-dom";

function MainPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [locationData, setLocationData] = useState(null);

    const [temperatureData, setTemperatureData] = useState(null);
    const fixedData = [100, 200, 75, 75, 150, 100];
    const labels = ['10AM', '12AM', '2PM', '4PM', '6PM', '8PM'];

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        setChartData(fixedData);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if ("geolocation" in navigator) {
                    const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
                    const { latitude, longitude } = position.coords;

                    const apiKey = "TjbLz73khW30gLV4XsFx1gnqSvN4k8Bm";
                    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&apikey=${apiKey}`;

                    const response = await axios.get(apiUrl);
                    console.log(response.data);

                    if (response.data && response.data.timelines && response.data.timelines.minutely && response.data.timelines.minutely.length > 0) {
                        const firstMinuteData = response.data.timelines.minutely[0].values;
                        setTemperatureData({
                            temperature: Math.floor(firstMinuteData.temperature),
                            temperatureApparent: Math.floor(firstMinuteData.temperatureApparent)
                        });
                    }
                } else {
                    console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données météorologiques :', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                const apiKey = 'b0b76dcad62a4240aee6d6bcebe29c9c';
                const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();

                    const formattedAddress = data.results[0].formatted;
                    const addressParts = formattedAddress.split(', ');

                    const city = addressParts[addressParts.length - 2];
                    const country = addressParts[addressParts.length - 1];

                    setLocationData({ city, country });
                } catch (error) {
                    console.error("Erreur lors de la récupération des données de géolocalisation :", error);
                }
            }, (error) => {
                console.error("Erreur lors de la récupération de la position :", error);
            });
        } else {
            console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
        }
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <BsList/>
                <div style={{width: '30%'}}></div>
                <div>
                    <h2 style={{fontSize: '20px', fontWeight: 'bold'}}>Weather Forecast</h2>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FaCloudRain size={40} style={{marginRight: '20px', color: 'blue'}}/>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <p style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '-10px'}}>Today</p>
                        <p>{formattedDate(currentDate)}</p>
                    </div>
                </div>

                {temperatureData ? (
                    <div>
                        <div style={{position: 'relative', fontSize: '70px', fontWeight: "bold"}}>

                            {temperatureData.temperature}

                            <span style={{position: 'absolute', top: '50', right: '10', fontSize: '20px'}}>°C</span>
                        </div>

                    </div>
                ) : (
                    <div>En attente de la récupération de la géolocalisation...</div>
                )}
                {locationData ? (

                    <div>
                        <div style={{position: 'relative', fontSize: '15px', fontWeight: 'bold'}}>
                            {`${locationData.city}, ${locationData.country}`}
                        </div>

                    </div>
                ) : (
                    <div>En attente de la récupération de la géolocalisation...</div>
                )}

                {temperatureData ? (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div>
                            <p style={{
                                fontSize: '15px',
                                fontWeight: 'bold'
                            }}>{`feels like ${temperatureData.temperatureApparent}°C . Sunset 20:15`}</p>
                        </div>
                    </div>
                ) : (
                    <div>En attente de la récupération de la géolocalisation...</div>
                )}

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button style={buttonStyle} onClick={() => handleButtonClick("Today")}>
                        Today
                    </button>
                    <button style={buttonStyle} onClick={() => handleButtonClick("Tomorrow")}>
                        Tomorrow
                    </button>
                    <button style={buttonStyle} onClick={() => {
                    }}>

                        <span style={{fontSize: '18px', fontWeight: 'bold', color: '#3879e0'}}>next 7 days</span>
                        <MdNavigateNext style={{fontSize: '18px', fontWeight: 'bold', color: '#3879e0'}}/>
                    </button>
                </div>
                <div style={{overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative'}}>
                    <div style={containerStyle}>
                        <p style={timeStyle}>12AM</p>
                        <div style={circleStyle}>
                            <WiDaySunny size={30} color="#3879e0"/>
                        </div>
                        <p style={tempStyle}>26°C</p>
                    </div>

                    <div style={containerStyle}>
                        <p style={timeStyle}>2PM</p>
                        <div style={circleStyle}>
                            <WiDayCloudy size={30} color="#3879e0"/>
                        </div>
                        <p style={tempStyle}>26°C</p>
                    </div>

                    <div style={{...containerStyle, top: '-30px'}}>
                        {/* Adjusted top for 4PM */}
                        <p style={timeStyle}>4PM</p>
                        <div style={circleStyle}>
                            <FaCloudRain size={30} color="#3879e0"/>
                        </div>
                        <p style={tempStyle}>26°C</p>
                    </div>

                    <div style={containerStyle}>
                        <p style={timeStyle}>6PM</p>
                        <div style={circleStyle}>
                            <WiCloud size={30} color="#3879e0"/>
                        </div>
                        <p style={tempStyle}>26°C</p>
                    </div>

                    <div style={containerStyle}>
                        <p style={timeStyle}>8PM</p>
                        <div style={circleStyle}>
                            <WiCloud size={30} color="#3879e0"/>
                        </div>
                        <p style={tempStyle}>26°C</p>
                    </div>

                </div>
            </div>
            <p style={{fontSize: '20px', fontWeight: 'bold',}}>Chance of rain</p>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div className="chart-container">
                    <div className="y-axis">
                        <div className="y-label">sunny</div>
                        <div className="y-label">rainy</div>
                        <div className="y-label">heavy<br/>rain</div>
                    </div>
                    <div className="chart">
                        {chartData.map((value, index) => (
                            <div
                                key={index}
                                className={`bar ${index === 3 ? 'yellow-bar' : 'black-bar'}`}
                                style={{height: value, marginTop: 300 - value}}
                            >
                                <div className="x-label">{labels[index]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
}

const buttonStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',
    fontFamily: 'Poiret One'
};

function handleButtonClick(text) {
    console.log(`Button clicked: ${text}`);
}

const containerStyle = {
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '60px',
    padding: '16px',
    margin: '0 10px',
    textAlign: 'center',
};

const timeStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: 'Poiret One'
};

const tempStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
};
const circleStyle = {
    borderRadius: '50%',
    overflow: 'hidden',
    width: '50px',
    height: '50px',
    backgroundColor: '#aac2df',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
export default MainPage;
