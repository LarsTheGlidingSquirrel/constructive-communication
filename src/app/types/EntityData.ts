import type { CardData } from "./CardData";

export interface EntityData {
  id: string;
  date: string;
  protocolUrl: string;
  cards: CardData[];
}
