import React, { useState } from "react";
import { RiVipCrownFill } from "react-icons/ri";
import { FaCalendarDays } from "react-icons/fa6";
import { IoIosBriefcase } from "react-icons/io";
import api from "../utils/api";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ListItem = ({ todo, setTodos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const icon =
    todo.status === "important" ? (
      <RiVipCrownFill className="text-danger fs-4" />
    ) : todo.status === "job" ? (
      <IoIosBriefcase className="text-primary fs-4" />
    ) : (
      <FaCalendarDays className="text-success fs-4" />
    );

  // silme butonuna tıklanınca çalışır
  const handleDelete = () => {
    // apiye silme isteği
    api
      .delete(`/todos/${todo.id}`)
      .then(
        () =>
          // silinen todoyu state kaldır
          setTodos((todos) => todos.filter((item) => item.id !== todo.id)),
        toast.error("silme işlemi gerçekleştirildi")
      )
      .catch((err) => console.log(err));
  };
  return (
    <li className="list-group-item p-3 d-flex justify-content-between gap-3 align-items-center">
      {icon}
      <span>{todo.title}</span>

      <div className="btn-group">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-sm btn-primary"
        >
          Düzenle
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-danger">
          Sil
        </button>

        {isOpen && (
          <Modal
            close={() => setIsOpen(false)}
            todo={todo}
            setTodos={setTodos}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
