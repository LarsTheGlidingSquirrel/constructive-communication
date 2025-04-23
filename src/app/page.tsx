import Analysis from "@/components/Analysis";
import Image from "next/image";
import bundestagSvg from "./bundestag.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch gap-10">
      <div>
        <div className="text-accent-dark text-center text-lg">Hey OpenAI,</div>
        <h2 className="text-accent-dark text-center text-3xl">
          Wie konstruktiv war die Kommunikation im Bundestag?
        </h2>
      </div>
      <div>
        <span>
          Dies ist ein Experiment, um herauszufinden, ob KI uns dabei
          unterstützen kann auf eine konstruktivere Art und Weise miteinander zu
          kommunizieren.{" "}
        </span>
        <a
          href="https://github.com/LarsTheGlidingSquirrel/constructive-communication"
          target="_blank"
          className="text-accent-dark underline"
        >
          Mehr erfahren
        </a>
      </div>
      {/* Background image */}
      <div className="relative h-0 w-full">
        <Image
          className="absolute top-0 z-[-100] w-full"
          src={bundestagSvg}
          alt="Bundestag"
          unoptimized
        />
      </div>

      <div className="w-full">
        <Analysis />
      </div>
    </div>
  );
}
