// import { axiosClient } from "../Axios/AxiosClient";


export function HistoryPage({ history, deleteChat }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chat History</h2>
      {history.length === 0 && <p>No chat history.</p>}
      <div className="space-y-2">
        {history.map((h) => (
          <div key={h.id} className="p-3 border rounded flex justify-between items-center">
            <span>{h.title || `Chat ${h.id}`}</span>
            <button
              className="p-1 bg-red-600 text-white rounded"
              onClick={() => deleteChat(h.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}