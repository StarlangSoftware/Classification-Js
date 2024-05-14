export declare class ConfusionMatrix {
    private matrix;
    private readonly classLabels;
    /**
     * Constructor that sets the class labels {@link Array} and creates new {@link Map} matrix
     *
     * @param classLabels {@link ArrayList} of String.
     */
    constructor(classLabels: Array<string>);
    /**
     * The classify method takes two Strings; actual class and predicted class as inputs. If the matrix {@link Map} contains
     * given actual class String as a key, it then assigns the corresponding object of that key to a {@link CounterHashMap}, if not
     * it creates a new {@link CounterHashMap}. Then, it puts the given predicted class String to the counterHashMap and
     * also put this counterHashMap to the matrix {@link Map} together with the given actual class String.
     *
     * @param actualClass    String input actual class.
     * @param predictedClass String input predicted class.
     */
    classify(actualClass: string, predictedClass: string): void;
    /**
     * The addConfusionMatrix method takes a {@link ConfusionMatrix} as an input and loops through actual classes of that {@link Map}
     * and initially gets one row at a time. Then it puts the current row to the matrix {@link Map} together with the actual class string.
     *
     * @param confusionMatrix {@link ConfusionMatrix} input.
     */
    addConfusionMatrix(confusionMatrix: ConfusionMatrix): void;
    /**
     * The sumOfElements method loops through the keys in matrix {@link Map} and returns the summation of all the values of the keys.
     * I.e: TP+TN+FP+FN.
     *
     * @return The summation of values.
     */
    private sumOfElements;
    /**
     * The trace method loops through the keys in matrix {@link Map} and if the current key contains the actual key,
     * it accumulates the corresponding values. I.e: TP+TN.
     *
     * @return Summation of values.
     */
    private trace;
    /**
     * The columnSum method takes a String predicted class as input, and loops through the keys in matrix {@link HashMap}.
     * If the current key contains the predicted class String, it accumulates the corresponding values. I.e: TP+FP.
     *
     * @param predictedClass String input predicted class.
     * @return Summation of values.
     */
    private columnSum;
    /**
     * The getAccuracy method returns the result of  TP+TN / TP+TN+FP+FN
     *
     * @return the result of  TP+TN / TP+TN+FP+FN
     */
    getAccuracy(): number;
    /**
     * The precision method loops through the class labels and returns the resulting Array which has the result of TP/FP+TP.
     *
     * @return The result of TP/FP+TP.
     */
    precision(): Array<number>;
    /**
     * The recall method loops through the class labels and returns the resulting Array which has the result of TP/FN+TP.
     *
     * @return The result of TP/FN+TP.
     */
    recall(): Array<number>;
    /**
     * The fMeasure method loops through the class labels and returns the resulting Array which has the average of
     * recall and precision.
     *
     * @return The average of recall and precision.
     */
    fMeasure(): Array<number>;
    /**
     * The weightedFMeasure method loops through the class labels and returns the resulting Array which has the weighted average of
     * recall and precision.
     *
     * @return The weighted average of recall and precision.
     */
    weightedFMeasure(): number;
}
