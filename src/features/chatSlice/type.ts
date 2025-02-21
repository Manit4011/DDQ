export type PageEnum = 'chat' | 'file';
export type SizeEnum = 'expanded' | 'split' | 'collapsed';

export interface ChatState {
    page: PageEnum,
    chatName: string;
    size: SizeEnum;
}