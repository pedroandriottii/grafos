'use client'

import React, { useState } from 'react'
import { Graph } from 'react-d3-graph'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { PlusCircle } from 'lucide-react'

type Edge = {
  from: string
  to: string
}

export default function GraphInput() {
  const [nodes, setNodes] = useState<{ id: string }[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const handleAddVertex = (vertex: string) => {
    if (vertex && !nodes.find((node) => node.id === vertex)) {
      setNodes([...nodes, { id: vertex }])
    }
  }

  const handleAddEdge = (from: string, to: string) => {
    if (from && to && nodes.find((node) => node.id === from) && nodes.find((node) => node.id === to)) {
      setEdges([...edges, { from, to }])
    }
  }

  const graphData = {
    nodes: nodes,
    links: edges.map(({ from, to }) => ({ source: from, target: to })),
  }

  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'hsl(var(--primary))',
      size: 1000, // Aumentado para acomodar o texto
      highlightStrokeColor: 'hsl(var(--primary-foreground))',
      fontColor: 'hsl(var(--primary-foreground))', // Alterado para contrastar com a cor do nó
      fontSize: 14,
      labelPosition: "center",
      renderLabel: true,
    },
    link: {
      highlightColor: 'hsl(var(--primary))',
      color: 'hsl(var(--muted))',
    },
    d3: {
      alphaTarget: 0.05,
      gravity: -400,
      linkLength: 300,
      linkStrength: 1,
    },
  } as const;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Vértice</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.elements.namedItem('vertex') as HTMLInputElement
                handleAddVertex(input.value)
                input.value = ''
              }}
              className="flex space-x-2"
            >
              <Input name="vertex" placeholder="Nome do vértice" className="flex-grow" />
              <Button type="submit" size="icon">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Adicionar vértice</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar Aresta</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const fromInput = e.currentTarget.elements.namedItem('from') as HTMLInputElement
                const toInput = e.currentTarget.elements.namedItem('to') as HTMLInputElement
                handleAddEdge(fromInput.value, toInput.value)
                fromInput.value = ''
                toInput.value = ''
              }}
              className="space-y-2"
            >
              <div className="flex space-x-2">
                <Input name="from" placeholder="De" className="flex-grow" />
                <Input name="to" placeholder="Para" className="flex-grow" />
              </div>
              <Button type="submit" className="w-full">
                Adicionar Aresta
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grafo Gerado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] bg-white rounded-lg shadow-inner">
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