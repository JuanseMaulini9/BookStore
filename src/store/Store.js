import { createContext, useContext, useEffect, useState } from "react";

//Crea el contexto
const AppContext = createContext({
  items: [],
  createItem: (item) => {},
  getItem: (id) => {},
  updateItem: (item) => {},
});

//define el Store
export default function Store({ children }) {
  const [items, setItems] = useState([]);

  function createItem(item) {
    const temp = [...items];
    temp.push(item);

    setItems(temp);
  }

  function getItem(id) {
    const item = items.find((item) => item.id === id);

    return item;
  }

  function updateItem(item) {
    const index = items.findIndex((i) => i.item === item.id);
    const temp = [...item];

    temp[index] = { ...item };
  }
  return (
    <AppContext.Provider
      value={{
        items,
        createItem,
        getItem,
        updateItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//Exporta el contexto
export function useAppContext() {
  return useContext(AppContext);
}
