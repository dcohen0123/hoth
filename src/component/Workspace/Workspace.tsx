import React, { useEffect, useRef, useState } from 'react';
import { Layout, Model, TabNode, Actions, DockLocation } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import store from '../../redux/ReduxMain';
import View from '../View/View';
import { Align } from '../../interface/INavItem';

const StyledWorkspace = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const config: any = {
    global: { tabEnableClose: false, tabSetEnableMaximize: false },
    layout: {
        type: 'row',
        children: [
            {
                type: 'tabset',
                id: 'main',
                weight: 100,
                children: []
            }
        ]
    }
};

const Workspace = ({ views, nav, resize }: any) => {
    const [model] = useState<Model>(() => Model.fromJson(config));
    const layoutRef = useRef<Layout>(null);

    const factory = (node: TabNode) => {
        if (node.getComponent() === 'View') {
            const viewId = node.getConfig()?.viewId;
            return (
                <Provider store={store}>
                    <View viewId={viewId} />
                </Provider>
            );
        }
        return null;
    };

    useEffect(() => {
        if (views && views.length > 0) {
            const view = views[views.length - 1];
            if (!model.getNodeById(view.id)) {
                const newNode = {
                    type: 'tab',
                    id: view.id,
                    name: view.name,
                    component: 'View',
                    config: { viewId: view.id }
                } as any;
                model.doAction(Actions.addNode(newNode, 'main', DockLocation.CENTER, -1));
                resize(view.id);
            }
        }
    }, [views]);

    useEffect(() => {
        if (nav?.align === Align.Bottom) {
            setTimeout(() => {
                layoutRef.current?.forceUpdate();
            }, 200);
        }
    }, [nav]);

    return (
        <StyledWorkspace>
            <Layout ref={layoutRef} model={model} factory={factory} />
        </StyledWorkspace>
    );
};

export default Workspace;
