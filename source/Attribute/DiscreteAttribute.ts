import {Attribute} from "./Attribute";

export class DiscreteAttribute extends Attribute{

    private value: string = "NULL"

    /**
     * Constructor for a discrete attribute.
     *
     * @param value Value of the attribute.
     */
    constructor(value: string) {
        super();
        this.value = value
    }

    /**
     * Accessor method for value.
     *
     * @return value
     */
    getValue(): string{
        return this.value
    }

    /**
     * Converts value to {@link String}.
     *
     * @return String representation of value.
     */
    toString(): string{
        if (this.value == ","){
            return "comma";
        }
        return this.value;
    }

    continuousAttributeSize(): number {
        return 0;
    }

    continuousAttributes(): Array<number> {
        return new Array<number>();
    }

}