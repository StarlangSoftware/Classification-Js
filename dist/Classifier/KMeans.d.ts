import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class KMeans extends Classifier {
    /**
     * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
