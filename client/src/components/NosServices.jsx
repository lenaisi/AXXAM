import React, { useState } from 'react';
import VR from "../assets/Virtual reality-amico.png";
import sold from "../assets/Realtor-cuate.png";
import agent from "../assets/Build your home-pana.png";

const NosServices = () => {
    const [isHoveredSold, setIsHoveredSold] = useState(false);
    const [isHoveredVR, setIsHoveredVR] = useState(false);
    const [isHoveredAgent, setIsHoveredAgent] = useState(false);

    const handleMouseEnterSold = () => {
        setIsHoveredSold(true);
    };

    const handleMouseLeaveSold = () => {
        setIsHoveredSold(false);
    };

    const handleMouseEnterVR = () => {
        setIsHoveredVR(true);
    };

    const handleMouseLeaveVR = () => {
        setIsHoveredVR(false);
    };

    const handleMouseEnterAgent = () => {
        setIsHoveredAgent(true);
    };

    const handleMouseLeaveAgent = () => {
        setIsHoveredAgent(false);
    };

    return (
        <div>
            <h1 style={styles.title}>Nos Services</h1>
            <div style={styles.servicesContainer}>
                <div 
                    style={{...styles.service, transform: isHoveredSold ? 'scale(1.05)' : 'scale(1)'}}
                    onMouseEnter={handleMouseEnterSold}
                    onMouseLeave={handleMouseLeaveSold}
                >
                    <img src={sold} alt="Service 1" style={styles.image} />
                    <h2 style={styles.serviceTitle}>Vente et location immobilière</h2>
                </div>
                <div 
                    style={{...styles.service, transform: isHoveredVR ? 'scale(1.05)' : 'scale(1)'}}
                    onMouseEnter={handleMouseEnterVR}
                    onMouseLeave={handleMouseLeaveVR}
                >
                    <img src={VR} alt="Service 2" style={styles.image} />
                    <h2 style={styles.serviceTitle}>Visites virtuelles des biens immobiliers</h2>
                </div>
                <div 
                    style={{...styles.service, transform: isHoveredAgent ? 'scale(1.05)' : 'scale(1)'}}
                    onMouseEnter={handleMouseEnterAgent}
                    onMouseLeave={handleMouseLeaveAgent}
                >
                    <img src={agent} alt="Service 3" style={styles.image} />
                    <h2 style={styles.serviceTitle}>Accompagnement par un agent immobilier</h2>
                </div>
            </div>
        </div>
    );
}

const styles = {
    title: {
        textAlign: 'center',
        fontWeight: 'bold', 
        fontSize: '32px', 
    },
    servicesContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    service: {
        textAlign: 'center', 
        width: '25%',
        transition: 'transform 0.3s ease', 
        cursor: 'pointer',
    },
    image: {
        width: '80%', 
    },
    serviceTitle: {
        fontWeight: 'bold',
        fontSize: '20px', 
    },
};

export default NosServices;
