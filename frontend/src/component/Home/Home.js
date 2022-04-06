import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/metadata";
import "./Home.css";
import Product from "./Product";
import { clearErrors, getProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux"
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import Buy from "../images/buy.png"
import Sell from "../images/sell.png"

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

 
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
 }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (

    <Fragment>
      {loading ? <Loader/> : (<Fragment>
        <MetaData title="BuyMyBook" />
        <div className="banner">
          <p>Welcome </p>
          <h1>FIND AMAZING BOOKS BELOW</h1>

          <a href="#container">
            <button>
              Scroll
            </button>
          </a>
        </div>
        <div className="portal">
        <h2 className="homeHeading"> Portal's</h2>
        <div className="container-1" >
        <Link to="/products" style={{ color: 'inherit', textDecoration: 'inherit'}}
        >
          <div className="container-2">
            <img src={Buy} alt = "BuY" className="portal-img"></img>
            <p className="container-para">Buying Portal</p>
            <p className="container-para">You can buy a book at the cheapest  </p>
            <p className="container-para">price from us .</p>
            </div>
        </Link>
        <Link to="/sellYourBook" style={{ color: 'inherit', textDecoration: 'inherit'}}>
           <div className="container-2">
            <img src={Sell} alt = "SelL" className="portal-img"></img>
            <p className="container-para">Selling Portal</p>
            <p className="container-para">You can sell our used book which you do  not use </p>
            <p className="container-para">anymore and earn some money.</p>
            

            </div>
        </Link>
        </div>
        </div>

        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">


        {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
        </div>
       

      </Fragment>
      )}
    </Fragment>
  )

};

export default Home;