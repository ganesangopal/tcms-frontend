import { useNavigate, Outlet } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const redirectToRegister = () => {
    navigate('/register');
  }
  const redirectToRenewPlan = () => {
    navigate('/renew-plan');
  }
  return (
    <div>
      <span>
        <button id='new-customers' onClick={redirectToRegister}>New Customers</button>
        <button id='exist-customers' onClick={redirectToRenewPlan}>Existing Customers</button>
      </span>
      <Outlet />
    </div>
  )
}
export default Home;