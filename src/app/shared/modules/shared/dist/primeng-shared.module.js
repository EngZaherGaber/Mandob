"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PrimeNgSharedModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var accordion_1 = require("primeng/accordion");
var autocomplete_1 = require("primeng/autocomplete");
var avatar_1 = require("primeng/avatar");
var button_1 = require("primeng/button");
var card_1 = require("primeng/card");
var carousel_1 = require("primeng/carousel");
var checkbox_1 = require("primeng/checkbox");
var confirmdialog_1 = require("primeng/confirmdialog");
var dataview_1 = require("primeng/dataview");
var datepicker_1 = require("primeng/datepicker");
var dialog_1 = require("primeng/dialog");
var editor_1 = require("primeng/editor");
var fileupload_1 = require("primeng/fileupload");
var floatlabel_1 = require("primeng/floatlabel");
var galleria_1 = require("primeng/galleria");
var iconfield_1 = require("primeng/iconfield");
var inputicon_1 = require("primeng/inputicon");
var inputnumber_1 = require("primeng/inputnumber");
var inputtext_1 = require("primeng/inputtext");
var keyfilter_1 = require("primeng/keyfilter");
var menu_1 = require("primeng/menu");
var multiselect_1 = require("primeng/multiselect");
var overlaybadge_1 = require("primeng/overlaybadge");
var panelmenu_1 = require("primeng/panelmenu");
var password_1 = require("primeng/password");
var rating_1 = require("primeng/rating");
var scroller_1 = require("primeng/scroller");
var scrollpanel_1 = require("primeng/scrollpanel");
var select_1 = require("primeng/select");
var selectbutton_1 = require("primeng/selectbutton");
var skeleton_1 = require("primeng/skeleton");
var slider_1 = require("primeng/slider");
var steps_1 = require("primeng/steps");
var table_1 = require("primeng/table");
var tabs_1 = require("primeng/tabs");
var tag_1 = require("primeng/tag");
var textarea_1 = require("primeng/textarea");
var toggleswitch_1 = require("primeng/toggleswitch");
var toolbar_1 = require("primeng/toolbar");
var tooltip_1 = require("primeng/tooltip");
var PrimeNgSharedModule = /** @class */ (function () {
    function PrimeNgSharedModule() {
    }
    PrimeNgSharedModule = __decorate([
        core_1.NgModule({
            declarations: [],
            exports: [
                overlaybadge_1.OverlayBadgeModule,
                inputicon_1.InputIconModule,
                tabs_1.TabsModule,
                panelmenu_1.PanelMenuModule,
                scroller_1.ScrollerModule,
                iconfield_1.IconFieldModule,
                slider_1.SliderModule,
                accordion_1.AccordionModule,
                confirmdialog_1.ConfirmDialogModule,
                galleria_1.GalleriaModule,
                common_1.CommonModule,
                inputnumber_1.InputNumberModule,
                dialog_1.DialogModule,
                checkbox_1.CheckboxModule,
                textarea_1.TextareaModule,
                dataview_1.DataViewModule,
                menu_1.MenuModule,
                autocomplete_1.AutoCompleteModule,
                table_1.TableModule,
                card_1.CardModule,
                avatar_1.AvatarModule,
                steps_1.StepsModule,
                editor_1.EditorModule,
                scrollpanel_1.ScrollPanelModule,
                multiselect_1.MultiSelectModule,
                floatlabel_1.FloatLabelModule,
                inputtext_1.InputTextModule,
                password_1.PasswordModule,
                select_1.SelectModule,
                datepicker_1.DatePickerModule,
                keyfilter_1.KeyFilterModule,
                button_1.ButtonModule,
                multiselect_1.MultiSelectModule,
                skeleton_1.SkeletonModule,
                tag_1.TagModule,
                selectbutton_1.SelectButtonModule,
                toggleswitch_1.ToggleSwitchModule,
                toolbar_1.ToolbarModule,
                fileupload_1.FileUploadModule,
                tooltip_1.TooltipModule,
                carousel_1.CarouselModule,
                rating_1.RatingModule,
            ]
        })
    ], PrimeNgSharedModule);
    return PrimeNgSharedModule;
}());
exports.PrimeNgSharedModule = PrimeNgSharedModule;
