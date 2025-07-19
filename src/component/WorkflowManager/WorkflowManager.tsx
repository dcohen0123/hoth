import { useCallback, useEffect, useState } from "react";
import { ReactFlow, Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Tooltip } from "antd";
import styled from 'styled-components';
import { DeleteOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface Workflow {
    id: string;
    name: string;
    nodes: any[];
    edges: any[];
}

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
    { id: '2', position: { x: 150, y: 100 }, data: { label: 'Step' } }
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const StyledLi = styled.li`
    &:hover {
        background: #f2f2f2;
    }
    padding: 3px;
    cursor: pointer;
    margin-top: 5px;
    display: flex;
    align-items: center; 
`;

const StyledDiv = styled.div`
    padding: 6.5px 4px 10px 7px;
    color: #000;
    font-size: 14px;
    text-align: center;
`;

const WorkflowManager = () => {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const stored = localStorage.getItem('workflows');
        if (stored) {
            try {
                setWorkflows(JSON.parse(stored));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const saveWorkflows = (list: Workflow[]) => {
        localStorage.setItem('workflows', JSON.stringify(list));
    };

    const handleSelect = (id: string) => {
        const wf = workflows.find(w => w.id === id);
        if (!wf) return;
        setSelectedId(id);
        setName(wf.name);
        setNodes(wf.nodes);
        setEdges(wf.edges);
    };

    const handleNew = () => {
        const id = uuidv4();
        setSelectedId(id);
        setName('');
        setNodes(initialNodes);
        setEdges(initialEdges);
    };

    const handleDelete = (id: string) => {
        const list = workflows.filter(w => w.id !== id);
        setWorkflows(list);
        saveWorkflows(list);
        if (selectedId === id) {
            setSelectedId(null);
        }
    };

    const handleSave = () => {
        const wf: Workflow = {
            id: selectedId || uuidv4(),
            name,
            nodes,
            edges,
        };
        let list = workflows.slice();
        const idx = list.findIndex(w => w.id === wf.id);
        if (idx >= 0) list[idx] = wf; else list.push(wf);
        setWorkflows(list);
        saveWorkflows(list);
        setSelectedId(wf.id);
    };

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%' }}>
            <div style={{ width: 225, padding: "0 10px", borderRight: '1px solid #ccc', }}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc"}}>
                    <StyledDiv><strong>Workflow Manager</strong></StyledDiv>
                    <Tooltip title="Create Workflow"><Button type="text" size="small" onClick={handleNew}><PlusCircleOutlined /></Button></Tooltip>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {workflows.map(w => (
                        <StyledLi key={w.id} onClick={() => handleSelect(w.id)}>
                            <span style={{  flex: 1 }}>{w.name}</span>
                            <Tooltip title="Delete Workflow"><Button type="text" size="small" style={{ marginLeft: 5  }} onClick={() => handleDelete(w.id)}><DeleteOutlined /></Button></Tooltip>
                        </StyledLi>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 1, padding: 5 }}>
                {selectedId && (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{display: 'flex', alignItems: 'top'}}>
                            <Input autoFocus value={name} placeholder="Enter a workflow name" onChange={e => setName(e.target.value)} style={{ flex: 1, marginRight: 5 }} />
                            <Button type="primary" onClick={handleSave}>Save</Button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView>
                                <MiniMap />
                                <Controls />
                                <Background />
                            </ReactFlow>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkflowManager;
