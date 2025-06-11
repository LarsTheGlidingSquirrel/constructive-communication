import Analysis from "@/components/Analysis";
import Image from "next/image";
import bundestagSvg from "./bundestag.svg";
import talkingLeftSvg from "./talking_left.svg";
import talkingRightSvg from "./talking_right.svg";
import { Icon } from "@iconify/react";
import Card from "@/components/Card";
export default function Home() {
  return (
    <main className="grid grid-cols-[1fr_minmax(0,64rem)_1fr]">
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex flex-col gap-1 px-5 pt-20 pb-10">
        <div className="text-accent-dark text-center text-xl">Hey OpenAI,</div>
        <h2 className="text-accent-dark text-center text-4xl font-bold">
          Wie konstruktiv war die Kommunikation im Bundestag?
        </h2>
      </div>

      <div className="col-span-full row-start-2 row-end-3 flex flex-col items-center overflow-clip opacity-20">
        <div className="w-[clamp(60rem,100%,140rem)]">
          <Image src={bundestagSvg} alt="Bundestag" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="relative col-start-2 col-end-3 row-start-2 row-end-3 overflow-clip px-5 py-10">
        <Analysis />
      </div>

      <div className="col-start-2 col-end-3 row-start-3 row-end-4 flex flex-col gap-10 px-5 py-10">
        <h2 className="text-accent-dark text-center text-4xl">
          Was passiert hier?
        </h2>
        <p>
          <span>
            Ein Modell von OpenAI schlüpft in die Rolle eines
            Kommunikationsexperten mit der Aufgabe, konstruktives Feedback zu
            Positiv- und Negativbeispielen aus den Redebeiträgen der
            Abgeordneten zu geben.{" "}
          </span>
          <a
            href="https://github.com/LarsTheGlidingSquirrel/constructive-communication"
            target="_blank"
            className="text-accent-dark underline"
          >
            Mehr über die Implementierung
          </a>
        </p>
        <div className="flex flex-row justify-center gap-3">
          <div className="flex flex-col justify-center">
            <Icon
              icon="proicons:document"
              className="w-full text-center text-5xl"
            />
            <p>Protokoll</p>
          </div>
          <div className="flex flex-col justify-center">
            <Icon
              icon="material-symbols:arrow-right-rounded"
              className="w-full text-center text-5xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Icon
              icon="ri:openai-fill"
              className="w-full text-center text-5xl"
            />
            <p>OpenAI</p>
          </div>
          <div className="flex flex-col justify-center">
            <Icon
              icon="material-symbols:arrow-right-rounded"
              className="w-full text-center text-5xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Icon
              icon="ic:round-thumbs-up-down"
              className="w-full text-center text-5xl"
            />
            <p>Bewertung</p>
          </div>
        </div>

        <p>
          Dies ist ein Experiment, um herauszufinden, ob KI uns dabei
          unterstützen kann, auf eine konstruktivere Art und Weise miteinander
          zu kommunizieren.
        </p>
      </div>

      <div className="invisible col-span-full row-start-4 row-end-10 flex w-[min(100%,90rem)] flex-row justify-self-center overflow-clip opacity-20 lg:visible">
        <div className="mt-12 w-1/2 shrink-0 grow-0 pr-[28rem]">
          <Image
            src={talkingLeftSvg}
            alt="Bundestag"
            style={{ width: "100%" }}
          />
        </div>
        <div className="mt-12 w-1/2 shrink-0 grow-0 pl-[28rem]">
          <Image
            src={talkingRightSvg}
            alt="Bundestag"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="relative col-start-2 col-end-3 row-start-4 row-end-5 flex flex-col gap-10 px-5 py-10">
        <h2 className="text-accent-dark col-span-full row-start-4 row-end-5 text-center text-4xl">
          Wie kommuniziert man konstruktiv?
        </h2>
        <div className="flex flex-row flex-wrap gap-x-7">
          <Card
            title="Motivation"
            explanation="Bevor man sich in eine Diskussion begibt, sollte man sich bewusst machen, welches Ziel man damit verfolgt. Will ich meine Perspektive verteidigen oder andere Ansichten bzw. Personen ins Lächerliche ziehen, dann ist der Austausch wenig konstruktiv. Will ich allerdings die andere Perspektive besser verstehen oder gemeinsame Lösungen bzw. Kompromisse finden, legt man eine gute Basis für einen konstruktiven Austausch. Auch wenn am Ende kein Konsens entsteht, kann ein konstruktiver Dialog ein Mehrwert für beide Seiten sein."
            topIcon="info"
          />
          <Card
            title="Fokus auf die Sache"
            explanation="In Diskussionen ist es entscheidend, den Fokus auf das eigentliche Thema zu richten. Abschweifungen, persönliche Angriffe oder das Einbringen ideologischer Grundsatzfragen führen häufig vom Kern des Problems weg und erschweren eine konstruktive Lösung. Statt Emotionen oder Weltanschauungen sollten nachvollziehbare Argumente im Zentrum stehen."
            topIcon="info"
          />
          <Card
            title="Gegenseitiger Respekt"
            explanation="Gegenseitiger Respekt ist die Grundlage jeder konstruktiven Kommunikation. Respekt bedeutet, andere ausreden zu lassen, ihre Argumente ernst zu nehmen und sie nicht herabzuwürdigen – unabhängig davon, wie sehr man ihre Position ablehnt. Nur in einem respektvollen Klima fühlen sich alle Beteiligten sicher genug, offen zu sprechen und wirklich zuzuhören."
            topIcon="info"
          />
          <Card
            title="Verstehen der anderen Perspektive"
            explanation="Hat die gegenüberliegende Seiten eine andere Perspektive ist es wichtig aufmerksam zuzuhören, nachzufragen und sich in die Denkweise des Gegenübers hineinzuversetzen. Erst wenn man die Argumente und Beweggründe der anderen Seite nachvollzogen hat, kann man angemessen und differenziert darauf antworten. Dies schafft nicht nur ein Gefühl des Ernstgenommenwerdens, sondern verhindert auch Missverständnisse und vorschnelle Urteile."
            topIcon="info"
          />
        </div>
      </div>
      <div className="invisible col-start-2 col-end-3 row-start-5 row-end-6">
        <p>
          https://www.kommunikation-demokratie.de/fileadmin/user_upload/Gegen_Vergessen/Dokumente/Broschueren/konstruktiveKommunikation_2022-web.pdf
        </p>
        <p>https://www.youtube.com/watch?v=rBCBQfDQKbo</p>
      </div>
    </main>
  );
}
