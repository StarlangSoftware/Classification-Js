import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class Dummy extends Classifier {
    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
