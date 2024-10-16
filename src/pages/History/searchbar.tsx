import React, { useState } from 'react'

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  return <input type='search' placeholder='Search' onChange={handleChange} value={searchInput} />
}

export default SearchBar
