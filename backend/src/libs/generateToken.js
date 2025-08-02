import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //generating the json web token here
  const token = jwt.sign({ userId }, process.env.JWT_Secret, {
    expiresIn: "7d",
  });

  //sending the token to the user in a cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //miliseconds
    httpOnly: true, //prevent XSS attack cross site scripting attack
    sameSite: "strict", //prevent CRSF attacks cross site request forgery attacks attacks
    secure: process.env.NODE_ENV != "development",
  });

  return token;
};
