export type PageEnum = 'chat' | 'file';

export interface ChatNameState {
    page: PageEnum,
    chatName: string;
}