import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SaveCollectionModal from "../pages/SaveCollectionModal";

const ResultCard = ({ item }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <div className="w-60 h-65 rounded relative bg-white overflow-hidden">
        <a target='_blank' className='h-full' href={item.url}>
                {item.type == 'photo' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted src={item.src}></video> : ''}
                {item.type == 'gif' ? <img className='h-full w-full object-cover object-center' src={item.src} alt="" /> : ''}
            </a>

        <div className="absolute bottom-0 w-full bg-black/60 px-4 py-3 flex justify-between items-center">
          <h2 className="text-white text-sm truncate w-[70%]">
            {item.title}
          </h2>

          <button
            onClick={handleSave}
            className="px-3 py-1 bg-[#e60023] text-white rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* ✅ Render modal ONLY when open */}
      {open && (
        <SaveCollectionModal
          item={item}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ResultCard;
