import {NeuralNetworkModel} from "./NeuralNetworkModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {InstanceList} from "../../InstanceList/InstanceList";
import {LinearPerceptronParameter} from "../../Parameter/LinearPerceptronParameter";
import {ClassificationPerformance} from "../../Performance/ClassificationPerformance";
import {Random} from "nlptoolkit-util/dist/Random";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {Parameter} from "../../Parameter/Parameter";
import {Partition} from "../../InstanceList/Partition";

export class LinearPerceptronModel extends NeuralNetworkModel{

    protected W: Matrix

    /**
     * Loads a linear perceptron model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string){
        let input = new FileContents(fileName)
        this.loadClassLabels(input)
        this.W = this.loadMatrix(input)
    }

    /**
     * The calculateOutput method calculates the {@link Matrix} y by multiplying Matrix W with {@link Vector} x.
     */
    protected calculateOutput(): void {
        this.y = this.W.multiplyWithVectorFromRight(this.x);
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
     * gradient descent.
     *
     * @param train   Training data given to the algorithm
     * @param params Parameters of the linear perceptron.
     */
    train(train: InstanceList, params: Parameter): void {
        this.initialize(train)
        let parameters = <LinearPerceptronParameter> params
        let partition = new Partition(train, parameters.getCrossValidationRatio(), true);
        let trainSet = partition.get(1)
        let validationSet = partition.get(0)
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

    /**
     * Loads the linear perceptron model from an input file.
     * @param fileName File name of the linear perceptron model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}