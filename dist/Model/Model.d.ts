import { Instance } from "../Instance/Instance";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
import { InstanceList } from "../InstanceList/InstanceList";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
export declare abstract class Model {
    abstract predict(instance: Instance): string;
    abstract predictProbability(instance: Instance): Map<string, number>;
    abstract saveTxt(fileName: String): void;
    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string;
    loadInstance(line: string, attributeTypes: string[]): Instance;
    loadInstanceList(input: FileContents): InstanceList;
    loadMatrix(input: FileContents): Matrix;
}
