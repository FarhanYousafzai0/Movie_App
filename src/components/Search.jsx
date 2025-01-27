import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='search'>
        <div>
        <i class="fa-solid fa-magnifying-glass text-white "></i>
        <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search for a movie..."
  />

        </div>
    </div>
  )
}

export default Search
