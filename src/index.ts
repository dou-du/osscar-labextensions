import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the osscar-labextensions extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'osscar-labextensions',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension osscar-labextensions is activated!');
  }
};

export default extension;
