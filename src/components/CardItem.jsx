import React from "react";
import styles from "./Carditem.module.css";

/**
 * Компонент для відображення окремої картки мультфільму.
 * @param {Object} props - Властивості компонента.
 * @param {string} props.id - Ідентифікатор мультфільму.
 * @param {string} props.title - Назва мультфільму.
 * @param {string} props.date - Рік випуску.
 * @param {string} props.duration - Тривалість.
 * @param {string} props.production - Компанія.
 * @param {string} props.image - Посилання на зображення.
 * @param {Function} props.onClick - Функція, яка виконується при кліку.
 */
function CardItem({ id, title, image, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(id)}>
      <img src={image} alt={title} className={styles.cardPhoto} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
    </div>
  );
}

export default CardItem;
