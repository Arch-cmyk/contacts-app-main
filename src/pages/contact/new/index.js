import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import styles from "../../../styles/newContact.module.css";

export default function NewContact() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function changeFirstName(event) {
    setFirstName(event.target.value);
  }
  function changeLastName(event) {
    setLastName(event.target.value);
  }
  function changePhoneNumber(event) {
    setPhoneNumber(event.target.value);
  }
  function addNewContact() {
    const newContact = {
      _id: uuidv4(),
      name: {
        first: firstName,
        last: lastName,
      },
      phoneNumber: phoneNumber,
    };
    axios.post("/api/contact", newContact).then(() => router.push("/"));
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
        <button onClick={addNewContact} className={styles.buttonStyle}>
          Add
        </button>
      </div>
    </div>
  );
}
