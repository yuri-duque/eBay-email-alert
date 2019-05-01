import React from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

export default class ResultComponent extends React.Component {
  render() {
    return (
      <div className="p-3 row">
        <Toast className="m-3">
          <ToastHeader>Reactstrap</ToastHeader>
          <ToastBody>
            This is a toast on a white background — check it out!
          </ToastBody>
        </Toast>

        <Toast className="m-3">
          <ToastHeader>Reactstrap</ToastHeader>
          <ToastBody>
            This is a toast on a white background — check it out!
          </ToastBody>
        </Toast>

        <Toast className="m-3">
          <ToastHeader>Reactstrap</ToastHeader>
          <ToastBody>
            This is a toast on a white background — check it out!
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
