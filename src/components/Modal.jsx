import React from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const Modal = ({ close, todo, setTodos }) => {
  console.log(todo);
  const handleSubmit = (e) => {
    e.preventDefault();

    //formdan verileri al
    const newTitle = e.target[0].value;
    const newStatus = e.target[1].value;

    if (!newTitle.trim()) return toast.warn("Lütfen başlığı belirleyiniz.");
    // api todonun güncellenmesi için istek at
    api
      .patch(`/todos/${todo.id}`, { title: newTitle, status: newStatus })
      // istek başarılı olursa state'i güncelle
      .then(
        (res) =>
          setTodos((prev) =>
            prev.map((item) => (item.id == res.data.id ? res.data : item))
          ),
        toast.info("güncelleme işlemi başarılı"),
        // modalı kapat
        close()
      )
      .catch((err) => toast.error("İşlem Başarısız!!"));
  };
  return (
    <div className="modal d-block bg-black bg-opacity-75">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title">TODO'yu Düzenle</h5>
            <button
              type="button"
              className="btn-close"
              onClick={close}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="form-label" htmlFor="">
                  Yeni Başlığı Giriniz...
                </label>
                <input
                  defaultValue={todo.title}
                  type="text"
                  className="form-control shadow"
                  name=""
                  id=""
                />
              </div>
              <div className="my-4">
                <label className="form-label" htmlFor="">
                  Yeni Durumu Seçiniz...
                </label>
                <select
                  className="form-select shadow"
                  name=""
                  id=""
                  defaultValue={todo.status}
                >
                  <option value="daily">Günlük</option>
                  <option value="job">İş</option>
                  <option value="important">Önemli</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={close}
                >
                  Kapat
                </button>
                <button type="submit" className="btn btn-primary">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
