import React, {useEffect, useState} from 'react';
import {BsChevronLeft, BsDropletFill, BsList} from 'react-icons/bs';
import {WiDayCloudy} from "react-icons/wi";
import { BsCloudSunFill, BsSunFill, BsCloudLightningRainFill, BsCloudRainFill } from 'react-icons/bs';
import axios from "axios";

const SevenDays = () => {

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
    const currentDate = new Date();
    const currentDayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const currentDayIndex = currentDate.getDay();
    const days = daysOfWeek.slice(currentDayIndex).concat(daysOfWeek.slice(0, currentDayIndex));
    const [temperatureData, setTemperatureData] = useState([]);
    const firstTemperature = temperatureData.length > 0 ? temperatureData[0].temperature : 'N/A';

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

                    if (response.data && response.data.timelines && response.data.timelines.daily && response.data.timelines.daily.length > 0) {
                        const dailyData = response.data.timelines.daily;

                        const firstTemperatureData = dailyData.map(day => ({
                            date: day.time,
                            temperature: Math.floor(day.values.temperatureMin),
                        }));

                        setTemperatureData(firstTemperatureData);
                        console.log(temperatureData);
                        console.log(setTemperatureData);
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

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <BsList/>
                <div style={{width: '45%'}}></div>
                <div>
                    <h2 style={{fontSize: '20px', fontWeight: 'bold'}}>Weather Forecast</h2>
                </div>
            </div>
            <div style={{height: '10px'}}></div>
            <div>
                <BsChevronLeft/>
            </div>
            <div>
                <div style={{padding: '15px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{fontSize: '25px', fontWeight: 'normal', color: '#000'}}>next </span>
                        <span style={{fontSize: '25px', fontWeight: 'bold', color: '#000'}}> 7 days</span>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{width: '350px'}}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>{currentDayName}</span>
                                <div style={{ marginLeft: '20px' }}>
                                    <WiDayCloudy style={{ fontSize: '25px', color: '#3879e0' }} />
                                </div>
                            </div>
                            <div style={{display: 'flex'}}>
                                <span style={{fontSize: '18px', fontWeight: 'bold', color: '#000'}}> {firstTemperature} °C
                         </span>
                                <span style={{marginLeft: '10px', fontSize: '15px', color: '#000'}}>19°C</span>
                            </div>
                        </div>
                        <div style={{marginTop: '12px', display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                                <span style={{fontSize: '15px', fontWeight: 'bold', color: '#000'}}>Wind</span>
                                <div style={{marginLeft: '50px'}}>
                                    <span style={{fontSize: '12px', fontWeight: 'normal', color: '#000'}}>12 m/h</span>
                                </div>
                            </div>
                            <div style={{display: 'flex', paddingRight: '10px'}}>
                                <span style={{fontSize: '15px', fontWeight: 'bold', color: '#000'}}>Humidity</span>
                                <div style={{marginLeft: '30px'}}>
                                    <span style={{fontSize: '12px', color: '#000'}}>55%</span>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: '12px', display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                                <span style={{fontSize: '15px', fontWeight: 'bold', color: '#000'}}>Visibility</span>
                                <div style={{marginLeft: '30px'}}>
                                    <span style={{fontSize: '12px', fontWeight: 'normal', color: '#000'}}>25 km</span>
                                </div>
                            </div>
                            <div style={{display: 'flex', paddingRight: '30px'}}>
                                <span style={{fontSize: '15px', fontWeight: 'bold', color: '#000'}}>UV</span>
                                <div style={{marginLeft: '70px'}}>
                                    <span style={{fontSize: '12px', color: '#000'}}>1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div style={{height: '20px'}}></div>
                <div>
                    {days.map((day, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            {renderDay(day, index, temperatureData)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
const renderDay = (day, index, temperatureData) => {
    const isValidIndex = temperatureData && index < temperatureData.length;
    const icon = getIconForDay(day);
    const temperature1 = isValidIndex ? `${temperatureData[index].temperature}°C` : 'N/A';
    const temperature2 = '15°C';
    const leftFlex = index === 3 ? 60 : 25;
    const rightFlex = 60 - leftFlex;

    let temperature3;
    if (index === 3) {
        temperature3 = '24°C';
    } else if (index === 4) {
        temperature3 = '21°C';
    } else {
        temperature3 = '25°C';
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', margin: '0 20px 0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>{day}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BsDropletFill style={{ color: '#3879e0', fontSize: '10px' }} />
                    <span style={{ marginLeft: '5px' }}>{temperature1}</span>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                {React.createElement(icon, { color: day === 'WED' ? '#000' : '#3879e0', size: '30px' })}
            </div>
            <span style={{ fontSize: '15px', fontWeight: 'normal', color: '#000' }}>{temperature2}</span>
            <div style={{ height: '25px', width: '60px', display: 'flex' }}>
                <div style={{ flex: leftFlex, borderRadius: '25px 0 0 25px', backgroundColor: 'rgba(210, 228, 248, 1)' }}></div>
                <div style={{ flex: rightFlex, borderRadius: '0 25px 25px 0', backgroundColor: 'rgba(246, 69, 17, 1)' }}></div>
            </div>
            <span style={{ marginLeft: '40px', fontSize: '16px', fontWeight: 'bold', color: '#000' }}>{temperature3}</span>
        </div>
    );
};
const getIconForDay = (day) => {
    switch (day) {
        case 'SUN':
            return   BsCloudSunFill;
        case 'MON':
            return   BsSunFill;
        case 'TUE':
            return   BsCloudSunFill;
        case 'WED':
            return   BsCloudLightningRainFill;
        case 'THU':
            return   BsCloudRainFill;
        case 'FRI':
            return   BsSunFill;
        default:
            return BsSunFill;
    }
};
export default SevenDays;