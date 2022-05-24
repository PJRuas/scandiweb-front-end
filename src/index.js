import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import AddProduct from './routes/AddProduct';
import AllProducts from './routes/AllProducts';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='' element={<AllProducts/>}/>
                <Route path='/addproduct' element={<AddProduct/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);