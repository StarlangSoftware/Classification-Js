import {ValidatedModel} from "./ValidatedModel";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {InstanceList} from "../InstanceList/InstanceList";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {Instance} from "../Instance/Instance";
import {ActivationFunction} from "../Parameter/ActivationFunction";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {Random} from "nlptoolkit-util/dist/Random";

export abstract class NeuralNetworkModel extends ValidatedModel{

    protected classLabels: Array<string>
    protected K: number
    protected d: number
    protected x: Vector
    protected y: Vector
    protected r: Vector

    protected abstract calculateOutput(): void

    /**
     * Constructor that sets the class labels, their sizes as K and the size of the continuous attributes as d.
     *
     * @param trainSet {@link InstanceList} to use as train set.
     */
    protected constructor(trainSet: InstanceList) {
        super();
        this.classLabels = trainSet.getDistinctClassLabels()
        this.K = this.classLabels.length
        this.d = trainSet.get(0).continuousAttributeSize()
    }

    /**
     * The allocateLayerWeights method returns a new {@link Matrix} with random weights.
     *
     * @param row    Number of rows.
     * @param column Number of columns.
     * @param random Random function to set weights.
     * @return Matrix with random weights.
     */
    protected allocateLayerWeights(row: number, column: number, random: Random): Matrix{
        return new Matrix(row, column, -0.01, +0.01, random);
    }

    /**
     * The normalizeOutput method takes an input {@link Vector} o, gets the result for e^o of each element of o,
     * then sums them up. At the end, divides each e^o by the summation.
     *
     * @param o Vector to normalize.
     * @return Normalized vector.
     */
    protected normalizeOutput(o: Vector): Vector{
        let sum = 0.0;
        let values = new Array<number>()
        for (let i = 0; i < values.length; i++){
            sum += Math.exp(o.getValue(i));
        }
        for (let i = 0; i < values.length; i++){
            values.push(Math.exp(o.getValue(i)) / sum);
        }
        return new Vector(values);
    }

    /**
     * The createInputVector method takes an {@link Instance} as an input. It converts given Instance to the {@link Vector}
     * and insert 1.0 to the first element.
     *
     * @param instance Instance to insert 1.0.
     */
    protected createInputVector(instance: Instance){
        this.x = instance.toVector();
        this.x.insert(0, 1.0);
    }

    /**
     * The calculateHidden method takes a {@link Vector} input and {@link Matrix} weights, It multiplies the weights
     * Matrix with given input Vector than applies the sigmoid function and returns the result.
     *
     * @param input   Vector to multiply weights.
     * @param weights Matrix is multiplied with input Vector.
     * @param activationFunction Activation function.
     * @return Result of sigmoid function.
     */
    protected calculateHidden(input: Vector, weights: Matrix, activationFunction: ActivationFunction): Vector{
        let z = weights.multiplyWithVectorFromRight(input);
        switch (activationFunction){
            case ActivationFunction.SIGMOID:
            default:
                z.sigmoid();
                break;
            case ActivationFunction.TANH:
                z.tanh();
                break;
            case ActivationFunction.RELU:
                z.relu();
                break;
        }
        return z;
    }

    /**
     * The calculateOneMinusHidden method takes a {@link Vector} as input. It creates a Vector of ones and
     * returns the difference between given Vector.
     *
     * @param hidden Vector to find difference.
     * @return Returns the difference between one's Vector and input Vector.
     */
    protected calculateOneMinusHidden(hidden: Vector): Vector{
        let one = new Vector(hidden.size(), 1.0);
        return one.difference(hidden);
    }

    /**
     * The calculateForwardSingleHiddenLayer method takes two matrices W and V. First it multiplies W with x, then
     * multiplies V with the result of the previous multiplication.
     *
     * @param W Matrix to multiply with x.
     * @param V Matrix to multiply.
     * @param activationFunction Activation function.
     */
    protected calculateForwardSingleHiddenLayer(W: Matrix, V: Matrix, activationFunction: ActivationFunction){
        let hidden = this.calculateHidden(this.x, W, activationFunction);
        let hiddenBiased = hidden.biased();
        this.y = V.multiplyWithVectorFromRight(hiddenBiased);
    }

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
    protected calculateRMinusY(instance: Instance, input: Vector, weights: Matrix): Vector{
        this.r = new Vector(this.K, this.classLabels.indexOf(instance.getClassLabel()), 1.0);
        let o = weights.multiplyWithVectorFromRight(input);
        this.y = this.normalizeOutput(o);
        return this.r.difference(this.y);
    }

    /**
     * The predictWithCompositeInstance method takes an ArrayList possibleClassLabels. It returns the class label
     * which has the maximum value of y.
     *
     * @param possibleClassLabels ArrayList that has the class labels.
     * @return The class label which has the maximum value of y.
     */
    protected predictWithCompositeInstance(possibleClassLabels: Array<string>){
        let predictedClass = possibleClassLabels[0];
        let maxY = Number.NEGATIVE_INFINITY
        for (let i = 0; i < this.classLabels.length; i++) {
            if (possibleClassLabels.includes(this.classLabels[i]) && this.y.getValue(i) > maxY) {
                maxY = this.y.getValue(i);
                predictedClass = this.classLabels[i];
            }
        }
        return predictedClass;
    }

    /**
     * The predict method takes an {@link Instance} as an input, converts it to a Vector and calculates the {@link Matrix} y by
     * multiplying Matrix W with {@link Vector} x. Then it returns the class label which has the maximum y value.
     *
     * @param instance Instance to predict.
     * @return The class label which has the maximum y.
     */
    predict(instance: Instance): string {
        this.createInputVector(instance);
        this.calculateOutput();
        if (instance instanceof CompositeInstance) {
            return this.predictWithCompositeInstance((<CompositeInstance> instance).getPossibleClassLabels());
        } else {
            return this.classLabels[this.y.maxIndex()];
        }
    }

    predictProbability(instance: Instance): Map<string, number> {
        this.createInputVector(instance);
        this.calculateOutput();
        let result = new Map<string, number>();
        for (let i = 0; i < this.classLabels.length; i++){
            result.set(this.classLabels[i], this.y.getValue(i));
        }
        return result;
    }
}