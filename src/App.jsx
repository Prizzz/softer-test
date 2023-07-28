import { useState } from "react";
import Login from "./components/Login";
import Upload from "./components/Upload";

export default function App() {
  const [tokenData, setTokenData] = useState(null);

  return (
    <>
      <Login tokenData={tokenData} setTokenData={setTokenData} />
      <Upload tokenData={tokenData} />
    </>
  );
}
