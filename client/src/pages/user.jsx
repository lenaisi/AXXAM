import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/SideBar'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Users() {
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/admin/users')
            .then(response => {
                setUsers(response.data);
                console.table(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const styles = {
        usersContainer: {
            display: 'flex',
            height: '100vh',
        },
        sidebar: {
            width: '200px',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
        },
        mainContent: {
            marginLeft: '200px', // Décalage du contenu principal
            padding: '20px',
            flex: 1,
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

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUserId(null);
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:5000/api/v1/admin/users/${selectedUserId}`)
            .then(response => {
                setUsers(users.filter(user => user._id !== selectedUserId));
                console.log('User deleted successfully:', response.data);
                closeModal();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                closeModal();
            });
    };

    return (
        <div style={styles.usersContainer}>
            <div style={styles.sidebar}>
                <Sidebar />
            </div>
            <div style={styles.mainContent}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Numéro</th>
                            <th style={styles.th}>Nom Complet</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Numéro de Téléphone</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{user.nomComplet}</td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>{user.phoneNumber}</td>
                                <td style={styles.td}>
                                    <button
                                        style={{ ...styles.button, ...styles.redButton }}
                                        onClick={() => openModal(user._id)}
                                    >
                                        <DeleteOutlineIcon style={{ color: "#FF0000" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={styles.modal}
                    contentLabel="Confirmation de suppression"
                >
                    <h2>Êtes-vous sûr de vouloir supprimer cet utilisateur?</h2>
                    <div>
                        <button
                            style={{ ...styles.modalButton, ...styles.confirmButton }}
                            onClick={handleDeleteClick}
                        >
                            Oui
                        </button>
                        <button
                            style={{ ...styles.modalButton, ...styles.cancelButton }}
                            onClick={closeModal}
                        >
                            Annuler
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Users;
