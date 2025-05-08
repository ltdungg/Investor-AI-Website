import { useEffect, useState } from "react";
import "./AnalysisTemplate.scss";
import axios from "axios";
import HtmlParser from "../../HtmlParser";
import { useParams } from "react-router-dom";

function AnalysisTemplate() {
  const [html, setHtml] = useState("");
  const { symbol } = useParams();
  useEffect(() => {
    if (symbol) {
      axios
        .get(
          `http://localhost:9000/investor-ai-bucket/stock-analysis/${symbol}.html`
        )
        .then((response) => {
          const responseData = response.data;
          setHtml(responseData);
        });
    }
  }, [symbol]);

  return <HtmlParser htmlContent={html} className="analysis-template"/>;
}

export default AnalysisTemplate;
