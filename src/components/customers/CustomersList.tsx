import { useEffect, useState } from "react";
import * as env from '../../constants';
import { Customer } from '../../interfaces/Customer';

export default function CustomersList() {
  const [customersList, setCustomersList] = useState<Customer[]>([]);
  useEffect(() => {
    fetch(`${env.default.REACT_APP_API_ENDPOINT}/api/users/list`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setCustomersList(data);
        }
      });
  }, [])
  return (
    <>
      <h3>Customers</h3>
      <table border={1} align={"center"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Plan Id</th>
          </tr>
        </thead>
        <tbody>
          {customersList.map(customer => {
            return (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.dob}</td>
                <td>{customer.email}</td>
                <td>{customer.registeredDate}</td>
                <td>{customer.planId}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}