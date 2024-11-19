import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdjacencyCheckProps {
  nodes: { id: string }[]
  checkAdjacency: (vertexA: string, vertexB: string) => boolean
}

export const AdjacencyCheck: React.FC<AdjacencyCheckProps> = ({ nodes, checkAdjacency }) => {
  const [vertexA, setVertexA] = useState<string | null>(null)
  const [vertexB, setVertexB] = useState<string | null>(null)
  const [areAdjacent, setAreAdjacent] = useState<boolean | null>(null)

  const handleCheck = () => {
    if (vertexA && vertexB) {
      setAreAdjacent(checkAdjacency(vertexA, vertexB))
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Verificar Adjacência</h2>
      <div className="grid grid-cols-2 gap-4">
        <Select onValueChange={setVertexA} value={vertexA || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Vértice A" />
          </SelectTrigger>
          <SelectContent>
            {nodes.map(node => (
              <SelectItem key={node.id} value={node.id}>
                {node.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setVertexB} value={vertexB || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Vértice B" />
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
        onClick={handleCheck}
        disabled={!vertexA || !vertexB}
      >
        Verificar
      </button>

      {areAdjacent !== null && (
        <p className="mt-4">
          <strong>Resultado:</strong>{' '}
          {areAdjacent ? 'Os vértices são adjacentes.' : 'Os vértices não são adjacentes.'}
        </p>
      )}
    </div>
  )
}
