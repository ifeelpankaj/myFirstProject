const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require("../controllers/Usercontroller");

const { isAuthenticatedUser, authorizeRoles, } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/logout").get(logout);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//             Admin       <---------->     Admin

router.route("/admin/users").get(isAuthenticatedUser,  authorizeRoles("admin"), getAllUser);

router.route("/admin/singleuser/:id").get(isAuthenticatedUser,  authorizeRoles("admin"),getSingleUser);

router.route("/admin/updaterole/:id").put(isAuthenticatedUser,  authorizeRoles("admin"),updateRole);

router.route("/admin/deleteuser/:id").delete(isAuthenticatedUser,  authorizeRoles("admin"),deleteUser);





module.exports = router;