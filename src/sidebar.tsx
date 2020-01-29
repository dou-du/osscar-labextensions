import { Widget, PanelLayout } from '@phosphor/widgets';

export class chemSidebar extends Widget{
  constructor(){
    super();
    this.addClass('dou-DaskSidebar');
    this.layout = new PanelLayout();
  }
}
