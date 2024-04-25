import { IFlattenText, IFlattenTexts } from "../types/index.types";

/**
 * This function receives a string and returns an array of objects with the text property.
 * Also, splits the string by double line breaks.
 * @param content
 *
 * @example
 * const messageResponse: IFlattenText<CustomMessage[]> = {
 *  content: '[{"id": 1, "text": "Hola"}, {"id": 2, "text": "Mundo"}]',
 * };
 *
 * const messages = flattenText<CustomMessage>(messageResponse);
 * console.log(messages);
 *
 * // Output:
 * // [
 * //   { text: { id: 1, text: "Hola" } },
 * //   { text: { id: 2, text: "Mundo" } }
 * // ]
 *
 * @example
 * const messageResponse: IFlattenText<string> = {
 *  content: "Hello World",
 * };
 *
 * const messages = flattenText<string>(messageResponse);
 * console.log(messages);
 *
 * // Output:
 * // [
 * //   { text: "Hello World" }
 * // ]
 */
function flattenText<T>({ content }: IFlattenText<T>): IFlattenTexts<T>[] {
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
}

const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

const splitMessage = (message: string): string[] => {
  return message.split("\n\n");
};

export default flattenText;
