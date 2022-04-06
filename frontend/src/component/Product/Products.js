import React, { Fragment, useEffect, useState } from "react";
import "./allProducts.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../action/productAction";
import Loader from "../layout/loader/loader";
import Product from "../Home/Product";
import "./Products.css";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/metadata";


const categories = [
  "IT Engineering/Polytechnic",
  "ME Engineering/Polytechnic",
  "CIVIL  Engineering/Polytechnic",
  "ETC  Engineering/Polytechnic",
  "EXAM PREP  Engineering/Polytechnic",
  "Others Story/Novel/Motivational",
];




const Products = ({ match }) => {

  const alert = useAlert();
  const dispatch = useDispatch();


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);




  const { products, loading, productCount, error, resultPerPage } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, category,ratings,alert,error]);

  // let count = filteredProductCount;

  return (<Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title={`PRODUCTS...BuyMyBook`}/>

        <h2 className="productsHeading">Products</h2>

        <div className="products">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>

        <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={10000}
          />

          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <fieldset>
            <Typography component="legend">Book's Condition</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </fieldset>

        </div>
        {resultPerPage < productCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </Fragment>
    )}
  </Fragment>
  )
}

export default Products;