import { useState } from "react";
import { useRouter } from "next/router";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm("")
    router.push(`/search/${searchTerm}`)
  }

  return (
    <form
      className="search-box"
      onSubmit={handleSubmit}      
    >
      <div className="search-box-input">
        <input
          type="text"
          placeholder={'Search Gundam Mecha...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">search</button>
      </div>
    </form>
  )
}

export default SearchBox