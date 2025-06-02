"use client";

import { useEffect, useState } from "react";
import Cards from "./Cards";
import { Icon } from "@iconify/react";
import { Button } from "./Button";
import { EntityData } from "@/app/types/EntityData";
import { CardData } from "@/app/types/CardData";

const cardStillLoading: CardData = {
  explanation: "",
  heading: "",
  positiveOrNegativeFeedback: "positive",
};

export default function Analysis() {
  const [entities, setEntities] = useState<EntityData[]>([
    {
      protocolUrl: "",
      cards: [
        cardStillLoading,
        cardStillLoading,
        cardStillLoading,
        cardStillLoading,
      ],
      date: "Loading",
      id: "",
    },
  ]);
  const [index, setIndex] = useState(0);

  // Fetch all entities
  useEffect(() => {
    const url = new URL(`${window.location.origin}/api/entity`);
    fetch(url)
      .then((response) => response.json())
      .then((entities) => {
        setEntities(entities);
        setIndex(entities.length - 1);
      });
  }, []);

  const date = entities.at(index)?.date;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-col items-center">
        <div>Sitzung am</div>
        <div className="flex flex-row items-center gap-5 text-xl">
          <Button
            onClick={() =>
              setIndex((previousIndex) => Math.max(previousIndex - 1, 0))
            }
            disabled={index === 0}
          >
            <Icon className="" icon="raphael:arrowleft" />
          </Button>
          <span
            className={`min-w-40 text-center ${date === "Loading" ? "animate-pulse" : ""}`}
          >
            {date}
          </span>
          <Button
            onClick={() =>
              setIndex((previousIndex) =>
                Math.min(previousIndex + 1, entities.length - 1),
              )
            }
            disabled={index === entities.length - 1}
          >
            <Icon className="" icon="raphael:arrowright" />
          </Button>
        </div>
        <div className="text-accent-dark flex flex-row gap-3 text-2xl">
          <a
            href={entities[index].protocolUrl}
            target="_blank"
            title="Protokoll"
          >
            <Icon className="hover:brightness-110" icon="proicons:document" />
          </a>
          {/* <a
            href={
              t.type({ videoUrl: t.string }).is(entities[index])
                ? entities[index].videoUrl
                : ""
            }
            target="_blank"
          >
            <Icon className="hover:brightness-110" icon="proicons:video-clip" />
          </a> */}
        </div>
      </div>
      <div
        className="flex w-full flex-row gap-[100%] transition-transform duration-700 ease-out"
        style={{ transform: `translateX(${-index * 2}00%)` }}
      >
        {entities.map((entity, i) => (
          <Cards key={i} cards={entity.cards} isVisible={index === i} />
        ))}
      </div>
    </div>
  );
}
