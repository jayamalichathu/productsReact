
import './css/App.scss';

import React from "react";
import {LanguageContext} from "./locale/LanguageContext";
import {ProductPage} from "./components/ProductPage";
function App() {
  return (
      <LanguageContext.Provider value={navigator.language}>
          <div className="App">
            <ProductPage/>

          </div>
      </LanguageContext.Provider>
  );
}

export default App;
