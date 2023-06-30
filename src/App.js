import "./App.css";
import AppBar from "@mui/material/AppBar";
import Stores from "./components/Stores";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";

export const ENDPOINT = "http://localhost:7200/repositories/project";

function App() {
  const [store, setStore] = useState(null);
  const [addReview, setAddReview] = useState(false);

  const navigateToLanding = () => {
    setStore(null);
    setAddReview(false);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            onClick={navigateToLanding}
            sx={{
              ml: 3,
              mr: 2,
              display: "flex",
              fontWeight: 700,
              color: "inherit",
              cursor: "pointer",
            }}
          >
            McDonald's Stores {store ? " - " + store.address : ""}
          </Typography>
        </Toolbar>
      </AppBar>
      {!store && <Stores setStore={setStore} setAddReview={setAddReview} />}
      {store && !addReview && <Reviews store={store} />}
      {store && addReview && (
        <AddReview store={store} navigateToLanding={navigateToLanding} />
      )}
    </>
  );
}

export default App;
