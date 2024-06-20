import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Avis() {
    const [avis, setAvis] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectedAvisId, setSelectedAvisId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v4/avis/avis')
            .then(response => {
                setAvis(response.data.data.avis);
            })
            .catch(error => {
                console.error('Error fetching avis:', error);
            });
    }, []);

    const styles = {
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
        button: {
            marginRight: '5px',
            cursor: 'pointer',
        },
        modal: {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                width: '600px', 
                height: 'auto',
            },
        },
        modalButton: {
            margin: '0 10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        confirmButton: {
            background: '#F27438',
            color: 'white',
        },
        cancelButton: {
            background: '#ddd',
            color: 'black',
        },
    };

    const openDeleteModal = (avisId) => {
        setSelectedAvisId(avisId);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
        setSelectedAvisId(null);
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:5000/api/v4/avis/avis/${selectedAvisId}`)
            .then(response => {
                setAvis(avis.filter(item => item._id !== selectedAvisId));
                console.log('Avis deleted successfully:', response.data);
                closeDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting avis:', error);
                closeDeleteModal();
            });
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={styles.mainContent}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Numéro</th>
                            <th style={styles.th}>Nom complet de l'utilisateur</th>
                            <th style={styles.th}>Contenu</th>
                            <th style={styles.th}>Note</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avis.map((item, index) => (
                            <tr key={item._id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{item.utilisateur ? item.utilisateur.nomComplet : 'Utilisateur inconnu'}</td>
                                <td style={styles.td}>{item.contenu}</td>
                                <td style={styles.td}>{item.note}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, ...styles.redButton }}
                                        onClick={() => openDeleteModal(item._id)}
                                    >
                                        <DeleteOutlineIcon style={{ color: "#FF0000" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    isOpen={deleteModalIsOpen}
                    onRequestClose={closeDeleteModal}
                    style={styles.modal}
                    contentLabel="Confirmation de suppression"
                >
                    <h2>Êtes-vous sûr de vouloir supprimer cet avis?</h2>
                    <div>
                        <button
                            style={{ ...styles.modalButton, ...styles.confirmButton }}
                            onClick={handleDeleteClick}
                        >
                            Oui
                        </button>
                        <button
                            style={{ ...styles.modalButton, ...styles.cancelButton }}
                            onClick={closeDeleteModal}
                        >
                            Annuler
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Avis;
