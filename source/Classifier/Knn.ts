import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {KnnModel} from "../Model/KnnModel";
import {KnnParameter} from "../Parameter/KnnParameter";

export class Knn extends Classifier{


    /**
     * Training algorithm for K-nearest neighbor classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters K: k parameter of the K-nearest neighbor algorithm
     *                   distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.model = new KnnModel(trainSet, (<KnnParameter> parameters).getK(), (<KnnParameter> parameters).getDistanceMetric());
    }

    loadModel(fileName: string): void{
        this.model = new KnnModel(fileName)
    }

}