import GraphInput from "./components/graphInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          Grafos
        </h1>
        <GraphInput />
      </div>
    </main>
  )
}