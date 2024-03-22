import { useEffect, useState } from "react";
import * as env from '../../constants';
import { Plan } from '../../interfaces/Plan';
import { Customer } from '../../interfaces/Customer';
import moment from 'moment';

export default function RenewPlan() {
  const [planData, setPlanData] = useState<Plan>();
  const [renewalDate, setRenewalDate] = useState('');

  useEffect(() => {
    let id = localStorage.getItem('loginId');
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/users/${id}?populate=plan`)
      .then((res) => {
        return res.json();
      })
      .then((data: any) => {
        console.log('data', data);
        setPlanData(data.plan);
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
    </div>
  )
}