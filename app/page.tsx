'use client';
import { AddLink } from '@/components/graphs/addLink'
import { AddNode } from '@/components/graphs/addNode'
import { GraphInfo } from '@/components/graphs/graphInfo'
import { GraphList } from '@/components/graphs/graphList'
import { GraphSettings } from '@/components/graphs/graphSettings'
import { GraphView } from '@/components/graphs/graphViews'
import { Adjacency } from '@/components/graphs/graphAdjacency'
import { AdjacencyCheck } from '@/components/graphs/graphAdjacencyCheck'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShortestPath } from '@/components/graphs/graphShortestPath';

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

  const getAdjacentVertices = (vertexId: string) => {
    const incoming = graphData.links
      .filter(link => link.target === vertexId)
      .map(link => link.source)

    const outgoing = graphData.links
      .filter(link => link.source === vertexId)
      .map(link => link.target)

    return {
      incoming: isDirected ? incoming : Array.from(new Set([...incoming, ...outgoing])),
      outgoing: isDirected ? outgoing : Array.from(new Set([...incoming, ...outgoing]))
    }
  }

  const getVertexDegree = (vertexId: string) => {
    const incomingDegree = graphData.links.filter(link => link.target === vertexId).length
    const outgoingDegree = graphData.links.filter(link => link.source === vertexId).length

    return {
      incoming: incomingDegree,
      outgoing: outgoingDegree,
      total: isDirected ? incomingDegree + outgoingDegree : outgoingDegree
    }
  }

  const areVerticesAdjacent = (vertexA: string, vertexB: string) => {
    return graphData.links.some(link =>
      (link.source === vertexA && link.target === vertexB) ||
      (!isDirected && link.source === vertexB && link.target === vertexA)
    )
  }

  const findShortestPath = (start: string, end: string) => {
    const distances: Record<string, number> = {}
    const previous: Record<string, string | null> = {}
    const unvisited = new Set(graphData.nodes.map(node => node.id))

    graphData.nodes.forEach(node => {
      distances[node.id] = Infinity
      previous[node.id] = null
    })
    distances[start] = 0

    while (unvisited.size > 0) {
      const currentNode = Array.from(unvisited).reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
      )

      if (currentNode === end) break
      unvisited.delete(currentNode)

      graphData.links.forEach(link => {
        if (link.source === currentNode && unvisited.has(link.target)) {
          const newDistance = distances[currentNode] + link.weight
          if (newDistance < distances[link.target]) {
            distances[link.target] = newDistance
            previous[link.target] = currentNode
          }
        }
        if (!isDirected && link.target === currentNode && unvisited.has(link.source)) {
          const newDistance = distances[currentNode] + link.weight
          if (newDistance < distances[link.source]) {
            distances[link.source] = newDistance
            previous[link.source] = currentNode
          }
        }
      })
    }

    const path: string[] = []
    let current = end
    while (current) {
      path.unshift(current)
      current = previous[current] || ''
    }

    if (path[0] !== start) {
      return { cost: Infinity, path: [] }
    }

    return { cost: distances[end], path }
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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Adjacências e Grau</CardTitle>
        </CardHeader>
        <CardContent>
          <Adjacency
            nodes={graphData.nodes}
            getAdjacents={getAdjacentVertices}
            getDegree={getVertexDegree}
          />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Verificar Adjacência</CardTitle>
        </CardHeader>
        <CardContent>
          <AdjacencyCheck
            nodes={graphData.nodes}
            checkAdjacency={areVerticesAdjacent}
          />
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Caminho Mais Curto</CardTitle>
        </CardHeader>
        <CardContent>
          <ShortestPath
            nodes={graphData.nodes}
            findPath={findShortestPath}
          />
        </CardContent>
      </Card>
    </div>
  )
}
