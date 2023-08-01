import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

// set cookie options
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // for 7 days
    httpOnly: true,
    secure: true
}

// controller function to register user
const register = async (req,res,next) => {
    try {
        // extract information from request body
        const { name , email , password } = req.body;

        // check all fields are provided
        if(!name || !email || !password){
            return next(new AppError(400, 'All fields are required'));
        }

        // check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return next(new AppError(400, 'Email already exists'));
        }

        // create new user
        const user = await User.create({
            name,
            email,
            password
        });

        // save user to the database
        await user.save();

        // generate jwt token
        const token = await user.generateToken();

        user.password = undefined;

        // set jwt token in the cookie
        res.cookie('token', token, cookieOptions);

        // respond with success message and user details
        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        return next(new AppError(500, error.message || 'Internal server error'));
    }
}

// controller function to login 
const login = async (req,res,next) => {
    try {
      // extract info
      const { email, password } = req.body;

      // Check if all fields are provided
      if (!email || !password) {
        return next(new AppError(400, "All fields are required"));
      }

      // Find the user in the database
      const user = await User.findOne({ email }).select("+password");

      // Check if the user exists
      if (!user) {
        return next(new AppError(400, "User not found"));
      }

      // Compare passwords using the comparePassword method
      const isPasswordMatch = await user.comparePassword(password);

      // Check if the password matches
      if (!isPasswordMatch) {
        return next(new AppError(400, "Password is incorrect"));
      }

      // Generate JWT token
      const token = await user.generateToken();

      user.password = undefined;

      // Set the JWT token in the cookie
      res.cookie("token", token, cookieOptions);

      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
        return next(
          new AppError(500, error.message || "Internal server error")
        );
    }
}

// controller function to user logout process
const logout = (req, res, next) => {
  try {
    // Clear the JWT token in the cookie
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(new AppError(500, error.message));
  }
};


export {
    register,
    login,
    logout
}