import connectMongo from "../../lib/connectMongo";
import Contact from "../../models/Contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newContactDetails = req.body;
    try {
      await connectMongo();
      let newContact = new Contact(newContactDetails);
      newContact.save();
    } catch (error) {
      console.error("Error while adding new contact", error);
    }
  } else if (req.method === "DELETE") {
    try {
      await connectMongo();
      await Contact.deleteOne({ _id: req.body });
    } catch (error) {
      console.error("Error while deleting the contact", error);
    }
  } else if (req.method === "PATCH") {
    const updatedContactDetails = req.body;
    try {
      await connectMongo();
      await Contact.replaceOne(
        { _id: updatedContactDetails._id },
        updatedContactDetails
      );
    } catch (error) {
      console.error("Error while updating the contact", error);
    }
  }
  res.status(200).json({});
}
