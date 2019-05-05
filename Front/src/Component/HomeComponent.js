import React from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="flex-wrapper">
        <div className="flex-header">
          <Navbar color="secondary" light expand="md">
            <NavbarBrand>
              <Link to="/" className="font-weight-bold text-light no-underline">
                Ebay-Email-Alert
              </Link>
            </NavbarBrand>

            <Link
              to="/alerta"
              className="font-weight-bold text-light no-underline"
            >
              Cadastrar Alerta
            </Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    href="https://github.com/yuriDuque/eBay-email-alert"
                    className="font-weight-bold text-light"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
