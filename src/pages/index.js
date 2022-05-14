import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

import plusIcon from "../../public/plus.png";
import plusIcon64 from "../../public/plus64.png";
//MongoDB things
import connectMongo from "../lib/connectMongo";
import Contact from "../models/Contact";

import ContactCard from "../components/contact-card";

export default function Home({ contactsList }) {
  return (
    <div className={styles.container}>
      <div className={styles.contactsList}>
        <h1 className={styles.heading}>Contacts</h1>
        {contactsList
          .sort(function (a, b) {
            if (a.name.first.toLowerCase() < b.name.first.toLowerCase(0))
              return -1;
            else return 1;
            return 0;
          })
          .map((contact) => (
            <ContactCard contact={contact} key={contact.id} />
          ))}
      </div>
      <div className={styles.plus}>
        <Link href={`/contact/new`}>
          {/* <button>Add new contact</button> */}
          <Image src={plusIcon64} alt="plus64" />
        </Link>
      </div>
      {/* <Image src={plusIcon} alt="plus" /> */}
      {/* <Image src={plusIcon64} alt="plus64" /> */}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await connectMongo();

    const contactsList = await Contact.find();
    if (!contactsList) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        contactsList: JSON.parse(JSON.stringify(contactsList)),
      },
    };
  } catch (error) {
    console.error("Some error occured ==>", error);
    return {
      error: true,
    };
  }
}
