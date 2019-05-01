import React from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default class FormComponent extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail" className="font-weight-bold">
            Email:
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="e-mail para o qual sera enviado o alerta"
          />
        </FormGroup>
        <FormGroup>
          <Label for="SearchTerm" className="font-weight-bold">
            Produto:
          </Label>
          <Input
            type="text"
            name="SearchTerm"
            id="SearchTerm"
            placeholder="Nome ou caracteristica do produto"
          />
        </FormGroup>

        <FormGroup>
          <Label for="exampleSelect" className="font-weight-bold">
            Intervalo de envio de e-mail:
          </Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>2 minutos</option>
            <option>10 minutos</option>
            <option>30 minutos</option>
          </Input>
        </FormGroup>

        <Button className="font-weight-bold">Me alerte</Button>
      </Form>
    );
  }
}
