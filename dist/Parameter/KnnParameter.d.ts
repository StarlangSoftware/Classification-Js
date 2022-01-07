import { KMeansParameter } from "./KMeansParameter";
import { DistanceMetric } from "../DistanceMetric/DistanceMetric";
export declare class KnnParameter extends KMeansParameter {
    private k;
    /**
     * Parameters of the K-nearest neighbor classifier.
     *
     * @param seed           Seed is used for random number generation.
     * @param k              Parameter of the K-nearest neighbor algorithm.
     * @param distanceMetric Used to calculate the distance between two instances.
     */
    constructor(seed: number, k: number, distanceMetric?: DistanceMetric);
    /**
     * Accessor for the k.
     *
     * @return Value of the k.
     */
    getK(): number;
}
