import { Component } from "solid-js";
import { Edge, Node } from "./INodes";

export function NodeRule(nodes: Node[], edges: Edge[]):string[] {
    return nodes.map(node => {
        const hasChildren = edges.some(edge => edge.nodeStartId === node.id);
        let nodeString = `<Node id="${node.id}" numberInputs="${node.numberInputs}" numberOutputs="${node.numberOutputs}"/>--`;
        
        if (hasChildren) {
            const childNodeIds = edges
                .filter(edge => edge.nodeStartId === node.id)
                .map(edge => edge.nodeEndId);
            nodeString += childNodeIds.map(childNodeId => `${childNodeId}`).join(', ');
        } else {
            nodeString += 'null';
        }

        return nodeString;
    });
}