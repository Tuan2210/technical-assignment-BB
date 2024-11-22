import ProductList from "./components/ui/ProductList";

function App() {

  return (
    <div className="grid place-items-center gap-4">
      <p className="text-4xl text-orange-500 font-bold">Infinite Scrolling and Searchable Product List</p>
      <ProductList />
    </div>
  )
}

export default App
