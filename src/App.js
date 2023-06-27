import "./App.css";
import AppBar from "@mui/material/AppBar";
import Stores from "./components/Stores";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Reviews from "./components/Reviews";

export const ENDPOINT = "http://localhost:7200/repositories/project";

function App() {
  const [store, setStore] = useState();

  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={() => setStore(null)}
            sx={{
              ml: 3,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Stores {store ? " - " + store.address : ""}
          </Typography>
        </Toolbar>
      </AppBar>
      {!store && <Stores setStore={setStore} />}
      {store && <Reviews store={store} />}
    </>
  );
}

export default App;
