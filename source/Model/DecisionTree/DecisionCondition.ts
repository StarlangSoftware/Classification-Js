import {Attribute} from "../../Attribute/Attribute";
import {Instance} from "../../Instance/Instance";
import {DiscreteIndexedAttribute} from "../../Attribute/DiscreteIndexedAttribute";
import {DiscreteAttribute} from "../../Attribute/DiscreteAttribute";
import {ContinuousAttribute} from "../../Attribute/ContinuousAttribute";

export class DecisionCondition {

    private attributeIndex: number = -1
    private comparison: string = undefined
    private value: Attribute

    /**
     * A constructor that sets attributeIndex, comparison and {@link Attribute} value.
     *
     * @param attributeIndex Integer number that shows attribute index.
     * @param value          The value of the {@link Attribute}.
     * @param comparison     Comparison character.
     */
    constructor(attributeIndex: number, value: Attribute, comparison?: string) {
        this.attributeIndex = attributeIndex;
        this.comparison = comparison;
        this.value = value;
    }

    /**
     * Accessor for the attribute index.
     * @return Attribute index.
     */
    getAttributeIndex(): number{
        return this.attributeIndex
    }

    /**
     * Accessor for the value.
     * @return Value.
     */
    getValue(): Attribute{
        return this.value
    }

    /**
     * The satisfy method takes an {@link Instance} as an input.
     * <p>
     * If defined {@link Attribute} value is a {@link DiscreteIndexedAttribute} it compares the index of {@link Attribute} of instance at the
     * attributeIndex and the index of {@link Attribute} value and returns the result.
     * <p>
     * If defined {@link Attribute} value is a {@link DiscreteAttribute} it compares the value of {@link Attribute} of instance at the
     * attributeIndex and the value of {@link Attribute} value and returns the result.
     * <p>
     * If defined {@link Attribute} value is a {@link ContinuousAttribute} it compares the value of {@link Attribute} of instance at the
     * attributeIndex and the value of {@link Attribute} value and returns the result according to the comparison character whether it is
     * less than or greater than signs.
     *
     * @param instance Instance to compare.
     * @return True if gicen instance satisfies the conditions.
     */
    satisfy(instance: Instance): boolean{
        if (this.value instanceof DiscreteIndexedAttribute) {
            if ((<DiscreteIndexedAttribute> this.value).getIndex() != -1) {
                return (<DiscreteIndexedAttribute> instance.getAttribute(this.attributeIndex)).getIndex() == (<DiscreteIndexedAttribute> this.value).getIndex();
            } else {
                return true;
            }
        } else {
            if (this.value instanceof DiscreteAttribute) {
                return ((<DiscreteAttribute> instance.getAttribute(this.attributeIndex)).getValue() == (<DiscreteAttribute> this.value).getValue());
            } else {
                if (this.value instanceof ContinuousAttribute) {
                    if (this.comparison == "<") {
                        return (<ContinuousAttribute> instance.getAttribute(this.attributeIndex)).getValue() <= (<ContinuousAttribute> this.value).getValue();
                    } else {
                        if (this.comparison == ">") {
                            return (<ContinuousAttribute> instance.getAttribute(this.attributeIndex)).getValue() > (<ContinuousAttribute> this.value).getValue();
                        }
                    }
                }
            }
        }
        return false;
    }
}