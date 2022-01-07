import { Classifier } from "./Classifier";
import { Parameter } from "../Parameter/Parameter";
import { InstanceList } from "../InstanceList/InstanceList";
export declare class Qda extends Classifier {
    /**
     * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
