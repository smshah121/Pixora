
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const savedItemApi = createApi({
    reducerPath: "savedItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders:(headers)=> {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },

        
    }),

    endpoints: (builder)=> ({
        savedItem: builder.mutation({
            query: (body)=> ({
                url: "/saved-items",
                method: "POST",
                body,
            }),
        }),
         getSavedItemsByCollection: builder.query({
      query: (collectionId) =>
        `/saved-items/collections/${collectionId}`,
      providesTags: ["SavedItem"],
    }),

    // DELETE /saved-items/:id
    deleteSavedItem: builder.mutation({
      query: (id) => ({
        url: `/saved-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedItem"],
    }),
  }),
});

export const {
  useSavedItemMutation,
  useGetSavedItemsByCollectionQuery,
  useDeleteSavedItemMutation,
} = savedItemApi;

        
 