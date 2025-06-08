import { CardData } from "@/app/types/CardData";
import Card from "./Card";

export default function Cards({
  cards,
  isVisible,
}: {
  cards: CardData[];
  isVisible: boolean;
}) {
  return (
    <div
      className={`flex-column flex shrink-0 grow-0 basis-full flex-wrap content-stretch gap-x-7 transition-opacity duration-[1500ms] ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          topIcon={card.positiveOrNegativeFeedback}
          title={card.heading}
          explanation={card.explanation}
        />
      ))}
    </div>
  );
}
