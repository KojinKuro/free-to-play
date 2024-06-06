import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <div>This page does not exist</div>
      <img src="./vite.svg" alt="vite image" />
      <Link to="/">Go back home</Link>
    </>
  );
}
