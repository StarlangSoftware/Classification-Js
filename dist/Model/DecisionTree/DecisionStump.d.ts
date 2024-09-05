import { DecisionTree } from "./DecisionTree";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class DecisionStump extends DecisionTree {
    /**
     * Training algorithm for C4.5 Stump univariate decision tree classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the decision tree model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName: string): void;
}
