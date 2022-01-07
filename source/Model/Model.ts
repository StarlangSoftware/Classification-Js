import {Instance} from "../Instance/Instance";
import {CounterHashMap} from "nlptoolkit-datastructure/dist/CounterHashMap";

export abstract class Model {

    abstract predict(instance: Instance): string
    abstract predictProbability(instance: Instance): Map<string, number>

    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string{
        let frequencies = new CounterHashMap<string>();
        for (let label of classLabels) {
            frequencies.put(label);
        }
        return frequencies.max();
    }
}