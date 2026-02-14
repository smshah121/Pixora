import React, { useState } from "react";
import {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
} from "../feature/collection/collectionApi";
import { useSavedItemMutation } from "../feature/saved-items/savedItemApi";
import { toast } from "react-toastify";

const SaveCollectionModal = ({ item, onClose }) => {

  if (!item) return null;

  const { data: collections = [], isLoading } = useGetCollectionsQuery();
  const [createCollection, { isLoading: creating }] =
    useCreateCollectionMutation();
  const [saveItem, { isLoading: saving }] = useSavedItemMutation();

  const [title, setTitle] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);

  const createNewCollection = async () => {
    if (!title.trim()) {
      toast.error("Collection title required");
      return;
    }

    try {
      const res = await createCollection({ title }).unwrap();
      setSelectedCollection(res.id);
      setTitle("");
      toast.success("Collection created");
    } catch (err) {
      toast.error("Failed to create collection");
    }
  };

  const handleSave = async () => {
    if (!selectedCollection) {
      toast.error("Please select a collection");
      return;
    }

    try {
      await saveItem({
        title: item.title,
        externalId: String(item.id),
        url: item.url,
        thumbnail: item.thumbnail,
        src: item.src,
        type: item.type,
        collectionId: Number(selectedCollection),
      }).unwrap();

      toast.success("Saved successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to save item");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white w-130 rounded-2xl p-6 shadow-xl">

    
        <h2 className="text-2xl font-bold mb-4">Save to Collection</h2>

  
        <div className="space-y-2 max-h-56 overflow-y-auto mb-4">
          {isLoading && (
            <div className="text-gray-500 text-center">Loading collections…</div>
          )}

          {!isLoading && collections.length === 0 && (
            <div className="text-gray-400 text-center">
              No collections yet. Create one below 👇
            </div>
          )}

          {collections.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCollection(c.id)}
              className={`p-3 rounded-lg border cursor-pointer transition ${
                selectedCollection === c.id
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {c.title}
            </div>
          ))}
        </div>


        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New collection title"
            className="border rounded-lg px-3 py-2 flex-1"
          />
          <button
            onClick={createNewCollection}
            disabled={creating}
            className="bg-gray-900 text-white px-4 rounded-lg disabled:opacity-50"
          >
            {creating ? "Creating…" : "Create"}
          </button>
        </div>


        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-[#e60023] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaveCollectionModal;
