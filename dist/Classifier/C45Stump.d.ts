import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class C45Stump extends Classifier {
    /**
     * Training algorithm for C4.5 Stump univariate decision tree classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
