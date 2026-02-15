"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContinuousAttribute = void 0;
const Attribute_1 = require("./Attribute");
class ContinuousAttribute extends Attribute_1.Attribute {
    value;
    /**
     * Constructor for a continuous attribute.
     *
     * @param value Value of the attribute.
     */
    constructor(value) {
        super();
        this.value = value;
    }
    /**
     * Accessor method for value.
     *
     * @return value
     */
    getValue() {
        return this.value;
    }
    /**
     * Mutator method for value
     *
     * @param value New value of value.
     */
    setValue(value) {
        this.value = value;
    }
    /**
     * Converts value to {@link String}.
     *
     * @return String representation of value.
     */
    toString() {
        return this.value.toString();
    }
    continuousAttributeSize() {
        return 1;
    }
    continuousAttributes() {
        let result = new Array();
        result.push(this.value);
        return result;
    }
}
exports.ContinuousAttribute = ContinuousAttribute;
//# sourceMappingURL=ContinuousAttribute.js.map