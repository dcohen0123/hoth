import './App.css';
import Hoth from './component/Hoth/Hoth';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FetchData } from './redux/Data/DataActions';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: FetchData})
  }, [])
  return <Hoth />;
}

export default App;
