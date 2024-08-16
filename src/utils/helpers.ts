import { Result } from "../Models";

/**
 * Returns at most ten suggestions for the search, filtered by the search text
 * and ordered with recently searched on top
 * @param data Result[] A list of avaiable resources
 * @param searchText string The search text
 * @param recent number[] A list of recently searched item ids
 * @returns Suggestion[] A list of suggestions for the auto-complete
 */
export function getSuggestions(
  data: Result[],
  searchText: string,
  recent: number[]
) {
  return searchText
    ? data
        .filter((d) => filterSuggestion(d.title, searchText))
        .map((d) => mapResultToSuggestion(d, recent.includes(d.id)))
        .sort((a, b) => +b.isRecent - +a.isRecent)
        .slice(0, 10)
    : [];
}

/**
 * Checks if the provided item title is starting with the search text
 * @param title string The title of the source item
 * @param searchText string The search text
 * @returns boolean
 */
export function filterSuggestion(title: string, searchText: string) {
  return title.toLowerCase().startsWith(searchText.toLowerCase());
}

/**
 * Takes a resource (result) item and maps it to an auto-complete object
 * @param result Result The source item
 * @param isRecent boolean Indicates if the item was recently searched
 * @returns Suggestion An object for the auto-complete list
 */
export function mapResultToSuggestion(result: Result, isRecent: boolean) {
  return { id: result.id, title: result.title, isRecent };
}

/**
 * Returns the resources that contains the search text in their title
 * @param data Result[] A list of avaiable resources
 * @param searchText string The search text
 * @returns Result[] A list of results
 */
export function getResults(data: Result[], searchText: string) {
  return data.filter((d) =>
    d.title.toLowerCase().includes(searchText.toLowerCase())
  );
}
