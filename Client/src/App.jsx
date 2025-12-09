import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatPage } from './pages/ChatPage';
import { HistoryPage } from './pages/HistoryPage';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/SignupPage';
import axiosClient from './API/AxiosClient';

export default function App() {
  const [view, setView] = useState('chat');
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const res = await axiosClient.get('/history');
    setHistory(res.data);
  };

  const deleteChat = async id => {
    await axiosClient.delete(`/history/${id}`);
    loadHistory();
  };

  return (
    <div className="min-h-screen grid grid-cols-5">
      <Sidebar setView={setView} loadHistory={loadHistory} />
      <div className="col-span-4 p-6">
        {view === 'chat' && <ChatPage />}
        {view === 'history' && (
          <HistoryPage history={history} deleteChat={deleteChat} />
        )}
        {view === 'login' && <LoginPage />}
        {view === 'signup' && <SignupPage />}
      </div>
    </div>
  );
}
