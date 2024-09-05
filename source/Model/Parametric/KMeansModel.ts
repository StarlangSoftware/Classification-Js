import {GaussianModel} from "./GaussianModel";
import {InstanceList} from "../../InstanceList/InstanceList";
import {DistanceMetric} from "../../DistanceMetric/DistanceMetric";
import {Instance} from "../../Instance/Instance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {EuclidianDistance} from "../../DistanceMetric/EuclidianDistance";
import {Parameter} from "../../Parameter/Parameter";
import {Partition} from "../../InstanceList/Partition";
import {KMeansParameter} from "../../Parameter/KMeansParameter";

export class KMeansModel extends GaussianModel{

    private classMeans: InstanceList
    private distanceMetric: DistanceMetric

    /**
     * Loads a K-means model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string) {
        this.distanceMetric = new EuclidianDistance()
        let input = new FileContents(fileName)
        this.loadPriorDistribution(input)
        this.classMeans = this.loadInstanceList(input)
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It loops through the class means, if
     * the corresponding class label is same as the given String it returns the negated distance between given instance and the
     * current item of class means. Otherwise it returns the smallest negative number.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The negated distance between given instance and the current item of class means.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        for (let i = 0; i < this.classMeans.size(); i++) {
            if (this.classMeans.get(i).getClassLabel() == Ci) {
                return -this.distanceMetric.distance(instance, this.classMeans.get(i));
            }
        }
        return Number.NEGATIVE_INFINITY;
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.priorDistribution = trainSet.classDistribution();
        this.classMeans = new InstanceList();
        let classLists = new Partition(trainSet);
        for (let i = 0; i < classLists.size(); i++) {
            this.classMeans.add(classLists.get(i).average());
        }
        this.distanceMetric = (<KMeansParameter> parameters).getDistanceMetric()
    }

    /**
     * Loads the K-means model from an input file.
     * @param fileName File name of the K-means model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}