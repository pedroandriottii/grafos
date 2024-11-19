import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AdjacencyProps {
  nodes: { id: string }[]
  getAdjacents: (vertexId: string) => { incoming: string[]; outgoing: string[] }
  getDegree: (vertexId: string) => { incoming: number; outgoing: number; total: number }
}

export const Adjacency: React.FC<AdjacencyProps> = ({ nodes, getAdjacents, getDegree }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [adjacents, setAdjacents] = useState<{ incoming: string[]; outgoing: string[] } | null>(null)
  const [degree, setDegree] = useState<{ incoming: number; outgoing: number; total: number } | null>(null)

  const handleNodeChange = (nodeId: string) => {
    setSelectedNode(nodeId)
    setAdjacents(getAdjacents(nodeId))
    setDegree(getDegree(nodeId))
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Adjacências e Grau</h2>
      <Select onValueChange={handleNodeChange} value={selectedNode || ''}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um vértice" />
        </SelectTrigger>
        <SelectContent>
          {nodes.map(node => (
            <SelectItem key={node.id} value={node.id}>
              {node.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {adjacents && degree && (
        <div className="mt-4">
          <p><strong>Adjacentes de Entrada:</strong> {adjacents.incoming.join(', ') || 'Nenhum'}</p>
          <p><strong>Adjacentes de Saída:</strong> {adjacents.outgoing.join(', ') || 'Nenhum'}</p>
          <p className="mt-2"><strong>Grau de Entrada:</strong> {degree.incoming}</p>
          <p><strong>Grau de Saída:</strong> {degree.outgoing}</p>
          <p><strong>Grau Total:</strong> {degree.total}</p>
        </div>
      )}
    </div>
  )
}
