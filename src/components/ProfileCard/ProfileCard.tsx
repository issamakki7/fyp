import { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Profile } from "../../models/IProfileCard.model";
import { Container } from "@mui/material";
import axiosInstance from "../../utils/axiosConfig";

function ProfileCard() {
  const [currentUser, setCurrentUser] = useState<Profile | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    axiosInstance
      .get(`https://localhost:7256/api/User/Profile`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCurrentUser(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        // alert("Session Expired, Log In Again")
        localStorage.clear();
        window.location.reload()
        console.error("Error fetching profile:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <Container className="profile-card">
      <header className="header-section">
        {loading ? (
          <p>Loading...</p>
        ) : currentUser ? (
          <>
            <h1 className="name-section">{currentUser.name}</h1>
            <h3>{currentUser.username}</h3>
            <div className="info-value">{currentUser.email}</div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </Container>
  );
}

export default ProfileCard;
