"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnnInstance = void 0;
class KnnInstance {
    distance;
    instance;
    /**
     * The constructor that sets the instance and distance value.
     *
     * @param instance {@link Instance} input.
     * @param distance Double distance value.
     */
    constructor(instance, distance) {
        this.instance = instance;
        this.distance = distance;
    }
    getInstance() {
        return this.instance;
    }
    getDistance() {
        return this.distance;
    }
}
exports.KnnInstance = KnnInstance;
//# sourceMappingURL=KnnInstance.js.map