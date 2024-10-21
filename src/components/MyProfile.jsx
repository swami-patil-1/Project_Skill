import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";  // Import axios to handle HTTP requests

const MyProfile = () => {
  const [profilePic, setProfilePic] = useState(null); 
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [location, setLocation] = useState("New York, USA");
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [interestedSkills, setInterestedSkills] = useState([
    "TypeScript",
    "Node.js",
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const userDetails = {
      name,
      email,
      location,
      skills,
      interestedSkills,
    };

    // Send user details to the backend using axios
    axios.post("http://localhost:5000/api/user/profile", userDetails)
      .then(response => {
        console.log("User details saved successfully:", response.data);
      })
      .catch(error => {
        console.error("Error saving user details:", error);
      });

    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.imageContainer}>
            <img
              src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="User Profile"
              style={styles.profileImage}
            />

            {isEditing && (
              <div style={{ marginTop: "10px" }}>
                <label style={styles.fileLabel}>
                  Choose File
                  <input
                    type="file"
                    onChange={handleProfilePicChange}
                    style={styles.fileInput}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Username */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>Username:</label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>

          {/* Email */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>Email:</label>
            {isEditing ? (
              <input
                type="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            ) : (
              <span>{email}</span>
            )}
          </div>

          {/* Location */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>Location:</label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={location}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.input}
              />
            ) : (
              <span>{location}</span>
            )}
          </div>

          {/* Skills */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>Skills:</label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={skills.join(", ")}
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                style={styles.input}
              />
            ) : (
              <ul style={styles.list}>
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Interested Skills */}
          <div style={styles.inputContainer}>
            <label style={styles.label}>Interested Skills:</label>
            {isEditing ? (
              <input
                type="text"
                defaultValue={interestedSkills.join(", ")}
                onChange={(e) =>
                  setInterestedSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                style={styles.input}
              />
            ) : (
              <ul style={styles.list}>
                {interestedSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            )}
          </div>

          {isEditing ? (
            <button onClick={handleSave} style={styles.saveButton}>
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
              Edit
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#f0f2f5",
  },
  card: {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    marginTop: "40px",
    marginBottom: "40px",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #ccc",
    objectFit: "cover",
    marginBottom: "10px",
  },
  fileLabel: {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  fileInput: {
    display: "none",
  },
  inputContainer: {
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  list: {
    paddingLeft: "20px",
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MyProfile;
