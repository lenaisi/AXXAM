// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserData } from './redux/userSlice.js';
import Routes from './routes/Routes.jsx';

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserData());
  // }, [dispatch]);

  return (
    
    <Routes />
  );
};

export default App;