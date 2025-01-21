import { AuthState } from '../features/authSlice/type';
import { LastModified } from '../features/lastModifiedSlice/type';
import { UserState } from '../features/userInfo/type';
import { MessageState } from '../features/messagesSlice/type';
import { ChatState } from '../features/chatSlice/type';

export interface RootState {
  auth: AuthState;
  user: UserState;
  lastModified: LastModified;
  messages: MessageState;
  chat: ChatState;
  
  // Add other slices' state here if you have more reducers
}