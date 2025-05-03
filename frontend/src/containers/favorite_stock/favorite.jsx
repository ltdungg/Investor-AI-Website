import { Route, Routes } from "react-router-dom";
import "./favorite.scss";
import FavoriteLists from "./side_bar/favorite_lists";
import FavoriteStocks from "./favorite_stocks_in_list/favorite_stocks";
import { useRef, useState } from "react";
import ConfirmBox from "../../components/confirm_box/confirm_box";

function Favorite() {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [title, setTitle] = useState("");
  const callbackOnOK = useRef(() => {});

  return (
    <>
      <div className="favorite-list">
        <FavoriteLists
          setDisplayConfirm={setDisplayConfirm}
          setTitle={setTitle}
          callbackOnOKRef={callbackOnOK}
        />
        <div className="favorite-list__stocks">
          <Routes>
            <Route path="/" />
            <Route
              path="/:listID"
              element={
                <FavoriteStocks
                  setDisplayConfirm={setDisplayConfirm}
                  setTitle={setTitle}
                  callbackOnOKRef={callbackOnOK}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <ConfirmBox
        display={displayConfirm}
        setDisplay={setDisplayConfirm}
        title={title}
        handleOnOK={callbackOnOK.current}
      />
    </>
  );
}

export default Favorite;
