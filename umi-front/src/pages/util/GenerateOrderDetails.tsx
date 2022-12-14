import {Table} from "react-bootstrap";
import {Item} from "@/models/Item";

const generateOrderDetail = (orderDetail: Item, i: number) => {
  return (
    <tr>
      <td>{orderDetail.name}</td>
      <td>${orderDetail.price}</td>
      <td>{orderDetail.quantity}</td>
    </tr>
  )
}

export const generateTable = (orderDetails: Item[]) => {
  console.log("generate tables")
  console.log(orderDetails)
  return (
    <Table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
      </thead>
      <tbody>
      {orderDetails.map(function (orderDetail: any, i: number) {
        return generateOrderDetail(orderDetail, i)
      })}
      </tbody>
    </Table>
  )
}