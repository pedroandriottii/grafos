import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddNodeProps {
  onAddNode: (nodeName: string) => void
}

export const AddNode: React.FC<AddNodeProps> = ({ onAddNode }) => {
  const [nodeName, setNodeName] = useState('')

  const handleAddNode = () => {
    onAddNode(nodeName)
    setNodeName('')
  }

  return (
    <div>
      <Label htmlFor="newNode">Nome do Vértice:</Label>
      <div className="flex space-x-2">
        <Input
          id="newNode"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do vértice"
        />
        <Button onClick={handleAddNode}>Adicionar</Button>
      </div>
    </div>
  )
}
