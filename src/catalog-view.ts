import { ListItemLink } from '@material/web/list/lib/listitemlink/list-item-link.js';
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import '@material/web/elevation/elevation.js'

export class CatalogView extends LitElement {
  

  @property({type: Array})
  items

  static styles = [
    css`
      :host {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        box-sizing: border-box;
        padding: 12px 24px;
        max-width: 960px;
        position: absolute;
        transition-duration: 250ms;
        transition-timing-function: ease-in-out;

        --md-elevation-level:1;
      }

      .catalog-item {
        display: flex;
        flex-direction: column;
        width: calc(100% / 2);
        max-width: 440px;
      }
      img {
        max-width: 100%;
        aspect-ratio: 3.41333 / 1;
        height: auto;
      }
      a {
        display: flex;
        flex-direction: column;
        position: relative;
        margin-bottom: 6px;
      }

      md-elevation {
        position: absolute;
      }

      a:hover {
        --md-elevation-level: 3;
      }

      strong {
        display: flex;
        box-sizing: border-box;
        padding: 24px 12px;
        height: 56px;
        align-items: center;
      }
  
    `
  ];

  #pngOrGif(name) {
    if (name === 'icon' || name === 'focusring' || name === 'linearprogress') return 'gif'
    return 'png'
  }

  render() {
    const items = this.items
      .filter(item => !item.includes('quick-start') && !item.includes('theming'))
      .map(item => {
        const docName = item
        if (item.includes('-')) {
          const parts = item.split('-')
          item = ''
          for (const part of parts) {
            item += part
          }
        }
        return {name: item.replace('components/', ''), docName: docName.replace('components/', '')}
      })

    
    return html`
    ${map(items, item => {
      const img = `https://raw.githubusercontent.com/material-components/material-web/master/docs/components/images/${item.name === 'focusring' ? 'focus' : item.name}/hero.${this.#pngOrGif(item.name)}`
      return html`
      <a class="catalog-item" href="#!/${item.docName}">
      <md-elevation></md-elevation>
      <md-ripple></md-ripple>
        <strong href="#!/${item.docName}" headline=${item.name} noninteractive>${item.name}</strong>
        <img src=${img} loading="lazy">
      </a>
    `})
    }
    `;
  }

}
customElements.define('catalog-view', CatalogView);
