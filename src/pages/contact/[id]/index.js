import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";
//MongoDB things
import connectMongo from "../../../lib/connectMongo";
import Contact from "../../../models/Contact";

import styles from "../../../styles/contactDetails.module.css";

export default function ContactDetails({ contactDetails }) {
  const router = useRouter();
  const { id } = router.query;
  const [firstName, setFirstName] = useState(contactDetails?.name?.first);
  const [lastName, setLastName] = useState(contactDetails?.name?.last);
  const [phoneNumber, setPhoneNumber] = useState(contactDetails?.phoneNumber);

  function changeFirstName(event) {
    setFirstName(event.target.value);
  }
  function changeLastName(event) {
    setLastName(event.target.value);
  }
  function changePhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }
  function updateContact() {
    const updatedContact = {
      _id: id,
      name: {
        first: firstName,
        last: lastName,
      },
      phoneNumber: phoneNumber,
    };
    axios.patch("/api/contact", updatedContact).then(() => router.push("/"));
  }
  function deleteContact() {
    axios.delete("/api/contact", { data: id }).then(() => router.push("/"));
  }
  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <label for="first-name" className={styles.labelStyle}>
          First Name
        </label>
        <br />
        <input
          value={firstName}
          id="first-name"
          onChange={changeFirstName}
          className={styles.inputStyle}
        />
        <br />
        <label for="last-name" className={styles.labelStyle}>
          Last Name
        </label>
        <br />
        <input
          value={lastName}
          id="last-name"
          onChange={changeLastName}
          className={styles.inputStyle}
        />
        <br />
        <label for="number" className={styles.labelStyle}>
          Phone Number
        </label>
        <br />
        <input
          value={phoneNumber}
          id="number"
          onChange={changePhoneNumber}
          className={styles.inputStyle}
        />
        <br />
        <br />
        <br />
        <button onClick={updateContact} className={styles.buttonStyle}>
          Save
        </button>
        <br />
        <button onClick={deleteContact} className={styles.buttonStyle}>
          Delete
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const contactId = context.params.id;
  try {
    await connectMongo();
    const contactDetails = await Contact.findOne({ _id: contactId });
    if (!contactDetails) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        contactDetails: JSON.parse(JSON.stringify(contactDetails)),
      },
    };
  } catch (error) {
    console.error("Some error occured ==>", error);
    return {
      error: true,
    };
  }
}
