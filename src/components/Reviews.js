import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../App";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";
import queries from "../queries";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Reviews({ store }) {
  const [reviews, setReviews] = useState(null);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");

  const columns = [
    {
      field: "date",
      type: "date",
      valueGetter: ({ value }) => {
        let [day, month, year] = value.split("/");
        return new Date(+year, +month - 1, +day);
      },
      renderCell: (params) => params.value.toLocaleDateString("en-GB"),
      headerName: "Date",
    },
    {
      field: "reviewerName",
      headerName: "Reviewer Name",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "rating",
      type: "number",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => (
        <Rating name="read-only" value={+params.value} readOnly />
      ),
    },
  ];

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = () => {
    const params = new URLSearchParams();

    params.append(
      "query",
      queries.getReviewsForStore(store.id, !search ? "*" : search)
    );

    axios
      .get(`${ENDPOINT}?${params.toString()}`)
      .then((res) => {
        setReviews(
          res.data.results.bindings.map((x) => ({
            id: x.id.value,
            date: x.date.value,
            description: x.description.value,
            rating: x.rating.value,
            reviewerName: x.reviewerName.value,
          }))
        );
      })
      .catch((err) => console.error(err));
  };

  return reviews ? (
    <Box sx={{ height: "calc(100% - 64px - 56px)" }}>
      <TextField
        variant="filled"
        label="Search by description"
        fullWidth
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            getReviews();
          }
        }}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: 1 }}>
              <IconButton onClick={getReviews} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <DataGrid
        columns={columns}
        rows={reviews}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30, 50]}
        pagination
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 1,
          },
        }}
      />
    </Box>
  ) : (
    <LinearProgress />
  );
}

export default Reviews;
