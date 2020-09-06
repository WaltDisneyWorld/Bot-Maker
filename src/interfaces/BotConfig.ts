export default interface BotConfig {
  avatar?: string;
  description?: string;
  owners?: Array<string>;
  token?: string;
  prefix?: string;
  caseSensitive?: boolean;
  intents?: Array<string>;
}
