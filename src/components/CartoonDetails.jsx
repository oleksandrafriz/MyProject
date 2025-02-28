import React, { useEffect, useState } from "react";
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
    if (!id) {
      return;
    }

    const fetchData = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/cartoons/${id}`);
        const data = await response.json();
        setCartoon(data);
      } catch (error) {
        console.error("Помилка отримання даних:", error);
        setCartoon(null);
      }
    };

    fetchData(id);
  }, [id]);

  if (!cartoon) {
    return (
      <p>{cartoon === null ? "Мультфільм не знайдено." : "Завантаження..."}</p>
    );
  }

  return (
    <div className={styles.container}>
      <img src={cartoon.image} alt="poster" className={styles.cartoonPoster} />
      <div className={styles.details}>
        <h3 className={styles.title}>{cartoon.title}</h3>
        <p className="description">Description: {cartoon.descr}</p>
        <p className="date">Release: {cartoon.date}</p>
        <p className="duration">Duration: {cartoon.duration} min</p>
        <p className="production">Production: {cartoon.Production}</p>
      </div>
    </div>
  );
}

export default CartoonDetails;
