import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import * as HN_API from "../services/HackerNewsAPI";
import { HN_SearchResponse } from "../types";
import Pagination from "../components/Pagination";

const SearchPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(
    null
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const pageParams = searchParams.get("page");
  // console.log(pageParams);

  const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    try {
      const res = await HN_API.searchByDate(searchQuery, searchPage);
      setSearchResult(res);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }

    // setPage(0);
    setSearchParams({ query: searchInput, page: "0" });
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    searchHackerNews(query, Number(pageParams));
  }, [query, pageParams, searchParams]);

  return (
    <>
      <h1>🔍 Search</h1>

      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter search query..."
            required
            type="text"
            value={searchInput}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            type="submit"
            disabled={!searchInput.trim().length}
          >
            Search
          </Button>
        </div>
      </Form>

      {error && <Alert variant="warning">{error}</Alert>}

      {loading && <p>Loading...</p>}

      {searchResult && (
        <div id="search-result">
          <p>
            Showing {searchResult.nbHits} search results for "{query}" ...
          </p>

          <ListGroup className="mb-3">
            {searchResult.hits.map((hit) => (
              <ListGroup.Item action href={hit.url} key={hit.objectID}>
                <h2 className="h3">{hit.title}</h2>
                <p className="text-muted small mb-0">
                  {hit.points} points by {hit.author} at {hit.created_at}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Pagination
            page={Number(pageParams) + 1}
            totalPages={searchResult.nbPages}
            hasPreviousPage={Number(pageParams) > 0}
            hasNextPage={Number(pageParams) < searchResult.nbPages - 1}
            onPreviousPage={() => {
              setSearchParams({
                query: String(query),
                page: String(Number(pageParams) - 1),
              });
              // setPage((prevValue) => prevValue - 1);
            }}
            onNextPage={() => {
              setSearchParams({
                query: String(query),
                page: String(Number(pageParams) + 1),
              });
              // setPage((prevValue) => prevValue + 1);
            }}
          />
        </div>
      )}
    </>
  );
};

export default SearchPage;
