"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MahalanobisDistance = void 0;
class MahalanobisDistance {
    covarianceInverse;
    /**
     * Constructor for the MahalanobisDistance class. Basically sets the inverse of the covariance matrix.
     *
     * @param covarianceInverse Inverse of the covariance matrix.
     */
    constructor(covarianceInverse) {
        this.covarianceInverse = covarianceInverse;
    }
    /**
     * Calculates Mahalanobis distance between two instances. (x^(1) - x^(2)) S (x^(1) - x^(2))^T
     *
     * @param instance1 First instance.
     * @param instance2 Second instance.
     * @return Mahalanobis distance between two instances.
     */
    distance(instance1, instance2) {
        let v1 = instance1.toVector();
        let v2 = instance2.toVector();
        v1.subtract(v2);
        let v3 = this.covarianceInverse.multiplyWithVectorFromLeft(v1);
        return v3.dotProduct(v1);
    }
}
exports.MahalanobisDistance = MahalanobisDistance;
//# sourceMappingURL=MahalanobisDistance.js.map