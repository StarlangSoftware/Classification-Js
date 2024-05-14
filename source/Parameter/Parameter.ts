export class Parameter {

    private readonly seed: number

    /**
     * Constructor of {@link Parameter} class which assigns given seed value to seed.
     *
     * @param seed Seed is used for random number generation.
     */
    constructor(seed: number) {
        this.seed = seed
    }

    /**
     * Accessor for the seed.
     *
     * @return The seed.
     */
    getSeed(): number{
        return this.seed
    }
}