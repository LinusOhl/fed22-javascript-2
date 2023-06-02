import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

const SearchPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchInput.trim().length) {
      return;
    }
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

      {false && <p>Loading...</p>}

      {true && (
        <div id="search-result">
          <p>Showing HITS search results for QUERY...</p>

          <ListGroup className="mb-3">
            {[{}].map((hit) => (
              <ListGroup.Item action href={""} key={""}>
                <h2 className="h3">TITLE</h2>
                <p className="text-muted small mb-0">
                  POINTS points by AUTHOR at CREATED_AT
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
