import { Widget, PanelLayout } from '@phosphor/widgets';

import { ReactWidget } from "@jupyterlab/apputils";

import * as React from "react";

export class chemSidebar extends Widget{
  constructor(){
    super();
    this.addClass('dou-DaskSidebar');
    let layout = (this.layout = new PanelLayout());

    const renderOnSaveCheckbox = ReactWidget.create(
    <input 
      className = "pt_button"
      type = "button"
      value="Open periodic table"
      onClick={() => {
        console.log("test is working.");
      }}
    />
)

    // renderOnSaveCheckbox.add("pt_button");
    layout.addWidget(renderOnSaveCheckbox);
  }
}
