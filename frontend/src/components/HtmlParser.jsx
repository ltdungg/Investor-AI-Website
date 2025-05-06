import React from "react";
import parse from "html-react-parser";

function HtmlParser({ htmlContent, className }) {
  return <div className={className}>{parse(htmlContent)}</div>;
}

export default HtmlParser;
