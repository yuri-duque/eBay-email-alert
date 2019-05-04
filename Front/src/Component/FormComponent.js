import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ResultComponent from "./ResultComponent";
import axios from "axios";

const congif = require("../Config/Config");

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], searchTerm: "", timeInterval: "", email: "" };
  }

  render() {
    console.log("");
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="SearchTerm" className="font-weight-bold">
              Produto:
            </Label>
            <Input
              type="text"
              name="SearchTerm"
              id="SearchTerm"
              placeholder="Nome ou caracteristica do produto"
              onBlur={e => {
                this.onSearchChange(e.target.value);
              }}
              onChange={e => this.setState({ searchTerm: e.target.value })}
              value={this.state.searchTerm}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail" className="font-weight-bold">
              Email:
            </Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="e-mail para o qual sera enviado o alerta"
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleSelect" className="font-weight-bold">
              Intervalo de envio de e-mail:
            </Label>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              onChange={e => this.setState({ timeInterval: e.target.value })}
              value={this.state.timeInterval}
            >
              <option value="120">2 minutos</option>
              <option value="600">10 minutos</option>
              <option value="1800">30 minutos</option>
            </Input>
          </FormGroup>

          <Button
            className="font-weight-bold w-25"
            color="success"
            onClick={() => this.onSubmit()}
          >
            Me alerte
          </Button>
        </Form>
        <ResultComponent result={this.state.products} />
      </div>
    );
  }

  onSubmit() {
    let data = {
      products: this.state.products,
      searchTerm: this.state.searchTerm,
      timeInterval: this.state.timeInterval,
      email: this.state.email
    };

    axios
      .post(`${congif.url}`, data)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async onSearchChange(searchTerm) {
    const products = await this.listProducts(searchTerm);
    this.setState({
      products
    });
  }

  async listProducts(searchTerm) {
    return axios
      .get(`${congif.url}/searchProduct?searchTerm=${searchTerm}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
