import { Attribute } from "../../Attribute/Attribute";
import { Instance } from "../../Instance/Instance";
export declare class DecisionCondition {
    private attributeIndex;
    private comparison;
    private value;
    /**
     * A constructor that sets attributeIndex, comparison and {@link Attribute} value.
     *
     * @param attributeIndex Integer number that shows attribute index.
     * @param value          The value of the {@link Attribute}.
     * @param comparison     Comparison character.
     */
    constructor(attributeIndex: number, value: Attribute, comparison?: string);
    getAttributeIndex(): number;
    getValue(): Attribute;
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
    satisfy(instance: Instance): boolean;
}
