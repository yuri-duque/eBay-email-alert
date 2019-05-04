import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import FormComponent from "./FormComponent";
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
            <NavbarBrand href="/" className="font-weight-bold text-light">
              Ebay-Email-Alert
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    href="https://github.com/yuriDuque"
                    className="font-weight-bold text-light"
                  >
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="flex-auto m-3">
          <FormComponent />
        </div>
      </div>
    );
  }
}
