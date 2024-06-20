import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function OurHomes() {
    const [houses, setHouses] = useState([]);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [selectedHouseId, setSelectedHouseId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        typeAnnonce: '',
        typeBien: '',
        wilaya: '',
        price: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/admin/houses')
            .then(response => {
                setHouses(response.data);
                console.table(response.data);
            })
            .catch(error => {
                console.error('Error fetching houses:', error);
            });
    }, []);

    const styles = {
        ourHomesContainer: {
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
        formRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            width: '48%', // Each form group takes half the width of the form row
        },
        label: {
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
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

    const openDeleteModal = (houseId) => {
        setSelectedHouseId(houseId);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
        setSelectedHouseId(null);
    };

    const openEditModal = (house) => {
        setSelectedHouseId(house._id);
        setEditFormData(house);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setSelectedHouseId(null);
        setEditFormData({
            title: '',
            description: '',
            typeAnnonce: '',
            typeBien: '',
            wilaya: '',
            price: ''
        });
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:5000/api/v1/admin/house/${selectedHouseId}`)
            .then(response => {
                setHouses(houses.filter(house => house._id !== selectedHouseId));
                console.log('House deleted successfully:', response.data);
                closeDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting house:', error);
                closeDeleteModal();
            });
    };

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/v1/admin/house/${selectedHouseId}`, editFormData)
            .then(response => {
                setHouses(houses.map(house => house._id === selectedHouseId ? response.data : house));
                console.log('House updated successfully:', response.data);
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating house:', error);
            });
    };

    return (
        <div style={styles.ourHomesContainer}>
            <Sidebar />
            <div style={styles.mainContent}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Numéro</th>
                            <th style={styles.th}>Titre</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Type d'Annonce</th>
                            <th style={styles.th}>Type de Bien</th>
                            <th style={styles.th}>Wilaya</th>
                            <th style={styles.th}>Prix</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {houses.map((house, index) => (
                            <tr key={house._id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{house.title}</td>
                                <td style={styles.td}>{house.description}</td>
                                <td style={styles.td}>{house.typeAnnonce}</td>
                                <td style={styles.td}>{house.typeBien}</td>
                                <td style={styles.td}>{house.wilaya}</td>
                                <td style={styles.td}>{house.price}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, ...styles.orangeButton }}
                                        onClick={() => openEditModal(house)}
                                    >
                                        <EditIcon style={{ color: "#000000" }} />
                                    </button>
                                    <button
                                        style={{ ...styles.button, ...styles.redButton }}
                                        onClick={() => openDeleteModal(house._id)}
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
                    <h2>Êtes-vous sûr de vouloir supprimer ce bien?</h2>
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
                <Modal
                    isOpen={editModalIsOpen}
                    onRequestClose={closeEditModal}
                    style={styles.modal}
                    contentLabel="Modifier le bien"
                >
                    <form onSubmit={handleEditFormSubmit}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Titre:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editFormData.title}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description:</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Type d'Annonce:</label>
                                <input
                                    type="text"
                                    name="typeAnnonce"
                                    value={editFormData.typeAnnonce}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Type de Bien:</label>
                                <input
                                    type="text"
                                    name="typeBien"
                                    value={editFormData.typeBien}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Wilaya:</label>
                                <input
                                    type="text"
                                    name="wilaya"
                                    value={editFormData.wilaya}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Prix:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editFormData.price}
                                    onChange={handleEditFormChange}
                                    style={styles.input}
                                />
                            </div>
                        </div>
                        <div style={styles.formRow}>
                            <button type="button" style={{ ...styles.modalButton, ...styles.cancelButton }} onClick={closeEditModal}>
                                Annuler
                            </button>
                            <button type="submit" style={{ ...styles.modalButton, ...styles.confirmButton }}>
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default OurHomes;
