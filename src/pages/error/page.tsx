import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <>
      <Header />
      <main>
        <ErrorComponent error={error} />
      </main>
      <Footer />
    </>
  );
}
