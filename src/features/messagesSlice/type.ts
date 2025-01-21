export interface MessageState {
    messages: Message[];
    gridData: any;
  }
  export interface Message {
    text: string;
    sender: "user" | "bot";
}