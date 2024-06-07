import { useErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import "./ErrorComponent.css";

export default function ErrorComponent({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="error-component">
      <h1>{error.name} has occurred!</h1>
      <p>
        {error.name}: {error.message}
      </p>
      <Link to="/">
        <button onClick={resetBoundary}>Go back home</button>
      </Link>
    </div>
  );
}
