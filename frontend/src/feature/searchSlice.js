import { createSlice } from "@reduxjs/toolkit";


const searchSlice = createSlice({
    name:"search",
    initialState: {
        query: "",
        activeTab: "Photos",
        results: [],
        loading:false,
        error:null
    }, 
    reducers:{
        setQuery(state,action){
            state.query = action.payload
        },
        setActiveTab(state,action){
            state.activeTab = action.payload
        },
        setResults(state,action){
            state.results = action.payload
            state.loading= false
        },
        setLoading(state,action){
            state.loading = true
            state.error = false
        },
        setError(state,action){
            state.error = action.payload
            state.loading = false
        },

    }
})

export const {setQuery, setActiveTab,setResults, setLoading, setError}= searchSlice.actions
export default searchSlice.reducer