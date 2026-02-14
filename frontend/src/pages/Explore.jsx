import React from 'react'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../feature/searchSlice'
import Searchbar from '../components/Searchbar'

const Explore = () => {
    const dispatch = useDispatch()
    const { query } = useSelector((store) => store.search)

    // Handle tag click
    const handleTagClick = (tag) => {
        dispatch(setQuery(tag))
    }

    return (
        <div className="min-h-screen bg-white">
            <Searchbar />

            {query ? (
                <div className="bg-white">
                    <Tabs />
                    <ResultGrid />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4">

                    {/* ICON */}
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                        <span className="text-[#e60023] text-5xl">🔍</span>
                    </div>

                    {/* TITLE */}
                    <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-3">
                        Discover Ideas on Pixora
                    </h1>

                    {/* SUBTEXT */}
                    <p className="text-[#555] max-w-xl text-lg mb-8">
                        Search for photos, videos, and GIFs to save inspiration into your collections.
                    </p>

                    {/* SEARCH HINT */}
                    <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
                        {["Nature", "Technology", "Design", "Cars", "Art", "AI", "Food", "Travel"].map(
                            (tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className="px-6 py-3 rounded-full bg-white border-2 border-red-100 text-[#333] font-medium hover:border-[#e60023] hover:bg-red-50 hover:text-[#e60023] cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md"
                                >
                                    {tag}
                                </button>
                            )
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                        <div className="text-center">
                            <div className="text-3xl mb-3">📸</div>
                            <h3 className="font-semibold text-[#111] mb-2">Millions of Photos</h3>
                            <p className="text-sm text-[#555]">High-quality images from Unsplash</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🎥</div>
                            <h3 className="font-semibold text-[#111] mb-2">Stunning Videos</h3>
                            <p className="text-sm text-[#555]">Creative videos from Pexels</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">✨</div>
                            <h3 className="font-semibold text-[#111] mb-2">Animated GIFs</h3>
                            <p className="text-sm text-[#555]">Expressive GIFs from Tenor</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Explore