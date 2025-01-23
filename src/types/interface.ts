export interface ChatApiResponse {
    conv_id: string;
    response: ChatResponse[];
    success: boolean;
  }
  
  export interface ChatResponse {
    answer: string;
    metadata: Metadata[];
    references: Reference[];
  }
  
  export interface Metadata {
    client_name: string;
    date: string;
    file_name: string;
    page_no: string;
    sheet_name: string;
  }
  
  export interface Reference {
    Statement: string;
    source: string | null;
  }
  export interface Message {
    text: string;
    sender: "user" | "bot";
  }
  export interface BotResponse {
    id: string;
    text: string;
  }

  export interface QuestionnaireResponse {
    conv_id: string;
    data: QuestionData[];
    response: string;
  }
  
  export interface QuestionData {
    question: string;
    answers: Answer[];
  }
  
  export interface Answer {
    answerText: string | null;
    referenceStatement: string | null;
    references: Reference[];
  }
  
  export interface Reference {
    statement: string | null;
    source: string | null;
    clientName: string | null;
    fileName: string | null;
    sheetName: string | null;
    pageNo: string | null;
    date: string | null;
  }