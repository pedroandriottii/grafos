import React from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface GraphSettingsProps {
  isDirected: boolean
  onToggleDirected: (value: boolean) => void
}

export const GraphSettings: React.FC<GraphSettingsProps> = ({ isDirected, onToggleDirected }) => (
  <div className="flex items-center space-x-2">
    <Switch
      id="directed-mode"
      checked={isDirected}
      onCheckedChange={onToggleDirected}
    />
    <Label htmlFor="directed-mode">Modo Direcionado</Label>
  </div>
)
