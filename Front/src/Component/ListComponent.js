import React from "react";
import axios from "axios";
import HomeComponent from "./HomeComponent";
import { Table, Button, Alert, Media } from "reactstrap";

const congif = require("../Config/Config");

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { alerts: [] };
  }

  render() {
    if (this.state.alerts !== []) {
      return (
        <div>
          <HomeComponent />
          <div className="m-3">
            <Table bordered>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Email</th>
                  <th>Intervalo</th>
                  <th>Produtos</th>
                </tr>
              </thead>
              {this.state.alerts.map(alert => (
                <tbody>
                  <tr>
                    <td>{alert.searchTerm}</td>
                    <td>{alert.email}</td>
                    <td>{alert.timeInterval}</td>
                    {alert.products.map(product => (
                      <Table className="m-0">
                        <tbody>
                          <tr>
                            <td>
                              <Media
                                object
                                src={product.galleryURL}
                                className="my_image float-right ml-2"
                              />
                              <p>{product.categoryName}</p>
                              <Button
                                color="info"
                                href={product.viewItemURL}
                                className="mt-4"
                              >
                                Vizualizar produto
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ))}
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        </div>
      );
    }
    return (
      <div>
        <HomeComponent />
        <div className="m-3">
          <Alert color="danger">Nenhum Alerta cadastrado!</Alert>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.state.alerts) {
      this.setStateAlerts();
    }
  }

  async setStateAlerts() {
    const alerts = await this.requestGet();
    console.log(alerts);
    this.setState({
      alerts
    });
  }

  async requestGet() {
    return axios
      .get(`${congif.url}`)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
