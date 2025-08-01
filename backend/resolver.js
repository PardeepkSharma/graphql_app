import User from "./models/User.js";
import Quotes from "./models/Quotes.js";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    async getAllUser() {
      const users = await User.find();
      return users;
    },
    async getUser(_, args) {
      const user = await User.findOne({ _id: args._id });
      return user;
    },
    async getQuotes() {
      const quotes = await Quotes.find().populate("user", "-password");
      return quotes;
    },
  },
  Quote: {},
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
      console.log(password_verify);
      if (!password_verify) {
        return new Error("Invalid Credentials!");
      }
      const access_token = jwt.sign({ _id: user._id }, "mysecrete");
      return { access_token, message: "Login Successfull" };
    },
    addQuotes: async (_, { quote }, context) => {
      console.log(context._id);
      if (!context._id) {
        return new Error("Unauthorized!");
      }
      const new_quote = await Quotes.create({
        quote: quote,
        user: context._id,
      });
      await new_quote.save();
      return "quote added successfuly";
    },
  },
};
