import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={paste?.title}
            disabled
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold shadow-sm"
          />
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden`}
        >
          <div
            className={`w-full flex items-center justify-between gap-x-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700`}
                onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="text-gray-500 dark:text-gray-400 group-hover:text-green-500" size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={paste?.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-6 bg-transparent text-gray-900 dark:text-gray-50 focus:outline-none font-mono text-base resize-none"
            style={{
              minHeight: "500px",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
