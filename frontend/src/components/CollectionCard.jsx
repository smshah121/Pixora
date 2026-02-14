import React from "react";
import { useDeleteCollectionMutation } from "../feature/collection/collectionApi";

const CollectionCard = ({ item }) => {
  const [deleteCollection, { isLoading }] = useDeleteCollectionMutation();

  const handleDelete = async () => {
    try {
      await deleteCollection(item.id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="w-60 h-64 rounded relative bg-gray-200 overflow-hidden flex items-center justify-center">


      <h2 className="text-gray-600 font-semibold text-center px-4">
        {item.title}
      </h2>

  
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="absolute bottom-2 right-2 px-3 py-1 bg-[#e60023] text-white rounded active:scale-95"
      >
        {isLoading ? "Removing..." : "Remove"}
      </button>
    </div>
  );
};

export default CollectionCard;
