import { DistanceMetric } from "./DistanceMetric";
import { Instance } from "../Instance/Instance";
export declare class EuclidianDistance implements DistanceMetric {
    /**
     * Calculates Euclidian distance between two instances. For continuous features: \sum_{i=1}^d (x_i^(1) - x_i^(2))^2,
     * For discrete features: \sum_{i=1}^d 1(x_i^(1) == x_i^(2))
     *
     * @param instance1 First instance
     * @param instance2 Second instance
     * @return Euclidian distance between two instances.
     */
    distance(instance1: Instance, instance2: Instance): number;
}
