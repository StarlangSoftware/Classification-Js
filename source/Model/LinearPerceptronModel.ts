import {NeuralNetworkModel} from "./NeuralNetworkModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {InstanceList} from "../InstanceList/InstanceList";
import {LinearPerceptronParameter} from "../Parameter/LinearPerceptronParameter";
import {ClassificationPerformance} from "../Performance/ClassificationPerformance";
import {Random} from "nlptoolkit-util/dist/Random";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class LinearPerceptronModel extends NeuralNetworkModel{

    protected W: Matrix

    constructor1(trainSet: InstanceList, validationSet?: InstanceList, parameters?: LinearPerceptronParameter){
        if (validationSet != undefined){
            this.W = this.allocateLayerWeights(this.K, this.d + 1, new Random(parameters.getSeed()));
            let bestW = this.W.clone();
            let bestClassificationPerformance = new ClassificationPerformance(0.0)
            let epoch = parameters.getEpoch()
            let learningRate = parameters.getLearningRate()
            for (let i = 0; i < epoch; i++) {
                trainSet.shuffle(new Random(parameters.getSeed()))
                for (let j = 0; j < trainSet.size(); j++) {
                    this.createInputVector(trainSet.get(j))
                    let rMinusY = this.calculateRMinusY(trainSet.get(j), this.x, this.W)
                    let deltaW = new Matrix(rMinusY, this.x);
                    deltaW.multiplyWithConstant(learningRate);
                    this.W.add(deltaW)
                }
                let currentClassificationPerformance = this.testClassifier(validationSet)
                if (currentClassificationPerformance.getAccuracy() > bestClassificationPerformance.getAccuracy()) {
                    bestClassificationPerformance = currentClassificationPerformance
                    bestW = this.W.clone()
                }
                learningRate *= parameters.getEtaDecrease()
            }
            this.W = bestW
        }
    }

    constructor2(fileName: string){
        let input = new FileContents(fileName)
        this.loadClassLabels(input)
        this.W = this.loadMatrix(input)
    }

    /**
     * Constructor that takes {@link InstanceList}s as trainsSet and validationSet. Initially it allocates layer weights,
     * then creates an input vector by using given trainSet and finds error. Via the validationSet it finds the classification
     * performance and at the end it reassigns the allocated weight Matrix with the matrix that has the best accuracy.
     *
     * @param trainSetOrFileName      InstanceList that is used to train.
     * @param validationSet InstanceList that is used to validate.
     * @param parameters    Linear perceptron parameters; learningRate, etaDecrease, crossValidationRatio, epoch.
     */
    constructor(trainSetOrFileName?: InstanceList | string, validationSet?: InstanceList, parameters?: LinearPerceptronParameter) {
        if (trainSetOrFileName instanceof InstanceList){
            if (validationSet != undefined){
                super(trainSetOrFileName)
                this.constructor1(trainSetOrFileName, validationSet, parameters)
            } else {
                super(trainSetOrFileName)
            }
        } else {
            if (trainSetOrFileName != undefined){
                super()
                this.constructor2(trainSetOrFileName)
            } else {
                super()
            }
        }
    }

    /**
     * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
     */
    protected calculateOutput(): void {
        this.y = this.W.multiplyWithVectorFromRight(this.x);
    }

    saveTxt(fileName: string){
    }

}