'use client'

import React, { useState } from 'react'
import { Graph } from 'react-d3-graph'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Node {
  id: string
  color: string
}

interface Link {
  source: string
  target: string
  type: 'directional' | 'non-directional'
  weight: number
}

interface GraphData {
  nodes: Node[]
  links: Link[]
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F06292', '#AED581', '#FFD54F', '#4DB6AC', '#7986CB'
]

export default function ImprovedGraphGenerator() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [newNodeName, setNewNodeName] = useState('')
  const [sourceNode, setSourceNode] = useState('')
  const [targetNode, setTargetNode] = useState('')
  const [linkType, setLinkType] = useState<'directional' | 'non-directional'>('directional')
  const [linkWeight, setLinkWeight] = useState<number>(1)
  const [isDirected, setIsDirected] = useState(true)

  const addNode = () => {
    if (newNodeName && !graphData.nodes.some(node => node.id === newNodeName)) {
      const newColor = colors[graphData.nodes.length % colors.length]
      setGraphData(prev => ({
        ...prev,
        nodes: [...prev.nodes, { id: newNodeName, color: newColor }]
      }))
      setNewNodeName('')
    }
  }

  const addLink = () => {
    if (sourceNode && targetNode && sourceNode !== targetNode) {
      if (!graphData.links.some(link =>
        (link.source === sourceNode && link.target === targetNode) ||
        (linkType === 'non-directional' && link.source === targetNode && link.target === sourceNode)
      )) {
        setGraphData(prev => ({
          ...prev,
          links: [...prev.links, { source: sourceNode, target: targetNode, type: linkType, weight: linkWeight }]
        }))
      }
      setSourceNode('')
      setTargetNode('')
      setLinkWeight(1)
    }
  }

  const removeNode = (id: string) => {
    setGraphData(prev => ({
      nodes: prev.nodes.filter(node => node.id !== id),
      links: prev.links.filter(link => link.source !== id && link.target !== id)
    }))
  }

  const removeLink = (source: string, target: string) => {
    setGraphData(prev => ({
      ...prev,
      links: prev.links.filter(link => !(link.source === source && link.target === target))
    }))
  }

  const graphConfig = {
    nodeHighlightBehavior: true,
    directed: isDirected,
    d3: {
      gravity: -300,
      linkLength: 150
    },
    node: {
      color: 'lightblue',
      size: 800,
      highlightStrokeColor: 'blue',
      fontSize: 16
    },
    link: {
      highlightColor: 'lightblue',
      strokeWidth: 2,
      renderLabel: true,
      labelProperty: 'weight',
      renderArrow: isDirected,
      arrowSize: 5
    },
    height: 600,
    width: 800
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Gerador de Grafos Aprimorado com Pesos</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Vértice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Label htmlFor="newNode">Nome do Vértice:</Label>
              <div className="flex space-x-2">
                <Input
                  id="newNode"
                  value={newNodeName}
                  onChange={(e) => setNewNodeName(e.target.value)}
                  placeholder="Nome do vértice"
                />
                <Button onClick={addNode}>Adicionar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceNode">Origem:</Label>
                  <Select onValueChange={setSourceNode} value={sourceNode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {graphData.nodes.map(node => (
                        <SelectItem key={node.id} value={node.id}>{node.id}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetNode">Destino:</Label>
                  <Select onValueChange={setTargetNode} value={targetNode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {graphData.nodes.map(node => (
                        <SelectItem key={node.id} value={node.id}>{node.id}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="linkType">Tipo de Conexão:</Label>
                <Select onValueChange={(value: 'directional' | 'non-directional') => setLinkType(value)} value={linkType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="directional">Direcional</SelectItem>
                    <SelectItem value="non-directional">Não Direcional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="linkWeight">Peso da Conexão:</Label>
                <Input
                  id="linkWeight"
                  type="number"
                  value={linkWeight}
                  onChange={(e) => setLinkWeight(Number(e.target.value))}
                  min={1}
                />
              </div>
              <Button onClick={addLink}>Adicionar Conexão</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Vértices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {graphData.nodes.map(node => (
                <li key={node.id} className="flex items-center justify-between">
                  <span style={{ color: node.color }}>{node.id}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeNode(node.id)}>Remover</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conexões</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {graphData.links.map((link, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>
                    {link.source} {link.type === 'directional' ? '→' : '↔'} {link.target} (Peso: {link.weight})
                  </span>
                  <Button variant="destructive" size="sm" onClick={() => removeLink(link.source, link.target)}>Remover</Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Configurações do Grafo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="directed-mode"
              checked={isDirected}
              onCheckedChange={setIsDirected}
            />
            <Label htmlFor="directed-mode">Modo Direcionado</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visualização do Grafo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-gray-200 rounded-lg p-4" style={{ height: '600px' }}>
            <Graph
              id="graph-id"
              data={graphData}
              config={graphConfig}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}