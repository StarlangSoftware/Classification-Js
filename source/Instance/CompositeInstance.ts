import {Instance} from "./Instance";
import {Attribute} from "../Attribute/Attribute";

export class CompositeInstance extends Instance{

    private possibleClassLabels: Array<string> = new Array<string>()

    /**
     * Constructor of {@link CompositeInstance} class which takes a class label, attributes and an {@link ArrayList} of
     * possible labels as inputs. It generates a new composite instance with given labels, attributes and possible labels.
     *
     * @param classLabel          Class label of the composite instance.
     * @param attributes          Attributes of the composite instance.
     * @param possibleClassLabels Possible labels of the composite instance.
     */
    constructor(classLabel: string, attributes?: Array<Attribute>, possibleClassLabels?: Array<string>) {
        super(classLabel, attributes);
        if (possibleClassLabels != undefined){
            this.possibleClassLabels = possibleClassLabels
        }
    }

    /**
     * Accessor for the possible class labels.
     *
     * @return Possible class labels of the composite instance.
     */
    getPossibleClassLabels(): Array<string>{
        return this.possibleClassLabels
    }

    /**
     * Mutator method for possible class labels.
     *
     * @param possibleClassLabels Ner value of possible class labels.
     */
    setPossibleClassLabels(possibleClassLabels: Array<string>){
        this.possibleClassLabels = possibleClassLabels
    }

    /**
     * Converts composite instance to {@link String}.
     *
     * @return String representation of composite instance.
     */
    toString(): string{
        let result = super.toString();
        for (let possibleClassLabel of this.possibleClassLabels) {
            result += ";" + possibleClassLabel;
        }
        return result.toString();
    }
}