import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import ListMovies from "./pages/ListMovies";
import ListBooks from "./pages/ListBooks";
import ListAlbum from "./pages/ListAlbum";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage} />
            <Route path="/cinemas" Component={ListMovies} />
            <Route path="/books" Component={ListBooks} />
            <Route path="/albums" Component={ListAlbum} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
