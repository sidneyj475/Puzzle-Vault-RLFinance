// App.jsx
import { RouterProvider} from 'react-router-dom';
import router from './routes/routes.jsx';
import AppRoutes from './routes/routes';
import './index.css';

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
