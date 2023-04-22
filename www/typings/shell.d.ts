import { LitElement } from 'lit';
import '@material/web/list/list-item-link.js';
import '@material/web/list/list.js';
import '@material/web/divider/divider.js';
import './doc-view.js';
import './catalog-view.js';
export declare class Shell extends LitElement {
    docURL: string;
    static properties: {
        catalogShown: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    select(wanted: any): void;
    _onhashchange(): Promise<boolean>;
    render(): import("lit-html").TemplateResult<1>;
}
