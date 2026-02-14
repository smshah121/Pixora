import React, { useState, useEffect } from "react";
import { useGetCollectionsQuery } from "../feature/collection/collectionApi";
import { useGetSavedItemsByCollectionQuery } from "../feature/saved-items/savedItemApi";
import CollectionCard from "../components/CollectionCard";
import SavedItemCard from "./SavedItem";
import { useNavigate } from "react-router-dom";

const CollectionPages = () => {
  const navigate = useNavigate();
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeCollectionTitle, setActiveCollectionTitle] = useState("");

  const { data: collections = [], isLoading, refetch } = useGetCollectionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: savedItems = [], isLoading: itemsLoading } =
    useGetSavedItemsByCollectionQuery(activeCollection, {
      skip: !activeCollection,
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCollectionClick = (collection) => {
    setActiveCollection(collection.id);
    setActiveCollectionTitle(collection.title);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white gap-4">
        <div className="w-16 h-16 border-4 border-[#e60023] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#555] text-lg font-medium">Loading your collections…</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">


      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#e60023]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#e60023]/5 rounded-full blur-3xl translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">


        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate("/user-dashboard")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-red-100 text-[#e60023] hover:bg-red-50 font-medium transition-all"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>


          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#e60023]">{collections.length}</p>
              <p className="text-xs text-[#555]">Collections</p>
            </div>
            <div className="w-px h-10 bg-red-100"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#e60023]">
                {collections.reduce((acc, c) => acc + (c.savedItem?.length || 0), 0)}
              </p>
              <p className="text-xs text-[#555]">Items Saved</p>
            </div>
          </div>
        </div>


        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4">
            <span className="text-lg">📁</span>
            <span className="text-sm font-semibold text-[#e60023]">My Collections</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111] leading-tight">
            Your Saved
            <span className="text-[#e60023] relative inline-block ml-3">
              Inspiration
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C60 2 140 2 198 6" stroke="#e60023" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </span>
          </h1>
          <p className="text-[#555] mt-3 text-lg">
            Click a collection to explore your saved content
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center mb-6 shadow-inner">
              <span className="text-6xl">📁</span>
            </div>
            <h2 className="text-2xl font-bold text-[#111] mb-3">
              No collections yet
            </h2>
            <p className="text-[#555] max-w-md text-lg mb-8">
              Start saving photos, videos, or GIFs to create your first collection!
            </p>
            <button
              onClick={() => navigate("/user-dashboard")}
              className="px-8 py-3 bg-[#e60023] text-white rounded-full font-semibold hover:bg-[#d01f1f] transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-14">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleCollectionClick(collection)}
                className={`cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl rounded-2xl ${
                  activeCollection === collection.id
                    ? "ring-4 ring-[#e60023] ring-offset-2 rounded-2xl shadow-xl"
                    : "hover:ring-2 hover:ring-red-200 rounded-2xl"
                }`}
              >
                <CollectionCard
                  item={collection}
                  active={activeCollection === collection.id}
                />
              </div>
            ))}
          </div>
        )}

   
        {activeCollection && (
          <div className="border-t-2 border-red-100 pt-10">

         
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full mb-2">
                  <div className="w-2 h-2 bg-[#e60023] rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-[#e60023]">Active Collection</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111]">
                  {activeCollectionTitle}
                </h2>
                {!itemsLoading && (
                  <p className="text-[#555] mt-1">
                    {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved
                  </p>
                )}
              </div>

       
              <button
                onClick={() => {
                  setActiveCollection(null);
                  setActiveCollectionTitle("");
                }}
                className="w-10 h-10 rounded-full bg-red-50 text-[#e60023] flex items-center justify-center hover:bg-[#e60023] hover:text-white transition-all font-bold text-lg"
              >
                ✕
              </button>
            </div>

      
            {itemsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-12 h-12 border-4 border-[#e60023] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#555]">Loading items…</p>
              </div>
            ) : savedItems.length === 0 ? (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-5 shadow-inner">
                  <span className="text-5xl">🖼️</span>
                </div>
                <h3 className="text-xl font-bold text-[#111] mb-2">
                  This collection is empty
                </h3>
                <p className="text-[#555] max-w-sm mb-6">
                  Go explore and save some amazing content to this collection!
                </p>
                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="px-6 py-2.5 bg-[#e60023] text-white rounded-full font-semibold hover:bg-[#d01f1f] transition-all shadow-md hover:shadow-lg"
                >
                  Explore Content
                </button>
              </div>
            ) : (
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                {savedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="break-inside-avoid hover:scale-[1.02] transition-transform duration-300"
                  >
                    <SavedItemCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

   
        {!activeCollection && collections.length > 0 && (
          <div className="flex flex-col items-center py-16 text-center border-t-2 border-red-100 pt-10">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4 shadow-inner">
              <span className="text-4xl">👆</span>
            </div>
            <h3 className="text-xl font-bold text-[#111] mb-2">
              Select a collection
            </h3>
            <p className="text-[#555]">
              Click any collection above to view its saved items
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CollectionPages;