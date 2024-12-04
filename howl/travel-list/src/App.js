import { useState } from "react";

export default function App() {
  const [currentItems, setCurrentItems] = useState([]);

  function handleAddItems(x) {
    setCurrentItems((currentItems) => [...currentItems, x]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setCurrentItems((currentItems) => currentItems.filter((x) => x.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        currentItemsList={currentItems}
        onDeleteItems={handleDeleteItems}
      />
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
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
      <button>Add</button>
    </form>
  );
}

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <select
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
    >
      {Array.from({ length: 20 }, (_, i) => i + 1).map((m) => (
        <option value={m} key={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

function DescriptionInput({ description, setDescription }) {
  return (
    <input
      type="text"
      placeholder="Item..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  );
}

function PackingList({ currentItemsList, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {currentItemsList.map((m) => (
          <Item singleItemData={m} key={m.id} onDeleteItems={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}

function Item({ singleItemData, onDeleteItems }) {
  return (
    <li>
      <span
        style={singleItemData.packed ? { textDecoration: "line-through" } : {}}
      >
        {singleItemData.quantity} {singleItemData.description}
      </span>
      <button onClick={() => onDeleteItems(singleItemData.id)}>❌</button>
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
