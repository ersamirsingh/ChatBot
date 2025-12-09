



export function Sidebar({ setView, loadHistory }) {
  return (
    <div className="col-span-1 bg-gray-900 text-white p-4 space-y-4">
      <button className="w-full p-2 rounded bg-blue-600" onClick={() => setView("chat")}>
        Chat
      </button>
      <button
        className="w-full p-2 rounded bg-blue-600"
        onClick={() => {
          loadHistory();
          setView("history");
        }}
      >
        History
      </button>
      <button className="w-full p-2 rounded bg-green-600" onClick={() => setView("login")}>
        Login
      </button>
      <button className="w-full p-2 rounded bg-green-600" onClick={() => setView("signup")}>
        Signup
      </button>
    </div>
  );
}