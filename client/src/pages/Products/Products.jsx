import React, { useState, useEffect } from "react";
import "./Products.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState(productRows);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    axios.get("http://192.168.1.105:5000/api/getProducts").then((res) => {
      setData(res.data);
      setIsLoaded(true);
      console.log(res.data.length);
    });
  }, []);

  const handleSend = (id) => {
    axios.post("http://192.168.1.105:5000/api/sendProduct", { barcode: id });
  };
  const columns = [
    { field: "id", headerName: "Barcode", width: 120, align: "center" },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              src={params.row.imageUrl}
              className="productListImg"
              style={{ objectFit: "contain" }}
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Stock", width: 60, align: "center" },
    {
      field: "onSale",
      headerName: "On Sale",
      width: 120,
      align: "center",
    },
    {
      field: "listPrice",
      headerName: "List Price",
      width: 100,
      align: "center",
    },
    {
      field: "salePrice",
      headerName: "Sale Price",
      width: 100,
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button
              className="productListEdit"
              onClick={() => handleSend(params.row.id)}
            >
              Send
            </button>
          </>
        );
      },
    },
  ];
  return (
    <div className="products">
      {isLoaded ? (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}   
          autoPageSize
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
