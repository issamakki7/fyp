import React, { useState } from "react";
import "./SellHouse.css";
import axios from "axios";

interface FormData {
  address: string;
  mapsLink: string;
  description: string;
  askingPrice: string;
  sqft_living: string;
  sqft_lot: string;
  floors: string;
  bedrooms: string;
  bathrooms: string;
  condition: string;
  view: string;
  waterfront: string;
}

interface PostData {
  userId: number;
  price: number;
  description: string;
  location: string;
  nbOfRooms: number;
  maps: string;
  image: string | null;
}

function SellHouseForm(): JSX.Element {
  const [houseImage, setHouseImage] = useState<string | null>(null);
  const [MLPrice, setMLPrice] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    address: "",
    mapsLink: "",
    description: "",
    askingPrice: "",
    sqft_living: "",
    sqft_lot: "",
    floors: "",
    bedrooms: "",
    bathrooms: "",
    condition: "",
    view: "",
    waterfront: "",
  });

  const [postData, setPostData] = useState<PostData>({
    userId: JSON.parse(localStorage.getItem("currentUser") || "").userId,
    price: 0,
    description: "",
    location: "",
    nbOfRooms: 0,
    maps: "",
    image: null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result as string;
        setHouseImage(base64Data);
        setPostData((prevData) => ({
          ...prevData,
          image: base64Data,
        }));
      };
    }
  };

  const onChangeFormDataHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPostData((prevData) => ({
      ...prevData,
      nbOfRooms: parseInt(formData.bedrooms),
    }));
  };

  const onChangePostDataHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submitData = {
      userId: JSON.parse(localStorage.getItem("currentUser") || "").userId,
      price: postData.price,
      description: postData.description,
      location: postData.location,
      nbOfRooms: parseInt(formData.bedrooms),
      image: postData.image,
      maps: postData.maps,
    };

    // axios
    //   .post(`https://localhost:7109/HomeConnect/${JSON.parse(localStorage.getItem("currentUser") || "").userId}/PostAHouse`, submitData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     alert("Successfully Submitted House For Sale");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert(error.response.data.message);
    //   });
  };

  function handleMLPrice() {
    // axios.get(`https://localhost:7109/HomeConnect/PredictPrice?bedrooms=${parseInt(formData.bedrooms)}&bathrooms=${parseInt(formData.bathrooms)}&sqft_living=${parseInt(formData.sqft_living)}&sqft_lot=${parseInt(formData.sqft_lot)}&floors=${parseInt(formData.floors)}&waterfront=${parseInt(formData.waterfront)}&view=${parseInt(formData.view)}&condition=${parseInt(formData.condition)}`)
    // .then(response => {
    //   console.log(response.data);
    //   setMLPrice(response.data.price);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  return (
    <div className="sell-house-main">
      <h1 className="sell-house-title">Sell House</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="sellform-group">
          <label htmlFor="image" className="sellform-label">
            Input House Image
          </label>
          <p></p>
          <input name="image" type="file" onChange={handleImageUpload} />
          {houseImage && (
            <img
              id="image"
              className="houseImgAppear"
              src={houseImage}
              alt="user uploaded"
            />
          )}
        </div>

        <div className="sellform-group">
          <label htmlFor="location" className="sellform-label">
            House Address
          </label>
          <input
            className="sellform-control"
            name="location"
            onChange={onChangePostDataHandler}
            value={postData.location}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="maps" className="sellform-label">
            Google Maps Link
          </label>
          <input
            className="sellform-control"
            name="maps"
            onChange={onChangePostDataHandler}
            value={postData.maps}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="description" className="sellform-label">
            Description
          </label>
          <input
            className="description-box"
            name="description"
            onChange={onChangePostDataHandler}
            value={postData.description}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="price" className="sellform-label">
            Asking Price
          </label>
          <input
            type="number"
            className="sellform-control"
            name="price"
            onChange={onChangePostDataHandler}
            value={postData.price}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="sqft_living" className="sellform-label">
            Living Room Size (in sqft)
          </label>
          <input
            className="sellform-control"
            name="sqft_living"
            onChange={onChangeFormDataHandler}
            value={formData.sqft_living}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="sqft_lot" className="sellform-label">
            Lot Size (in sqft)
          </label>
          <input
            className="sellform-control"
            name="sqft_lot"
            onChange={onChangeFormDataHandler}
            value={formData.sqft_lot}
          />
        </div>

        {/* <div className="sellform-group">
              <label htmlFor="occupation" className="sellform-label">Occupation</label>
              <select className="sellform-select" name="occupation" onChange={onChangeHandler} value={formData.occupation}>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
                <option value="other">Other</option>
              </select>
            </div> */}

        {/* Floors */}
        <div className="sellform-group">
          <label htmlFor="floors" className="sellform-label">
            Floors
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="floors"
                value="1"
                onChange={onChangeFormDataHandler}
                checked={formData.floors === "1"}
              />
              <label htmlFor="1">1</label>
            </div>
            <div>
              <input
                type="radio"
                name="floors"
                value="2"
                onChange={onChangeFormDataHandler}
                checked={formData.floors === "2"}
              />
              <label htmlFor="2">2</label>
            </div>
            <div>
              <input
                type="radio"
                name="floors"
                value="3"
                onChange={onChangeFormDataHandler}
                checked={formData.floors === "3"}
              />
              <label htmlFor="3">3</label>
            </div>
            <div>
              <input
                type="radio"
                name="floors"
                value="4"
                onChange={onChangeFormDataHandler}
                checked={formData.floors === "4"}
              />
              <label htmlFor="4">4</label>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="sellform-group">
          <label htmlFor="bedrooms" className="sellform-label">
            Bedrooms
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="bedrooms"
                value="1"
                onChange={onChangeFormDataHandler}
                checked={formData.bedrooms === "1"}
              />
              <label htmlFor="1">1</label>
            </div>
            <div>
              <input
                type="radio"
                name="bedrooms"
                value="2"
                onChange={onChangeFormDataHandler}
                checked={formData.bedrooms === "2"}
              />
              <label htmlFor="2">2</label>
            </div>
            <div>
              <input
                type="radio"
                name="bedrooms"
                value="3"
                onChange={onChangeFormDataHandler}
                checked={formData.bedrooms === "3"}
              />
              <label htmlFor="3">3</label>
            </div>
            <div>
              <input
                type="radio"
                name="bedrooms"
                value="4"
                onChange={onChangeFormDataHandler}
                checked={formData.bedrooms === "4"}
              />
              <label htmlFor="4">4</label>
            </div>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="sellform-group">
          <label htmlFor="bathrooms" className="sellform-label">
            Bathrooms
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="bathrooms"
                value="1"
                onChange={onChangeFormDataHandler}
                checked={formData.bathrooms === "1"}
              />
              <label htmlFor="1">1</label>
            </div>
            <div>
              <input
                type="radio"
                name="bathrooms"
                value="2"
                onChange={onChangeFormDataHandler}
                checked={formData.bathrooms === "2"}
              />
              <label htmlFor="2">2</label>
            </div>
            <div>
              <input
                type="radio"
                name="bathrooms"
                value="3"
                onChange={onChangeFormDataHandler}
                checked={formData.bathrooms === "3"}
              />
              <label htmlFor="3">3</label>
            </div>
            <div>
              <input
                type="radio"
                name="bathrooms"
                value="4"
                onChange={onChangeFormDataHandler}
                checked={formData.bathrooms === "4"}
              />
              <label htmlFor="4">4</label>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div className="sellform-group">
          <label htmlFor="condition" className="sellform-label">
            Condition
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="condition"
                value="2"
                onChange={onChangeFormDataHandler}
                checked={formData.condition === "2"}
              />
              <label htmlFor="2">Bad </label>
            </div>

            <div>
              <input
                type="radio"
                name="condition"
                value="3"
                onChange={onChangeFormDataHandler}
                checked={formData.condition === "3"}
              />
              <label htmlFor="3">Moderate</label>
            </div>

            <div>
              <input
                type="radio"
                name="condition"
                value="4"
                onChange={onChangeFormDataHandler}
                checked={formData.condition === "4"}
              />
              <label htmlFor="4">Good</label>
            </div>

            <div>
              <input
                type="radio"
                name="condition"
                value="5"
                onChange={onChangeFormDataHandler}
                checked={formData.condition === "5"}
              />
              <label htmlFor="5">Excellent</label>
            </div>
          </div>
        </div>

        {/* View */}
        <div className="sellform-group">
          <label htmlFor="view" className="sellform-label">
            View
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="view"
                value="0"
                onChange={onChangeFormDataHandler}
                checked={formData.view === "0"}
              />
              <label htmlFor="0">Very Bad </label>
            </div>

            <div>
              <input
                type="radio"
                name="view"
                value="1"
                onChange={onChangeFormDataHandler}
                checked={formData.view === "1"}
              />
              <label htmlFor="1">Bad </label>
            </div>
            <div>
              <input
                type="radio"
                name="view"
                value="2"
                onChange={onChangeFormDataHandler}
                checked={formData.view === "2"}
              />
              <label htmlFor="2">Moderate </label>
            </div>
            <div>
              <input
                type="radio"
                name="view"
                value="3"
                onChange={onChangeFormDataHandler}
                checked={formData.view === "3"}
              />
              <label htmlFor="3">Good </label>
            </div>
            <div>
              <input
                type="radio"
                name="view"
                value="4"
                onChange={onChangeFormDataHandler}
                checked={formData.view === "4"}
              />
              <label htmlFor="4">Excellent </label>
            </div>
          </div>
        </div>

        {/* Waterfront */}
        <div className="sellform-group">
          <label htmlFor="waterfront" className="sellform-label">
            Waterfront
          </label>
          <div>
            <div>
              <input
                type="radio"
                name="waterfront"
                value="0"
                onChange={onChangeFormDataHandler}
                checked={formData.waterfront === "0"}
              />
              <label htmlFor="0">No Waterfront</label>
            </div>

            <div>
              <input
                type="radio"
                name="waterfront"
                value="1"
                onChange={onChangeFormDataHandler}
                checked={formData.waterfront === "1"}
              />
              <label htmlFor="1">Waterfront</label>
            </div>
          </div>
        </div>

        <div className="sellform-group">
          <button className="sell-btn" type="submit">
            Submit and Request Visit from Company
          </button>
          <p></p>
        </div>
      </form>
      <button className="price-recom-btn" onClick={handleMLPrice}>
        Get Recommended Price
      </button>
      <span> Recommended Price: {MLPrice} $</span>
    </div>
  );
}

export default SellHouseForm;
