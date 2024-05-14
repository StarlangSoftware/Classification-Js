import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {DummyModel} from "../Model/DummyModel";

export class Dummy extends Classifier{

    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.model = new DummyModel(trainSet);
    }

    /**
     * Loads the dummy model from an input file.
     * @param fileName File name of the dummy model.
     */
    loadModel(fileName: string): void{
        this.model = new DummyModel(fileName)
    }

}