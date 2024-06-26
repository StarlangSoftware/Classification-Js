(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Attribute/AttributeType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataDefinition = void 0;
    const AttributeType_1 = require("../Attribute/AttributeType");
    class DataDefinition {
        /**
         * Constructor for creating a new {@link DataDefinition} with given attribute types.
         *
         * @param attributeTypes Attribute types of the data definition.
         * @param attributeValueList Array of array of strings to represent all possible values of discrete features.
         */
        constructor(attributeTypes, attributeValueList) {
            if (attributeTypes != undefined) {
                this.attributeTypes = attributeTypes;
                if (attributeValueList != undefined) {
                    this.attributeValueList = attributeValueList;
                }
            }
        }
        /**
         * Returns number of distinct values for a given discrete attribute with index attributeIndex.
         * @param attributeIndex Index of the discrete attribute.
         * @return Number of distinct values for a given discrete attribute
         */
        numberOfValues(attributeIndex) {
            return this.attributeValueList[attributeIndex].length;
        }
        /**
         * Returns the index of the given value in the values list of the attributeIndex'th discrete attribute.
         * @param attributeIndex Index of the discrete attribute.
         * @param value Value of the discrete attribute
         * @return Index of the given value in the values list of the discrete attribute.
         */
        featureValueIndex(attributeIndex, value) {
            for (let i = 0; i < this.attributeValueList[attributeIndex].length; i++) {
                if (this.attributeValueList[attributeIndex][i] == value) {
                    return i;
                }
            }
            return -1;
        }
        /**
         * Returns the number of attribute types.
         *
         * @return Number of attribute types.
         */
        attributeCount() {
            return this.attributeTypes.length;
        }
        /**
         * Counts the occurrences of binary and discrete type attributes.
         *
         * @return Count of binary and discrete type attributes.
         */
        discreteAttributeCount() {
            let count = 0;
            for (let attributeType of this.attributeTypes) {
                if (attributeType == AttributeType_1.AttributeType.DISCRETE || attributeType == AttributeType_1.AttributeType.BINARY) {
                    count++;
                }
            }
            return count;
        }
        /**
         * Counts the occurrences of binary and continuous type attributes.
         *
         * @return Count of of binary and continuous type attributes.
         */
        continuousAttributeCount() {
            let count = 0;
            for (let attributeType of this.attributeTypes) {
                if (attributeType == AttributeType_1.AttributeType.CONTINUOUS) {
                    count++;
                }
            }
            return count;
        }
        /**
         * Returns the attribute type of the corresponding item at given index.
         *
         * @param index Index of the attribute type.
         * @return Attribute type of the corresponding item at given index.
         */
        getAttributeType(index) {
            return this.attributeTypes[index];
        }
        /**
         * Adds an attribute type to the list of attribute types.
         *
         * @param attributeType Attribute type to add to the list of attribute types.
         */
        addAttribute(attributeType) {
            this.attributeTypes.push(attributeType);
        }
        /**
         * Removes the attribute type at given index from the list of attributes.
         *
         * @param index Index to remove attribute type from list.
         */
        removeAttribute(index) {
            this.attributeTypes.splice(index, 1);
        }
        /**
         * Clears all the attribute types from list.
         */
        removeAllAttributes() {
            this.attributeTypes = new Array();
        }
        /**
         * Generates new subset of attribute types by using given feature subset.
         *
         * @param featureSubSet {@link FeatureSubSet} input.
         * @return DataDefinition with new subset of attribute types.
         */
        getSubSetOfFeatures(featureSubSet) {
            let newAttributeTypes = new Array();
            for (let i = 0; i < featureSubSet.size(); i++) {
                newAttributeTypes.push(this.attributeTypes[featureSubSet.get(i)]);
            }
            return new DataDefinition(newAttributeTypes);
        }
    }
    exports.DataDefinition = DataDefinition;
});
//# sourceMappingURL=DataDefinition.js.map