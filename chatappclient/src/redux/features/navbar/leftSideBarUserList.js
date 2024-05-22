import { useDispatch, useSelector } from "react-redux";
import { selectSelectedUser, setSlectedUser } from "../auth/AuthSlice";

export const UserDisplayCard = ({ email, name, status }) => {
  const selectedUser = useSelector(selectSelectedUser);
  console.log("Selected user ", selectedUser);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        return dispatch(setSlectedUser(email));
      }}
      className={
        email === selectedUser
          ? " bg-sky-300 hover:cursor-pointer overflow-hidden mt-3 flex items-center  mb-3 p-2 rounded-lg ml-2 mr-2"
          : " hover:bg-slate-400 hover:cursor-pointer overflow-hidden mt-3 flex items-center bg-slate-300 mb-3 p-2 rounded-lg ml-2 mr-2"
      }
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf32vBE8gTyaz9COMFaFr4UsrGN2uXoYB82ahFAtJ-KQ&s"
        alt="ImgOfAvatar"
        className="object-cover rounded-md mr-4  "
        width={"50px"}
        height={"50px"}
      ></img>
      <div className="">
        <div className=" d-inline-block  "> {name} </div>
        <div
          className={
            status === "online"
              ? " text-green-500 font-bold  d-inline-block"
              : "d-inline-block"
          }
        >
          {" "}
          {status}
        </div>
      </div>
    </div>
  );
};
