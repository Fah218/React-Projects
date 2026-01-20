import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-6">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={searchTerm} // Bind the input to searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
          <h2 className="px-6 py-4 text-3xl font-bold border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            All Pastes
          </h2>
          <div className="w-full px-6 py-6 flex flex-col gap-y-6">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-gray-200 dark:border-gray-700 w-full gap-y-6 justify-between flex flex-col sm:flex-row p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-shadow"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{paste?.title}</p>
                    <p className="text-sm font-medium line-clamp-3 max-w-[80%] text-gray-600 dark:text-gray-400 leading-relaxed">
                      {paste?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end justify-between">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-gray-500 dark:text-gray-400 group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-gray-500 dark:text-gray-400 group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-gray-500 dark:text-gray-400 group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium bg-white dark:bg-gray-900 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                      <Calendar size={16} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-gray-400 font-semibold py-10">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
