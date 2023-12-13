import React, { useEffect, useState } from 'react';
import './BarChart.css'; // Assurez-vous de créer un fichier CSS pour les styles

const generateRandomData = (numPoints) => {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        data.push(Math.floor(Math.random() * 100) + 1); // Valeurs aléatoires entre 1 et 100
    }
    return data;
};

const ChartExample = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const randomDataY1 = generateRandomData(6);
        const randomDataY2 = generateRandomData(6);
        const randomDataY3 = generateRandomData(6);

        const data = {
            labels: ['X1', 'X2', 'X3', 'X4', 'X5', 'X6'],
            datasets: [randomDataY1, randomDataY2, randomDataY3],
        };

        setChartData(data);
    }, []);

    return (
        <div className="chart-container">
            {chartData && (
                <div className="chart">
                    {chartData.labels.map((label, index) => (
                        <div key={label} className="bar-group">
                            <div className="bar" style={{ height: `${chartData.datasets[0][index]}%` }} />
                            <div className="bar" style={{ height: `${chartData.datasets[1][index]}%` }} />
                            <div className="bar" style={{ height: `${chartData.datasets[2][index]}%` }} />
                            <div className="label">{label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChartExample;
