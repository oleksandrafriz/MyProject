import React from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({searchedCartoon, searchChange}) {
  return (
    <>
        <div className={styles.search}>
            <input className={styles.searchInp} type="text" value={searchedCartoon} onChange={searchChange} />
        </div>
    </>
  )
}
