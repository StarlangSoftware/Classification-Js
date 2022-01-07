import { Attribute } from "./Attribute";
export declare class ContinuousAttribute extends Attribute {
    private value;
    /**
     * Constructor for a continuous attribute.
     *
     * @param value Value of the attribute.
     */
    constructor(value: number);
    /**
     * Accessor method for value.
     *
     * @return value
     */
    getValue(): number;
    /**
     * Mutator method for value
     *
     * @param value New value of value.
     */
    setValue(value: number): void;
    /**
     * Converts value to {@link String}.
     *
     * @return String representation of value.
     */
    toString(): string;
    continuousAttributeSize(): number;
    continuousAttributes(): Array<number>;
}
