import {AttributeType} from "../Attribute/AttributeType";
import {FeatureSubSet} from "../FeatureSelection/FeatureSubSet";

export class DataDefinition {

    private attributeTypes: Array<AttributeType>

    /**
     * Constructor for creating a new {@link DataDefinition} with given attribute types.
     *
     * @param attributeTypes Attribute types of the data definition.
     */
    constructor(attributeTypes?: Array<AttributeType>) {
        if (attributeTypes != undefined){
            this.attributeTypes = attributeTypes
        }
    }

    /**
     * Returns the number of attribute types.
     *
     * @return Number of attribute types.
     */
    attributeCount(): number{
        return this.attributeTypes.length
    }

    /**
     * Counts the occurrences of binary and discrete type attributes.
     *
     * @return Count of binary and discrete type attributes.
     */
    discreteAttributeCount(): number{
        let count = 0;
        for (let attributeType of this.attributeTypes) {
            if (attributeType == AttributeType.DISCRETE || attributeType == AttributeType.BINARY) {
                count++;
            }
        }
        return count;
    }

    /**
     * Counts the occurrences of binary and continuous type attributes.
     *
     * @return Count of of binary and continuous type attributes.
     */
    continuousAttributeCount(): number{
        let count = 0;
        for (let attributeType of this.attributeTypes) {
            if (attributeType == AttributeType.CONTINUOUS) {
                count++;
            }
        }
        return count;
    }

    /**
     * Returns the attribute type of the corresponding item at given index.
     *
     * @param index Index of the attribute type.
     * @return Attribute type of the corresponding item at given index.
     */
    getAttributeType(index: number): AttributeType{
        return this.attributeTypes[index]
    }

    /**
     * Adds an attribute type to the list of attribute types.
     *
     * @param attributeType Attribute type to add to the list of attribute types.
     */
    addAttribute(attributeType: AttributeType){
        this.attributeTypes.push(attributeType)
    }

    /**
     * Removes the attribute type at given index from the list of attributes.
     *
     * @param index Index to remove attribute type from list.
     */
    removeAttribute(index: number){
        this.attributeTypes.splice(index, 1)
    }

    /**
     * Clears all the attribute types from list.
     */
    removeAllAttributes(){
        this.attributeTypes = new Array<AttributeType>()
    }

    /**
     * Generates new subset of attribute types by using given feature subset.
     *
     * @param featureSubSet {@link FeatureSubSet} input.
     * @return DataDefinition with new subset of attribute types.
     */
    getSubSetOfFeatures(featureSubSet: FeatureSubSet): DataDefinition{
        let newAttributeTypes = new Array<AttributeType>();
        for (let i = 0; i < featureSubSet.size(); i++) {
            newAttributeTypes.push(this.attributeTypes[featureSubSet.get(i)]);
        }
        return new DataDefinition(newAttributeTypes);
    }
}