'use client';
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import TypingAnimation from "@/components/ui/typing-animation";
import WordRotate from "@/components/ui/word-rotate";


export default function Home() {
  return (
    <>
      <div className="container mx-auto w-full h-[calc(100vh-100px)] ">
        <div className="justify-center items-center h-full w-full flex flex-col">
          <div className="w-full max-w-6xl mt-10 px-8">
            <TypingAnimation
              className="text-3xl font-bold text-black dark:text-white"
              text="Where you want to go?"
            />
            <WordRotate
              className="text-3xl -mt-2 font-bold text-center text-black dark:text-white"
              words={["ISS", "DFSD", "AAA"]}
            />
            <Input className="bg-white mt-2"></Input>
          </div>
        </div>
        <FlickeringGrid
          className="-z-20 absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        {/* <World data={sampleArcs} globeConfig={globeConfig} /> */}
      </div>
    </>
  );
}
