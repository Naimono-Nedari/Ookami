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

  function handleTogglePackedItems(id) {
    console.log(id);
    setCurrentItems((currentItems) =>
      currentItems.map((x) => (x.id === id ? { ...x, packed: !x.packed } : x))
    );
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) {
      setCurrentItems((currentItems) => []);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        currentItemsList={currentItems}
        onDeleteItems={handleDeleteItems}
        onPackedItems={handleTogglePackedItems}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats currentItemsList={currentItems} />
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

function PackingList({
  currentItemsList,
  onDeleteItems,
  onPackedItems,
  onDeleteAllItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") {
    sortedItems = currentItemsList;
  } else if (sortBy === "description") {
    sortedItems = currentItemsList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems = currentItemsList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ItemList
        sortedItems={sortedItems}
        onDeleteItems={onDeleteItems}
        onPackedItems={onPackedItems}
      />
      <ListActions
        sortBy={sortBy}
        setSortBy={setSortBy}
        onDeleteAllItems={onDeleteAllItems}
      />
    </div>
  );
}

function ItemList({ sortedItems, onDeleteItems, onPackedItems }) {
  return (
    <ul>
      {sortedItems.map((m) => (
        <Item
          singleItemData={m}
          key={m.id}
          onDeleteItems={onDeleteItems}
          onPackedItems={onPackedItems}
        />
      ))}
    </ul>
  );
}

function ListActions({ sortBy, setSortBy, onDeleteAllItems }) {
  return (
    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description order</option>
        <option value="packed">Sort by packed order</option>
      </select>
      <button onClick={() => onDeleteAllItems()}>Clear list</button>
    </div>
  );
}

function Item({ singleItemData, onDeleteItems, onPackedItems }) {
  return (
    <li>
      <input
        type="checkbox"
        packed={singleItemData.packed}
        onClick={() => onPackedItems(singleItemData.id)}
      />
      <span
        style={singleItemData.packed ? { textDecoration: "line-through" } : {}}
      >
        {singleItemData.quantity} {singleItemData.description}
      </span>
      <button onClick={() => onDeleteItems(singleItemData.id)}>❌</button>
    </li>
  );
}

function Stats({ currentItemsList }) {
  const currentItemsNum = currentItemsList.length;
  const currentItemsPackedNum = currentItemsList.filter((x) => x.packed).length;
  const currentItemsPackedPercent =
    currentItemsNum > 0
      ? Math.round((currentItemsPackedNum / currentItemsNum) * 100)
      : 0;
  const hasItems = currentItemsNum > 0;

  return (
    <footer className="stats">
      {hasItems ? (
        <em>
          💼 You have {currentItemsNum} items on your list, and you already
          packed {currentItemsPackedNum} ({currentItemsPackedPercent} %)
        </em>
      ) : (
        <em>Add items...</em>
      )}
    </footer>
  );
}
