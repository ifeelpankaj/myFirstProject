

import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/BuyMyBook.png"

const options = {
  burgerColorHover: "#0c5452",
  logo,
  logoWidth: "200px",
  navColor1: "#0c5452",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/home",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "White",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "yellow",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "white",
  searchIconColor: "white",
  cartIconColor: "white",
  profileIconColorHover: "yellow",
  searchIconColorHover: "yellow",
  cartIconColorHover: "yellow",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
