"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscreteIndexedAttribute = void 0;
const DiscreteAttribute_1 = require("./DiscreteAttribute");
class DiscreteIndexedAttribute extends DiscreteAttribute_1.DiscreteAttribute {
    index;
    maxIndex;
    /**
     * Constructor for a discrete attribute.
     *
     * @param value Value of the attribute.
     * @param index Index of the attribute.
     * @param maxIndex Maximum index of the attribute.
     */
    constructor(value, index, maxIndex) {
        super(value);
        this.index = index;
        this.maxIndex = maxIndex;
    }
    /**
     * Accessor method for index.
     *
     * @return index.
     */
    getIndex() {
        return this.index;
    }
    /**
     * Accessor method for maxIndex.
     *
     * @return maxIndex.
     */
    getMaxIndex() {
        return this.maxIndex;
    }
    continuousAttributeSize() {
        return this.maxIndex;
    }
    continuousAttributes() {
        let result = new Array();
        for (let i = 0; i < this.maxIndex; i++) {
            if (i != this.index) {
                result.push(0.0);
            }
            else {
                result.push(1.0);
            }
        }
        return result;
    }
}
exports.DiscreteIndexedAttribute = DiscreteIndexedAttribute;
//# sourceMappingURL=DiscreteIndexedAttribute.js.map