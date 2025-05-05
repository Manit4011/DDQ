export interface ChatApiResponse {
  conv_id: string;
  options: ChatResponse;
  status: string;
}

export interface ChatResponse {
  answer: string;
  metadata: Metadata[];
  references: Reference[];
  confidence: number;
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

  export interface FileUploadResponse {
    file_id: string;
    message: string;
    s3_filename: string;
    status: string;
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
  export interface ChatbotApiResponse {
    data?: ChatbotResponseData;
    status?: string;
  }
  
  export interface ChatbotResponseData {
    Answer_1: Record<string, string>;
    Confidence_1: Record<string,string>;
    Question: Record<string, string>;
    Reference_statement_1: Record<string, string>;
    References_1: Record<string, string>;
    Status: string;
  }

  export interface UploadResponse {
    filename: string;
    message: string;
    status: "success" | "error";
    task_id: string;
  }
  export interface UploadPollingItem {
    task_id: string;
    status: "processing" | "completed" | "failed";
    ObjectId?: string[];
  }
  export interface UploadPollingResponse {
    data: UploadPollingItem[];
  }