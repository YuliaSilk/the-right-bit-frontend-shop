import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/index.css";

import App from "./App.jsx";
import {FormProvider} from "./context/FormContext.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {SearchProvider} from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
 <StrictMode>
  <FormProvider>
   <CartProvider>
    <FormProvider>
     <SearchProvider>
      <App />
     </SearchProvider>
    </FormProvider>
   </CartProvider>
  </FormProvider>
 </StrictMode>
);
