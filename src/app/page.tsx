import Analysis from "@/components/Analysis";
import Image from "next/image";
import bundestagPng from "./bundestag.png";
import { Icon } from "@iconify/react";
export default function Home() {
  return (
    <div className="mt-10 flex flex-col items-stretch gap-20">
      <div className="">
        <div className="text-accent-dark text-center text-xl">Hey OpenAI,</div>
        <h2 className="text-accent-dark text-center text-4xl">
          Wie konstruktiv war die Kommunikation im Bundestag?
        </h2>
      </div>
      {/* <Image src={bundestagPng} alt="Bundestag" className="w-36" /> */}

      <div className="w-full">
        {/* Background image */}
        <div className="relative h-0 w-full">
          <Image
            className="absolute top-0 z-[-100] w-full"
            src={bundestagPng}
            alt="Bundestag"
            unoptimized
          />
        </div>
        <Analysis />
      </div>
      {/* <div className="flex flex-row justify-center text-4xl">
        <Icon icon="material-symbols:info-outline-rounded" />
      </div> */}

      <h2 className="text-accent-dark text-center text-4xl">
        Was passiert hier?
      </h2>
      <p>
        <span>
          Ein Modell von OpenAI schlüpft in die Rolle eines
          Kommunikationsexperten mit der Aufgabe, konstruktives Feedback zu
          Positiv- und Negativbeispielen aus den Redebeiträgen der Abgeordneten
          zu geben.{" "}
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
          <Icon icon="ri:openai-fill" className="w-full text-center text-5xl" />
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
        Dies ist ein Experiment, um herauszufinden, ob KI uns dabei unterstützen
        kann, auf eine konstruktivere Art und Weise miteinander zu
        kommunizieren.
      </p>

      {/* <h2 className="text-accent-dark text-center text-4xl">
        Wie kommuniziert man konstruktiv?
      </h2> */}
    </div>
  );
}
