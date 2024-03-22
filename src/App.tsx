import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import RegisterCustomer from './components/customers/RegisterCustomer';
import PlansList from './components/plans/Plans';
import CustomersList from './components/customers/CustomersList';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterCustomer />} />
        <Route path='/choose-plan' element={<PlansList />} />
        <Route path='/customers' element={<CustomersList />} />
      </Routes>
    </>
  )
}

export default App
