import { NeuralNetworkModel } from "./NeuralNetworkModel";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { InstanceList } from "../InstanceList/InstanceList";
import { LinearPerceptronParameter } from "../Parameter/LinearPerceptronParameter";
export declare class LinearPerceptronModel extends NeuralNetworkModel {
    protected W: Matrix;
    constructor1(trainSet: InstanceList, validationSet?: InstanceList, parameters?: LinearPerceptronParameter): void;
    constructor2(fileName: string): void;
    /**
     * Constructor that takes {@link InstanceList}s as trainsSet and validationSet. Initially it allocates layer weights,
     * then creates an input vector by using given trainSet and finds error. Via the validationSet it finds the classification
     * performance and at the end it reassigns the allocated weight Matrix with the matrix that has the best accuracy.
     *
     * @param trainSetOrFileName      InstanceList that is used to train.
     * @param validationSet InstanceList that is used to validate.
     * @param parameters    Linear perceptron parameters; learningRate, etaDecrease, crossValidationRatio, epoch.
     */
    constructor(trainSetOrFileName?: InstanceList | string, validationSet?: InstanceList, parameters?: LinearPerceptronParameter);
    /**
     * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
     */
    protected calculateOutput(): void;
    saveTxt(fileName: string): void;
}
