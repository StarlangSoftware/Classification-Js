import { AttributeType } from "../Attribute/AttributeType";
import { FeatureSubSet } from "../FeatureSelection/FeatureSubSet";
export declare class DataDefinition {
    private attributeTypes;
    private readonly attributeValueList;
    /**
     * Constructor for creating a new {@link DataDefinition} with given attribute types.
     *
     * @param attributeTypes Attribute types of the data definition.
     * @param attributeValueList Array of array of strings to represent all possible values of discrete features.
     */
    constructor(attributeTypes?: Array<AttributeType>, attributeValueList?: Array<Array<String>>);
    /**
     * Returns number of distinct values for a given discrete attribute with index attributeIndex.
     * @param attributeIndex Index of the discrete attribute.
     * @return Number of distinct values for a given discrete attribute
     */
    numberOfValues(attributeIndex: number): number;
    /**
     * Returns the index of the given value in the values list of the attributeIndex'th discrete attribute.
     * @param attributeIndex Index of the discrete attribute.
     * @param value Value of the discrete attribute
     * @return Index of the given value in the values list of the discrete attribute.
     */
    featureValueIndex(attributeIndex: number, value: String): number;
    /**
     * Returns the number of attribute types.
     *
     * @return Number of attribute types.
     */
    attributeCount(): number;
    /**
     * Counts the occurrences of binary and discrete type attributes.
     *
     * @return Count of binary and discrete type attributes.
     */
    discreteAttributeCount(): number;
    /**
     * Counts the occurrences of binary and continuous type attributes.
     *
     * @return Count of of binary and continuous type attributes.
     */
    continuousAttributeCount(): number;
    /**
     * Returns the attribute type of the corresponding item at given index.
     *
     * @param index Index of the attribute type.
     * @return Attribute type of the corresponding item at given index.
     */
    getAttributeType(index: number): AttributeType;
    /**
     * Adds an attribute type to the list of attribute types.
     *
     * @param attributeType Attribute type to add to the list of attribute types.
     */
    addAttribute(attributeType: AttributeType): void;
    /**
     * Removes the attribute type at given index from the list of attributes.
     *
     * @param index Index to remove attribute type from list.
     */
    removeAttribute(index: number): void;
    /**
     * Clears all the attribute types from list.
     */
    removeAllAttributes(): void;
    /**
     * Generates new subset of attribute types by using given feature subset.
     *
     * @param featureSubSet {@link FeatureSubSet} input.
     * @return DataDefinition with new subset of attribute types.
     */
    getSubSetOfFeatures(featureSubSet: FeatureSubSet): DataDefinition;
}
