import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionApi = createApi({
    reducerPath: "collectionApi",
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
        createCollection: builder.mutation({
            query:(body)=> ({
                url: "collections",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Collection"]
        }),

        getCollections: builder.query({
            query: ()=> "collections",
            providesTags: ["Collection"]
        }),

        getCollectionById: builder.query({
            query: (id)=> `collections/${id}`,
            providesTags: (result, error, id) => [
        { type: "Collection", id },
      ],
        }),
        deleteCollection: builder.mutation({
            query: (id)=> ({
                url: `collections/${id}`,
                method: "DELETE",
                

            }),
            invalidatesTags: ["Collection"]
        })

    })
})

export const {useCreateCollectionMutation, useDeleteCollectionMutation, useGetCollectionsQuery, useGetCollectionByIdQuery} = collectionApi;