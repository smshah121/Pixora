import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../feature/searchSlice'

const Tabs = () => {

    const tabs = ["Photos", "Videos", "GIFs"]
    const dispatch =useDispatch()
    const ActiveTab = useSelector((state)=> state.search.activeTab)
  return (
    <div className='flex justify-center py-4 px-4 gap-4'>
        {tabs.map(function(elem,idx){
            return (
                <button 
            className={`${(ActiveTab==elem ? `bg-[#e60023] font-semibold text-white px-3 py-2`:`bg-gray-300 font-semibold text-white px-3 phy-2`)}`} 
            key={idx}
            onClick={()=> 
            {
                dispatch(setActiveTab(elem))
            }
            }
            >
                {elem}
            </button>
            )
            
        })}
    </div>
  )
}

export default Tabs