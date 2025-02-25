import React, { useEffect, useState } from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useParams } from "react-router-dom";
import styles from "./CartoonDetails.module.css";

export default function CartoonDetails() {
  const { id } = useParams();
  const [cartoon, setCartoon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dbRef = ref(db, `cartoons/${id}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          setCartoon(snapshot.val());
        } else {
          alert("error");
        }
      } catch (error) {
        console.error("Помилка отримання даних:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!cartoon) {
    return <p>Завантаження...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <img
          src={cartoon.image}
          alt="poster"
          className={styles.cartoonPoster}
        />
        <div className={styles.details}>
          <h3 className={styles.title}>{cartoon.title}</h3>
          <p className="description">{cartoon.descr}</p>
          <p className="year">{cartoon.year}</p>
        </div>
      </div>
    </>
  );
}
