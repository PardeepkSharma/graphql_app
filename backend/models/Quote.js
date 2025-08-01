import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
