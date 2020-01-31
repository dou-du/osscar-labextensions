import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { INotebookTracker } from "@jupyterlab/notebook";

import { chemSidebar } from './sidebar';

/**
 * Initialization data for the osscar-labextensions extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'osscar-labextensions',
  autoStart: true,
  activate: activate,
  requires: [
    INotebookTracker,
    ILabShell
  ]
};

function activate(
  app: JupyterFrontEnd,
  notebookTracker: INotebookTracker,
  labShell: ILabShell): void {

    const sidebar = new chemSidebar(notebookTracker);

    sidebar.id = 'testid';
    sidebar.title.iconClass = 'dou-DaskLogo jp-SideBar-tabIcon';
    sidebar.title.caption = 'OSSCAR';


    labShell.add(sidebar, 'left', { rank: 600 });

  }


export default extension;
