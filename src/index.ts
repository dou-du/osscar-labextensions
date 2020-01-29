import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { Widget } from '@phosphor/widgets';

import '../style/index.css';

/**
 * Initialization data for the osscar-labextensions extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'osscar-labextensions',
  autoStart: true,
  activate: activate,
  requires: [
    ILabShell
  ]
};

function activate(
  app: JupyterFrontEnd,
  labShell: ILabShell): void {

    const sidebar = new DouSidebar();

    sidebar.id = 'testid';
    sidebar.title.iconClass = 'dou-DaskLogo jp-SideBar-tabIcon';
    sidebar.title.caption = 'OSSCAR';


    labShell.add(sidebar, 'left', { rank: 600 });

  }

export class DouSidebar extends Widget{
  constructor(){
    super();
    this.addClass('dou-DaskSidebar');
  }
}

export default extension;
