import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const wrap = ReactDom.createRoot(document.getElementById('wrap') as HTMLElement);
wrap.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('wrap')
// );

reportWebVitals();
