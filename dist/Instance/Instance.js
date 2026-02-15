"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
const Attribute_1 = require("../Attribute/Attribute");
const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
const Vector_1 = require("nlptoolkit-math/dist/Vector");
class Instance {
    classLabel;
    attributes = new Array();
    /**
     * Constructor for a single instance. Given the attributes and class label, it generates a new instance.
     *
     * @param classLabel Class label of the instance.
     * @param attributes Attributes of the instance.
     */
    constructor(classLabel, attributes) {
        this.classLabel = classLabel;
        if (attributes != undefined) {
            this.attributes = attributes;
        }
    }
    /**
     * Adds a new attribute.
     *
     * @param value Attribute to be added.
     */
    addAttribute(value) {
        if (value instanceof Attribute_1.Attribute) {
            this.attributes.push(value);
        }
        else {
            if (!Number.isNaN(value)) {
                this.attributes.push(new ContinuousAttribute_1.ContinuousAttribute(value));
            }
            else {
                this.attributes.push(new DiscreteAttribute_1.DiscreteAttribute(value));
            }
        }
    }
    /**
     * Adds a {@link Vector} of continuous attributes.
     *
     * @param vector {@link Vector} that has the continuous attributes.
     */
    addVectorAttribute(vector) {
        for (let i = 0; i < vector.size(); i++) {
            this.attributes.push(new ContinuousAttribute_1.ContinuousAttribute(vector.getValue(i)));
        }
    }
    /**
     * Removes attribute with the given index from the attributes list.
     *
     * @param index Index of the attribute to be removed.
     */
    removeAttribute(index) {
        this.attributes.splice(index, 1);
    }
    /**
     * Removes all the attributes from the attributes list.
     */
    removeAllAttributes() {
        this.attributes = new Array();
    }
    /**
     * Accessor for a single attribute.
     *
     * @param index Index of the attribute to be accessed.
     * @return Attribute with index 'index'.
     */
    getAttribute(index) {
        return this.attributes[index];
    }
    /**
     * Returns the number of attributes in the attributes list.
     *
     * @return Number of attributes in the attributes list.
     */
    attributeSize() {
        return this.attributes.length;
    }
    /**
     * Returns the number of continuous and discrete indexed attributes in the attributes list.
     *
     * @return Number of continuous and discrete indexed attributes in the attributes list.
     */
    continuousAttributeSize() {
        let size = 0;
        for (let attribute of this.attributes) {
            size += attribute.continuousAttributeSize();
        }
        return size;
    }
    /**
     * The continuousAttributes method creates a new {@link Array} result and it adds the continuous attributes of the
     * attributes list and also it adds 1 for the discrete indexed attributes
     * .
     *
     * @return result {@link Array} that has continuous and discrete indexed attributes.
     */
    continuousAttributes() {
        let result = new Array();
        for (let attribute of this.attributes) {
            for (let continuousAttribute of attribute.continuousAttributes()) {
                result.push(continuousAttribute);
            }
        }
        return result;
    }
    /**
     * Accessor for the class label.
     *
     * @return Class label of the instance.
     */
    getClassLabel() {
        return this.classLabel;
    }
    /**
     * Converts instance to a {@link String}.
     *
     * @return A string of attributes separated with comma character.
     */
    toString() {
        let result = "";
        for (let attribute of this.attributes) {
            result = result + attribute.toString() + ",";
        }
        result = result + this.classLabel;
        return result;
    }
    /**
     * The getSubSetOfFeatures method takes a {@link FeatureSubSet} as an input. First it creates a result {@link Instance}
     * with the class label, and adds the attributes of the given featureSubSet to it.
     *
     * @param featureSubSet {@link FeatureSubSet} an {@link Array} of indices.
     * @return result Instance.
     */
    getSubSetOfFeatures(featureSubSet) {
        let result = new Instance(this.classLabel);
        for (let i = 0; i < featureSubSet.size(); i++) {
            result.addAttribute(this.attributes[featureSubSet.get(i)]);
        }
        return result;
    }
    /**
     * The toVector method returns a {@link Vector} of continuous attributes and discrete indexed attributes.
     *
     * @return {@link Vector} of continuous attributes and discrete indexed attributes.
     */
    toVector() {
        let values = new Array();
        for (let attribute of this.attributes) {
            for (let continuousAttribute of attribute.continuousAttributes()) {
                values.push(continuousAttribute);
            }
        }
        return new Vector_1.Vector(values);
    }
}
exports.Instance = Instance;
//# sourceMappingURL=Instance.js.map