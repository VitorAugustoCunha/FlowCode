import { Accessor, Setter } from "solid-js";

export interface Edge {
    id: string;
    nodeStartId: string;
    nodeEndId: string;
    inputIndex: number;
    outputIndex: number;
}

export interface Node {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    prevPosition: { get: Accessor<{ x: number; y: number }>; set: Setter<{ x: number; y: number }> };
    currPosition: { get: Accessor<{ x: number; y: number }>; set: Setter<{ x: number; y: number }> };
    inputEdgeIds: { get: Accessor<string[]>; set: Setter<string[]> };
    outputEdgeIds: { get: Accessor<string[]>; set: Setter<string[]> };
}

export interface NodeInput {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    name: string;
    placeholder: string;
    prevPosition: { get: Accessor<{ x: number; y: number }>; set: Setter<{ x: number; y: number }> };
    currPosition: { get: Accessor<{ x: number; y: number }>; set: Setter<{ x: number; y: number }> };
    inputEdgeIds: { get: Accessor<string[]>; set: Setter<string[]> };
    outputEdgeIds: { get: Accessor<string[]>; set: Setter<string[]> };
}