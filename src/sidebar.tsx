import { Widget, PanelLayout } from '@phosphor/widgets';

import { ReactWidget } from "@jupyterlab/apputils";

import { INotebookTracker } from "@jupyterlab/notebook";

import { CodeCell } from "@jupyterlab/cells";

import { OutputArea } from "@jupyterlab/outputarea";

import * as React from "react";

export class chemSidebar extends Widget{

  private _notebookTracker: INotebookTracker;
  private _hr: HTMLElement;
  private _Layout: PanelLayout;
  private _outputarea: OutputArea;

  constructor(notebookTracker: INotebookTracker){
    super();
    this.addClass('dou-DaskSidebar');
    let layout = (this.layout = new PanelLayout());
    this._Layout = layout;
    this._notebookTracker = notebookTracker;
    this._hr = document.createElement('hr');

    const renderPeriodicTable = ReactWidget.create(
      <div className = "my-div">
    <input
      className = "pt_button"
      type = "button"
      title = 'Periodic Table'
      // value="Open periodic table"
      draggable = {true}
      onDragOver = {ev => {ev.preventDefault()}}
      onDragStart={ev => ev.dataTransfer.setData("text", 'from aiidalab_widget_periodictable import PTableWidget\nPTable = PTableWidget()\ndisplay(PTable)')}
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
              cell.model.value.text = 'from aiidalab_widget_periodictable import PTableWidget\nPTable = PTableWidget()\ndisplay(PTable)';
              CodeCell.execute(cell as CodeCell, current.session);
              console.log(cell.model.value.text);
            }
          });
        }

        console.log(this._notebookTracker.size + "test is working. &&&");
      }}
    />

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
              CodeCell.execute(cell as CodeCell, current.session);
              this._outputarea = (cell as CodeCell).outputArea;
              this.add_jmol();
              // layout.addWidget((cell as CodeCell).outputArea);
            }
          });
        }
      }}
    />

    <input
      className = "code_button"
      type = "button"
      title = 'Code Widget Input'
      // value="Open periodic table"
      draggable = {true}
      onDragOver = {ev => {ev.preventDefault()}}
      onDragStart={ev => ev.dataTransfer.setData("text", 'from widget_code_input import WidgetCodeInput\n'+
      'code_widget = WidgetCodeInput(function_name="my_example_code")\n' +
      'display(code_widget)')}
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
              cell.model.value.text = 'from widget_code_input import WidgetCodeInput\n'+
              'code_widget = WidgetCodeInput(function_name="my_example_code")\n' +
              'display(code_widget)';
              CodeCell.execute(cell as CodeCell, current.session);
              console.log(cell.model.value.text);
            }
          });
        }
      }}
    />
    </div>
)

    // renderOnSaveCheckbox.add("pt_button");
    layout.addWidget(renderPeriodicTable);
    layout.parent.node.appendChild(this._hr);

  }

  add_jmol(): void{
    this._Layout.addWidget(this._outputarea);
  }
}
