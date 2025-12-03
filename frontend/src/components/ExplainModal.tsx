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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Friendly Explanation
        </h2>

        {!explanation ? (
          <p className="text-gray-500">Loading explanation...</p>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>
        )}

        <button
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
