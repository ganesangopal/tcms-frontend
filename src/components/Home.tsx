import { useNavigate, Outlet } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('clicked in home component');
    navigate('/register');
  }
  return (
    <div>
      <span>
        <button id='new-customers' onClick={handleClick}>New Customers</button>
        <button id='exist-customers'>Existing Customers</button>
      </span>
      <Outlet />
    </div>
  )
}
export default Home;