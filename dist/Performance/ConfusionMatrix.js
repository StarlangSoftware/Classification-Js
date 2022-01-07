(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-datastructure/dist/CounterHashMap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfusionMatrix = void 0;
    const CounterHashMap_1 = require("nlptoolkit-datastructure/dist/CounterHashMap");
    class ConfusionMatrix {
        /**
         * Constructor that sets the class labels {@link Array} and creates new {@link Map} matrix
         *
         * @param classLabels {@link ArrayList} of String.
         */
        constructor(classLabels) {
            this.matrix = new Map();
            this.classLabels = classLabels;
        }
        /**
         * The classify method takes two Strings; actual class and predicted class as inputs. If the matrix {@link Map} contains
         * given actual class String as a key, it then assigns the corresponding object of that key to a {@link CounterHashMap}, if not
         * it creates a new {@link CounterHashMap}. Then, it puts the given predicted class String to the counterHashMap and
         * also put this counterHashMap to the matrix {@link Map} together with the given actual class String.
         *
         * @param actualClass    String input actual class.
         * @param predictedClass String input predicted class.
         */
        classify(actualClass, predictedClass) {
            let counterHashMap;
            if (this.matrix.has(actualClass)) {
                counterHashMap = this.matrix.get(actualClass);
            }
            else {
                counterHashMap = new CounterHashMap_1.CounterHashMap();
            }
            counterHashMap.put(predictedClass);
            this.matrix.set(actualClass, counterHashMap);
        }
        /**
         * The addConfusionMatrix method takes a {@link ConfusionMatrix} as an input and loops through actual classes of that {@link Map}
         * and initially gets one row at a time. Then it puts the current row to the matrix {@link Map} together with the actual class string.
         *
         * @param confusionMatrix {@link ConfusionMatrix} input.
         */
        addConfusionMatrix(confusionMatrix) {
            for (let actualClass of confusionMatrix.matrix.keys()) {
                let rowToBeAdded = confusionMatrix.matrix.get(actualClass);
                if (this.matrix.has(actualClass)) {
                    let currentRow = this.matrix.get(actualClass);
                    currentRow.add(rowToBeAdded);
                    this.matrix.set(actualClass, currentRow);
                }
                else {
                    this.matrix.set(actualClass, rowToBeAdded);
                }
            }
        }
        /**
         * The sumOfElements method loops through the keys in matrix {@link Map} and returns the summation of all the values of the keys.
         * I.e: TP+TN+FP+FN.
         *
         * @return The summation of values.
         */
        sumOfElements() {
            let result = 0;
            for (let actualClass of this.matrix.keys()) {
                result += this.matrix.get(actualClass).sumOfCounts();
            }
            return result;
        }
        /**
         * The trace method loops through the keys in matrix {@link Map} and if the current key contains the actual key,
         * it accumulates the corresponding values. I.e: TP+TN.
         *
         * @return Summation of values.
         */
        trace() {
            let result = 0;
            for (let actualClass of this.matrix.keys()) {
                if (this.matrix.get(actualClass).has(actualClass)) {
                    result += this.matrix.get(actualClass).get(actualClass);
                }
            }
            return result;
        }
        /**
         * The columnSum method takes a String predicted class as input, and loops through the keys in matrix {@link HashMap}.
         * If the current key contains the predicted class String, it accumulates the corresponding values. I.e: TP+FP.
         *
         * @param predictedClass String input predicted class.
         * @return Summation of values.
         */
        columnSum(predictedClass) {
            let result = 0;
            for (let actualClass of this.matrix.keys()) {
                if (this.matrix.get(actualClass).has(predictedClass)) {
                    result += this.matrix.get(actualClass).get(predictedClass);
                }
            }
            return result;
        }
        /**
         * The getAccuracy method returns the result of  TP+TN / TP+TN+FP+FN
         *
         * @return the result of  TP+TN / TP+TN+FP+FN
         */
        getAccuracy() {
            return this.trace() / this.sumOfElements();
        }
        /**
         * The precision method loops through the class labels and returns the resulting Array which has the result of TP/FP+TP.
         *
         * @return The result of TP/FP+TP.
         */
        precision() {
            let result = new Array(this.classLabels.length).fill(0);
            for (let i = 0; i < this.classLabels.length; i++) {
                let actualClass = this.classLabels[i];
                if (this.matrix.has(actualClass)) {
                    result[i] = this.matrix.get(actualClass).get(actualClass) / this.columnSum(actualClass);
                }
            }
            return result;
        }
        /**
         * The recall method loops through the class labels and returns the resulting Array which has the result of TP/FN+TP.
         *
         * @return The result of TP/FN+TP.
         */
        recall() {
            let result = new Array(this.classLabels.length).fill(0);
            for (let i = 0; i < this.classLabels.length; i++) {
                let actualClass = this.classLabels[i];
                if (this.matrix.has(actualClass)) {
                    result[i] = this.matrix.get(actualClass).get(actualClass) / this.matrix.get(actualClass).sumOfCounts();
                }
            }
            return result;
        }
        /**
         * The fMeasure method loops through the class labels and returns the resulting Array which has the average of
         * recall and precision.
         *
         * @return The average of recall and precision.
         */
        fMeasure() {
            let precision = this.precision();
            let recall = this.recall();
            let result = new Array(this.classLabels.length).fill(0);
            for (let i = 0; i < this.classLabels.length; i++) {
                result[i] = 2 / (1 / precision[i] + 1 / recall[i]);
            }
            return result;
        }
        /**
         * The weightedFMeasure method loops through the class labels and returns the resulting Array which has the weighted average of
         * recall and precision.
         *
         * @return The weighted average of recall and precision.
         */
        weightedFMeasure() {
            let fMeasure = this.fMeasure();
            let sum = 0;
            for (let i = 0; i < this.classLabels.length; i++) {
                let actualClass = this.classLabels[i];
                sum += fMeasure[i] * this.matrix.get(actualClass).sumOfCounts();
            }
            return sum / this.sumOfElements();
        }
    }
    exports.ConfusionMatrix = ConfusionMatrix;
});
//# sourceMappingURL=ConfusionMatrix.js.map