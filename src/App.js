import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./component/common/NotFound";
import List from "./component/board/List";
import Write from "./component/board/Write";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/not" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
