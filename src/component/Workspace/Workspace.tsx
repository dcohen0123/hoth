import GoldenLayout from 'golden-layout';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../redux/ReduxMain';
import View from '../View/View';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client'
import { Align } from '../../interface/INavItem';

const config: any = {
    settings: {
        hasHeaders: true,
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: false
    },
    content: [{
        type: 'row',
        content: []
    }]
};

const StyledWorkspace = styled.div`
    background: #000 !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .lm_tab {
        background: #fff;
        color: #292929;
        margin: 0;
        border: 1px solid #ccc;
        height: 20px;
    }
    .lm_tab.lm_active {
        color: #000;
        font-weight: bold;
        position: relative;
        top: 1px;
        border-top: 1px solid #fff;
    }
    .lm_header {
        background: #d9d9d9ff;
        height: 25px !important;
        width: calc(100% + 5px);
    }
    .lm_tab .lm_title {
        padding-top: 2px;
    }
    .lm_tab .lm_close_tab {
        top: 6px;
    }
    .lm_tab.lm_active .lm_title {
        padding-top: 1px !important;
    }
    .lm_tab.lm_active .lm_close_tab {
        top: 5px  !important;
    }
`;

const map = new Map<any, any>();

window.ReactDOM = {...ReactDOM, render: (a: any, b: any) => {
    const root = ReactDOMClient.createRoot(b)
    map?.set(b, root);
    root?.render(a)
    return a;
}, unmountComponentAtNode: (b) => map?.get(b)?.unmount()}
window.React = React;

class Workspace extends React.Component<any, any> {
    private _isMounted: boolean = false;
    private gl: any = null;
    private layoutRef: any = React.createRef();
    constructor(props: any) {
        super(props)
    }
    private wrapComponent(Component: any, store: any) {
        class Wrapped extends React.Component {
            render() {
                return (
                    <Provider store={store}>
                        <Component {...this.props}/>
                    </Provider>
                );
            }
        }
        return Wrapped;
    };    
    componentDidMount() {
        if (this._isMounted) return;
        this._isMounted = true;
        setTimeout(() => {
            this.initGoldenLayout();
            window.addEventListener('resize', () => {
                this.gl?.updateSize();
            });
        }, 0)
    }
    private initGoldenLayout() {
        this.gl = new GoldenLayout(config, this.layoutRef.current);
        this.gl.registerComponent('View', this.wrapComponent(View, store));
        this.gl.on('componentCreated', (component: any) => {
            component.container.on('resize', (e: any) => {
                this.props.resize(component?.config?.props?.viewId);
            });
        });
        this.gl.on('stackCreated', (s: any) => {
            s.on('activeContentItemChanged', (e: any) => {
                this.props.resize(e?.config?.props?.viewId);
            })
        });
        this.gl.init();
    }

    componentDidUpdate(prevProps: any) {
        if (this.props?.views && !prevProps?.views || this.props?.views?.length > prevProps?.views?.length) {
            const view = this.props?.views?.[this.props?.views?.length - 1];
            setTimeout(() => {
                if (this.gl?.root?.contentItems?.length === 0) {
                    this.gl.destroy();
                    this.initGoldenLayout();
                }
                this.gl?.root?.contentItems?.[0]?.addChild({
                    type: 'react-component',
                    component: 'View',
                    title: view?.name,
                    props: {viewId: view?.id}
                })
            }, 0)
        }
        if (!this.props?.nav && prevProps?.nav || this.props?.nav?.align === Align.Bottom) {
            setTimeout(() => {
                this.gl?.updateSize();
            }, 200)
        }
    }
    render() {
        return <StyledWorkspace ref={this.layoutRef}></StyledWorkspace>
    }
}

export default Workspace;