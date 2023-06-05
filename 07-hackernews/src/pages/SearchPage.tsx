import { useEffect, useState, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import * as HN_API from "../services/HackerNewsAPI";
import { HN_SearchResponse } from "../types";

const SearchPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(
    null
  );
  const queryRef = useRef("");

  const searchHackerNews = async (searchQuery: string) => {
    setError(null);
    setLoading(true);
    setSearchResult(null);

    queryRef.current = searchQuery;

    try {
      const res = await HN_API.searchByDate(searchQuery);
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

    searchHackerNews(searchInput);
  };

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
            Showing {searchResult.nbHits} search results for "{queryRef.current}
            " ...
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

          <div className="d-flex justify-content-between align-items-center">
            <div className="prev">
              <Button variant="primary">Previous Page</Button>
            </div>

            <div className="page">PAGE</div>

            <div className="next">
              <Button variant="primary">Next Page</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPage;
