import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class MultiLayerPerceptron extends Classifier {
    /**
     * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
     * gradient descent.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the multilayer perceptron.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the multi-layer perceptron model from an input file.
     * @param fileName File name of the multi-layer perceptron model.
     */
    loadModel(fileName: string): void;
}
