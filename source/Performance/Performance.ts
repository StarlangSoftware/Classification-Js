export class Performance {

    protected errorRate: number

    /**
     * Constructor that sets the error rate.
     *
     * @param errorRate Double input.
     */
    constructor(errorRate: number) {
        this.errorRate = errorRate
    }

    /**
     * Accessor for the error rate.
     *
     * @return Double errorRate.
     */
    getErrorRate(): number{
        return this.errorRate
    }
}