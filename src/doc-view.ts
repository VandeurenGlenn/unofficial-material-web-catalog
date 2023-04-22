import { LitElement, html, css } from 'lit';
import Showdown from 'showdown'
import showdownHighlight from 'showdown-highlight';
import ColorThief from 'colorthief'
import { property } from 'lit/decorators.js';

const colorThief = new ColorThief();
// import manifest from './manifest.js';
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

export class DocView extends LitElement {
  converter: Showdown.converter

  @property({type: String})
  set doc(value) {
    this.renderDoc(value)
  }

  stealColors(img) {
    const colors = colorThief.getColor(img);
    const main = rgbToHex(colors[0] > 5 ? colors[0] - 5 : colors[0] , colors[1] > 5 ? colors[1] - 5 : colors[1] , colors[2]);
    let secondary = rgbToHex(colors[0], colors[1], colors[2]);
      
    secondary = `${secondary}78`;
    document.body.style.setProperty('--md-sys-color-surface', secondary)
    this.style.setProperty('--md-sys-color-surface', secondary)

    document.body.style.setProperty('--md-sys-color-primary', main)
    this.style.setProperty('--md-sys-color-primary', main)
  }

  async renderDoc(value) {
    await this.updateComplete
    const md = this.converter.makeHtml(value).replace(/src="images\//g, 'crossorigin="anonymous" src="https://raw.githubusercontent.com/material-components/material-web/master/docs/components/images/')
    this.innerHTML = md
    const img = this.querySelector('img');

    if (img.complete) {
      this.stealColors(img)
      
    } else {
      img.addEventListener('load', () => {
        this.stealColors(img)
      });
    }
  }
  constructor() {
    super()
    this.converter = new Showdown.Converter()
    this.converter.setFlavor('github')
    this.converter.addExtension(showdownHighlight, 'hljs')
  }
  static styles = [
    css`
      :host {
        display: block;
        max-width: 100%;
        box-sizing: border-box;
        padding: 12px 24px;
        position: absolute;
        max-width: 960px;
      }
    `
  ];

  render() {
    return html`<slot></slot>`;
  }
}
customElements.define('doc-view', DocView);
