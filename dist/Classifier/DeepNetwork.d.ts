import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class DeepNetwork extends Classifier {
    /**
     * Training algorithm for deep network classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters Parameters of the deep network algorithm. crossValidationRatio and seed are used as parameters.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
}
