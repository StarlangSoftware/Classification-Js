import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Partition} from "../InstanceList/Partition";
import {MultiLayerPerceptronParameter} from "../Parameter/MultiLayerPerceptronParameter";
import {MultiLayerPerceptronModel} from "../Model/MultiLayerPerceptronModel";

export class MultiLayerPerceptron extends Classifier{

    /**
     * Training algorithm for the multilayer perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the multilayer perceptron with
     * gradient descent.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the multilayer perceptron.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let partition = new Partition(trainSet, (<MultiLayerPerceptronParameter> parameters).getCrossValidationRatio(), true);
        this.model = new MultiLayerPerceptronModel(partition.get(1), partition.get(0), <MultiLayerPerceptronParameter> parameters);
    }

    loadModel(fileName: string): void{
        this.model = new MultiLayerPerceptronModel(fileName)
    }

}