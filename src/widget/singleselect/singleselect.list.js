/**
 * 选择列表
 *
 * Created by GUY on 2015/11/1.
 * @class BI.SingleSelectList
 * @extends BI.Widget
 */
BI.SingleSelectList = BI.inherit(BI.Widget, {
    
        _defaultConfig: function () {
            return BI.extend(BI.SingleSelectList.superclass._defaultConfig.apply(this, arguments), {
                baseCls: "bi-select-list",
                direction: BI.Direction.Top,//toolbar的位置
                logic: {
                    dynamic: true
                },
                items: [],
                itemsCreator: BI.emptyFn,
                hasNext: BI.emptyFn,
                onLoaded: BI.emptyFn,
                el: {
                    type: "bi.list_pane"
                }
            })
        },
        _init: function () {
            BI.SingleSelectList.superclass._init.apply(this, arguments);
            var self = this, o = this.options;
    
            this.list = BI.createWidget(o.el, {
                type: "bi.list_pane",
                items: o.items,
                itemsCreator: function (op, callback) {
                    o.itemsCreator(op, function (items) {
                        callback.apply(self, arguments);
                    });
                },
                onLoaded: o.onLoaded,
                hasNext: o.hasNext
            });
    
            this.list.on(BI.Controller.EVENT_CHANGE, function (type, value, obj) {
                if (type === BI.Events.CLICK) {
                    self.fireEvent(BI.SingleSelectList.EVENT_CHANGE, value, obj);
                }
                self.fireEvent(BI.Controller.EVENT_CHANGE, arguments);
            });

            BI.createWidget(BI.extend({
                element: this
            }, BI.LogicFactory.createLogic(BI.LogicFactory.createLogicTypeByDirection(o.direction), BI.extend({
                scrolly: true
            }, o.logic, {
                items: BI.LogicFactory.createLogicItemsByDirection(o.direction, this.list)
            }))));
    
        },
    
        hasPrev: function () {
            return this.list.hasPrev();
        },
    
        hasNext: function () {
            return this.list.hasNext();
        },
    
        prependItems: function (items) {
            this.list.prependItems.apply(this.list, arguments);
        },
    
        addItems: function (items) {
            this.list.addItems.apply(this.list, arguments);
        },
    
        setValue: function (data) {
            this.list["setValue"](data.value);
        },
    
        getValue: function () {
            return {
                type: BI.ButtonGroup.CHOOSE_TYPE_SINGLE,
                value: this.list.getValue(),
                assist: this.list.getNotSelectedValue()
            };
        },
    
        empty: function () {
            this.list.empty();
        },
    
        populate: function (items) {
            this.list.populate.apply(this.list, arguments);
        },
    
        resetHeight: function (h) {
            this.list.resetHeight ? this.list.resetHeight(h) :
                this.list.element.css({"max-height": h + "px"})
        },
    
        setNotSelectedValue: function () {
            this.list.setNotSelectedValue.apply(this.list, arguments);
        },
    
        getNotSelectedValue: function () {
            return this.list.getNotSelectedValue();
        },
    
        getAllButtons: function () {
            return this.list.getAllButtons();
        },
    
        getAllLeaves: function () {
            return this.list.getAllLeaves();
        },
    
        getSelectedButtons: function () {
            return this.list.getSelectedButtons();
        },
    
        getNotSelectedButtons: function () {
            return this.list.getNotSelectedButtons();
        },
    
        getIndexByValue: function (value) {
            return this.list.getIndexByValue(value);
        },
    
        getNodeById: function (id) {
            return this.list.getNodeById(id);
        },
    
        getNodeByValue: function (value) {
            return this.list.getNodeByValue(value);
        }
    });
    BI.SingleSelectList.EVENT_CHANGE = "EVENT_CHANGE";
    BI.shortcut("bi.single_select_list", BI.SingleSelectList);