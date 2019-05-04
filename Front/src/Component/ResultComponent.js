import React from "react";
import { Toast, ToastHeader, ToastBody, CardImg, Table } from "reactstrap";

export default class ResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: props.result };
  }

  render() {
    if (this.props.result) {
      return (
        <div className="p-3 row">
          {this.props.result.map(product => (
            <Toast className="m-3" key={product.galleryURL}>
              <ToastHeader>{product.title}</ToastHeader>
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <CardImg
                        top
                        width="100%"
                        src={product.galleryURL}
                        alt="Card image cap"
                      />
                    </td>
                    <td>
                      <ToastBody>{product.categoryName}</ToastBody>
                      <ToastBody>{product.currentPrice}</ToastBody>
                      <a href={product.viewItemURL}>Vizualizar produto</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Toast>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
