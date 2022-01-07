import { DistanceMetric } from "./DistanceMetric";
import { Instance } from "../Instance/Instance";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
export declare class MahalanobisDistance implements DistanceMetric {
    private covarianceInverse;
    /**
     * Constructor for the MahalanobisDistance class. Basically sets the inverse of the covariance matrix.
     *
     * @param covarianceInverse Inverse of the covariance matrix.
     */
    constructor(covarianceInverse: Matrix);
    /**
     * Calculates Mahalanobis distance between two instances. (x^(1) - x^(2)) S (x^(1) - x^(2))^T
     *
     * @param instance1 First instance.
     * @param instance2 Second instance.
     * @return Mahalanobis distance between two instances.
     */
    distance(instance1: Instance, instance2: Instance): number;
}
