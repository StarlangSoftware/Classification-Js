import { Attribute } from "./Attribute";
export declare class DiscreteAttribute extends Attribute {
    private readonly value;
    /**
     * Constructor for a discrete attribute.
     *
     * @param value Value of the attribute.
     */
    constructor(value: string);
    /**
     * Accessor method for value.
     *
     * @return value
     */
    getValue(): string;
    /**
     * Converts value to {@link String}.
     *
     * @return String representation of value.
     */
    toString(): string;
    continuousAttributeSize(): number;
    continuousAttributes(): Array<number>;
}
