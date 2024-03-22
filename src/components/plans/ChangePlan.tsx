import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as env from '../../constants';
import { Plan } from "../../interfaces/Plan";

export default function ChangePlan() {
  const [planData, setPlanData] = useState<Plan>();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newPlan, setNewPlan] = useState<Plan>();
  const location = useLocation();
  const navigate = useNavigate();
  const changePlan = (id: any) => {
    const loginId = localStorage.getItem('loginId');
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({planId: id})
    };
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/users/${loginId}`, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate('/customers');
      });
      
  }
  useEffect(() => {
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/plans/list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlans(data);
        let plan: Plan | undefined = undefined;
        let existingPlan = location.state.existingPlan;
        switch(location.state.changeMode) {
          case 'Upgrade':
            plan = data.find((item: Plan) => item.id === existingPlan.id - 1);
            break;
          case 'Downgrade':
            plan = data.find((item: Plan) => item.id === existingPlan.id + 1);
            break;
        }
        setNewPlan(plan);
      });
  }, []);

  return (
    <div>
      <h4>Change Plan</h4>
      <p>Existing Plan: {location.state.existingPlan.name}</p>
      <p>New Plan Name: {newPlan?.name}</p>
      <p>Cost: {newPlan?.cost}</p>
      <p>Validity: {newPlan?.validity}</p>
      <p>Status: {newPlan?.status}</p>
      <button onClick={() => changePlan(newPlan?.id)}>{location.state.changeMode}</button>
    </div>
  )
}