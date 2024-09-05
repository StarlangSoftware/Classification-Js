import { Model } from "../Model";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Instance } from "../../Instance/Instance";
import { DistanceMetric } from "../../DistanceMetric/DistanceMetric";
import { Parameter } from "../../Parameter/Parameter";
export declare class KnnModel extends Model {
    private data;
    private k;
    private distanceMetric;
    /**
     * Constructor that sets the data {@link InstanceList}, k value and the {@link DistanceMetric}.
     *
     * @param data           {@link InstanceList} input.
     * @param k              K value.
     * @param distanceMetric {@link DistanceMetric} input.
     */
    constructor1(data: InstanceList, k: number, distanceMetric: DistanceMetric): void;
    /**
     * Loads a K-nearest neighbor model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    /**
     * The predict method takes an {@link Instance} as an input and finds the nearest neighbors of given instance. Then
     * it returns the first possible class label as the predicted class.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The first possible class label as the predicted class.
     */
    predict(instance: Instance): string;
    /**
     * Calculates the posterior probability distribution for the given instance according to K-means model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number>;
    /**
     * The nearestNeighbors method takes an {@link Instance} as an input. First it gets the possible class labels, then loops
     * through the data {@link InstanceList} and creates new {@link Array} of {@link KnnInstance}s and adds the corresponding data with
     * the distance between data and given instance. After sorting this newly created ArrayList, it loops k times and
     * returns the first k instances as an {@link InstanceList}.
     *
     * @param instance {@link Instance} to find nearest neighbors/
     * @return The first k instances which are nearest to the given instance as an {@link InstanceList}.
     */
    nearestNeighbors(instance: Instance): InstanceList;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for K-nearest neighbor classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters K: k parameter of the K-nearest neighbor algorithm
     *                   distanceMetric: distance metric used to calculate the distance between two instances.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the K-nearest neighbor model from an input file.
     * @param fileName File name of the K-nearest neighbor model.
     */
    loadModel(fileName: string): void;
}
