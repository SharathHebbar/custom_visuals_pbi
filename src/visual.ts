"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private textNode: Text;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.updateCount = 0;

        if (document) {
            // Create and append elements for user input and button
            const container: HTMLElement = document.createElement("div");
            container.className = "container";

            const input: HTMLInputElement = document.createElement("input");
            input.type = "text";
            input.id = "userInput";
            input.className = "textbox";
            input.placeholder = "Enter your query here";
            container.appendChild(input);

            const button: HTMLButtonElement = document.createElement("button");
            button.className = "submit-button";
            button.innerText = "Submit";
            button.onclick = this.submitQuery.bind(this);
            container.appendChild(button);

            this.target.appendChild(container);

            // Create and append update count elements
            const new_p: HTMLElement = document.createElement("p");
            new_p.appendChild(document.createTextNode("Update count:"));
            const new_em: HTMLElement = document.createElement("em");
            this.textNode = document.createTextNode(this.updateCount.toString());
            new_em.appendChild(this.textNode);
            new_p.appendChild(new_em);
            this.target.appendChild(new_p);
        }
    }

    public update(options: VisualUpdateOptions) {
        let dataView = options.dataViews[0];
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, dataView);

        console.log('Visual update', options);
        if (this.textNode) {
            this.textNode.textContent = (this.updateCount++).toString();
        }
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }

    private submitQuery(): void {
        const userInput: string = (document.getElementById('userInput') as HTMLInputElement).value;
        console.log('User input:', userInput);

        // Here you would add the code to send the user input to the Python script in PowerBI
        // This might involve using PowerBI's data integration capabilities or other methods
    }
}
    