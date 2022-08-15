import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Prevent fontawesome from adding css to the head
config.autoAddCss = false;

export default function FirstCycle({ stepIncrement, toggleModal }) {
  return (
    <div className="modal-background">
      <div className="modal-form-container container-flex container-vertical">
        <div className="toolbar modal-toolbar">
          <button
            onClick={() => toggleModal()}
            className="toolbar-right btn btn-small-action btn-dark"
          >
            <FontAwesomeIcon icon={solid("xmark")} />
          </button>
        </div>
        <div className="modal-form-items container-flex container-vertical container-vertical-center">
          <p className="header-text text-primary text-bold text-medium my-2">
            Let's setup your maxes!
          </p>
          <div className="buttons container-flex container-vertical container-vetical-center">
            <button
              onClick={() => stepIncrement()}
              className="btn btn-primary btn-regular"
            >
              setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
