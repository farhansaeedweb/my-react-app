function CounterButtons({ count, setCount }) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        onClick={() => setCount(count + 1)}
        className="bg-green-600 text-white px-8 py-3 rounded-lg text-2xl hover:bg-green-700">
        +
      </button>

      <button
        onClick={() => setCount(count - 1)}
        disabled={count === 0}
        className="bg-red-500 text-white px-8 py-3 rounded-lg text-2xl hover:bg-red-600 disabled:opacity-50">
        -
      </button>

      <button
        onClick={() => setCount(0)}
        className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800">
        Reset
      </button>
    </div>
  );
}

export default CounterButtons;
