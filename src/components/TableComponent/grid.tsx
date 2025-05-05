import React, { useMemo, useState } from "react";
import "./grid.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UserLogo from "../../assets/icons/user-logo.svg";
import ExportIcon from "../../assets/icons/export-icon.svg";
import ExpandIcon from "../../assets/icons/expand-icon.svg";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { selectMessages } from "../../features/messagesSlice/selector";
import * as XLSX from "xlsx";
import { ICON_ALTS, PLACEHOLDER_TEXT } from "../../constants/constant";
import chatSubmit from "../../assets/icons/chat-submit-icon.svg";
import SplitScreen from "../../assets/icons/split-icon.svg";
import { selectpage } from "../../features/chatSlice/selector";
import { setPageSize } from "../../features/chatSlice";
import { ChatbotResponseData } from "../../types/interface";

const Grid: React.FC = () => {
  const globalMessages = useSelector(selectMessages);
  const [input, setInput] = useState<string>("");
  const gridSize = useSelector(selectpage);
  const dispatch = useDispatch();
  const formattedData = useMemo(() => {
    const rawData = globalMessages?.gridData as ChatbotResponseData | undefined;

    if (!rawData) return [];

    const rowCount = Object.keys(rawData.Question || {}).length;

    return Array.from({ length: rowCount }, (_, index) => {
      const key = index.toString();
      const question = rawData.Question?.[key] || "N/A";
      const answer = rawData.Answer_1?.[key] || "N/A";
      const confidence = rawData.Confidence_1?.[key] || "N/A";
      const referenceStatement = rawData.Reference_statement_1?.[key] || "N/A";
      const references = rawData.References_1?.[key] || "N/A";

      return {
        id: index,
        sno: index + 1,
        question,
        answerText: `• ${answer}`,
        confidence,
        referenceStatement: `• ${referenceStatement}`,
        references: `• ${references}`,
      };
    });
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
      field: "confidence",
      headerName: "Confidence",
      flex: 1,
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

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Uploaded Table");
    XLSX.writeFile(workbook, "Uploaded_Table.xlsx");
  };
  const handleSend = async () => {
    // if (input.trim() !== "") {
    //   dispatch(setTime({ lastModifiedTime: formatDateTime(new Date()) }));
    //   if (!isChatStarted) setIsChatStarted(true);
    // if(chat.size === 'expanded' && globalMessages.gridData){
    //         dispatch(setPageSize('split'));
    //       }
    //   const userMessage: Message = { text: input, sender: "user" };
    //   const updatedMessages = [...globalMessages.messages, userMessage];
    //   dispatch(addGlobalMessages(updatedMessages));
    //   setInput("");
    //   const data = {
    //     user_id: user.user_id,
    //     conv_id: "",
    //     prompt: input,
    //   };
    //   setLoading(true);
    //   postChat(data)
    //     .then((res) => {
    //       const botAnswer = res.response[0]?.answer;
    //       let botMessage: Message;
    //       if (res.response.length === 1) {
    //         if (botAnswer) {
    //           botMessage = { text: botAnswer, sender: "bot" };
    //         } else {
    //           botMessage = { text: NO_INFO, sender: "bot" };
    //         }
    //         const finalMessages = [...updatedMessages, botMessage];
    //         dispatch(addGlobalMessages(finalMessages));
    //       } else {
    //         generateBotOptions(res.response);
    //       }
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching chat response:", error);
    //       setLoading(false);
    //     });
    // }
  };
  const handleSplitClick = () =>{
    if(gridSize.size === 'expanded'){
      dispatch(setPageSize('split'));
    }else{
      dispatch(setPageSize('expanded'));
    }
  }
  return (
    <>
      <div className="grid-container">
        <div className="grid-container-heading">
          <div className="align-items-center">
            <img src={UserLogo} alt="userlogo" />
            <span className="table-heading">Uploaded Table</span>
          </div>
          <div className="grid-header-options cursor-pointer">
            <Tooltip title="Export" placement="bottom">
              <img
                src={ExportIcon}
                alt="export"
                onClick={handleExportToExcel}
              />
            </Tooltip>
            {gridSize.size === 'expanded' ? (
              <div className="align-items-center cursor-pointer" onClick={handleSplitClick}>
                <Tooltip title="Split Screen" placement="bottom">
                  <img src={SplitScreen} alt="spilt" />
                </Tooltip>
                <div className="expand-text">Split Screen</div>
              </div>
            ) : (
              <div className="align-items-center cursor-pointer" onClick={handleSplitClick}>
                <Tooltip title="Expand" placement="bottom">
                  <img src={ExpandIcon} alt="expand" />
                </Tooltip>
                <div className="expand-text">Expand Screen</div>
              </div>
            )}
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
        {globalMessages.messages.length === 0 && gridSize.size ===  'expanded'  && (
          <div className="chatbot-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={PLACEHOLDER_TEXT}
              className="chatbot-input-field"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={input.trim() === "" || input.length < 3}
              className="chat-submit"
            >
              <img src={chatSubmit} alt={ICON_ALTS.send} height={34} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Grid;
