import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../App";
import queries from "../queries";
import { Box, Button, Rating, TextField, Typography } from "@mui/material";

function AddReview({ store, navigateToLanding }) {
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getReviewCount();
  }, []);

  const getReviewCount = () => {
    const params = new URLSearchParams();

    params.append("query", queries.getReviewCount(store.id));

    axios
      .get(`${ENDPOINT}?${params.toString()}`)
      .then((res) => {
        setReviewCount(res.data.results.bindings[0].count.value);
      })
      .catch((err) => console.error(err));
  };

  const addReview = () => {
    const now = new Date();
    let prepend = "";
    if (now.getMonth() < 10) {
      prepend = "0";
    }
    const review = {
      id: +reviewCount + 1,
      date: `${now.getDate()}/${prepend}${
        now.getMonth() + 1
      }/${now.getFullYear()}`,
      description,
      rating,
      storeId: store.id,
    };

    setDisabled(true);

    axios
      .post(`${ENDPOINT}/statements`, queries.addReview(review), {
        headers: {
          "Content-Type": "application/sparql-update",
        },
      })
      .then(() => navigateToLanding())
      .catch((err) => console.error(err));
  };

  return (
    <Box
      sx={{
        width: "30%",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        margin: "auto",
      }}
    >
      <Typography variant="h4">Write a review</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h6">Rating:</Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>

      <TextField
        placeholder="Description"
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={10}
      />
      <Button onClick={addReview} variant="contained" disabled={disabled}>
        Add review
      </Button>
    </Box>
  );
}

export default AddReview;
