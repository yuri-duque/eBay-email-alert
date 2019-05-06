import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import ResultComponent from "./ResultComponent";
import axios from "axios";

const congif = require("../Config/Config");

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchTerm: "",
      timeInterval: "2",
      email: ""
    };
  }

  render() {
    return (
      <div className="flex-auto m-3">
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
              maxLength="150"
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
              maxLength="150"
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
              <option value="2">2 minutos</option>
              <option value="10">10 minutos</option>
              <option value="30">30 minutos</option>
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

  async cleanState() {
    this.setState({
      products: [],
      searchTerm: "",
      timeInterval: "120",
      email: ""
    });
  }

  async onSubmit() {
    //metodo chamado para garantir que o produto salvo é o produto inserido no input
    const result = await this.onSearchChange(this.state.searchTerm);

    let data = {
      products: this.state.products,
      searchTerm: this.state.searchTerm,
      timeInterval: this.state.timeInterval,
      email: this.state.email
    };

    if (this.validateInsertFields(data)) {
      const response = await this.requestPost(data);

      this.validateResponse(response);
    }
  }

  async onSearchChange(searchTerm) {
    if (searchTerm) {
      const products = await this.requestGet(
        "/searchProduct?searchTerm=",
        searchTerm
      );
      this.setState({
        products
      });
    }
  }

  requestGet(parameters, searchTerm) {
    return axios
      .get(`${congif.url}${parameters}${searchTerm}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  requestPost(data) {
    return axios
      .post(`${congif.url}`, data)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });
  }

  validateResponse(response) {
    if (response.status === 200) {
      this.cleanState();
      window.alert("Alerta salvo com sucesso!");
    } else if (response.response.status === 406) {
      window.alert(
        "Já existe um alerta cadastrado com esse produto para esse email!"
      );
    } else {
      window.alert(`Erro ao salvar alerta!\n${response}`);
    }
  }

  validateInsertFields(data) {
    if (!data.searchTerm) {
      window.alert("O Campo 'Produto' não pode estar vazio!");
      return false;
    } else if (data.products.length == 0) {
      window.alert("Nenhum produto foi encontrado!");
      return false;
    } else if (!data.email) {
      window.alert("O Campo 'Email' não estar vazio!");
      return false;
    }

    return true;
  }
}
