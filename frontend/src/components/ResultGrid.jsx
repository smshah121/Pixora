import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGif, fetchPhotos, fetchVideos } from '../api/mediaApi'
import { setActiveTab, setError, setLoading, setQuery, setResults } from '../feature/searchSlice'
import ResultCard from './ResultCard'


const ResultGrid = () => {
    const {query,loading,results,error, activeTab}= useSelector((store)=>store.search)
   
    const dispatch = useDispatch()
     useEffect(function(){
        if(!query) return
        const getData = async ()=> {
            try {
                let data=[];
            if(activeTab == "Photos"){
                let res = await fetchPhotos(query)
                data = res.results.map((item)=>({
                    id:item.id,
                    type: "photo",
                    title:item.alt_description,
                    thumbnail:item.urls.small,
                    src:item.urls.full,
                    url:item.links.html
                }))
            }
            if (activeTab == 'Videos') {
                    let response = await fetchVideos(query)
                    

                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                        url:item.url
                    }))
                }
            if(activeTab == "GIFs"){
                let res = await fetchGif(query)
                data = res.results.map((item)=>({
                    id:item.id,
                    title:item.title || "GIF",
                    type:"gif",
                    thumbnail: item.media_formats.tinygif.url,
                    src: item.media_formats.gif.url,
                    url:item.url
                }))
            }
            dispatch(setResults(data))
                
            } catch (error) {
                dispatch(setError(error))
            }
        } 
        getData()
    }, [query,activeTab])

    if(error) return <h1 className='text-white'>Error</h1>
    if(loading) return <h1 className='text-white'>loading...</h1>

  return (
    <div className='flex flex-wrap gap-5 rounded overflow-auto py-5 px-3 justify-center'>
       {results.map((item, idx)=>{
        return <div key={idx}>
         
            <ResultCard item={item}/>
            
            
            
        </div>
       })}
    </div>
  )
}

export default ResultGrid


