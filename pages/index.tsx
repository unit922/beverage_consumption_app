import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState("");

  const translations = {
    en: {
      title: "Beverage Consumption Tracker",
      inventory: "Inventory",
      add: "Add",
      placeholder: "New item name",
    },
    nl: {
      title: "Drankenverbruik Tracker",
      inventory: "Voorraad",
      add: "Toevoegen",
      placeholder: "Nieuwe item naam",
    },
    es: {
      title: "Seguimiento de Consumo de Bebidas",
      inventory: "Inventario",
      add: "Agregar",
      placeholder: "Nombre del nuevo ítem",
    },
  };

  const t = translations[language];

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("inventory").select("*");
    if (!error) setInventory(data);
    setLoading(false);
  };

  const addItem = async () => {
    if (!newItem) return;
    const { error } = await supabase.from("inventory").insert({ product_name: newItem });
    if (!error) {
      setNewItem("");
      fetchInventory();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border rounded p-1"
          >
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
            <option value="es">Español</option>
          </select>
        </header>

        <section className="bg-white p-4 rounded-2xl shadow space-y-4">
          <h2 className="text-xl font-semibold">{t.inventory}</h2>
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : (
            <ul className="space-y-2">
              {inventory.map((item) => (
                <li key={item.id} className="p-2 border rounded">
                  {item.product_name}
                </li>
              ))}
            </ul>
          )}

          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={t.placeholder}
              className="border p-2 flex-grow rounded"
            />
            <Button onClick={addItem}>{t.add}</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
