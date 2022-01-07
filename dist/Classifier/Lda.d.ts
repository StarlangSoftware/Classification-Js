import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class Lda extends Classifier {
    /**
     * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
