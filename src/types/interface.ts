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
    source: string;
  }
  