import React from "react";
import "./style.css";
import dogImage from "../../assets/dogImage.svg";
import {useHistory} from "react-router-dom"

const Header = () => {
  const history = useHistory()
  return (
    <>
      <img className="logo" src={dogImage} alt="logo pet" onClick={() => history.push("/")} />
    </>
  );
};

export default Header;
