import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/SideBar";
import TypeAnnonce from "../components/TypeAnnonce";
import HouseTypeSelector from "../components/HouseTypeSelector";
import WilayaSelector from "../components/WilayaSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddHomes() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    typeAnnonce: "",
    typeBien: "",
    wilaya: "",
    price: "",
    locationMapLink: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };
  

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `home-pictures/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file");
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const imageUrls = await Promise.all(
        formData.images.map((image) => uploadImage(image))
      );
  
     
      const images = imageUrls.map((url) => ({ url }));
  
      const requestData = {
        ...formData,
        images, 
      };
  
      console.log("Request Data:", requestData);
  
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/add",
        requestData
      );
  
      console.log("House added successfully:", response.data);
      toast.success("Bien ajouté avec succès!");
  
      setFormData({
        title: "",
        description: "",
        typeAnnonce: "",
        typeBien: "",
        wilaya: "",
        price: "",
        locationMapLink: "",
        images: [],
      });
    } catch (error) {
      console.error("Error adding house:", error);
  
      if (error.response) {
        console.error("Server Response Data:", error.response.data);
        console.error("Server Response Status:", error.response.status);
        console.error("Server Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request Data:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
  
      toast.error("Erreur lors de l'ajout du bien");
    }
  };
  
  
  
  const styles = {
    addHomesContainer: {
      display: "flex",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      padding: "20px",
    },
    sidebar: {
      width: "300px",
      marginRight: "20px",
    },
    mainContent: {
      flex: 1,
      backgroundColor: "#fff",
      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      padding: "40px",
      marginLeft: "-120px",
    },
    form: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "8px",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "100%",
      boxSizing: "border-box",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      width: "100%",
      boxSizing: "border-box",
      height: "100px",
    },
    button: {
      padding: "12px 24px",
      border: "none",
      borderRadius: "4px",
      background: "#F27438",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      fontSize: "18px",
      alignSelf: "flex-end",
      marginTop: "20px",
      marginLeft: "700px",
    },
    buttonHover: {
      backgroundColor: "#d65f1e",
    },
  };

  return (
    <div style={styles.addHomesContainer}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.mainContent}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label} htmlFor="title">
              Titre
            </label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ flex: 1, marginRight: "20px" }}>
              <label style={styles.label} htmlFor="typeAnnonce">
                Type d'Annonce
              </label>
              <TypeAnnonce
                onChange={(value) =>
                  setFormData({ ...formData, typeAnnonce: value })
                }
                required
              />
            </div>
            <div style={{ flex: 1, marginRight: "20px" }}>
              <label style={styles.label} htmlFor="typeBien">
                Type de Bien
              </label>
              <HouseTypeSelector
                onChange={(value) =>
                  setFormData({ ...formData, typeBien: value })
                }
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label} htmlFor="wilaya">
                Wilaya
              </label>
              <WilayaSelector
                onChange={(value) =>
                  setFormData({ ...formData, wilaya: value })
                }
                required
              />
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label} htmlFor="price">
              Prix
            </label>
            <input
              style={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
  <label style={styles.label} htmlFor="locationMapLink">
    Lien vers la localisation sur la carte
  </label>
  <input
    style={styles.input}
    type="text"
    name="locationMapLink"
    value={formData.locationMapLink}
    onChange={handleChange}
    required
  />
</div>
         

          <div style={{ marginBottom: "20px" }}>
            <label style={styles.label} htmlFor="images">
              Images
            </label>
            <input
              style={styles.input}
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button style={styles.button} type="submit">
            Ajouter ce bien
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddHomes;