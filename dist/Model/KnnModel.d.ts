import { Model } from "./Model";
import { InstanceList } from "../InstanceList/InstanceList";
import { Instance } from "../Instance/Instance";
import { DistanceMetric } from "../DistanceMetric/DistanceMetric";
export declare class KnnModel extends Model {
    private data;
    private k;
    private distanceMetric;
    /**
     * Constructor that sets the data {@link InstanceList}, k value and the {@link DistanceMetric}.
     *
     * @param dataOrFileName           {@link InstanceList} input.
     * @param k              K value.
     * @param distanceMetric {@link DistanceMetric} input.
     */
    constructor(dataOrFileName: InstanceList | string, k?: number, distanceMetric?: DistanceMetric);
    /**
     * The predict method takes an {@link Instance} as an input and finds the nearest neighbors of given instance. Then
     * it returns the first possible class label as the predicted class.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The first possible class label as the predicted class.
     */
    predict(instance: Instance): string;
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
}
