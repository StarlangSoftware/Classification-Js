import {Attribute} from "./Attribute";

export class ContinuousAttribute extends Attribute{

    private value: number

    /**
     * Constructor for a continuous attribute.
     *
     * @param value Value of the attribute.
     */
    constructor(value: number) {
        super();
        this.value = value
    }

    /**
     * Accessor method for value.
     *
     * @return value
     */
    getValue(): number{
        return this.value
    }

    /**
     * Mutator method for value
     *
     * @param value New value of value.
     */
    setValue(value: number){
        this.value = value
    }

    /**
     * Converts value to {@link String}.
     *
     * @return String representation of value.
     */
    toString(): string{
        return this.value.toString()
    }

    continuousAttributeSize(): number {
        return 1;
    }

    continuousAttributes(): Array<number> {
        let result = new Array<number>();
        result.push(this.value)
        return result
    }
}