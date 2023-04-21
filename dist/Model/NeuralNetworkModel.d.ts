import { ValidatedModel } from "./ValidatedModel";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { InstanceList } from "../InstanceList/InstanceList";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { Instance } from "../Instance/Instance";
import { ActivationFunction } from "../Parameter/ActivationFunction";
import { Random } from "nlptoolkit-util/dist/Random";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
export declare abstract class NeuralNetworkModel extends ValidatedModel {
    protected classLabels: Array<string>;
    protected K: number;
    protected d: number;
    protected x: Vector;
    protected y: Vector;
    protected r: Vector;
    protected abstract calculateOutput(): void;
    /**
     * Constructor that sets the class labels, their sizes as K and the size of the continuous attributes as d.
     *
     * @param trainSet {@link InstanceList} to use as train set.
     */
    protected constructor(trainSet?: InstanceList);
    /**
     * The allocateLayerWeights method returns a new {@link Matrix} with random weights.
     *
     * @param row    Number of rows.
     * @param column Number of columns.
     * @param random Random function to set weights.
     * @return Matrix with random weights.
     */
    protected allocateLayerWeights(row: number, column: number, random: Random): Matrix;
    /**
     * The normalizeOutput method takes an input {@link Vector} o, gets the result for e^o of each element of o,
     * then sums them up. At the end, divides each e^o by the summation.
     *
     * @param o Vector to normalize.
     * @return Normalized vector.
     */
    protected normalizeOutput(o: Vector): Vector;
    /**
     * The createInputVector method takes an {@link Instance} as an input. It converts given Instance to the {@link Vector}
     * and insert 1.0 to the first element.
     *
     * @param instance Instance to insert 1.0.
     */
    protected createInputVector(instance: Instance): void;
    /**
     * The calculateHidden method takes a {@link Vector} input and {@link Matrix} weights, It multiplies the weights
     * Matrix with given input Vector than applies the sigmoid function and returns the result.
     *
     * @param input   Vector to multiply weights.
     * @param weights Matrix is multiplied with input Vector.
     * @param activationFunction Activation function.
     * @return Result of sigmoid function.
     */
    protected calculateHidden(input: Vector, weights: Matrix, activationFunction: ActivationFunction): Vector;
    /**
     * The calculateOneMinusHidden method takes a {@link Vector} as input. It creates a Vector of ones and
     * returns the difference between given Vector.
     *
     * @param hidden Vector to find difference.
     * @return Returns the difference between one's Vector and input Vector.
     */
    protected calculateOneMinusHidden(hidden: Vector): Vector;
    /**
     * The calculateForwardSingleHiddenLayer method takes two matrices W and V. First it multiplies W with x, then
     * multiplies V with the result of the previous multiplication.
     *
     * @param W Matrix to multiply with x.
     * @param V Matrix to multiply.
     * @param activationFunction Activation function.
     */
    protected calculateForwardSingleHiddenLayer(W: Matrix, V: Matrix, activationFunction: ActivationFunction): void;
    /**
     * The calculateRMinusY method creates a new {@link Vector} with given Instance, then it multiplies given
     * input Vector with given weights Matrix. After normalizing the output, it returns the difference between the newly created
     * Vector and normalized output.
     *
     * @param instance Instance is used to get class labels.
     * @param input    Vector to multiply weights.
     * @param weights  Matrix of weights/
     * @return Difference between newly created Vector and normalized output.
     */
    protected calculateRMinusY(instance: Instance, input: Vector, weights: Matrix): Vector;
    /**
     * The predictWithCompositeInstance method takes an ArrayList possibleClassLabels. It returns the class label
     * which has the maximum value of y.
     *
     * @param possibleClassLabels ArrayList that has the class labels.
     * @return The class label which has the maximum value of y.
     */
    protected predictWithCompositeInstance(possibleClassLabels: Array<string>): string;
    /**
     * The predict method takes an {@link Instance} as an input, converts it to a Vector and calculates the {@link Matrix} y by
     * multiplying Matrix W with {@link Vector} x. Then it returns the class label which has the maximum y value.
     *
     * @param instance Instance to predict.
     * @return The class label which has the maximum y.
     */
    predict(instance: Instance): string;
    predictProbability(instance: Instance): Map<string, number>;
    loadClassLabels(input: FileContents): void;
    loadActivationFunction(input: FileContents): ActivationFunction;
}
