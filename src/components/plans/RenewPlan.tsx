import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as env from '../../constants';
import { Plan } from '../../interfaces/Plan';
import moment from 'moment';

export default function RenewPlan() {
  const [planData, setPlanData] = useState<Plan>();
  const [renewalDate, setRenewalDate] = useState('');
  const [changePlanText, setChangePlanText] = useState('');
  const navigate = useNavigate();
  const redirectToCustomers = (e: any) => {
    e.preventDefault();
    navigate('/customers');
  }
  const redirectToChangePlan = (e: any) => {
    e.preventDefault();
    navigate('/change-plan', {
      state: {
        changeMode: changePlanText,
        existingPlan: planData
      }
    });
  }

  useEffect(() => {
    let id = localStorage.getItem('loginId');
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/users/${id}?populate=plan`)
      .then((res) => {
        return res.json();
      })
      .then((data: any) => {
        setPlanData(data.plan);
        if (data.plan && data.plan.id) {
          if (data.plan.id > 1) {
            setChangePlanText('Upgrade');
          } else {
            setChangePlanText('Downgrade');
          }
        }
        let renewalDate = moment(data.user.registeredDate)
          .add(data.plan.validity, 'days')
          .format('YYYY-MM-DD HH:MM:SS');
        setRenewalDate(renewalDate)
      });
  }, [])

  return (
    <div>
      <h3>Renew Plan</h3>
      <p>Renewal Date: {renewalDate}</p>
      <p>Status: {planData?.status}</p>
      <button onClick={redirectToCustomers}>Customers List</button>
      <button onClick={redirectToChangePlan}>{changePlanText}</button>
    </div>
  )
}