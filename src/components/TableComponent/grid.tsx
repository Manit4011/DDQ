import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import "./grid.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import UserLogo from "../../assets/icons/user-logo.svg";
import ExportIcon from "../../assets/icons/export-icon.svg";
import ExpandIcon from "../../assets/icons/expand-icon.svg";
import Tooltip from "@mui/material/Tooltip";

interface GridProps {
  gridData: any;
}
const Grid: React.FC<GridProps> = ({ gridData }) => {
  useEffect(() => {
    console.log("inside grid---", gridData);
  }, []);
  const columns: GridColDef[] = [
    { field: "sno", headerName: "S.No.", minWidth: 50, flex: 0.5 },
    { field: "questions", headerName: "Questions", flex: 1 },
    { field: "answers", headerName: "Answers", flex: 1.5 },
    { field: "metadata", headerName: "Metadata", flex: 1 },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      sno: 1,
      questions: "When was the company founded?",
      answers: "Gemini Solutions was founded in 2012.",
      metadata: "Lorem Ipsum",
    },
    {
      id: 2,
      sno: 2,
      questions: "Can you provide the financial statements?",
      answers:
        "Bill Gates was the company's long-time CEO and is still associated with Microsoft through his foundation, the Bill & Melinda Gates Foundation.",
      metadata: "Lorem Ipsum",
    },
    {
      id: 3,
      sno: 3,
      questions: "Lorem Ipsum is simply dummy text.",
      answers: "Satya Nadella became CEO in 2014",
      metadata: "Lorem Ipsum",
    },
    {
      id: 4,
      sno: 4,
      questions: "Acquisitions",
      answers:
        "Microsoft is heavily involved in the gaming industry through Xbox and the acquisition of major game studios.",
      metadata: "Lorem Ipsum",
    },
    {
      id: 5,
      sno: 5,
      questions: "When was the company founded?",
      answers: "Gemini Solutions was founded in 2012.",
      metadata: "Lorem Ipsum",
    },
  ];

  return (
    <React.Fragment>
      <div className="grid-container">
        <div className="grid-container-heading">
          <div className="align-items-center">
            <img src={UserLogo} alt="" />
            <span className="table-heading">Uploaded Table</span>
          </div>
          <div className="grid-header-options cursor-pointer">
            <Tooltip title="Export" placement="bottom">
              <img src={ExportIcon} alt="export" />
            </Tooltip>
            <div className="align-items-center cursor-pointer">
              <Tooltip title="Expand" placement="bottom">
                <img src={ExpandIcon} alt="expand" />
              </Tooltip>
              <div className="expand-text">Expand Screen</div>
            </div>
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          getRowHeight={() => "auto"}
          className="ddq-grids"
          rowSelection={false}
          slotProps={{
            pagination: {
              labelDisplayedRows: ({ count }) => `${count} records`,
            },
          }}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              fontSize: "1rem",
              fontWeight: "400",
              color: "#ffffffe6",
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#444457 !important",
              color: "#ffffffe6",
              fontSize: "1rem",
              fontWeight: "400",
            },
            "& .MuiTablePagination-root": {
              color: "#ffffffe6",
            },
            "& .MuiPaginationItem-root": {
              color: "#ffffffe6",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Grid;
