import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../feature/searchSlice'

const Searchbar = () => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const handleSubmit = (e)=> {
        e.preventDefault()
        console.log("form submitted")
        dispatch(setQuery(search))
        setSearch("")
    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='flex text-gray-600 px-6 py-4 gap-2'>
            <input type="text" 
        placeholder='Search anything...'
        required
        value={search}
        onChange={(e)=> {
            setSearch(e.target.value)
        }}
        className='text-gray-600 font-semibold w-full rounded-3xl px-20 py-3  border border-gray-400 '

        />
        
        
        </form>
        
    </div>
  )
}

export default Searchbar