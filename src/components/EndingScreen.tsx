import React from "react";

const EndingScreen = () => {
  const params = new URLSearchParams(window.location.search);
  const won = params.get("status") === "success";

  return (
    <div className="w-full h-full p-6">
      <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
        {won ? (
          <p className="text-4xl text-white font-semibold text-center">
            You did it!
          </p>
        ) : (
          <div>
            <p className="text-4xl text-white font-semibold text-center">
              Oops you didn't find them all
            </p>
          </div>
        )}
        <a
          className="w-full hover:animate-bounce bg-yellow-400 px-6 py-4 text-3xl md:text-5xl font-semibold rounded-2xl text-white text-center"
          href="/board?origin=start"
        >
          PLAY AGAIN
        </a>
      </div>
    </div>
  );
};

export default EndingScreen;
