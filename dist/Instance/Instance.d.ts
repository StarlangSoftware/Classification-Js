import { Attribute } from "../Attribute/Attribute";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { FeatureSubSet } from "../FeatureSelection/FeatureSubSet";
export declare class Instance {
    private readonly classLabel;
    private attributes;
    /**
     * Constructor for a single instance. Given the attributes and class label, it generates a new instance.
     *
     * @param classLabel Class label of the instance.
     * @param attributes Attributes of the instance.
     */
    constructor(classLabel: string, attributes?: Array<Attribute>);
    /**
     * Adds a new attribute.
     *
     * @param value Attribute to be added.
     */
    addAttribute(value: any): void;
    /**
     * Adds a {@link Vector} of continuous attributes.
     *
     * @param vector {@link Vector} that has the continuous attributes.
     */
    addVectorAttribute(vector: Vector): void;
    /**
     * Removes attribute with the given index from the attributes list.
     *
     * @param index Index of the attribute to be removed.
     */
    removeAttribute(index: number): void;
    /**
     * Removes all the attributes from the attributes list.
     */
    removeAllAttributes(): void;
    /**
     * Accessor for a single attribute.
     *
     * @param index Index of the attribute to be accessed.
     * @return Attribute with index 'index'.
     */
    getAttribute(index: number): Attribute;
    /**
     * Returns the number of attributes in the attributes list.
     *
     * @return Number of attributes in the attributes list.
     */
    attributeSize(): number;
    /**
     * Returns the number of continuous and discrete indexed attributes in the attributes list.
     *
     * @return Number of continuous and discrete indexed attributes in the attributes list.
     */
    continuousAttributeSize(): number;
    /**
     * The continuousAttributes method creates a new {@link Array} result and it adds the continuous attributes of the
     * attributes list and also it adds 1 for the discrete indexed attributes
     * .
     *
     * @return result {@link Array} that has continuous and discrete indexed attributes.
     */
    continuousAttributes(): Array<number>;
    /**
     * Accessor for the class label.
     *
     * @return Class label of the instance.
     */
    getClassLabel(): string;
    /**
     * Converts instance to a {@link String}.
     *
     * @return A string of attributes separated with comma character.
     */
    toString(): string;
    /**
     * The getSubSetOfFeatures method takes a {@link FeatureSubSet} as an input. First it creates a result {@link Instance}
     * with the class label, and adds the attributes of the given featureSubSet to it.
     *
     * @param featureSubSet {@link FeatureSubSet} an {@link Array} of indices.
     * @return result Instance.
     */
    getSubSetOfFeatures(featureSubSet: FeatureSubSet): Instance;
    /**
     * The toVector method returns a {@link Vector} of continuous attributes and discrete indexed attributes.
     *
     * @return {@link Vector} of continuous attributes and discrete indexed attributes.
     */
    toVector(): Vector;
}
