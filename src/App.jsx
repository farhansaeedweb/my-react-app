// function App() {
//   // let count = 0;
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment Value</button>
//     </>
//   );
// }

// function App() {
//   const [name, setName] = useState(0);
//   return (
//     <>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <h2>Hello {name}</h2>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaUndo,
  FaMosque,
  FaStar,
  FaHeart,
  FaTrash,
  FaMoon,
} from "react-icons/fa";

function App() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [history, setHistory] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Load saved history
  useEffect(() => {
    const savedHistory = localStorage.getItem("tasbeehHistory");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("tasbeehHistory", JSON.stringify(history));
  }, [history]);

  // Target reached
  useEffect(() => {
    if (count === target && target > 0) {
      setIsComplete(true);

      const newRecord = {
        count: count,
        target: target,
        time: new Date().toLocaleTimeString(),
      };

      setHistory((previousHistory) => [...previousHistory, newRecord]);
    }
  }, [count, target]);

  const handleIncrement = () => {
    if (count < target) {
      setCount(count + 1);
      setIsComplete(false);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setIsComplete(false);
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsComplete(false);
  };

  const handleTargetChange = (event) => {
    setTarget(Number(event.target.value));
    setCount(0);
    setIsComplete(false);
  };

  const selectPreset = (number) => {
    setTarget(number);
    setCount(0);
    setIsComplete(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const progress = target > 0 ? Math.round((count / target) * 100) : 0;

  const phrases = [
    "سُبْحَانَ اللَّهِ",
    "اَلْحَمْدُ لِلَّهِ",
    "اَللَّهُ أَكْبَرُ",
    "لَا إِلَٰهَ إِلَّا اللَّهُ",
    "أَسْتَغْفِرُ اللَّهَ",
  ];

  const currentPhrase = phrases[count % phrases.length];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950"
          : "bg-gradient-to-br from-emerald-50 via-white to-teal-50"
      } p-4 sm:p-8`}>
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-emerald-500/20 p-5 shadow-lg">
              <FaMosque className="text-5xl text-emerald-400" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <h1
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "text-emerald-900"
              }`}>
              Digital Tasbeeh
            </h1>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full bg-white/10 p-3 text-yellow-300 hover:bg-white/20">
              <FaMoon />
            </button>
          </div>

          <p
            className={`mt-2 ${
              darkMode ? "text-emerald-300" : "text-emerald-700"
            }`}>
            اذكار و تسبيح
          </p>
        </header>

        {/* Main Card */}
        <div
          className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
            darkMode
              ? "border-white/10 bg-white/10"
              : "border-emerald-100 bg-white/80"
          }`}>
          {/* Counter */}
          <div
            className={`rounded-2xl border p-8 text-center ${
              darkMode
                ? "border-white/10 bg-white/5"
                : "border-emerald-100 bg-emerald-50"
            }`}>
            <p
              className={`text-sm ${
                darkMode ? "text-white/50" : "text-gray-500"
              }`}>
              CURRENT COUNT
            </p>

            <h2
              className={`my-4 text-8xl font-bold ${
                darkMode ? "text-white" : "text-emerald-800"
              }`}>
              {count}
            </h2>

            <p
              className={`text-xl ${
                darkMode ? "text-emerald-300" : "text-emerald-700"
              }`}>
              {currentPhrase}
            </p>

            {/* Progress */}
            <div className="mt-6">
              <div
                className={`h-3 overflow-hidden rounded-full ${
                  darkMode ? "bg-white/10" : "bg-emerald-100"
                }`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-xs">
                <span className={darkMode ? "text-white/40" : "text-gray-500"}>
                  0
                </span>

                <span
                  className={
                    darkMode ? "text-emerald-300" : "text-emerald-700"
                  }>
                  {progress}%
                </span>

                <span className={darkMode ? "text-white/40" : "text-gray-500"}>
                  {target}
                </span>
              </div>
            </div>
          </div>

          {/* Target */}
          <div className="mt-6">
            <label
              className={`mb-2 block text-sm ${
                darkMode ? "text-white/60" : "text-gray-600"
              }`}>
              Target Count
            </label>

            <select
              value={target}
              onChange={handleTargetChange}
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-emerald-400 ${
                darkMode
                  ? "border-white/10 bg-white/10 text-white"
                  : "border-gray-200 bg-white text-gray-800"
              }`}>
              <option value="33">33 - Standard</option>
              <option value="34">34</option>
              <option value="99">99 - Names</option>
              <option value="100">100</option>
              <option value="1000">1000</option>
            </select>
          </div>

          {/* Main Buttons */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={handleDecrement}
              disabled={count === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/20 py-4 text-white transition hover:bg-red-500/40 disabled:cursor-not-allowed disabled:opacity-30">
              <FaMinus />
              <span>Minus</span>
            </button>

            <button
              onClick={handleIncrement}
              disabled={count === target}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/40 py-4 text-white transition hover:bg-emerald-500/60 disabled:cursor-not-allowed disabled:opacity-30">
              <FaPlus />
              <span>Count</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-500/20 py-4 text-white transition hover:bg-yellow-500/40">
              <FaUndo />
              <span>Reset</span>
            </button>
          </div>

          {/* Completion */}
          {isComplete && (
            <div className="mt-6 animate-pulse rounded-xl border border-emerald-400/30 bg-emerald-500/20 p-4 text-center">
              <FaStar className="mr-2 inline text-yellow-400" />

              <span className="font-semibold text-white">
                Masha'Allah! Target {target} reached!
              </span>

              <FaStar className="ml-2 inline text-yellow-400" />
            </div>
          )}

          {/* Presets */}
          <div className="mt-6">
            <p
              className={`mb-3 text-sm ${
                darkMode ? "text-white/50" : "text-gray-500"
              }`}>
              Quick Targets
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 25, 50].map((number) => (
                <button
                  key={number}
                  onClick={() => selectPreset(number)}
                  className={`rounded-lg border py-2 text-sm transition ${
                    darkMode
                      ? "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-emerald-50"
                  }`}>
                  {number}
                </button>
              ))}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="mt-8 border-t border-white/10 pt-5">
              <div className="mb-3 flex items-center justify-between">
                <h3
                  className={`flex items-center gap-2 font-medium ${
                    darkMode ? "text-white/70" : "text-gray-700"
                  }`}>
                  <FaHeart className="text-emerald-400" />
                  History
                </h3>

                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                  <FaTrash />
                  Clear
                </button>
              </div>

              <div className="max-h-40 space-y-2 overflow-y-auto">
                {history
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between rounded-lg px-4 py-3 text-sm ${
                        darkMode ? "bg-white/5" : "bg-emerald-50"
                      }`}>
                      <span
                        className={
                          darkMode ? "text-white/70" : "text-gray-700"
                        }>
                        {item.count} / {item.target}
                      </span>

                      <span
                        className={
                          darkMode ? "text-white/40" : "text-gray-500"
                        }>
                        {item.time}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer
          className={`mt-6 text-center text-sm ${
            darkMode ? "text-white/30" : "text-gray-500"
          }`}>
          🤲 May Allah accept your Dhikr
        </footer>
      </div>
    </div>
  );
}

export default App;
