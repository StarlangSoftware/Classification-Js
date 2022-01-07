(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FeatureSubSet = void 0;
    class FeatureSubSet {
        /**
         * A constructor that takes number of features as input and initializes indexList with these numbers.
         *
         * @param numberOfFeaturesOrList Indicates the indices of indexList.
         */
        constructor(numberOfFeaturesOrList) {
            this.indexList = new Array();
            if (numberOfFeaturesOrList != undefined) {
                if (typeof numberOfFeaturesOrList == "number") {
                    for (let i = 0; i < numberOfFeaturesOrList; i++) {
                        this.indexList.push(i);
                    }
                }
                else {
                    this.indexList = numberOfFeaturesOrList;
                }
            }
        }
        /**
         * The clone method creates a new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
         *
         * @return A new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
         */
        clone() {
            let result = new FeatureSubSet(this.indexList.length);
            for (let i = 0; i < this.indexList.length; i++) {
                result.add(this.indexList[i]);
            }
            return result;
        }
        /**
         * The size method returns the size of the indexList.
         *
         * @return The size of the indexList.
         */
        size() {
            return this.indexList.length;
        }
        /**
         * The get method returns the item of indexList at given index.
         *
         * @param index Index of the indexList to be accessed.
         * @return The item of indexList at given index.
         */
        get(index) {
            return this.indexList[index];
        }
        /**
         * The contains method returns True, if indexList contains given input number and False otherwise.
         *
         * @param featureNo Feature number that will be checked.
         * @return True, if indexList contains given input number.
         */
        contains(featureNo) {
            return this.indexList.includes(featureNo);
        }
        /**
         * The add method adds given Integer to the indexList.
         *
         * @param featureNo Integer that will be added to indexList.
         */
        add(featureNo) {
            this.indexList.push(featureNo);
        }
        /**
         * The remove method removes the item of indexList at the given index.
         *
         * @param index Index of the item that will be removed.
         */
        remove(index) {
            this.indexList.splice(index, 1);
        }
    }
    exports.FeatureSubSet = FeatureSubSet;
});
//# sourceMappingURL=FeatureSubSet.js.map