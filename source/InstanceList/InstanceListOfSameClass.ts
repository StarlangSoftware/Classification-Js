import {InstanceList} from "./InstanceList";

export class InstanceListOfSameClass extends InstanceList{

    private classLabel: string

    /**
     * Constructor for creating a new instance list with the same class label.
     *
     * @param classLabel Class label of instance list.
     */
    constructor(classLabel: string) {
        super();
        this.classLabel = classLabel
    }

    /**
     * Accessor for the class label.
     *
     * @return Class label.
     */
    getClassLabel(): string{
        return this.classLabel
    }
}