import { InstanceList } from "./InstanceList";
export declare class InstanceListOfSameClass extends InstanceList {
    private classLabel;
    /**
     * Constructor for creating a new instance list with the same class label.
     *
     * @param classLabel Class label of instance list.
     */
    constructor(classLabel: string);
    /**
     * Accessor for the class label.
     *
     * @return Class label.
     */
    getClassLabel(): string;
}
