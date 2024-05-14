export declare class Parameter {
    private readonly seed;
    /**
     * Constructor of {@link Parameter} class which assigns given seed value to seed.
     *
     * @param seed Seed is used for random number generation.
     */
    constructor(seed: number);
    /**
     * Accessor for the seed.
     *
     * @return The seed.
     */
    getSeed(): number;
}
