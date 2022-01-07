import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Partition} from "../InstanceList/Partition";
import {DeepNetworkParameter} from "../Parameter/DeepNetworkParameter";
import {DeepNetworkModel} from "../Model/DeepNetworkModel";

export class DeepNetwork extends Classifier{

    /**
     * Training algorithm for deep network classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters Parameters of the deep network algorithm. crossValidationRatio and seed are used as parameters.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let partition = new Partition(trainSet, (<DeepNetworkParameter> parameters).getCrossValidationRatio(), true);
        this.model = new DeepNetworkModel(partition.get(1), partition.get(0), <DeepNetworkParameter> parameters);
    }

}