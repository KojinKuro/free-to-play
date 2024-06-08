import "./Badge.css";

export default function Badge({ text }: { text: string }) {
  return (
    <div className="badge" data-test-id="badge">
      {text}
    </div>
  );
}
