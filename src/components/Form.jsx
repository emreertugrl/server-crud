import React from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // formdan verileri al
    const text = e.target[0].value;
    const status = e.target[1].value;

    // input boşsa uyarı ver fonksiyonu durdur.
    if (!text.trim()) {
      return toast.warn("Lütfen içeriği belirleyiniz.");
    }
    // apiye gönderilecek nesne
    const newTodo = {
      title: text,
      status,
      date: new Date().toLocaleString("en-us"),
    };
    // apiye gönderilecek nesneyi hazırla

    api
      .post("/todos", newTodo)
      //başarılı olursa
      .then((res) =>
        setTodos((todos) => [res.data, ...todos], toast.success("todo eklendi"))
      )
      //başarısız oldu
      .catch((error) => toast.error("Bir Sorun oluştu!!"));

    //   formu sıfırla
    e.target.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input
        type="text"
        className="form-control shadow"
        placeholder="ör:react projesi yap"
      />
      <select className="form-select w-50 shadow">
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
        <option value="important">Önemli</option>
      </select>

      <button className="btn btn-primary shadow">Gönder</button>
    </form>
  );
};

export default Form;
