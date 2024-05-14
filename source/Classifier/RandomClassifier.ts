import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {RandomModel} from "../Model/RandomModel";

export class RandomClassifier extends Classifier{

    /**
     * Training algorithm for random classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let result = new Array<string>()
        for (let s of trainSet.classDistribution().keys()){
            result.push(s)
        }
        this.model = new RandomModel(result, parameters.getSeed());
    }

    /**
     * Loads the random classifier model from an input file.
     * @param fileName File name of the random classifier model.
     */
    loadModel(fileName: string): void{
        this.model = new RandomModel(fileName)
    }

}