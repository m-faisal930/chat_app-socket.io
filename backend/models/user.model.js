import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'FullName is required'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    // email: {
    //     type: String,
    //     required: [true, "Email is required"],
    //     unique: true,
    //     validate: {
    //         validator: function(v) {
    //             return validator.isEmail(v);
    //         },
    //         message: props => `${props.value} is not a valid email address!`
    //     }
    // },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 6,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      enum: ['male', 'female'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    // createdAt, updatedAt => Member since <createdAt>
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
