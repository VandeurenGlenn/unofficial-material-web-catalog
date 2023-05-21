import { LitElement } from 'lit';
import '@material/web/list/list-item-link.js';
import '@material/web/list/list.js';
import '@material/web/divider/divider.js';
import '@material/web/iconbutton/standard-icon-button.js';
import './doc-view.js';
import './catalog-view.js';
import '@material/web/list/list-item.js';
export declare class Shell extends LitElement {
    set isMobile(value: any);
    get isMobile(): any;
    docURL: string;
    static properties: {
        catalogShown: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    get _drawer(): HTMLElement;
    static styles: import("lit").CSSResult[];
    connectedCallback(): Promise<void>;
    select(wanted: any): void;
    _onhashchange(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1>;
}
