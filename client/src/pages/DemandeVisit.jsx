import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar'; 

function DemandeVisit() {
    const [formVisits, setFormVisits] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/admin/form-visits')
            .then(response => {
                setFormVisits(response.data);
                console.table(response.data);
            })
            .catch(error => {
                console.error('Error fetching form visits:', error);
            });
    }, []);

    const styles = {
        demandeVisitContainer: {
            display: 'flex',
        },
        mainContent: {
            marginLeft: '200px', 
            flex: 1,
            padding: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        th: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'left',
        },
    };

    return (
        <div style={styles.demandeVisitContainer}>
            <Sidebar /> 
            <div style={styles.mainContent}>
               
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Nom Complet</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Numéro de Téléphone</th>
                            <th style={styles.th}>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formVisits.map(visit => (
                            <tr key={visit._id}>
                                <td style={styles.td}>{visit.nomComplet}</td>
                                <td style={styles.td}>{visit.email}</td>
                                <td style={styles.td}>{visit.phoneNumber}</td>
                                <td style={styles.td}>{visit.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DemandeVisit;
