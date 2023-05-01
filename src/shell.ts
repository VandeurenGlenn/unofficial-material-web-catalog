import { LitElement, html, css } from 'lit';
import { map } from 'lit/directives/map.js'
import { customElement, property } from 'lit/decorators.js'
import '@material/web/list/list-item-link.js'
import '@material/web/list/list.js'
import '@material/web/divider/divider.js'
import '@material/web/iconbutton/standard-icon-button.js'
import './doc-view.js'
import './catalog-view.js'

const manifest = [
  'quick-start',
  'theming',
  'components/button',
  'components/checkbox',
  'components/divider',
  'components/elevation',
  'components/icon-button',
  'components/icon'
]

@customElement('app-shell')
export class Shell extends LitElement {
  @property({type: Boolean, reflect: true })
  
  @property({type: Boolean, reflect: true })
  set isMobile(value) {
    console.log('isMobile');
    if (this._isMobile === value) return
    this._isMobile = value
    if (value) {
      this._drawer.setAttribute('type', 'modal')
      this._drawer.removeAttribute('open')
      this.setAttribute('isMobile', '')
    } else {
      this._drawer.setAttribute('type', 'dismissible')
      this._drawer.setAttribute('open', '')
      this.removeAttribute('isMobile')
    }
    console.log('isMobile');
    document.dispatchEvent(new CustomEvent('layout-change', { detail: value ? 'mobile' : 'desktop'}))
  }

  get isMobile() {
    return this._isMobile
  }
  
  docURL = 'https://raw.githubusercontent.com/material-components/material-web/main/docs/';

  static properties = {
    catalogShown: { type: Boolean, reflect: true}  
  }
  

  get _drawer() {
    return this.renderRoot.querySelector('aside')
  }
  static styles = [
    css`
      :host {
        display: flex;
        position: relative;
        flex-direction: column;
        height: 100%; 
        inset: 0px;
        --header-height: 64px;
        --drawer-width: 300px;
        --main-background: var(--md-sys-color-surface, #fef7ff);
        --header-background: var(--md-sys-color-primary, #fef7ff);
        --md-sys-color-on-surface: #333;
        overflow: hidden;
      }

      header {
        display: flex;
        height: var(--header-height);
        background-color: var(--header-background);
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        padding: 12px;
      }

      aside {
        overflow: hidden;
        width: 300px;
        max-width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-sizing: border-box;
        position: absolute;
        top: var(--header-height);
        bottom: 0;
        left: 0;
        background: var(--header-background);
        z-index: 1000;
      }

      [divider] {
        height: 0px;
        margin: 0px;
        border-top: none;
        border-right: none;
        border-left: none;
        border-image: initial;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }

      catalog-view {
        opacity: 0;
        pointer-events: none;
      }

      doc-view {
        display: flex;
        flex-direction: column;
        opacity: 1;
      }

      img {
        max-width: 100%;
        aspect-ratio: 3.41333 / 1;
        height: auto;
      }

      :host([catalogShown]) catalog-view {
        opacity: 1;
        pointer-events: auto;
      }

      :host([catalogShown]) doc-view {
        opacity: 0;
        pointer-events: none;
      }

      main {
        align-items: center;
        box-sizing: border-box;
        position: absolute;
        right: 0px;
        bottom: 0px;
        top: var(--header-height);
        display: flex;
        width: calc(100% - var(--drawer-width));
        background: var(--main-background);

        overflow: hidden;
        overflow-y: auto;
        flex-direction: column;
        display: flex;
      }

      .menu-button {
        opacity: 0;
        pointer-events: none;
      }
      
      :host([isMobile]) .menu-button {
        opacity: 1;
        pointer-events: auto;
      }

      :host([isMobile]) main {
        width: 100%;
      }

      :host([isMobile]) aside {
        position: fixed;
        transform: translateX(-110%);
      }

      :host([isMobile]) aside[open] {
        transform: translateX(0);
      }
    `
  ];

  async connectedCallback(): Promise<void> {
    super.connectedCallback()
    await this.updateComplete
    let media = matchMedia("(min-width: 1200px)");
    const onMedia = ({matches}) => {
      this.isMobile = !matches
    }
    media.addEventListener('change', onMedia)
    onMedia(media)
    onhashchange = this._onhashchange.bind(this)
    if (!location.hash) location.hash = '#!/catalog'
    else this._onhashchange()
  }

  select(wanted) {
    location.hash = `#!/${wanted}`
  }

  async _onhashchange() {
    const parts = location.hash.split('#!/')
    const view = parts[1]
    
    if (view === 'catalog') return this.catalogShown = true
    this.catalogShown = false
    const response = await fetch(`${this.docURL}${view}.md`)
    this.renderRoot.querySelector('doc-view').isComponent = view.includes('components/')
    this.renderRoot.querySelector('doc-view').doc = await response.text()
  }

  render() {
    return html`
    
    <link rel="stylesheet" href="./styles/hljs/default.css">
    <aside>
      <md-list>
        <md-list-item-link href="#!/catalog" headline="catalog">catalog</md-list-item-link>
        <md-divider role="seperator"></md-divider>
        ${map(manifest, (key) => html`
          <md-list-item-link href="#!/${key}" headline=${key}>${key}</md-list-item-link>
        `)}
      </md-list>
    </aside>

    <header>
    <md-standard-icon-button class="menu-button" @click=${() => this._drawer.hasAttribute('open') ? this._drawer.removeAttribute('open') : this._drawer.setAttribute('open', '')}>menu</md-standard-icon-button>
    </header>
    <main>
      <doc-view></doc-view>
      <catalog-view .items=${manifest}></catalog-view>
    </main>
    
    `;
  }
}
