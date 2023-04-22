import { LitElement } from 'lit';
import Showdown from 'showdown';
export declare class DocView extends LitElement {
    converter: Showdown.converter;
    set doc(value: any);
    stealColors(img: any): void;
    renderDoc(value: any): Promise<void>;
    constructor();
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
