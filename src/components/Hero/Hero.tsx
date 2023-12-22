import "./Hero.css";
import Conveyor from "../../assets/videos/conveyor.mp4";

function Hero() {
  return (
    <div className="hero">
      <div className="headerContainer">
        <video className="vid" autoPlay loop muted>
          <source src={Conveyor} type="video/mp4" />
        </video>
        <h1>Enter a World of Flavour! </h1>
        <p>Take a VR Tour and Book your Favorite Table!</p>
        <a
          href={
            localStorage.getItem("currentUser") != null ? "/book" : "/login"
          }
        >
          <button className="btn btn--primary">Book a Table</button>
        </a>
      </div>
    </div>
  );
}

export default Hero;
