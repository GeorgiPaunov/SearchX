import { Suggestion } from "../../Models";
import Icon from "../Icon/Icon";

import "./SuggestionItem.css";

interface ItemProps {
  item: Suggestion;
  selectionHandler: (item: Suggestion) => void;
  removeRecent: (id: number) => void;
}

function SuggestionItem({ item, selectionHandler, removeRecent }: ItemProps) {
  return (
    <div className="suggestion-item">
      <Icon
        name={item.isRecent ? "clock" : "search"}
        alt={item.isRecent ? "recently searched" : "magnifying glass"}
      />
      <div
        className={`suggestion-item__title${item.isRecent ? " recent" : ""}`}
        onClick={() => selectionHandler(item)}
      >
        {item.title}
      </div>
      {item.isRecent && (
        <div
          className="suggestion-item__button"
          onClick={() => removeRecent(item.id)}
        >
          Remove
        </div>
      )}
    </div>
  );
}

export default SuggestionItem;
