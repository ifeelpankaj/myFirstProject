const express = require("express");


const { getAllProducts, updateProduct, deleteProduct, productDetail, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { createProduct ,sellBook} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles, } = require("../middleware/auth");



const router = express.Router();


router
    .route("/products")
    .get(getAllProducts);
router
    .route("/admin/products")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
    .route("/product/sell")
    .post(isAuthenticatedUser,  sellBook);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
router
    .route("/product/:id")
    .get(productDetail);

router
    .route("/review")
    .put(isAuthenticatedUser, createProductReview);


router
    .route("/areview")
    .get(getProductReviews).delete(isAuthenticatedUser, deleteReview)



module.exports = router;
