/**
 * 使用display:table和display:table-cell实现的horizontal布局
 * @class BI.TableAdaptLayout
 * @extends BI.Layout
 */
BI.TableAdaptLayout = BI.inherit(BI.Layout, {
    props: function () {
        return BI.extend(BI.TableAdaptLayout.superclass.props.apply(this, arguments), {
            baseCls: "bi-table-center-adapt-layout",
            columnSize: [],
            verticalAlign: BI.VerticalAlign.Top,
            horizontalAlign: BI.HorizontalAlign.Left,
            scrollx: true,
            hgap: 0,
            vgap: 0,
            lgap: 0,
            rgap: 0,
            tgap: 0,
            bgap: 0
        });
    },
    render: function () {
        var o = this.options;
        BI.TableAdaptLayout.superclass.render.apply(this, arguments);
        this.$table = BI.Widget._renderEngine.createElement("<div>").css({
            position: "relative",
            display: "table",
            height: o.verticalAlign === BI.VerticalAlign.Middle ? "100%" : "auto",
            width: o.horizontalAlign === BI.HorizontalAlign.Center ? "100%" : "auto",
            "white-space": "nowrap"
        });
        this.populate(this.options.items);
    },

    _addElement: function (i, item) {

        var o = this.options;
        var td;
        var width = o.columnSize[i] <= 1 ? (o.columnSize[i] * 100 + "%") : o.columnSize[i];
        if (!this.hasWidget(this._getChildName(i))) {
            var w = BI.createWidget(item);
            w.element.css({position: "relative", top: "0", left: "0", margin: "0px auto"});
            td = BI.createWidget({
                type: "bi.default",
                width: width,
                items: [w]
            });
            this.addWidget(this._getChildName(i), td);
        } else {
            td = this.getWidgetByName(this._getChildName(i));
            td.element.width(width);
        }
        // 对于表现为td的元素设置最大宽度，有几点需要注意
        // 1、由于直接对td设置最大宽度是在规范中未定义的, 所以要使用类似td:firstChild来迂回实现
        // 2、不能给多个td设置最大宽度，这样只会平分宽度
        // 3、多百分比宽度就算了
        td.element.css({"max-width": o.columnSize[i] <= 1 ? width : width + "px"});
        if (i === 0) {
            td.element.addClass("first-element");
        }
        td.element.css({
            position: "relative",
            display: "table-cell",
            "vertical-align": o.verticalAlign,
            margin: "0",
            padding: "0",
            height: "100%"
        });
        if (o.vgap + o.tgap + (item.tgap || 0) + (item.vgap || 0) !== 0) {
            w.element.css({
                "margin-top": o.vgap + o.tgap + (item.tgap || 0) + (item.vgap || 0) + "px"
            });
        }
        if (o.hgap + o.lgap + (item.lgap || 0) + (item.hgap || 0) !== 0) {
            w.element.css({
                "margin-left": (i === 0 ? o.hgap : 0) + o.lgap + (item.lgap || 0) + (item.hgap || 0) + "px"
            });
        }
        if (o.hgap + o.rgap + (item.rgap || 0) + (item.hgap || 0) !== 0) {
            w.element.css({
                "margin-right": o.hgap + o.rgap + (item.rgap || 0) + (item.hgap || 0) + "px"
            });
        }
        if (o.vgap + o.bgap + (item.bgap || 0) + (item.vgap || 0) !== 0) {
            w.element.css({
                "margin-bottom": o.vgap + o.bgap + (item.bgap || 0) + (item.vgap || 0) + "px"
            });
        }
        return td;
    },

    appendFragment: function (frag) {
        this.$table.append(frag);
        this.element.append(this.$table);
    },

    resize: function () {
        // console.log("center_adapt布局不需要resize");
    },

    populate: function (items) {
        BI.TableAdaptLayout.superclass.populate.apply(this, arguments);
        this._mount();
    }
});
BI.shortcut("bi.table_adapt", BI.TableAdaptLayout);