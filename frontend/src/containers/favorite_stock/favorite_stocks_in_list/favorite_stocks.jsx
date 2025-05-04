import { useEffect, useState } from "react";
import api from "../../../utils/api/Api";
import { useParams } from "react-router-dom";
import FavoriteTable from "../favorite_table/favorite_table";

function FavoriteStocks({
  setDisplayConfirm = () => {},
callbackOnOKRef,
  setTitle = () => {},
}) {
  const { listID } = useParams();
  const [stocks, setStocks] = useState([]);
  const [listName, setListName] = useState("");

  useEffect(() => {
    api.get(`/favourite/stock/${listID}`).then((response) => {
      const data = response.data;
      setStocks(data);
    });

    api.get(`/favourite?id=${listID}`).then((response) => {
      const data = response.data;
      setListName(data.name);
    });
  }, [listID]);

  const displayStocks = () => (
    <FavoriteTable
      listID={listID}
      lists={stocks}
      setStocks={setStocks}
      setDisplayConfirm={setDisplayConfirm}
      setTitle={setTitle}
      callbackOnOKRef={callbackOnOKRef}
    />
  );

  return (
    <div>
      <h1 children={listName} className="favorite-list-name" />
      {displayStocks()}
    </div>
  );
}

export default FavoriteStocks;
