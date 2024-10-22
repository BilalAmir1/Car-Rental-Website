import React from 'react'
import "../../styles/SearchBar.css";

const SearchBar = ({filter, setFilter}) => {
  return (
    <div className="search__box">
                <input type="text" placeholder="Search by Car name/brand/color..." value={filter} onChange={(e) => setFilter(e.target.value)}/>
                <button className="button_search">Search</button>
              </div>
  )
}

export default SearchBar