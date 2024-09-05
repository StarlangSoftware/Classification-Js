import { GaussianModel } from "./GaussianModel";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Instance } from "../../Instance/Instance";
import { Parameter } from "../../Parameter/Parameter";
export declare class KMeansModel extends GaussianModel {
    private classMeans;
    private distanceMetric;
    /**
     * Loads a K-means model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It loops through the class means, if
     * the corresponding class label is same as the given String it returns the negated distance between given instance and the
     * current item of class means. Otherwise it returns the smallest negative number.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The negated distance between given instance and the current item of class means.
     */
    calculateMetric(instance: Instance, Ci: string): number;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the K-means model from an input file.
     * @param fileName File name of the K-means model.
     */
    loadModel(fileName: string): void;
}
