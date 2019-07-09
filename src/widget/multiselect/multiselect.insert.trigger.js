/**
 *
 * 复选下拉框
 * @class BI.MultiSelectInsertTrigger
 * @extends BI.Trigger
 */

BI.MultiSelectInsertTrigger = BI.inherit(BI.Trigger, {

    constants: {
        height: 14,
        rgap: 4,
        lgap: 4
    },

    _defaultConfig: function () {
        return BI.extend(BI.MultiSelectInsertTrigger.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-multi-select-trigger bi-border",
            itemsCreator: BI.emptyFn,
            valueFormatter: BI.emptyFn,
            searcher: {},
            switcher: {},

            adapter: null,
            masker: {},
            allowEdit: true
        });
    },

    _init: function () {
        BI.MultiSelectInsertTrigger.superclass._init.apply(this, arguments);

        var self = this, o = this.options;
        if (o.height) {
            this.setHeight(o.height - 2);
        }

        this.searcher = BI.createWidget(o.searcher, {
            type: "bi.multi_select_insert_searcher",
            height: o.height,
            text: o.text,
            itemsCreator: o.itemsCreator,
            valueFormatter: o.valueFormatter,
            popup: {},
            adapter: o.adapter,
            masker: o.masker,
            value: o.value
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_START, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_START);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_ADD_ITEM, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_ADD_ITEM);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_PAUSE, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_PAUSE);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_SEARCHING, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_SEARCHING, arguments);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_STOP, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_STOP);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_CHANGE, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_CHANGE, arguments);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_BLUR, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_BLUR);
        });
        this.searcher.on(BI.MultiSelectInsertSearcher.EVENT_FOCUS, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_FOCUS);
        });
        this.numberCounter = BI.createWidget(o.switcher, {
            type: "bi.multi_select_check_selected_switcher",
            valueFormatter: o.valueFormatter,
            itemsCreator: o.itemsCreator,
            adapter: o.adapter,
            masker: o.masker,
            value: o.value
        });
        this.numberCounter.on(BI.MultiSelectCheckSelectedSwitcher.EVENT_TRIGGER_CHANGE, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_COUNTER_CLICK);
        });
        this.numberCounter.on(BI.MultiSelectCheckSelectedSwitcher.EVENT_BEFORE_POPUPVIEW, function () {
            self.fireEvent(BI.MultiSelectInsertTrigger.EVENT_BEFORE_COUNTER_POPUPVIEW);
        });

        var wrapNumberCounter = BI.createWidget({
            type: "bi.right_vertical_adapt",
            hgap: 4,
            items: [{
                el: this.numberCounter
            }]
        });

        var wrapper = BI.createWidget({
            type: "bi.htape",
            element: this,
            items: [
                {
                    el: this.searcher,
                    width: "fill"
                }, {
                    el: wrapNumberCounter,
                    width: 0
                }, {
                    el: BI.createWidget(),
                    width: 24
                }]
        });

        !o.allowEdit && BI.createWidget({
            type: "bi.absolute",
            element: this,
            items: [{
                el: {
                    type: "bi.layout"
                },
                left: 0,
                right: 24,
                top: 0,
                bottom: 0
            }]
        });

        this.numberCounter.on(BI.Events.VIEW, function (b) {
            BI.nextTick(function () {// 自动调整宽度
                wrapper.attr("items")[1].width = (b === true ? self.numberCounter.element.outerWidth() + 8 : 0);
                wrapper.resize();
            });
        });

        this.element.click(function (e) {
            if (self.element.find(e.target).length > 0) {
                self.numberCounter.hideView();
            }
        });
    },

    getCounter: function () {
        return this.numberCounter;
    },

    getSearcher: function () {
        return this.searcher;
    },

    stopEditing: function () {
        this.searcher.stopSearch();
        this.numberCounter.hideView();
    },

    setAdapter: function (adapter) {
        this.searcher.setAdapter(adapter);
        this.numberCounter.setAdapter(adapter);
    },

    setValue: function (ob) {
        this.searcher.setValue(ob);
        this.numberCounter.setValue(ob);
    },

    getKey: function () {
        return this.searcher.getKey();
    },

    getValue: function () {
        return this.searcher.getValue();
    }
});

BI.MultiSelectInsertTrigger.EVENT_TRIGGER_CLICK = "EVENT_TRIGGER_CLICK";
BI.MultiSelectInsertTrigger.EVENT_COUNTER_CLICK = "EVENT_COUNTER_CLICK";
BI.MultiSelectInsertTrigger.EVENT_CHANGE = "EVENT_CHANGE";
BI.MultiSelectInsertTrigger.EVENT_START = "EVENT_START";
BI.MultiSelectInsertTrigger.EVENT_STOP = "EVENT_STOP";
BI.MultiSelectInsertTrigger.EVENT_PAUSE = "EVENT_PAUSE";
BI.MultiSelectInsertTrigger.EVENT_SEARCHING = "EVENT_SEARCHING";
BI.MultiSelectInsertTrigger.EVENT_BEFORE_COUNTER_POPUPVIEW = "EVENT_BEFORE_COUNTER_POPUPVIEW";
BI.MultiSelectInsertTrigger.EVENT_ADD_ITEM = "EVENT_ADD_ITEM";
BI.MultiSelectInsertTrigger.EVENT_FOCUS = "EVENT_FOCUS";
BI.MultiSelectInsertTrigger.EVENT_BLUR = "EVENT_BLUR";

BI.shortcut("bi.multi_select_insert_trigger", BI.MultiSelectInsertTrigger);