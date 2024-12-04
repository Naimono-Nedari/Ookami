import { useState } from "react";

export default function App() {
  const [currentItems, setCurrentItems] = useState([]);

  function handleAddItems(x) {
    setCurrentItems((currentItems) => [...currentItems, x]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList currentItemsList={currentItems} />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1>🏝️ Far Away 💼 </h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <QuantitySelector quantity={quantity} onChange={setQuantity} />
      <DescriptionInput description={description} onChange={setDescription} />
      <button>Add</button>
    </form>
  );
}

function QuantitySelector({ quantity, onChange }) {
  return (
    <select value={quantity} onChange={(e) => onChange(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((m) => (
        <option value={m} key={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

function DescriptionInput({ description, onChange }) {
  return (
    <input
      type="text"
      placeholder="Item..."
      value={description}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function PackingList({ currentItemsList }) {
  return (
    <div className="list">
      <ul>
        {currentItemsList.map((m) => (
          <Item singleItemData={m} key={m.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ singleItemData }) {
  return (
    <li>
      <span
        style={singleItemData.packed ? { textDecoration: "line-through" } : {}}
      >
        {singleItemData.quantity} {singleItemData.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
