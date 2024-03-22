import { useEffect, useState } from "react";
import * as env from '../../constants';
import { Customer } from '../../interfaces/Customer';
import moment from 'moment';

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
      <table border={1} align={"center"} className="table">
        <thead className="thead-light">
          <tr>
            <th scope={"col"}>Name</th>
            <th scope={"col"}>DOB</th>
            <th scope={"col"}>Email</th>
            <th scope={"col"}>Registered Date</th>
            <th scope={"col"}>Phone Number</th>
            <th scope={"col"}>Plan Id</th>
          </tr>
        </thead>
        <tbody>
          {customersList.map(customer => {
            return (
              <tr key={customer.id}>
                <td scope={"row"}>{customer.name}</td>
                <td scope={"row"}>{customer.dob}</td>
                <td scope={"row"}>{customer.email}</td>
                <td scope={"row"}>{moment(customer.registeredDate).format('YYYY-MM-DD HH:MM:SS')}</td>
                <td scope={"row"}>{customer.assignedMobileNumber}</td>
                <td scope={"row"}>{customer.planId}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}