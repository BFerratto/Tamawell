import { useState } from 'react';

function App() {
  const [sleep, setSleep] = useState('');
  const [meals, setMeals] = useState('');
  const [water, setWater] = useState('');
  const [mood, setMood] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/update-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sleep_hours: parseFloat(sleep),
        meals: parseInt(meals),
        water_ml: parseInt(water),
      }),
    });
    const data = await res.json();
    setMood(data.mood);
  };

  const moodEmoji = {
    happy: '🥳',
    neutral: '😐',
    sad: '😢',
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tamawell Mood Tracker</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          placeholder="Hours of sleep"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Number of meals"
          value={meals}
          onChange={(e) => setMeals(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Water intake (ml)"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Tamawell
        </button>
      </form>
      {mood && (
        <div className="mt-4 text-center text-4xl">
          Mood: {moodEmoji[mood] || '❓'}
        </div>
      )}
    </div>
  );
}

export default App;
