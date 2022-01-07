import {DiscreteAttribute} from "./DiscreteAttribute";

export class BinaryAttribute extends DiscreteAttribute{

    /**
     * Constructor for a binary discrete attribute. The attribute can take only two values "True" or "False".
     *
     * @param value Value of the attribute. Can be true or false.
     */
    constructor(value: boolean) {
        super(value == true ? "1" : "0");
    }

}