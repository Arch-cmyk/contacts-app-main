import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./contact-card.module.scss";

export default function ContactCard({ contact }) {
  const router = useRouter();
  const { _id, name, number } = contact;

  return (
    <Link href={`/contact/${_id}`} passHref>
      <div
        className={styles.contact}
        id={_id}
      >{`${name.first} ${name.last}`}</div>
    </Link>
  );
}
