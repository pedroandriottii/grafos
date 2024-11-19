import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddLinkProps {
  nodes: string[]
  onAddLink: (source: string, target: string, type: 'directional' | 'non-directional', weight: number) => void
}

export const AddLink: React.FC<AddLinkProps> = ({ nodes, onAddLink }) => {
  const [source, setSource] = useState('')
  const [target, setTarget] = useState('')
  const [type, setType] = useState<'directional' | 'non-directional'>('directional')
  const [weight, setWeight] = useState(1)

  const handleAddLink = () => {
    onAddLink(source, target, type, weight)
    setSource('')
    setTarget('')
    setWeight(1)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="sourceNode">Origem:</Label>
          <Select onValueChange={setSource} value={source}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map(node => (
                <SelectItem key={node} value={node}>{node}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="targetNode">Destino:</Label>
          <Select onValueChange={setTarget} value={target}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {nodes.map(node => (
                <SelectItem key={node} value={node}>{node}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="linkWeight">Peso da Conexão:</Label>
        <Input
          id="linkWeight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          min={1}
        />
      </div>
      <Button onClick={handleAddLink}>Adicionar Conexão</Button>
    </div>
  )
}
