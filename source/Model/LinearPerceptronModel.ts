import {NeuralNetworkModel} from "./NeuralNetworkModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {InstanceList} from "../InstanceList/InstanceList";
import {LinearPerceptronParameter} from "../Parameter/LinearPerceptronParameter";
import {ClassificationPerformance} from "../Performance/ClassificationPerformance";

export class LinearPerceptronModel extends NeuralNetworkModel{

    protected W: Matrix

    /**
     * Constructor that takes {@link InstanceList}s as trainsSet and validationSet. Initially it allocates layer weights,
     * then creates an input vector by using given trainSet and finds error. Via the validationSet it finds the classification
     * performance and at the end it reassigns the allocated weight Matrix with the matrix that has the best accuracy.
     *
     * @param trainSet      InstanceList that is used to train.
     * @param validationSet InstanceList that is used to validate.
     * @param parameters    Linear perceptron parameters; learningRate, etaDecrease, crossValidationRatio, epoch.
     */
    constructor(trainSet: InstanceList, validationSet?: InstanceList, parameters?: LinearPerceptronParameter) {
        super(trainSet);
        if (validationSet != undefined){
            let W = this.allocateLayerWeights(this.K, this.d + 1);
            let bestW = W.clone();
            let bestClassificationPerformance = new ClassificationPerformance(0.0);
            let epoch = parameters.getEpoch();
            let learningRate = parameters.getLearningRate();
            for (let i = 0; i < epoch; i++) {
                trainSet.shuffle(parameters.getSeed());
                for (let j = 0; j < trainSet.size(); j++) {
                    this.createInputVector(trainSet.get(j));
                    let rMinusY = this.calculateRMinusY(trainSet.get(j), this.x, W);
                    let deltaW = new Matrix(rMinusY, this.x);
                    deltaW.multiplyWithConstant(learningRate);
                    W.add(deltaW);
                }
                let currentClassificationPerformance = this.testClassifier(validationSet);
                if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                    bestClassificationPerformance = currentClassificationPerformance;
                    bestW = W.clone();
                }
                learningRate *= parameters.getEtaDecrease();
            }
            W = bestW;
        }
    }

    /**
     * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
     */
    protected calculateOutput(): void {
        this.y = this.W.multiplyWithVectorFromRight(this.x);
    }

}