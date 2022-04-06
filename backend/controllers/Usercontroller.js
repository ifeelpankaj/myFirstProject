const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendmail");
// const { use } = require("../routes/userRoute");
const crypto = require("crypto")

// Register a User


exports.registerUser = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },

    });
    sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Plzz Enter The Detail", 404));

    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Emial or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

//Logout user

exports.logout = catchAsyncError(async (req, res, next) => {


    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "logout successfully",
    })
});

//forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    //Get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;

    const message = `Your password reset link is here :- \n\n ${resetPasswordUrl}\n\n If you had not requested mail then kindly Ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: `BuyMyBook Password Recovery`,
            message,

        });
        res.status(200).json({
            success: true,
            message: `Email Sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));

    }
});


//Reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //Creating token hash
    const resetPasswordToken = crypto

        .createHash("sha256")

        .update(req.params.token)

        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Reset Password token Expire", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password MisMatch", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

//get user detail

exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//update the password

exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is not Matched", 401));
    }

    if (req.body.newPassword != req.body.confirmPassword) {

        return next(new ErrorHandler(" Password is Mismatched", 401));

    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);

    res.status(200).json({
        success: true,
        user,
    });
});

//update user profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }


    await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        
    })


});

//Get All User--->Admin

exports.getAllUser = catchAsyncError(async (req, res, next) => {

    const users = await User.find();



    res.status(200).json({
        success: true,
        users,
    })

})

//Get Single User--->Admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User  Haven't Register Yet: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    })

})

//Update Role

exports.updateRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        user,
    })


});

//Delete user --->Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`${req.params.id} Haven't Register Yet `))
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: `Deletion Successfully`,
    })


});
