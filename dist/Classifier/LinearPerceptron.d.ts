import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class LinearPerceptron extends Classifier {
    /**
     * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
     * gradient descent.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the linear perceptron.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    loadModel(fileName: string): void;
}
