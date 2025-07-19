import './App.css';
import Main from './component/Main/Main';
import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InitConfig } from './state/AppConfig/ConfigActions';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: InitConfig})
  }, [])
  return <Main />;
}

export default App;
