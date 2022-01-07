import { Instance } from "../Instance/Instance";
export declare abstract class Model {
    abstract predict(instance: Instance): string;
    abstract predictProbability(instance: Instance): Map<string, number>;
    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string;
}
