import {NeuralNetworkModel} from "./NeuralNetworkModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {ActivationFunction} from "../Parameter/ActivationFunction";
import {DeepNetworkParameter} from "../Parameter/DeepNetworkParameter";
import {InstanceList} from "../InstanceList/InstanceList";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {ClassificationPerformance} from "../Performance/ClassificationPerformance";
import {Random} from "nlptoolkit-util/dist/Random";

export class DeepNetworkModel extends NeuralNetworkModel{

    private weights: Array<Matrix>
    private hiddenLayerSize: number
    private readonly activationFunction: ActivationFunction

    /**
     * The allocateWeights method takes {@link DeepNetworkParameter}s as an input. First it adds random weights to the {@link Array}
     * of {@link Matrix} weights' first layer. Then it loops through the layers and adds random weights till the last layer.
     * At the end it adds random weights to the last layer and also sets the hiddenLayerSize value.
     *
     * @param parameters {@link DeepNetworkParameter} input.
     */
    private allocateWeights(parameters: DeepNetworkParameter){
        this.weights = new Array<Matrix>();
        this.weights.push(this.allocateLayerWeights(parameters.getHiddenNodes(0), this.d + 1, new Random(parameters.getSeed())));
        for (let i = 0; i < parameters.layerSize() - 1; i++) {
            this.weights.push(this.allocateLayerWeights(parameters.getHiddenNodes(i + 1), parameters.getHiddenNodes(i) + 1, new Random(parameters.getSeed())));
        }
        this.weights.push(this.allocateLayerWeights(this.K, parameters.getHiddenNodes(parameters.layerSize() - 1) + 1, new Random(parameters.getSeed())));
        this.hiddenLayerSize = parameters.layerSize();
    }

    /**
     * The setBestWeights method creates an {@link Array} of Matrix as bestWeights and clones the values of weights {@link Array}
     * into this newly created {@link Array}.
     *
     * @return An {@link Array} clones from the weights ArrayList.
     */
    private setBestWeights(): Array<Matrix>{
        let bestWeights = new Array<Matrix>();
        for (let m of this.weights) {
            bestWeights.push(m.clone());
        }
        return bestWeights;
    }

    /**
     * Constructor that takes two {@link InstanceList} train set and validation set and {@link DeepNetworkParameter} as inputs.
     * First it sets the class labels, their sizes as K and the size of the continuous attributes as d of given train set and
     * allocates weights and sets the best weights. At each epoch, it shuffles the train set and loops through the each item of that train set,
     * it multiplies the weights Matrix with input Vector than applies the sigmoid function and stores the result as hidden and add bias.
     * Then updates weights and at the end it compares the performance of these weights with validation set. It updates the bestClassificationPerformance and
     * bestWeights according to the current situation. At the end it updates the learning rate via etaDecrease value and finishes
     * with clearing the weights.
     *
     * @param trainSet      {@link InstanceList} to be used as trainSet.
     * @param validationSet {@link InstanceList} to be used as validationSet.
     * @param parameters    {@link DeepNetworkParameter} input.
     */
    constructor(trainSet: InstanceList, validationSet: InstanceList, parameters: DeepNetworkParameter) {
        super(trainSet);
        let tmpHidden = new Vector(0, 0);
        let deltaWeights = new Array<Matrix>();
        let hidden = new Array<Vector>();
        let hiddenBiased = new Array<Vector>();
        this.activationFunction = parameters.getActivationFunction();
        this.allocateWeights(parameters);
        let bestWeights = this.setBestWeights();
        let bestClassificationPerformance = new ClassificationPerformance(0.0);
        let epoch = parameters.getEpoch();
        let learningRate = parameters.getLearningRate();
        for (let i = 0; i < epoch; i++) {
            trainSet.shuffle(new Random(parameters.getSeed()));
            for (let j = 0; j < trainSet.size(); j++) {
                this.createInputVector(trainSet.get(j));
                hidden = new Array<Vector>();
                hiddenBiased = new Array<Vector>();
                deltaWeights = new Array<Matrix>();
                for (let k = 0; k < this.hiddenLayerSize; k++) {
                    if (k == 0) {
                        hidden.push(this.calculateHidden(this.x, this.weights[k], this.activationFunction));
                    } else {
                        hidden.push(this.calculateHidden(hiddenBiased[k - 1], this.weights[k], this.activationFunction));
                    }
                    hiddenBiased.push(hidden[k].biased());
                }
                let rMinusY = this.calculateRMinusY(trainSet.get(j), hiddenBiased[this.hiddenLayerSize - 1], this.weights[this.weights.length - 1]);
                deltaWeights.splice(0, 0, new Matrix(rMinusY, hiddenBiased[this.hiddenLayerSize - 1]));
                for (let k = this.weights.length - 2; k >= 0; k--) {
                    let tmph
                    if (k == this.weights.length - 2){
                        tmph = this.weights[k + 1].multiplyWithVectorFromLeft(rMinusY);
                    } else {
                        tmph = this.weights[k + 1].multiplyWithVectorFromLeft(tmpHidden);
                    }
                    tmph.remove(0);
                    let activationDerivative
                    switch (this.activationFunction){
                        case ActivationFunction.SIGMOID:
                        default:
                            let oneMinusHidden = this.calculateOneMinusHidden(hidden[k]);
                            activationDerivative = oneMinusHidden.elementProduct(hidden[k]);
                            break;
                        case ActivationFunction.TANH:
                            let one = new Vector(hidden.length, 1.0);
                            hidden[k].tanh();
                            activationDerivative = one.difference(hidden[k].elementProduct(hidden[k]));
                            break;
                        case ActivationFunction.RELU:
                            hidden[k].reluDerivative();
                            activationDerivative = hidden[k];
                            break;
                    }
                    tmpHidden = tmph.elementProduct(activationDerivative);
                    if (k == 0) {
                        deltaWeights.splice(0, 0, new Matrix(tmpHidden, this.x));
                    } else {
                        deltaWeights.splice(0, 0, new Matrix(tmpHidden, hiddenBiased[k - 1]));
                    }
                }
                for (let k = 0; k < this.weights.length; k++) {
                    deltaWeights[k].multiplyWithConstant(learningRate);
                    this.weights[k].add(deltaWeights[k]);
                }
            }
            let currentClassificationPerformance = this.testClassifier(validationSet);
            if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                bestClassificationPerformance = currentClassificationPerformance;
                bestWeights = this.setBestWeights();
            }
            learningRate *= parameters.getEtaDecrease();
        }
        this.weights = new Array<Matrix>();
        for (let m of bestWeights) {
            this.weights.push(m);
        }
    }

    /**
     * The calculateOutput method loops size of the weights times and calculate one hidden layer at a time and adds bias term.
     * At the end it updates the output y value.
     */
    protected calculateOutput(): void {
        let hiddenBiased
        for (let i = 0; i < this.weights.length - 1; i++) {
            let hidden
            if (i == 0) {
                hidden = this.calculateHidden(this.x, this.weights[i], this.activationFunction);
            } else {
                hidden = this.calculateHidden(hiddenBiased, this.weights[i], this.activationFunction);
            }
            hiddenBiased = hidden.biased();
        }
        this.y = this.weights[this.weights.length - 1].multiplyWithVectorFromRight(hiddenBiased);
    }

}