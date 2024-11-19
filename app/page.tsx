'use client';
import { AddLink } from '@/components/graphs/addLink'
import { AddNode } from '@/components/graphs/addNode'
import { GraphInfo } from '@/components/graphs/graphInfo'
import { GraphList } from '@/components/graphs/graphList'
import { GraphSettings } from '@/components/graphs/graphSettings'
import { GraphView } from '@/components/graphs/graphViews'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Node {
  id: string
  color: string
}

interface Link {
  source: string
  target: string
  type: string
  weight: number
}

interface GraphData {
  nodes: Node[]
  links: Link[]
}

export default function ImprovedGraphGenerator() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [isDirected, setIsDirected] = useState(true)

  const graphOrder = graphData.nodes.length
  const graphSize = graphData.links.length

  const addNode = (nodeName: string) => {
    if (!graphData.nodes.some(node => node.id === nodeName)) {
      setGraphData(prev => ({
        ...prev,
        nodes: [...prev.nodes, { id: nodeName, color: '#FF6B6B' }]
      }))
    }
  }

  const addLink = (source: string, target: string, type: string, weight: number) => {
    setGraphData(prev => ({
      ...prev,
      links: [...prev.links, { source, target, type, weight }]
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Graph Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Graph Information</CardTitle>
          </CardHeader>
          <CardContent>
            <GraphInfo order={graphOrder} size={graphSize} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Graph Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <GraphSettings isDirected={isDirected} onToggleDirected={setIsDirected} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Node</CardTitle>
          </CardHeader>
          <CardContent>
            <AddNode onAddNode={addNode} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Link</CardTitle>
          </CardHeader>
          <CardContent>
            <AddLink nodes={graphData.nodes.map(node => node.id)} onAddLink={addLink} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Graph View</CardTitle>
        </CardHeader>
        <CardContent>
          <GraphView graphData={graphData} graphConfig={{ directed: isDirected }} />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Graph List</CardTitle>
        </CardHeader>
        <CardContent>
          <GraphList
            nodes={graphData.nodes}
            links={graphData.links}
            onRemoveNode={(id) =>
              setGraphData(prev => ({
                ...prev,
                nodes: prev.nodes.filter(node => node.id !== id),
                links: prev.links.filter(link => link.source !== id && link.target !== id)
              }))
            }
            onRemoveLink={(source, target) =>
              setGraphData(prev => ({
                ...prev,
                links: prev.links.filter(link => !(link.source === source && link.target === target))
              }))
            }
          />
        </CardContent>
      </Card>
    </div>
  )
}