import BotCommand from './BotCommand';
import BotEvent from './BotEvent';
import BotConfig from './BotConfig';

export default interface BotStorage {
  commands?: Array<BotCommand>;
  events?: Array<BotEvent>;
  config?: BotConfig;
}
