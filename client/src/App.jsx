import { useEffect, useState } from "react";

import AppRoutes from "./routes/AppRoutes";

import Loader from "./components/common/Loader";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setLoading(false);
    }, 2000);

  }, []);

  return (
    <>
      {loading ? <Loader /> : <AppRoutes />}
    </>
  );
}

export default App;