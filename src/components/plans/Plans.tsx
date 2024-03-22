import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as env from '../../constants';
import { Plan } from '../../interfaces/Plan';

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/plans/list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlans(data);
      });
  }, []);

  const handleSubmit = (id: number) => {
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

  return (
    <>
      <h3>Choose Plan</h3>
      <div>
        {plans.map(plan => {
          return (
            <div key={plan.id}>
              <p>Name: {plan.name}</p>
              <p>Cost: Rs.{plan.cost}</p>
              <p>Validity: {plan.validity} days</p>
              <p>Status: {plan.status}</p>
              <button onClick={() => handleSubmit(plan.id)}>Choose Plan</button>
            </div>
          )
        })}
      </div>
    </>
  )
}