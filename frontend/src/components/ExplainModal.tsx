export default function ExplainModal({
  isOpen,
  explanation,
  onClose,
}: {
  isOpen: boolean;
  explanation: string | undefined;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="content">
        <h2>Explanation</h2>
        <p>{explanation}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
