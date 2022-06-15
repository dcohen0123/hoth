import './App.css';
import Hoth from './component/Hoth/Hoth';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InitHoth } from './redux/Hoth/HothActions';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: InitHoth})
  }, [])
  return <Hoth />;
}

export default App;
