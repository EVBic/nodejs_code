import React, { useState } from 'react'

const ContactSearch = ({ onSearch, onClear }) => {
  const [searchName, setSearchName] = useState('')

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleSearchClick = (event) => {
    event.preventDefault()
    onSearch(searchName)
  }

  return (
    <div className="container-fluid">
      <form class="d-flex" role="search">
        {' '}
        <input
          className="form-control me-2"
          type="search"
          placeholder="Enter contact's name..."
          aria-label="Search"
          value={searchName}
          onChange={handleSearchChange}
        />
        {searchName && (
          <button
            className="btn btn-outline-secondary clear-button"
            onClick={onClear}
          >
            Clear
          </button>
        )}
        <button
          class="btn btn-outline-success"
          type="submit"
          onClick={handleSearchClick}
        >
          <img src={`lupa.png`} alt="searchPic" style={{ width: '25px'}}/>
          Search
        </button>
      </form>
    </div>
  )
}

export default ContactSearch
