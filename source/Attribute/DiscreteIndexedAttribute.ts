import {DiscreteAttribute} from "./DiscreteAttribute";

export class DiscreteIndexedAttribute extends DiscreteAttribute{

    private index: number
    private maxIndex: number

    /**
     * Constructor for a discrete attribute.
     *
     * @param value Value of the attribute.
     * @param index Index of the attribute.
     * @param maxIndex Maximum index of the attribute.
     */
    constructor(value: string, index: number, maxIndex: number) {
        super(value);
        this.index = index
        this.maxIndex = maxIndex
    }

    /**
     * Accessor method for index.
     *
     * @return index.
     */
    getIndex(): number{
        return this.index
    }

    /**
     * Accessor method for maxIndex.
     *
     * @return maxIndex.
     */
    getMaxIndex(): number{
        return this.maxIndex
    }

    continuousAttributeSize(): number {
        return this.maxIndex
    }

    continuousAttributes(): Array<number> {
        let result = new Array<number>()
        for (let i = 0; i < this.maxIndex; i++) {
            if (i != this.index) {
                result.push(0.0);
            } else {
                result.push(1.0);
            }
        }
        return result
    }
}