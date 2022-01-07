import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class Knn extends Classifier {
    /**
     * Training algorithm for K-nearest neighbor classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters K: k parameter of the K-nearest neighbor algorithm
     *                   distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
