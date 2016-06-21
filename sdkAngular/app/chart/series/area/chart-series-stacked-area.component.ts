import { OptionsService } from "../../../navigation/options/options.service";
import { OptionsExampleBase } from "../../../options-example-base";
import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router-deprecated";
import { Page } from "ui/page";
import * as applicationModule from "application";
import { RadCartesianChart } from "nativescript-telerik-ui-pro/chart";
import { ObservableArray } from "data/observable-array";
import { Country } from '../country';
import { DataService } from '../data.service';

@Component({
    moduleId: module.id,
    selector: "chart-series-stacked-area",
    providers: [DataService],
    templateUrl: "chart-series-stacked-area.component.html"
})
export class ChartSeriesStackedAreaComponent extends OptionsExampleBase implements OnInit {
    private _optionsParamName: string;
    private _chart: RadCartesianChart;
    private _firstSeries: ObservableArray<Country>;
    private _secondSeries: ObservableArray<Country>;
    private _thirdSeries: ObservableArray<Country>;

    constructor( @Inject(Page) private _page: Page,
        private _optionsService: OptionsService, private _router: Router, private _changeDetectionRef: ChangeDetectorRef, private _dataService: DataService) {
        super();
        if (applicationModule.ios) {
            this._page.on("navigatingTo", this.onNavigatingTo, this);
            this._optionsParamName = "stackMode";
            this._optionsService.paramName = this._optionsParamName;
            this.router = _router;
            this.navigationParameters = { selectedIndex: 1, paramName: this._optionsParamName, items: ["Stack 100", "Stack", "None"] };
        }
    }

    get firstSeries(): ObservableArray<Country> {
        return this._firstSeries;
    }

    get secondSeries(): ObservableArray<Country> {
        return this._secondSeries;
    }

    get thirdSeries(): ObservableArray<Country> {
        return this._thirdSeries;
    }

    ngOnInit() {
        this._chart = <RadCartesianChart>this._page.getViewById("cartesianChart");
        this._firstSeries = new ObservableArray(this._dataService.getFirstSeries());
        this._secondSeries = new ObservableArray(this._dataService.getSecondSeries());
        this._thirdSeries = new ObservableArray(this._dataService.getThirdSeries());
        this.set("stackMode", "Stack");
    }

    ngAfterViewInit() {
        this._changeDetectionRef.detectChanges();
    }

    onNoneStackModeSelected() {
        this.set("stackMode", "None");
    }

    onStackModeSelected() {
        this.set("stackMode", "Stack");
    }

    onStack100ModeSelected() {
        this.set("stackMode", "Stack100");
    }

    public onNavigatingTo(args) {
        if (args.isBackNavigation) {
            if (this._optionsService.paramName == this._optionsParamName) {
                switch (this._optionsService.paramValue) {
                    case "Stack 100":
                        this.onStack100ModeSelected();
                        this.navigationParameters.selectedIndex = 0;
                        break;
                    case "Stack":
                        this.onStackModeSelected();
                        this.navigationParameters.selectedIndex = 1;
                        break;
                    case "None":
                        this.onNoneStackModeSelected();
                        this.navigationParameters.selectedIndex = 2;
                        break;
                    default:
                        break;
                }
            }
        }
    }
}