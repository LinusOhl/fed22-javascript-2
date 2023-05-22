import { useEffect, useState } from "react";
import { IResource } from "./types";
import "./assets/scss/App.scss";
import { getResource } from "./services/API";
import ResourceList from "./components/ResourceList";

function App() {
  const [resource, setResource] = useState("posts");
  const [data, setData] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!resource) {
        return;
      }

      setError("");
      setData([]);
      setLoading(true);

      try {
        const payload = await getResource(resource);

        setData(payload);
      } catch (e: any) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resource]);

  return (
    <div className="container">
      <h1 className="mb-3">Fetch</h1>

      <div className="d-flex justify-content-between mb-3">
        <button
          onClick={() => setResource("albums")}
          className="btn btn-primary"
        >
          Albums
        </button>

        <button
          onClick={() => setResource("photos")}
          className="btn btn-success"
        >
          Photos
        </button>

        <button
          onClick={() => setResource("posts")}
          className="btn btn-warning"
        >
          Posts
        </button>

        <button onClick={() => setResource("memes")} className="btn btn-info">
          Memes
        </button>

        <button onClick={() => setResource("todos")} className="btn btn-danger">
          Todos
        </button>
      </div>

      <ResourceList
        error={error}
        loading={loading}
        resource={resource}
        data={data}
      />
    </div>
  );
}

export default App;
