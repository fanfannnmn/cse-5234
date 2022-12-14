import {generateTable} from "./util/GenerateOrderDetails"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {history, useLocation} from 'umi';
import {Item} from "@/models/Item";
import {AddressInfo} from "@/models/AddressInfo";
import {PaymentInfo} from "@/models/PaymentInfo";


export default function ConfirmOrder() {
  function finishOrder(order: Item[], address: AddressInfo,
                       card: PaymentInfo) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        line_items: items,
        addr_1: address.addr_1,
        addr_2: address.addr_2,
        city: address.city,
        state: address.state,
        zip: address.zip,
        number: card.number,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        cvv: card.cvv,
        card_name: card.card_name,
        name: address.name
      })
    };

    fetch('http://localhost:3000/order-processing/order/new', requestOptions)
      .then(async (response) => {
        return history.push('/purchase/viewConfirmation', {state: await response.json()})
      })
  }

  const historyState = useLocation().state as { state: object };
  if (historyState.state === null || historyState.state === undefined) {
    return history.push("/purchase");
  }

  const items = historyState.state as Item[];
  const addressDetail: AddressInfo = {} as AddressInfo;
  const cardDetail: PaymentInfo = {} as PaymentInfo;

  return (
    <Container>
      <Row className={"justify-content-md-center mt-5"}>
        <Col>
          <h1>Make Your Payment</h1>
        </Col>
      </Row>

      <Row className={"justify-content-md-center mt-3"}>
        <Col>
          <h2>Details</h2>
          {generateTable(items)}
        </Col>
      </Row>

      <Row className={"justify-content-md-center mt-3"}>
        <Col lg={6}>
          <h2>Delivery</h2>
          <Form as={Row}>
            <Form.Group className={"mb-3"} controlId="recipient">
              <Form.Label>Recipient</Form.Label>
              <Form.Control type="text" placeholder="John Doe" onChange={(e) => {
                addressDetail.name = e.target.value;
              }}/>
            </Form.Group>

            <Form.Group className={"mb-3"} controlId="address_1">
              <Form.Label>Address 1</Form.Label>
              <Form.Control type="text" onChange={(e) => {
                addressDetail.addr_1 = e.target.value;
              }}/>
            </Form.Group>

            <Form.Group className={"mb-3"} controlId="address_2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control type="text" onChange={(e) => {
                addressDetail.addr_2 = e.target.value;
              }}/>
            </Form.Group>

            <Col lg={6}>
              <Form.Group className={"mb-3"} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                  addressDetail.city = e.target.value;
                }}/>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className={"mb-3"} controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                  addressDetail.state = e.target.value;
                }}/>
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className={"mb-3"} controlId="zip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text" onChange={(e) => {
                  addressDetail.zip = e.target.value;
                }}/>
              </Form.Group>
            </Col>
          </Form>
        </Col>

        <Col lg={6}>
          <h2>Payment</h2>
          <Form as={Row}>
            <Form.Group className={"mb-3"} controlId="card_holder">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control type="text" placeholder="John Doe" onChange={(e) => {
                cardDetail.card_name = e.target.value;
              }}/>
            </Form.Group>

            <Form.Group className={"mb-3"} controlId="card_number">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" onChange={(e) => {
                cardDetail.number = e.target.value;
              }}/>
            </Form.Group>

            <Col lg={3}>
              <Form.Group className={"mb-3"} controlId="exp_month">
                <Form.Label>Exp. Month</Form.Label>
                <Form.Select name={"exp_month"} className={"form-control"} form="my_form" onChange={(e) => {
                  cardDetail.exp_month = e.target.value;
                }}>
                  {Array.from({length: 12}, (_, i) => i + 1).map(i => (
                    <option>{i}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={3}>
              <Form.Group className={"mb-3"} controlId="exp_year">
                <Form.Label>Exp. Year</Form.Label>
                <Form.Select name={"exp_year"} className={"form-control"} form="my_form" onChange={(e) => {
                  cardDetail.exp_year = e.target.value;
                }}>
                  {Array.from({length: 5}, (_, i) => Number(new Date().getFullYear()) + i).map(i => (
                    <option>{i}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={6}>
              <Form.Group className={"mb-3"} controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="password" onChange={(e) => {
                  cardDetail.cvv = e.target.value;
                }}/>
              </Form.Group>
            </Col>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className={"d-grid gap-2"}>
          <Button variant="primary" onClick={(event) => finishOrder(items, addressDetail, cardDetail)}>
            Confirm Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
