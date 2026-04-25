import { v2 as cloudinary } from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

// ========
// Register
// ========
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Avatar And Resume Required!", 400));
  }

  //POSTING AVATAR
  const { avatar } = req.files;
  const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
    avatar.tempFilePath,
    { folder: "AVATARS" },
  );

  if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForAvatar.error || "Unknown Cloudinary error",
    );
  }

  //POSTING RESUME
  const { resume } = req.files;
  const cloudinaryResponseForResume = await cloudinary.uploader.upload(
    resume.tempFilePath,
    { folder: "MY_RESUME" },
  );

  if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseForResume.error || "Unknown Cloudinary error",
    );
  }

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    linkedInURL,
    facebookURL,
  } = req.body;
  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    linkedInURL,
    facebookURL,

    avatar: {
      public_id: cloudinaryResponseForAvatar.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponseForAvatar.secure_url, // Set your cloudinary secure_url here
    },

    resume: {
      public_id: cloudinaryResponseForResume.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponseForResume.secure_url, // Set your cloudinary secure_url here
    },
  });

  generateToken(user, "USER Registered Successfully!", 201, res);
});

/* export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.avatar || !req.files.resume) {
    return next(new ErrorHandler("Avatar and Resume are required!", 400));
  }

  const { avatar, resume } = req.files;

  const {
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    linkedInURL,
    facebookURL,
  } = req.body;

  if (!fullName || !email || !password) {
    return next(new ErrorHandler("Required fields missing!", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists!", 400));
  }

  // Upload avatar
  const avatarRes = await cloudinary.uploader.upload(avatar.tempFilePath, {
    folder: "portfolio/avatars",
  });

  if (!avatarRes || avatarRes.error) {
    return next(new ErrorHandler("Avatar upload failed!", 500));
  }

  // Upload resume
  const resumeRes = await cloudinary.uploader.upload(resume.tempFilePath, {
    folder: "portfolio/resume",
  });

  if (!resumeRes || resumeRes.error) {
    return next(new ErrorHandler("Resume upload failed!", 500));
  }

  // Delete temp files
  fs.unlinkSync(avatar.tempFilePath);
  fs.unlinkSync(resume.tempFilePath);

  const user = await User.create({
    fullName,
    email,
    phone,
    aboutMe,
    password,
    portfolioURL,
    githubURL,
    instagramURL,
    twitterURL,
    linkedInURL,
    facebookURL,
    avatar: {
      public_id: avatarRes.public_id,
      url: avatarRes.secure_url,
    },
    resume: {
      public_id: resumeRes.public_id,
      url: resumeRes.secure_url,
    },
  });

  generateToken(user, "User Registered Successfully!", 201, res);
}); */

// ======
// Log In
// ======
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Provide Email And Password!"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password!"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password!"));
  }

  generateToken(user, "Logged In!", 200, res);
});

// =======
// Log Out
// =======
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out!",
    });
});

// =======
// GetUser
// =======
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// ===============
// Updated Profile
// ===============
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    aboutMe: req.body.aboutMe,
    githubURL: req.body.githubURL,
    instagramURL: req.body.instagramURL,
    portfolioURL: req.body.portfolioURL,
    twitterURL: req.body.twitterURL,
    linkedInURL: req.body.linkedInURL,
    facebookURL: req.body.facebookURL,
  };

  if (req.files && req.files.avatar) {
    const avatar = req.files.avatar;
    const user = await User.findById(req.user.id);
    const profileImageId = user.avatar.public_id;

    await cloudinary.uploader.destroy(profileImageId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "AVATARS",
      },
    );

    newUserData.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  if (req.files && req.files.resume) {
    const resume = req.files.resume;
    const user = await User.findById(req.user.id);
    const resumeId = user.resume.public_id;

    await cloudinary.uploader.destroy(resumeId);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      {
        folder: "MY_RESUME",
      },
    );

    newUserData.resume = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated!",
    user,
  });
});

// ===============
// Update Password
// ===============
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("Please Fill All Fields.", 400));
  }

  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(currentPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect Current Password!"));
  }

  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler(
        "New Password And Confirm New Password Do Not Match!",
        400,
      ),
    );
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Updated!",
  });
});

// =====================
// Get User ForPortfolio
// =====================
export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  // const user = await User.findOne();

  const user = await User.findById(process.env.PORTFOLIO_USER_ID);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/* export const getUserForPortfolio = catchAsyncErrors(async (req, res, next) => {
  const id = "672b765dd0a6d60341a9e991";
  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    user,
  });
}); */

// ===============
// FORGOT PASSWORD
// ===============
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found!", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const baseUrl = process.env.DASHBOARD_URL || "http://localhost:5174";
  // console.log("DASHBOARD_URL =", baseUrl);

  const resetPasswordUrl = `${baseUrl}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `http://localhost:5174/password/reset/${resetToken}`;

  // const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl}  \n\n If You've not requested this email then, please ignore it.`;

  const message = `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333">

      <h2 style="color:#4f46e5">🔐 Password Reset Request</h2>

      <p>Hello, ${user.fullName}</p>

      <p>We received a request to reset your password.</p>

      <p>
        Click the button below to reset your password:
      </p>

      <a href="${resetPasswordUrl}"
        style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;
        text-decoration:none;border-radius:8px;font-weight:bold;">
        Reset Password
      </a>

      <p style="margin-top:15px;font-size:13px;color:#555">
        Or copy and paste this link:
        <br/>
        <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
      </p>

      <hr style="margin:20px 0;" />

      <p style="color:#dc2626;font-weight:bold;">⚠️ Security Notice</p>
      <p>If you did NOT request this, ignore this email. Your account is safe.</p>

      <p style="font-size:12px;color:#666">
        This link will expire automatically for security reasons.
      </p>

      <p style="margin-top:20px;">— Portfolio Dashboard Team</p>

    </div>
  `;

  // console.log("MESSAGE:", message);

  try {
    await sendEmail({
      email: user.email,
      subject: `Personal Portfolio Dashboard Recovery Password`,
      message,
    });
    res.status(201).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// ==============
// RESET PASSWORD
// ==============
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400,
      ),
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password & Confirm Password do not match"));
  }

  user.password = await req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  generateToken(user, "Reset Password Successfully!", 200, res);
});
