import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClientProvider, QueryClient ,  } from "react-query"
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

let query = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider  client={query}>
    <App />
  </QueryClientProvider>
);
