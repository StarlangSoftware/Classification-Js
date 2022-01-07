(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LaryFilter", "../Attribute/BinaryAttribute", "../Attribute/AttributeType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LaryToBinary = void 0;
    const LaryFilter_1 = require("./LaryFilter");
    const BinaryAttribute_1 = require("../Attribute/BinaryAttribute");
    const AttributeType_1 = require("../Attribute/AttributeType");
    class LaryToBinary extends LaryFilter_1.LaryFilter {
        /**
         * Converts the data definition with L-ary discrete attributes, to data definition with binary discrete attributes.
         */
        convertDataDefinition() {
            let dataDefinition = this.dataSet.getDataDefinition();
            let size = dataDefinition.attributeCount();
            for (let i = 0; i < size; i++) {
                if (this.attributeDistributions[i].size > 0) {
                    for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                        dataDefinition.addAttribute(AttributeType_1.AttributeType.BINARY);
                    }
                }
            }
            this.removeDiscreteAttributesFromDataDefinition(size);
        }
        /**
         * Converts discrete attributes of a single instance to binary discrete version using 1-of-L encoding. For example, if
         * an attribute has values red, green, blue; this attribute will be converted to 3 binary attributes where
         * red will have the value true false false, green will have the value false true false, and blue will have the value false false true.
         *
         * @param instance The instance to be converted.
         */
        convertInstance(instance) {
            let size = instance.attributeSize();
            for (let i = 0; i < size; i++) {
                if (this.attributeDistributions[i].size > 0) {
                    let index = this.attributeDistributions[i].getIndex(instance.getAttribute(i).toString());
                    for (let j = 0; j < this.attributeDistributions[i].size; j++) {
                        if (j != index) {
                            instance.addAttribute(new BinaryAttribute_1.BinaryAttribute(false));
                        }
                        else {
                            instance.addAttribute(new BinaryAttribute_1.BinaryAttribute(true));
                        }
                    }
                }
            }
            this.removeDiscreteAttributesFromInstance(instance, size);
        }
        /**
         * Constructor for L-ary discrete to binary discrete filter.
         *
         * @param dataSet The instances whose L-ary discrete attributes will be converted to binary discrete attributes.
         */
        constructor(dataSet) {
            super(dataSet);
        }
    }
    exports.LaryToBinary = LaryToBinary;
});
//# sourceMappingURL=LaryToBinary.js.map