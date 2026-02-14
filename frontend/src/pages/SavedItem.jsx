import { useDeleteSavedItemMutation } from "../feature/saved-items/savedItemApi";


const SavedItemCard = ({ item }) => {
  const [deleteSavedItem, { isLoading }] = useDeleteSavedItemMutation();

  const handleDelete = async () => {
    try {
      await deleteSavedItem(item.id).unwrap();
      console.log("Item removed");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="relative w-60 h-60 rounded-lg overflow-hidden bg-white group">
      {item.type === "video" ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={item.src}
          alt=""
          className="w-full h-full object-cover"
        />
      )}


      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
      >
        {isLoading ? "Removing..." : "Remove"}
      </button>
    </div>
  );
};

export default SavedItemCard;
