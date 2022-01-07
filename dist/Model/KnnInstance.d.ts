import { Instance } from "../Instance/Instance";
export declare class KnnInstance {
    private readonly distance;
    private readonly instance;
    /**
     * The constructor that sets the instance and distance value.
     *
     * @param instance {@link Instance} input.
     * @param distance Double distance value.
     */
    constructor(instance: Instance, distance: number);
    getInstance(): Instance;
    getDistance(): number;
}
