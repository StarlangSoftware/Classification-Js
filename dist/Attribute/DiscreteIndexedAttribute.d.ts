import { DiscreteAttribute } from "./DiscreteAttribute";
export declare class DiscreteIndexedAttribute extends DiscreteAttribute {
    private index;
    private maxIndex;
    /**
     * Constructor for a discrete attribute.
     *
     * @param value Value of the attribute.
     * @param index Index of the attribute.
     * @param maxIndex Maximum index of the attribute.
     */
    constructor(value: string, index: number, maxIndex: number);
    /**
     * Accessor method for index.
     *
     * @return index.
     */
    getIndex(): number;
    /**
     * Accessor method for maxIndex.
     *
     * @return maxIndex.
     */
    getMaxIndex(): number;
    continuousAttributeSize(): number;
    continuousAttributes(): Array<number>;
}
