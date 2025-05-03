import { useEffect, useState } from "react";
import api from "../../../utils/api/Api";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function FavoriteLists({
  setDisplayConfirm = () => {},
  callbackOnOKRef,
  setTitle = () => {},
}) {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleClick = (e, listID) => {
    e.stopPropagation();
    setOpen(listID === open ? undefined : listID);
  };

  useEffect(() => {
    api.get("/favourite").then((response) => {
      const data = response.data;
      console.log(data);
      setLists(data);
    });
  }, []);

  function handleClickList(listID) {
    setOpen(undefined);

    const reg = /^\d+$/;
    const currentPath = location.pathname;
    const path = currentPath.split("/");
    if (reg.test(path[path.length - 1])) {
      navigate(`./../${listID}`);
    } else {
      navigate(`./${listID}`);
    }
  }

  function handleDeleteList(e, listID, index) {
    setTitle("Bạn xác nhận muốn xóa danh sách?");
    setDisplayConfirm(true);

    callbackOnOKRef.current = () => {
      console.log(listID);

      api.delete(`/favourite/delete/${listID}`).then((response) => {
        console.log(response.data);
        setLists(lists.filter((_, ind) => ind !== index));
      });
    };
  }

  function displayFavoriteList() {
    return lists.map((item, index) => {
      if (!item) return;
      const { listId, name } = item;

      return (
        <div
          key={listId}
          className="sidebar-item"
          onClick={() => handleClickList(listId)}
        >
          {name}
          <div
            className="list-more-area"
            onClick={(e) => handleClick(e, listId)}
          >
            <RxHamburgerMenu className="burger" />
            {open === listId && (
              <div className="list-more-box">
                <div className="rename-list" children="Đổi tên" />
                <div
                  className="delete-list"
                  onClick={(e) => handleDeleteList(e, listId, index)}
                  children="Xóa danh sách"
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="favorite-stock__sidebar">
      <h2 className="title">Danh sách quan sát</h2>
      {displayFavoriteList()}
      <div className="sidebar-item add-new-list">
        <FaPlus /> Thêm danh sách mới
      </div>
    </div>
  );
}

export default FavoriteLists;
