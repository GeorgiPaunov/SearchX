import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { getSuggestions, getResults } from "./utils/helpers";
import { NO_RESULTS_FOUND } from "./utils/messages";
import { Result, Suggestion } from "./Models";
import SuggestionItem from "./Components/SuggestionItem/SuggestionItem";
import ResultItem from "./Components/ResultItem/ResultItem";
import data from "./assets/data.json";

import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recent, setRecent] = useState<number[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [shouldShowError, setShouldShowError] = useState(false);

  // Hide the suggestions if clicked outside the suggestion list or the search input
  const handleWindowClick = (evt: MouseEvent) => {
    const className = (evt.target as Element).className;
    if (
      !className.startsWith("search-input") &&
      !className.startsWith("suggestion")
    ) {
      setShouldShowSuggestions(false);
    }
  };

  const handleTextChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
    setShouldShowSuggestions(!!evt.target.value);
    setSuggestions(getSuggestions(data, evt.target.value, recent));
  };

  const handleSuggestionSelection = (item: Suggestion) => {
    const startTime = performance.now();

    setSearchValue(item.title);
    setShouldShowSuggestions(false);
    setShouldShowError(false);
    setSuggestions(getSuggestions(data, item.title, [...recent, item.id]));
    setResults(getResults(data, item.title));
    !recent.includes(item.id) && setRecent([...recent, item.id]);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  };

  const removeRecent = (id: number) => {
    const updatedRecents = recent.filter((r) => r !== id);

    setRecent(updatedRecents);
    setSuggestions(getSuggestions(data, searchValue, updatedRecents));
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    const startTime = performance.now();

    setShouldShowSuggestions(false);

    const results = getResults(data, searchValue);

    if (results.length) {
      setResults(results);
      setShouldShowError(false);

      const searchedItem = data.find(
        (d) => d.title.toLowerCase() === searchValue.toLowerCase()
      );
      searchedItem &&
        !recent.includes(searchedItem.id) &&
        setRecent([...recent, searchedItem.id]);

      const endTime = performance.now();
      setTimeTaken(endTime - startTime);
    } else {
      setResults([]);
      setShouldShowError(true);
    }
  };

  const areSuggestionsVisible = shouldShowSuggestions && suggestions.length > 0;

  return (
    <section className="App" onClick={handleWindowClick}>
      <h1>Search X</h1>
      <div className="search">
        <form onSubmit={handleFormSubmit}>
          <input
            autoFocus
            className={`search-input${
              areSuggestionsVisible ? " with-suggestions" : ""
            }`}
            value={searchValue}
            onChange={handleTextChange}
            onFocus={() => setShouldShowSuggestions(true)}
          />
        </form>
        {areSuggestionsVisible && (
          <div className="suggestions">
            {suggestions.map((s) => (
              <SuggestionItem
                key={s.id}
                item={s}
                selectionHandler={handleSuggestionSelection}
                removeRecent={removeRecent}
              />
            ))}
          </div>
        )}
      </div>
      {results.length ? (
        <div className="results">
          <div className="results-metadata">
            Found {results.length} result(s) ({timeTaken.toFixed(4)} ms.)
          </div>
          {results.map((r) => (
            <ResultItem key={r.id} item={r} />
          ))}
        </div>
      ) : null}
      {shouldShowError && <p className="error-message">{NO_RESULTS_FOUND}</p>}
    </section>
  );
}

export default App;
