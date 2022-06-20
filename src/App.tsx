import './App.css';
import Hoth from './component/Hoth/Hoth';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InitConfig } from './redux/AppConfig/ConfigActions';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: InitConfig})
  }, [])
  return <Hoth />;
}

export default App;
