import spoon from "../../assets/images/spoon.png";
import knife from "../../assets/images/knife.png";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us">
      <div className="about-us-content">
        <div className="about-us-section">
          <h1 className="heading">About Us</h1>
          <img src={spoon} alt="about_spoon" className="spoon-img" />
          <p className="description">
            At ARMS, we bring innovation to the forefront of the dining
            industry. Customers can conveniently reserve a table online to
            ensure a delightful dining experience tailored to their preferences.
            Upon arrival at the restaurant, each order is carefully processed
            and delivered to customers at the comfort of their table.
          </p>
        </div>

        <div className="about-us-section knife-section huge">
          <img src={knife} alt="about_knife" className="knife-img" />
        </div>

        <div className="revol-section">
          <h1 className="heading">Revolutionizing Restaurants</h1>
          <img src={spoon} alt="about_spoon" className="spoon-img" />
          <p className="description">
            At ARMS, our goal is to revolutionize the dining experience by
            providing a comprehensive restaurant management system. Our web
            application allows you to effortlessly explore a restaurant's
            details, browse the menu, and even take a virtual tour of the
            establishment to search for your favorite table!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
