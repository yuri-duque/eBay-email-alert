import React from "react";
import { Toast, ToastHeader, CardImg, Table } from "reactstrap";

export default class ResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: props.result };
  }

  render() {
    if (this.props.result) {
      console.log("Result component");
      console.log(this.props.result);
      return (
        <div className="p-2 row">
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
                      <p className="font-weight-bold">{product.categoryName}</p>
                      <p>{product.currentPrice}</p>
                      <a href={product.viewItemURL}>Vizualizar produto</a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Toast>
          ))}
        </div>
      );
    }
    return null;
  }
}
