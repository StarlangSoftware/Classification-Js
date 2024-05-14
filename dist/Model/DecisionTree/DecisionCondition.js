(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Attribute/DiscreteIndexedAttribute", "../../Attribute/DiscreteAttribute", "../../Attribute/ContinuousAttribute"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecisionCondition = void 0;
    const DiscreteIndexedAttribute_1 = require("../../Attribute/DiscreteIndexedAttribute");
    const DiscreteAttribute_1 = require("../../Attribute/DiscreteAttribute");
    const ContinuousAttribute_1 = require("../../Attribute/ContinuousAttribute");
    class DecisionCondition {
        /**
         * A constructor that sets attributeIndex, comparison and {@link Attribute} value.
         *
         * @param attributeIndex Integer number that shows attribute index.
         * @param value          The value of the {@link Attribute}.
         * @param comparison     Comparison character.
         */
        constructor(attributeIndex, value, comparison) {
            this.attributeIndex = -1;
            this.comparison = undefined;
            this.attributeIndex = attributeIndex;
            this.comparison = comparison;
            this.value = value;
        }
        /**
         * Accessor for the attribute index.
         * @return Attribute index.
         */
        getAttributeIndex() {
            return this.attributeIndex;
        }
        /**
         * Accessor for the value.
         * @return Value.
         */
        getValue() {
            return this.value;
        }
        /**
         * The satisfy method takes an {@link Instance} as an input.
         * <p>
         * If defined {@link Attribute} value is a {@link DiscreteIndexedAttribute} it compares the index of {@link Attribute} of instance at the
         * attributeIndex and the index of {@link Attribute} value and returns the result.
         * <p>
         * If defined {@link Attribute} value is a {@link DiscreteAttribute} it compares the value of {@link Attribute} of instance at the
         * attributeIndex and the value of {@link Attribute} value and returns the result.
         * <p>
         * If defined {@link Attribute} value is a {@link ContinuousAttribute} it compares the value of {@link Attribute} of instance at the
         * attributeIndex and the value of {@link Attribute} value and returns the result according to the comparison character whether it is
         * less than or greater than signs.
         *
         * @param instance Instance to compare.
         * @return True if gicen instance satisfies the conditions.
         */
        satisfy(instance) {
            if (this.value instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                if (this.value.getIndex() != -1) {
                    return instance.getAttribute(this.attributeIndex).getIndex() == this.value.getIndex();
                }
                else {
                    return true;
                }
            }
            else {
                if (this.value instanceof DiscreteAttribute_1.DiscreteAttribute) {
                    return (instance.getAttribute(this.attributeIndex).getValue() == this.value.getValue());
                }
                else {
                    if (this.value instanceof ContinuousAttribute_1.ContinuousAttribute) {
                        if (this.comparison == "<") {
                            return instance.getAttribute(this.attributeIndex).getValue() <= this.value.getValue();
                        }
                        else {
                            if (this.comparison == ">") {
                                return instance.getAttribute(this.attributeIndex).getValue() > this.value.getValue();
                            }
                        }
                    }
                }
            }
            return false;
        }
    }
    exports.DecisionCondition = DecisionCondition;
});
//# sourceMappingURL=DecisionCondition.js.map