import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import "./fileWindow.scss";

const FileWindow: React.FC = () => {
  const [rowData] = useState([
    { id: 1, name: "John Doe", age: 28, country: "USA" },
    { id: 2, name: "Jane Smith", age: 34, country: "Canada" },
    { id: 3, name: "Michael Johnson", age: 45, country: "UK" },
    { id: 4, name: "Emily Davis", age: 22, country: "Australia" },
  ]);

  const [columnDefs] = useState<ColDef[]>([
    { field: "id", headerName: "ID", sortable: true, filter: true },
    { field: "name", headerName: "Name", sortable: true, filter: true },
    { field: "age", headerName: "Age", sortable: true, filter: true },
    { field: "country", headerName: "Country", sortable: true, filter: true },
  ]);

  return (
    <div className="file-window">
      <h3>Uploaded Files</h3>
      <div className="file-grid">
        <div className="file-item">
          <span>files.name</span>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </div>

        <p>No files uploaded yet.</p>
      </div>
    </div>
  );
};

// export default AgGridComponent;

export default FileWindow;
