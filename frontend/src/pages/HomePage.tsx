import { useEffect, useState } from "react";
import { Stream } from "../interfaces/stream.interface";
import { getStreams } from "../services/homepage.service";

export const HomePage = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  useEffect(() => {
    (async () => {
      const response = await getStreams();
      setStreams(response);
    })();
  }, []);
  return (
    <div className="md:px-44 p-2 text-white bg-white dark:bg-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        {[
          ...streams.map((stream) => (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg"
              key={stream.id}
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{stream.title}</div>
                <p className="text-base text-white">
                  Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
                  sint cillum sint consectetur cupidatat.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #photography
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #travel
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #winter
                </span>
              </div>
            </div>
          )),
        ]}
      </div>
    </div>
  );
};
