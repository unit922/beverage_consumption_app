import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function OrderForm() {
  const [beverage, setBeverage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [region, setRegion] = useState('Caribbean');
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('beverage_orders').insert([
      { beverage, quantity, region }
    ]);

    if (error) {
      alert('Error saving order');
    } else {
      setAiSuggestion(`Suggested for ${region}: Try a refreshing local cocktail!`);
      setBeverage('');
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Beverage:</label>
        <input className="border p-1" value={beverage} onChange={(e) => setBeverage(e.target.value)} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" className="border p-1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
      </div>
      <div>
        <label>Region:</label>
        <select className="border p-1" value={region} onChange={(e) => setRegion(e.target.value)}>
          <option>Caribbean</option>
          <option>Europe</option>
          <option>Asia</option>
          <option>South America</option>
          <option>Africa</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit Order</button>

      {aiSuggestion && <p className="mt-4 text-green-600">{aiSuggestion}</p>}
    </form>
  );
}
