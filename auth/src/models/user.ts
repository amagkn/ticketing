import mongoose from "mongoose";

// Properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Additional properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  // Method for creating a new user. Don't use User.create()!!!
  build(attrs: UserAttrs): UserDoc;
}

// Properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
