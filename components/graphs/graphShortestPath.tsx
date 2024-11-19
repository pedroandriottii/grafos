import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShortestPathProps {
  nodes: { id: string }[]
  findPath: (start: string, end: string) => { cost: number; path: string[] }
}

export const ShortestPath: React.FC<ShortestPathProps> = ({ nodes, findPath }) => {
  const [startVertex, setStartVertex] = useState<string | null>(null)
  const [endVertex, setEndVertex] = useState<string | null>(null)
  const [result, setResult] = useState<{ cost: number; path: string[] } | null>(null)

  const handleFindPath = () => {
    if (startVertex && endVertex) {
      setResult(findPath(startVertex, endVertex))
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Caminho Mais Curto</h2>
      <div className="grid grid-cols-2 gap-4">
        <Select onValueChange={setStartVertex} value={startVertex || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Vértice de Início" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map(node => (
              <SelectItem key={node.id} value={node.id}>
                {node.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setEndVertex} value={endVertex || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Vértice de Fim" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map(node => (
              <SelectItem key={node.id} value={node.id}>
                {node.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleFindPath}
        disabled={!startVertex || !endVertex}
      >
        Encontrar Caminho
      </button>

      {result && (
        <div className="mt-4">
          <p><strong>Custo do Caminho:</strong> {result.cost === Infinity ? 'Infinito (Sem Caminho)' : result.cost}</p>
          <p><strong>Caminho:</strong> {result.path.length === 0 ? 'Nenhum' : result.path.join(' → ')}</p>
        </div>
      )}
    </div>
  )
}
