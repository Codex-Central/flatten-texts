export interface IFlattenText<T> {
  content: string;
}

export interface IFlattenTexts<T> {
  text: T;
}

export interface IMessageResponse {
  role: string;
  content: string;
  message_id?: string;
  created?: string;
}

export interface IMessage {
  id: string;
  message: string;
  who: "bot" | "me";
  type: any;
  printed: boolean;
  timestamp: string;
}
