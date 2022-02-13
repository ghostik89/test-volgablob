import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import {CommentPage} from "./pages/CommentPage";

export const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<MainPage/>}/>
              <Route path={"/:id"} element={<CommentPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}
