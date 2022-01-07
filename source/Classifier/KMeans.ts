import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Partition} from "../InstanceList/Partition";
import {KMeansModel} from "../Model/KMeansModel";
import {KMeansParameter} from "../Parameter/KMeansParameter";

export class KMeans extends Classifier{

    /**
     * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let priorDistribution = trainSet.classDistribution();
        let classMeans = new InstanceList();
        let classLists = new Partition(trainSet);
        for (let i = 0; i < classLists.size(); i++) {
            classMeans.add(classLists.get(i).average());
        }
        this.model = new KMeansModel(priorDistribution, classMeans, (<KMeansParameter> parameters).getDistanceMetric());
    }

}