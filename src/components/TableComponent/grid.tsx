import React, { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@mui/material";
import "./grid.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import UserLogo from "../../assets/icons/user-logo.svg";
import ExportIcon from "../../assets/icons/export-icon.svg";
import ExpandIcon from "../../assets/icons/expand-icon.svg";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { selectMessages } from "../../features/messagesSlice/selector";

const Grid: React.FC = () => {
  const globalMessages = useSelector(selectMessages);
  const formattedData = useMemo(() => {
    return globalMessages.gridData.map((item: any, index: number) => {
      const answers = [item.Answer_1, item.Answer_2]
        .filter((answer) => answer)
        .map((answer) => `• ${answer}`)
        .join("\n");
  
      const referenceStatements = [item.Reference_statement_1, item.Reference_statement_2]
        .filter((statement) => statement)
        .map((statement) => `• ${statement}`)
        .join("\n");
  
      const references = [item.References_1, item.References_2]
        .filter((reference) => reference) // Remove null or undefined references
        .map((reference) => `• ${reference}`) // Format references as bullet points
        .join("\n"); // Join with a newline for display
  
      return {
        id: index,
        sno: index + 1,
        question: item.question,
        answerText: answers || "N/A",
        referenceStatement: referenceStatements || "N/A",
        references: references || "N/A",
      };
    });
  }, [globalMessages.gridData]);
  

  useEffect(() => {
    console.log('inside use eff-', globalMessages.gridData);
  }, [globalMessages.gridData]); 

  const columns: GridColDef[] = [
    { field: "sno", headerName: "S.No.", width: 100 },
    { field: "question", headerName: "Question", flex: 1 },
    {
      field: "answerText",
      headerName: "Answer",
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-line" }}>{params.value}</div>
      ),
    },
    {
      field: "referenceStatement",
      headerName: "Reference Statement",
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-line" }}>{params.value}</div>
      ),
    },
    {
      field: "references",
      headerName: "References",
      flex: 1.5,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-line" }}>{params.value}</div>
      ), // Render cell with line breaks
    },
  ];

  return (
    <>
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
          rows={formattedData}
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
              whiteSpace: "pre-line", // Preserve line breaks for bullet points
              wordWrap: "break-word", // Ensure long words wrap properly
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
    </>
  );
};

export default Grid;
