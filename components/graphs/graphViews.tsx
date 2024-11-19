import React from 'react'
import { Graph } from 'react-d3-graph'

interface GraphViewProps {
  graphData: {
    nodes: { id: string; color: string }[]
    links: { source: string; target: string; type: string; weight: number }[]
  }
  graphConfig: {
    directed: boolean
  }
}

export const GraphView: React.FC<GraphViewProps> = ({ graphData, graphConfig }) => {
  const config = {
    ...graphConfig,
    nodeHighlightBehavior: true,
    height: 600,
    width: 800,
    node: {
      color: 'lightblue',
      size: 800,
      highlightStrokeColor: 'blue',
      fontSize: 16,
    },
    link: {
      highlightColor: 'lightblue',
      renderLabel: true,
      labelProperty: 'weight',
      fontSize: 12,
      strokeWidth: 2,
    },
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <Graph id="graph-id" data={graphData} config={config} />
    </div>
  )
}
