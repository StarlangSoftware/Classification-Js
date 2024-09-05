import { NeuralNetworkModel } from "./NeuralNetworkModel";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class LinearPerceptronModel extends NeuralNetworkModel {
    protected W: Matrix;
    /**
     * Loads a linear perceptron model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    /**
     * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
     * gradient descent.
     *
     * @param train   Training data given to the algorithm
     * @param params Parameters of the linear perceptron.
     */
    train(train: InstanceList, params: Parameter): void;
    /**
     * Loads the linear perceptron model from an input file.
     * @param fileName File name of the linear perceptron model.
     */
    loadModel(fileName: string): void;
}
