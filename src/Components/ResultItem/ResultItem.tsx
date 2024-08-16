import { Result } from "../../Models";

import "./ResultItem.css";

interface ItemProps {
  item: Result;
}

function ResultItem({ item }: ItemProps) {
  return (
    <div className="result-item">
      <a
        className="result-item__link"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
      <div className="result-item__description">{item.description}</div>
    </div>
  );
}

export default ResultItem;
