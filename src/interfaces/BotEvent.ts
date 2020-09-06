export default interface BotEvent {
  name?: string;
  type?: string;
  outputs?: Array<string>;
  actions?: Array<{
    name: string;
    fields: Array<{
      id: string;
      value: string;
    }>;
  }>;
}
