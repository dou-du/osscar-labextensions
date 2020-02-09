import { Widget, PanelLayout } from '@phosphor/widgets';

import { ReactWidget } from "@jupyterlab/apputils";

import { INotebookTracker } from "@jupyterlab/notebook";

import { CodeCell } from "@jupyterlab/cells";

import { OutputArea } from "@jupyterlab/outputarea";

import * as React from "react";

// import $ from "jquery";
// import * as _ from "underscore";

export class chemSidebar extends Widget{

  private _notebookTracker: INotebookTracker;
  // private _hr: HTMLElement;
  private _Layout: PanelLayout;
  private _outputarea: OutputArea;

  constructor(notebookTracker: INotebookTracker){
    super();
    this.addClass('dou-DaskSidebar');
    let layout = (this.layout = new PanelLayout());
    this._Layout = layout;
    this._notebookTracker = notebookTracker;
    // this._hr = document.createElement('hr');

    const renderPeriodicTable = ReactWidget.create(
      <div className = "my-div">
    <input
      className = "jmol_button"
      type = "button"
      title = 'Jmol'
      // value="Open periodic table"
      draggable = {true}
      onDragOver = {ev => {ev.preventDefault()}}
      onDragStart={ev => ev.dataTransfer.setData("text", 'from jmolwidgets import WidgetJmol\njmol = WidgetJmol()\ndisplay(jmol)')}
      onClick={() => {
        const current = this._notebookTracker.currentWidget;

        if (current) {
          // return NotebookActions.hideCode(current.content);
          // return current.content.widgets[0].hide();

          current.content.widgets.forEach(cell => {
            if (
              current.content.isSelectedOrActive(cell) &&
              cell.model.type === 'code'
            ) {
              cell.model.value.text = 'from jmolwidgets import WidgetJmol\njmol = WidgetJmol()\ndisplay(jmol)';
              console.log((cell as CodeCell).inputArea.node.children[0].innerHTML + "#######");
              CodeCell.execute(cell as CodeCell, current.session);
              console.log((cell as CodeCell).inputArea.node.children[0].innerHTML + "&&&&&&&");
              if (this._outputarea !== undefined){
                this._Layout.removeWidgetAt(-1);
              }
              this._outputarea = (cell as CodeCell).outputArea;
              this.add_outputarea();
              // console.log((cell as CodeCell).inputArea.node.children[0].innerHTML + "$$$$$$$$$$");
              // layout.addWidget((cell as CodeCell).outputArea);
            }
          });
        }
      }}
    />
    <hr />
    </div>
)

    // renderOnSaveCheckbox.add("pt_button");
    layout.addWidget(renderPeriodicTable);
    let a: HTMLElement = document.createElement('hr');
    layout.parent.node.appendChild(a);
  }

    add_outputarea() {
      this._Layout.addWidget(this._outputarea);
  }
}
