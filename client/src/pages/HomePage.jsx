import React, { useEffect, useState } from "react";
import { IoMic } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Home = () => {
  const [input, setInput] = useState("");
  const { transcript, listening } = useSpeechRecognition();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const handleExtract = async () => {
    try {
      if (input !== "") {
        const response = await fetch("https://geolexa.onrender.com/extract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sentence: input }),
        });
        const { data } = await response.json();
        console.log(data);
        if (data !== null) setPlaces(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col p-10 min-h-screen w-full">
      <div className="text-center text-6xl font-bold text-white mx-auto mb-12">
        {" "}
        <span className=" text-purple-400">W</span>elcome to{" "}
        <span className=" text-purple-400">Geo</span>Lexa
      </div>
      <div className="text-3xl  text-white mx-auto mb-12">
        Your smart <span className=" text-purple-400">geospatial</span> querying
        assistant
      </div>

      <div className="mx-auto rounded-full overflow-hidden mb-12">
        <img src="/assets/bot.png" className="h-52 w-52" alt="logo" />
      </div>
      <div className=" mb-12 w-full h-full">
        <div className="mx-auto relative  w-2/3">
          <button
            onClick={() =>
              !listening
                ? SpeechRecognition.startListening({ continuous: true })
                : SpeechRecognition.stopListening()
            }
          >
            <IoMic className="text-purple-800 text-4xl absolute right-4 bottom-3" />
          </button>
          <textarea
            className="rounded-xl border-2 bg-purple-200 text-purple-900 font-semibold p-6 border-slate-500 active:outline-none focus:outline-none resize w-full h-full"
            onChange={(e) => setInput(e.target.value)}
            onFocus={(e) => (e.target.value = input)}
            placeholder="Type any sentence with names of places to explore ..."
            value={input}
          />
        </div>
      </div>
      <div className="mx-auto mb-12 flex">
        <button
          onClick={handleExtract}
          className="rounded-lg text-white text-2xl p-2 bg-gradient-to-tr from-purple-500 to-purple-950 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 me-12"
        >
          Extract Locations
        </button>

        {places.length !== 0 && (
          <button
            onClick={() => {
              setInput("");
              setPlaces([]);
            }}
            className="rounded-xl text-white text-2xl p-4 bg-gradient-to-tr from-red-500 to-red-950 hover:shadow-lg hover:shadow-purple-300 hover:scale-105 "
          >
            Reset
          </button>
        )}
      </div>
      {places.length !== 0 && (
        <div className="text-2xl text-center  w-full h-full flex flex-col mx-auto">
          <h1 className="text-4xl text-white font-bold mb-6"> Places </h1>
          <div className="flex text-white font-bold justify-between mb-6">
            <div className="w-1/3">Token</div>
            <div className="w-1/3">Canonical Name</div>
            <div className="w-1/3">Table</div>
          </div>
          {places.map((place) => {
            return (
              <div className="flex text-white font-bold justify-between mb-4">
                <div className="w-1/3">{place.token}</div>
                <div className="w-1/3">{place.canonical_name}</div>
                <div className="w-1/3">{place.table}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
