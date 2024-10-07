import React, { useRef } from "react";
import classes from "./StartGame.module.css";

// Importing the QR code image (adjust the path as needed based on your folder structure)
import qrcode from "../assets/qrcode.png";

const StartGame = (props) => {
  const nameRef = useRef();

  const clickHandler = () => {
    props.onPlayGame(nameRef.current.value);
  };

  return (
    <div className={classes.container}>
       {/* Display QR Code */}
       <div className={classes.qrCodeContainer}>
       <p className={classes.qrtext}>To continue on mobile scan QR code</p>
        <img src={qrcode} alt="Scan this QR code to join the game" className={classes.qrCode} />
      </div>
      <div className={classes.userForm}>
        <input
          type="text"
          placeholder="enter your name"
          className={classes.userName}
          ref={nameRef}
        />
        <button className={classes.startBtn} onClick={clickHandler}>
          Start
        </button>
      </div>
      
    </div>
  );
};

export default StartGame;
