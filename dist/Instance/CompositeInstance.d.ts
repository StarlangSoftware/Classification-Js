import { Instance } from "./Instance";
import { Attribute } from "../Attribute/Attribute";
export declare class CompositeInstance extends Instance {
    private possibleClassLabels;
    /**
     * Constructor of {@link CompositeInstance} class which takes a class label, attributes and an {@link ArrayList} of
     * possible labels as inputs. It generates a new composite instance with given labels, attributes and possible labels.
     *
     * @param classLabel          Class label of the composite instance.
     * @param attributes          Attributes of the composite instance.
     * @param possibleClassLabels Possible labels of the composite instance.
     */
    constructor(classLabel: string, attributes?: Array<Attribute>, possibleClassLabels?: Array<string>);
    /**
     * Accessor for the possible class labels.
     *
     * @return Possible class labels of the composite instance.
     */
    getPossibleClassLabels(): Array<string>;
    /**
     * Mutator method for possible class labels.
     *
     * @param possibleClassLabels Ner value of possible class labels.
     */
    setPossibleClassLabels(possibleClassLabels: Array<string>): void;
    /**
     * Converts composite instance to {@link String}.
     *
     * @return String representation of composite instance.
     */
    toString(): string;
}
