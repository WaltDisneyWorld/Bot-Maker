export default interface DBCBotCommand {
  name?: string;
  description?: string;
  aliases?: Array<string>;
  actions?: Array<{
    name: string;
    fields: Array<{
      id: string;
      value: string;
    }>;
  }>;
}
