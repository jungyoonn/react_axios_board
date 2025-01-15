import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./component/common/NotFound";
import List from "./component/board/List";
import Write from "./component/board/Write";
import LoginForm from "./component/member/LoginForm";
import Dashboard from "./component/common/Dashboard";
import ProtectdRoute from "./component/common/ProtectdRoute";
import { AuthProvider } from "./hooks/AuthContext";
import View from "./component/board/View";
import Modify from "./component/board/Modify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/notes" element={
            <ProtectdRoute>
              <List />
            </ProtectdRoute>
          } />
          <Route path="/write" element={
            <ProtectdRoute>
              <Write />
            </ProtectdRoute>
          } />
          <Route path="/notes/:num" element={
            <ProtectdRoute>
              <View />
            </ProtectdRoute>
          } />
          <Route path="/notes/modify/:num" element={
            <ProtectdRoute>
              <Modify />
            </ProtectdRoute>
          } />

          <Route path="/not" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
