import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Partition} from "../InstanceList/Partition";
import {LinearPerceptronParameter} from "../Parameter/LinearPerceptronParameter";
import {LinearPerceptronModel} from "../Model/LinearPerceptronModel";

export class LinearPerceptron extends Classifier{

    /**
     * Training algorithm for the linear perceptron algorithm. 20 percent of the data is separated as cross-validation
     * data used for selecting the best weights. 80 percent of the data is used for training the linear perceptron with
     * gradient descent.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the linear perceptron.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let partition = new Partition(trainSet, (<LinearPerceptronParameter> parameters).getCrossValidationRatio(), true);
        this.model = new LinearPerceptronModel(partition.get(1), partition.get(0), <LinearPerceptronParameter> parameters);
    }

    /**
     * Loads the linear perceptron model from an input file.
     * @param fileName File name of the linear perceptron model.
     */
    loadModel(fileName: string): void{
        this.model = new LinearPerceptronModel(fileName)
    }

}