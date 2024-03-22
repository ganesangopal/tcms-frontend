import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import RegisterCustomer from './components/customers/RegisterCustomer';
import Plans from './components/plans/Plans';
import CustomersList from './components/customers/CustomersList';
import RenewPlan from './components/plans/RenewPlan';
import ChangePlan from './components/plans/ChangePlan';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterCustomer />} />
        <Route path='/choose-plan' element={<Plans />} />
        <Route path='/customers' element={<CustomersList />} />
        <Route path='/renew-plan' element={<RenewPlan />} />
        <Route path='/change-plan' element={<ChangePlan />} />
      </Routes>
    </>
  )
}

export default App
