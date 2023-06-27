import { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../App";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StoresMenu from "./StoresMenu";
import LinearProgress from "@mui/material/LinearProgress";
import queries from "../queries";

function Stores({ setStore }) {
  const [stores, setStores] = useState(null);
  const [pageSize, setPageSize] = useState(20);

  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "averageRating",
      headerName: "Rating",
      type: "number",
      width: 150,
      renderCell: (params) => (
        <Rating
          name="read-only"
          value={+params.value}
          readOnly
          precision={0.25}
        />
      ),
    },
    {
      field: "id",
      headerName: "Options",
      renderCell: (params) => (
        <StoresMenu
          onClick={() => setStore(stores.find((x) => x.id === params.value))}
        />
      ),
      sortable: false,
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams();

    params.append("query", queries.getStoreDetailsWithAverageRating());

    axios
      .get(`${ENDPOINT}?${params.toString()}`)
      .then((res) => {
        setStores(
          res.data.results.bindings.map((x) => ({
            id: x.id.value,
            name: x.name.value,
            address: x.address.value,
            averageRating: x.averageRating.value,
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return stores ? (
    <Box sx={{ height: "calc(100% - 64px)" }}>
      <DataGrid
        columns={columns}
        rows={stores}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30, 50]}
        pagination
      />
    </Box>
  ) : (
    <LinearProgress />
  );
}

export default Stores;
