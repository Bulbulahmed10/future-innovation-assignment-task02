import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import ProductUpload from "./ProductCrud";
import "./app.css"

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
  };

  useEffect(() => {}, []);

 
  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      <ProductUpload token={token} />
    </div>
  );
};

export default App;
