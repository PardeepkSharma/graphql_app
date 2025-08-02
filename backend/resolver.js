import User from "./models/User.js";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";
import Quote from "./models/Quote.js";
import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
  config();
}
export const resolvers = {
  Query: {
    async getAllUser() {
      const users = await User.find();
      return users;
    },
    async getMyProfile(_, args, context) {
      if (!context._id) {
        return new Error("Error Unauthorized!");
      }
      const user = await User.findOne({ _id: context._id });
      return user;
    },
    async getUser(_, args) {
      const user = await User.findOne({ _id: args.userId });
      return user;
    },
    async getQuotes() {
      const quotes = await Quote.find().populate("user", "-password");
      return quotes;
    },
  },
  User: {
    async quotes(parent) {
      return Quote.find({ user: parent._id });
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const { firstName, lastName, email, password } = input;
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exist.");
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const new_user = await User.create({
        firstName,
        lastName,
        email,
        password: hashed_password,
      });
      await new_user.save();
      return new_user;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return new Error("User does not exist");
      }
      const password_verify = await bcrypt.compare(password, user.password);
      if (!password_verify) {
        return new Error("Invalid Credentials!");
      }
      const access_token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return { access_token, message: "Login Successfull" };
    },
    addQuotes: async (_, { quote }, context) => {
      if (!context._id) {
        return new Error("Unauthorized!");
      }
      const new_quote = await Quote.create({
        quote: quote,
        user: context._id,
      });
      await new_quote.save();
      return "quote added successfuly";
    },
  },
};
