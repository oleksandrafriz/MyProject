import React from "react";
import app from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";
import SearchBar from "./SearchBar";

export default function Card() {
  let [movieArray, setMovieArray] = useState([]);
  let [searchedCartoon, setSearchedCartoon] = useState("");
  const [originalMovieArray, setOriginalMovieArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

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
        {movieArray.map((cartoon, index) => (
          <div
            className={styles.card}
            key={index}
            onClick={handleClick(cartoon.id)}
          >
            <img src={cartoon.image} alt="card" className={styles.cardPhoto} />
            <h3 className="cardTitle">{cartoon.title}</h3>
            <p className="year">{cartoon.year}</p>
          </div>
        ))}
      </div>
    </>
  );
}
