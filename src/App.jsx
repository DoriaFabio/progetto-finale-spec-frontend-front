import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Homepage from "./pages/Homepage";
import ListMovies from "./pages/ListMovies";
import ListBooks from "./pages/ListBooks";
import ListAlbum from "./pages/ListAlbum";
import { GlobalProvider } from "./context/globalContext"
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Homepage} />
            <Route path="/cinemas" Component={ListMovies} />
            <Route path="/books" Component={ListBooks} />
            <Route path="/albums" Component={ListAlbum} />
            <Route path="/cinemas/:id" Component={DetailPage} />
            <Route path="/books/:id" Component={DetailPage} />
            <Route path="/albums/:id" Component={DetailPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  )
}
