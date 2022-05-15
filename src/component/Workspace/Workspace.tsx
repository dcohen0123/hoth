import GoldenLayout from 'golden-layout';
import React from 'react';
import {Provider} from 'react-redux';
import store from '../../redux/ReduxMain';
import View from '../View/View';
import styled from 'styled-components';
import { EventType } from '../../interface/IEvent';
import ReactDOM from 'react-dom';
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
    width: 100%;
    height: 100%;
    overflow: hidden;
    .lm_tab {
        background: white;
        color: black;
        font-weight: bold;
        margin: 0;
        border: 1px solid #cccccc;
    }
    .lm_header {
        background: #d9d9d9ff;
    }
`;

window.ReactDOM = ReactDOM;
window.React = React;

class Workspace extends React.Component<any, any> {
    // }, [event])
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
            this.gl = new GoldenLayout(config, this.layoutRef.current);
            this.gl.registerComponent('View', this.wrapComponent(View, store));
            this.gl.init();
            window.addEventListener('resize', () => {
                this.gl?.updateSize();
            });
        }, 0)
    }
    componentDidUpdate(prevProps: any) {
        if (this.props?.views?.length > prevProps?.views?.length) {
            const view = this.props?.views?.[this.props?.views?.length - 1];
            setTimeout(() => {
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