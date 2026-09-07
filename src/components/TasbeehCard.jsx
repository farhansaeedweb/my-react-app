function TasbeehCard({ count }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">

      <p className="text-gray-500 text-lg">
        Current Count
      </p>

      <h2 className="text-7xl font-bold text-green-700 my-6">
        {count}
      </h2>

      <div className="bg-green-50 rounded-lg p-4">
        <p className="text-green-700">
          Keep going 🤲
        </p>
      </div>

    </div>
  );
}

export default TasbeehCard;