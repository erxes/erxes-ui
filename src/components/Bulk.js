"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var utils_1 = require("../utils");
var Bulk = /** @class */ (function (_super) {
    __extends(Bulk, _super);
    function Bulk(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleBulk = function (target, toAdd) {
            var bulk = _this.state.bulk;
            // remove old entry
            bulk = bulk.filter(function (el) { return el._id !== target._id; });
            if (toAdd) {
                bulk.push(target);
            }
            _this.setState({ bulk: bulk });
        };
        _this.toggleAll = function (targets, containerId) {
            if (_this.state.isAllSelected) {
                _this.emptyBulk();
            }
            else {
                _this.setState({ bulk: targets });
            }
            var isAllSelected = _this.state.isAllSelected;
            utils_1.toggleCheckBoxes(containerId, !isAllSelected);
            _this.setState({ isAllSelected: !isAllSelected });
        };
        _this.emptyBulk = function () {
            var refetch = _this.props.refetch;
            if (refetch) {
                refetch();
            }
            _this.setState({ bulk: [], isAllSelected: false });
        };
        _this.state = { bulk: [], isAllSelected: false };
        return _this;
    }
    Bulk.prototype.render = function () {
        var _a = this, toggleBulk = _a.toggleBulk, toggleAll = _a.toggleAll, emptyBulk = _a.emptyBulk;
        var _b = this.state, bulk = _b.bulk, isAllSelected = _b.isAllSelected;
        return this.props.content({
            bulk: bulk,
            isAllSelected: isAllSelected,
            emptyBulk: emptyBulk,
            toggleBulk: toggleBulk,
            toggleAll: toggleAll
        });
    };
    return Bulk;
}(react_1["default"].Component));
exports["default"] = Bulk;
