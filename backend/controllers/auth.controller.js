import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';
import {
  errorResponse,
  successResponseWithoutData,
  successResponse,
  userAlreadyExists,
  validationErrorResponse,
  notFoundResponse,
  wrongPasswordResponse,
} from '../utils/apiResponses.js';

const sinupController = async (req, res) => {
  try {
    const { fullName, username, password, gender } = req.body;

    // Validation check
    if (!fullName || !username || !password || !gender) {
      return validationErrorResponse(res, 'All fields are required');
    }

    // Duplicate User check
    const ifExist = await User.findOne({ username: username });

    if (ifExist) {
      return userAlreadyExists(res);
    }
    else{
      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      // HASH PASSWORD HERE
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      // storing data in database
      const newUser = new User({
        fullName: fullName,
        username: username,
        password: hashed,
        gender: gender,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      });
      console.log(newUser);


      // Save the user to the database
      const savedUser = await newUser.save();
      

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        username: savedUser.username,
        profilePic: savedUser.profilePic,
      });
    }
  } catch (error) {
    return errorResponse(res, error, 'Error occured while Sinup');
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validations
    if (!username || !password) {
      return validationErrorResponse(res, 'Both Email and Password Required');
    }

    // User Registered or not
    const userExist = await User.findOne({ username: username });
    if (!userExist) {
      return notFoundResponse(res, 'User Not Found');
    }

    const isValid = bcrypt.compare(password, userExist.password);
    if (!isValid) {
      return wrongPasswordResponse(res);
    }

    // Generating Login Token
    const token = jwt.sign(
      {
        username: username,
      },
      process.env.JWT_SECRET
    );
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.status(200).json({
      _id: userExist._id,
      fullName: userExist.fullName,
      username: userExist.username,
      profilePic: userExist.profilePic,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutController = (req, res) => {
  try {

    req.cookies['token'] = '';
    return successResponseWithoutData(res, 'Logged out successfully');
  } catch (error) {
    return errorResponse(res, error, 'Error occured while Logout');
  }
};

export { loginController, sinupController, logoutController };
