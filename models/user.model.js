import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    // Notes that belong to the user
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    timestamps: true,
  }
);


// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
  // Ensure we only hash the password if it's being modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash the password using bcrypt with a salt of 10 rounds
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Replace the original password with the hashed one
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});


// generic methods
userSchema.methods.generateToken = async function(){
    try {
            return await jwt.sign(
                   {
                     id: this._id,
                     email: this.email,
                   },
                   process.env.JWT_SECRET,
                   {
                     expiresIn: process.env.JWT_EXPIRY,
                   }
                 );
    } catch (error) {
        throw error
    }
   
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // Compare the entered password with the stored hashed password
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = model('User', userSchema);

export default User;