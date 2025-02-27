import React from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";
import SearchBar from "./SearchBar";
import CardItem from "./CardItem";

/**
 * Компонент Card відображає список фільмів (мультфільмів) та дозволяє здійснювати пошук і перехід до деталей конкретного мультфільма.
 *
 * @param {Object} props - Пропси компонента.
 * @param {Array} props.movieArray - Список фільмів для відображення.
 * @param {Array} props.originalMovieArray - Оригінальний список фільмів (використовується для фільтрації пошуку).
 * @returns {JSX.Element} Відрендерений компонент Card.
 */
function Card({
  movieArray: initialMovieArray = [],
  originalMovieArray: initialOriginalMovieArray = [],
}) {
  const [movieArray, setMovieArray] = useState(initialMovieArray);
  const [originalMovieArray, setOriginalMovieArray] = useState(
    initialOriginalMovieArray
  );
  const [searchedCartoon, setSearchedCartoon] = useState("");
  const navigate = useNavigate();

  /**
   * Отримує дані про фільми з Firebase, якщо не передано початкові дані.
   * Заповнює стани movieArray та originalMovieArray отриманими даними.
   */
  useEffect(() => {
    if (
      initialMovieArray.length === 0 &&
      initialOriginalMovieArray.length === 0
    ) {
      const fetchData = async () => {
        try {
          const db = getDatabase(app);
          const dbRef = ref(db, "cartoons");
          const snapshot = await get(dbRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            const dataArray = Object.entries(data).map(([id, cartoon]) => ({
              id,
              ...cartoon,
            }));
            setMovieArray(dataArray);
            setOriginalMovieArray(dataArray);
          } else {
            alert("error");
          }
        } catch (error) {
          console.error("Помилка отримання даних:", error);
        }
      };

      fetchData();
    }
  }, [initialMovieArray, initialOriginalMovieArray]);

  /**
   * Обробляє зміну значення в полі пошуку та фільтрує movieArray за введеним запитом.
   *
   * @param {Object} e - Об'єкт події зміни значення в полі пошуку.
   */
  const handleSearch = (e) => {
    const searchCartoon = e.target.value;
    setSearchedCartoon(searchCartoon);

    if (searchCartoon === "") {
      setMovieArray(originalMovieArray);
      return;
    }
    const filterBySearch = originalMovieArray.filter((item) => {
      return item.title.toLowerCase().includes(searchCartoon.toLowerCase());
    });
    setMovieArray(filterBySearch);
  };

  /**
   * Обробляє подію кліку на мультфільм для переходу до його детальної сторінки.
   *
   * @param {string} id - Унікальний ідентифікатор мультфільма.
   * @returns {function} Функція, яка здійснює перехід на сторінку з деталями мультфільма.
   */
  const handleClick = (id) => {
    return () => navigate(`/cartoon/${id}`);
  };

  return (
    <>
      <SearchBar
        searchedCartoon={searchedCartoon}
        searchChange={handleSearch}
      />

      <div className={styles.cardContainer}>
        {movieArray.map((cartoon) => (
          <CardItem
            key={cartoon.id}
            id={cartoon.id}
            title={cartoon.title}
            date={cartoon.date}
            image={cartoon.image}
            onClick={handleClick(cartoon.id)}
          />
        ))}
      </div>
    </>
  );
}

export default Card;
