export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
<<<<<<< HEAD
        Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
=======
        Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "None",
      secure: "true",
>>>>>>> 01408f9db6e9f9b896d80cf40404a295b58e63f8
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
