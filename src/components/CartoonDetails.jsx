import React, { useEffect, useState } from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useParams } from "react-router-dom";
import styles from "./CartoonDetails.module.css";

/**
 * Компонент для відображення деталей вибраного мультфільму.
 *
 * @component
 * @returns {JSX.Element} Компонент деталей мультфільму.
 */
function CartoonDetails() {
  /**
   * Ідентифікатор мультфільму, отриманий з параметрів маршруту.
   *
   * @type {string}
   */
  const { id } = useParams();

  /**
   * Стан для зберігання даних про мультфільм.
   * Містить об'єкт з даними мультфільму або null, якщо дані ще не завантажені.
   *
   * @type {Object|null}
   */
  const [cartoon, setCartoon] = useState(null);

  /**
   * Виконує отримання даних про мультфільм із Firebase при завантаженні компоненту або зміні id.
   *
   * @async
   * @function fetchData
   * @returns {Promise<void>}
   */
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
          <p className="description">Description: {cartoon.descr}</p>
          <p className="date">Release: {cartoon.date}</p>
          <p className="duration">Duration: {cartoon.duration} min</p>
          <p className="production">Production: {cartoon.Production}</p>
        </div>
      </div>
    </>
  );
}

export default CartoonDetails;
