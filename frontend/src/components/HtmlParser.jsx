import React from "react";
import parse from "html-react-parser";

function HtmlParser({ htmlContent }) {
  return <div>{parse(htmlContent)}</div>;
}

export default HtmlParser;
