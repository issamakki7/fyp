import React, { useState } from "react";
import "./CreditCardInfo.css";
import chip from "../../assets/images/chip.png";
import visa from "../../assets/images/visa.png";
import axios from "axios";

interface Inputs {
  userId: number;
  creditCardNumber: string;
  holderName: string;
  bidPrice: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
}

function CreditCardInfo(): JSX.Element {
  const [inputs, setInputs] = useState<Inputs>({
    userId: parseInt(JSON.parse(localStorage.getItem("currentUser")!).userId),
    creditCardNumber: "",
    holderName: "",
    bidPrice: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  function handleCardNumberInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const cardNum = e.target.value;
    if (isNaN(Number(cardNum))) {
      document.querySelector<HTMLInputElement>(".card-number-input")!.value =
        "";
      alert("Must input a number");
      return;
    } else {
      const newInputs = { ...inputs, creditCardNumber: cardNum };
      setInputs(newInputs);
    }
  }

  function handleCardHolderInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const holderName = e.target.value;
    const newInputs = { ...inputs, holderName };
    setInputs(newInputs);
  }

  function handleBidInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const amount = e.target.value;
    if (isNaN(Number(amount))) {
      document.querySelector<HTMLInputElement>(".bid-input")!.value = "";
      alert("Must input a number");
      return;
    } else {
      const newInputs = { ...inputs, bidPrice: amount };
      setInputs(newInputs);
    }
  }

  function handleMonthInput(e: React.ChangeEvent<HTMLSelectElement>): void {
    const month = e.target.value;
    document.querySelector<HTMLSpanElement>(".exp-month")!.innerText =
      month + "/";
    const newInputs = { ...inputs, expirationMonth: month };
    setInputs(newInputs);
  }

  function handleYearInput(e: React.ChangeEvent<HTMLSelectElement>): void {
    const year = e.target.value;
    document.querySelector<HTMLSpanElement>(".exp-year")!.innerText = year;
    const newInputs = { ...inputs, expirationYear: year };
    setInputs(newInputs);
  }

  function handleCVVMouseEnter(): void {
    document.querySelector<HTMLDivElement>(".front")!.style.transform =
      "perspective(1000px) rotateY(-180deg)";
    document.querySelector<HTMLDivElement>(".back")!.style.transform =
      "perspective(1000px) rotateY(0deg)";
  }

  function handleCVVMouseLeave(): void {
    document.querySelector<HTMLDivElement>(".front")!.style.transform =
      "perspective(1000px) rotateY(0deg)";
    document.querySelector<HTMLDivElement>(".back")!.style.transform =
      "perspective(1000px) rotateY(180deg)";
  }

  function handleCVVInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const cvvValue = e.target.value;
    if (isNaN(Number(cvvValue))) {
      document.querySelector<HTMLInputElement>(".cvv-input")!.value = "";
      alert("Must input a number");
      return;
    } else {
      const newInputs = { ...inputs, cvv: cvvValue };
      setInputs(newInputs);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    // axios
    //   .post(
    //     `https://localhost:7109/HomeConnect/BidHouse/${parseInt(
    //       localStorage.getItem('houseGettingBidId')!
    //     )}`,
    //     inputs
    //   )
    //   .then(response => {
    //     console.log(response.data);
    //     alert('Bid Successful');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     alert(error.response.data.message);
    //   });
  }

  return (
    <div className="container">
      <div className="card-container">
        <div className="front">
          <div className="image">
            <img src={chip} alt="" />
            <img src={visa} alt="" />
          </div>
          <div className="card-number-box">################</div>
          <div className="flexbox">
            <div className="box">
              <span>card holder</span>
              <div className="card-holder-name">full name</div>
            </div>
            <div className="box">
              <span>expires</span>
              <div className="expiration">
                <span className="exp-month">mm/</span>
                <span className="exp-year">yy</span>
              </div>
            </div>
          </div>
        </div>
        <div className="back">
          <div className="stripe"></div>
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box"></div>
            <img src={visa} alt="" />
          </div>
        </div>
      </div>
      <form id="creditForm" onSubmit={handleSubmit} action="">
        <div className="inputBox">
          <span>Card Number</span>
          <input
            onChange={handleCardNumberInput}
            type="text"
            maxLength={16}
            className="card-number-input"
          />
        </div>
        <div className="inputBox">
          <span>Card Holder</span>
          <input
            onChange={handleCardHolderInput}
            type="text"
            className="card-holder-input"
          />
        </div>
        <div className="inputBox">
          <span>Amount to Bid (in $)</span>
          <input onChange={handleBidInput} type="text" className="bid-input" />
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>expiration mm</span>
            <select
              onChange={handleMonthInput}
              name=""
              id=""
              className="month-input"
            >
              <option value="month" selected disabled>
                month
              </option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="inputBox">
            <span>expiration yy</span>
            <select
              onChange={handleYearInput}
              name=""
              id=""
              className="year-input"
            >
              <option value="year" selected disabled>
                year
              </option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2027">2031</option>
              <option value="2028">2032</option>
              <option value="2029">2033</option>
              <option value="2030">2034</option>
              <option value="2027">2035</option>
              <option value="2028">2036</option>
              <option value="2029">2037</option>
              <option value="2030">2038</option>
            </select>
          </div>
          <div className="inputBox">
            <span>cvv</span>
            <input
              onMouseEnter={handleCVVMouseEnter}
              onMouseLeave={handleCVVMouseLeave}
              onChange={handleCVVInput}
              type="text"
              maxLength={4}
              className="cvv-input"
            />
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreditCardInfo;
