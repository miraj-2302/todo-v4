import { getDatabase, ref, remove } from "firebase/database";
import { FiX } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

const List = ({ list })=> {
  const db = getDatabase();
  const handleDelete=(item)=> {
    remove(ref(db, "lists/" + item.key));
  }
  // const handleEdit=(item)=> {
  //   console.log('okk');
  // }
  return (
    <div className="p-[10px] bg-fuchsia-950 shadow shadow-box  rounded-lg ">
      <header className="text-[rgb(247,247,247)] flex justify-between mb-2">
        <h1 className="font-medium text-lg">{list.title}</h1>
        <span className="cursor-pointer" onClick={() => handleDelete(list)}>
          <AiOutlineDelete className="text-medium text-lg" />
        </span>
        {/* <span className="cursor-pointer" onClick={() => handleEdit(list)}>
          <FaRegEdit className="text-medium text-lg" />
        </span> */}
      </header>
      <main className="mb-1">
        <p className="font-normal text-lg text-[rgb(245,245,245)]">
          {list.description}
        </p>
      </main>
      <footer className="text-base font-normal text-[rgba(243,239,239,0.5)]">
        {list.date}
      </footer>
    </div>
  );
}

export default List;
