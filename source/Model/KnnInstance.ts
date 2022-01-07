import {Instance} from "../Instance/Instance";

export class KnnInstance {

    private readonly distance: number
    private readonly instance: Instance

    /**
     * The constructor that sets the instance and distance value.
     *
     * @param instance {@link Instance} input.
     * @param distance Double distance value.
     */
    constructor(instance: Instance, distance: number) {
        this.instance = instance;
        this.distance = distance;
    }

    getInstance(): Instance{
        return this.instance
    }

    getDistance(): number{
        return this.distance
    }

}