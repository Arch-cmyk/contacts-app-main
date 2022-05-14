import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      first: {
        type: String,
      },
      last: {
        type: String,
      },
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    collection: "contacts",
  }
);

export default mongoose?.models?.Contact ||
  mongoose.model("Contact", ContactSchema);
