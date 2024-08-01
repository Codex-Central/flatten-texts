import { isJsonString, splitMessage } from "../helper/index.helper";
import {
  IFlattenText,
  IFlattenTexts,
  IMessage,
  IMessageResponse,
} from "../types/index.types";

/**
 * This function receives a string and returns an array of objects with the text property.
 * Also, splits the string by double line breaks.
 * @param content
 *
 * @example
 * const messageResponse: IFlattenText<CustomMessage[]> = {
 *  content: '[{"id": "1", "text": "Hola"}, {"id": "2", "text": "Mundo"}]',
 * };
 *
 * const messages = flattenText<CustomMessage>(messageResponse);
 * console.log(messages);
 *
 * @result
 * ```json
 * [
 *    { "text": { id: "1", "text": "Hola" } },
 *    { "text": { id: "2", "text": "Mundo" } }
 * ]
 * ```
 *
 * @example
 * const messageResponse: IFlattenText<string> = {
 *  content: "Hello World",
 * };
 *
 * const messages = flattenText<string>(messageResponse);
 * console.log(messages);
 *
 * @result
 * ```json
 * [
 *    { "text": "Hello World" }
 * ]
 * ```
 */
export const flattenText = <T>({
  content,
}: IFlattenText<T>): IFlattenTexts<T>[] => {
  // Check if the content is a JSON string
  if (isJsonString(content)) {
    const parsedContent: T[] = JSON.parse(content);
    return parsedContent.map((item) => ({
      text: item,
    }));
  }

  const splitContent = splitMessage(content);
  return splitContent.map((item) => ({
    text: item as unknown as T,
  }));
};

/**
 * This function receives an array of messages and returns an array of messages with the who property.
 * Also, splits the message content by double line breaks.
 *
 * @result
 * ```json
 * [
 *  { "id": "1", "message": "Hello", "who": "me", "type": "history", "printed": true },
 *  { "id": "2", "message": "World", "who": "bot", "type": "history", "printed": true }
 * ]
 * ```
 */
export const flattenMessages = (messages: IMessageResponse[]): IMessage[] => {
  return messages.flatMap((message) => {
    const idBase = message.message_id ? message.message_id : Date.now();
    const who = message.role === "user" ? "me" : "bot";

    const content = message.content;
    if (isJsonString(content)) {
      const parsedContent = JSON.parse(content);
      return parsedContent.map((item: string, subIndex: number) => ({
        id: idBase + subIndex.toString(),
        message: item,
        who,
        type: "history",
        printed: true,
      }));
    }

    // Splitting the message content by double newlines if it is not JSON
    const splitContent = splitMessage(content);
    return splitContent.map((item, subIndex) => ({
      id: `${idBase}-${subIndex}`,
      message: item,
      who,
      type: "history",
      printed: true,
    }));
  });
};
