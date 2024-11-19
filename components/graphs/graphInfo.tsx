import React from 'react'

interface GraphInfoProps {
  order: number
  size: number
}

export const GraphInfo: React.FC<GraphInfoProps> = ({ order, size }) => (
  <div>
    <p><strong>Ordem (Número de Vértices):</strong> {order}</p>
    <p><strong>Tamanho (Número de Arestas):</strong> {size}</p>
  </div>
)
