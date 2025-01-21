export type PageEnum = 'chat' | 'file';

export interface ChatState {
    page: PageEnum,
    chatName: string;
}