import React from 'react'
import { Button } from "@/components/ui/button"

interface GraphListProps {
  nodes: { id: string, color: string }[]
  links: { source: string, target: string, type: string, weight: number }[]
  onRemoveNode: (id: string) => void
  onRemoveLink: (source: string, target: string) => void
}

export const GraphList: React.FC<GraphListProps> = ({ nodes, links, onRemoveNode, onRemoveLink }) => (
  <div className="grid md:grid-cols-2 gap-8 mb-8">
    <div>
      <h3>Vértices</h3>
      <ul>
        {nodes.map(node => (
          <li key={node.id}>
            {node.id} <Button onClick={() => onRemoveNode(node.id)}>Remover</Button>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3>Conexões</h3>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            {link.source} → {link.target} (Peso: {link.weight}){' '}
            <Button onClick={() => onRemoveLink(link.source, link.target)}>Remover</Button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
