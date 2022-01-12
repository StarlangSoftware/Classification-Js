(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Instance/Instance", "../DataSet/DataDefinition", "fs", "../Attribute/BinaryAttribute", "../Attribute/DiscreteAttribute", "../Attribute/ContinuousAttribute", "../Attribute/AttributeType", "nlptoolkit-sampling/dist/Bootstrap", "../Instance/CompositeInstance", "../Model/Model", "../Attribute/DiscreteIndexedAttribute", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-math/dist/Matrix"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstanceList = void 0;
    const Instance_1 = require("../Instance/Instance");
    const DataDefinition_1 = require("../DataSet/DataDefinition");
    const fs = require("fs");
    const BinaryAttribute_1 = require("../Attribute/BinaryAttribute");
    const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
    const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
    const AttributeType_1 = require("../Attribute/AttributeType");
    const Bootstrap_1 = require("nlptoolkit-sampling/dist/Bootstrap");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const Model_1 = require("../Model/Model");
    const DiscreteIndexedAttribute_1 = require("../Attribute/DiscreteIndexedAttribute");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    class InstanceList {
        /**
         * Constructor for an instance list with a given data definition, data file and a separator character. Each instance
         * must be stored in a separate line separated with the character separator. The last item must be the class label.
         * The function reads the file line by line and for each line; depending on the data definition, that is, type of
         * the attributes, adds discrete and continuous attributes to a new instance. For example, given the data set file
         * <p>
         * red;1;0.4;true
         * green;-1;0.8;true
         * blue;3;1.3;false
         * <p>
         * where the first attribute is a discrete attribute, second and third attributes are continuous attributes, the
         * fourth item is the class label.
         *
         * @param definition Data definition of the data set.
         * @param separator  Separator character which separates the attribute values in the data file.
         * @param fileName   Name of the data set file.
         */
        constructor(definition, separator, fileName) {
            this.list = new Array();
            if (definition != undefined) {
                if (definition instanceof DataDefinition_1.DataDefinition) {
                    let data = fs.readFileSync(fileName, 'utf8');
                    let lines = data.split("\n");
                    for (let line of lines) {
                        let attributeList = line.split(separator);
                        if (attributeList.length == definition.attributeCount() + 1) {
                            let current = new Instance_1.Instance(attributeList[attributeList.length - 1]);
                            for (let i = 0; i < attributeList.length - 1; i++) {
                                switch (definition.getAttributeType(i)) {
                                    case AttributeType_1.AttributeType.DISCRETE:
                                        current.addAttribute(new DiscreteAttribute_1.DiscreteAttribute(attributeList[i]));
                                        break;
                                    case AttributeType_1.AttributeType.BINARY:
                                        if (attributeList[i].toLowerCase() == "yes" || attributeList[i] == "1") {
                                            current.addAttribute(new BinaryAttribute_1.BinaryAttribute(true));
                                        }
                                        else {
                                            current.addAttribute(new BinaryAttribute_1.BinaryAttribute(false));
                                        }
                                        break;
                                    case AttributeType_1.AttributeType.CONTINUOUS:
                                        current.addAttribute(new ContinuousAttribute_1.ContinuousAttribute(Number.parseFloat(attributeList[i])));
                                        break;
                                }
                            }
                            this.list.push(current);
                        }
                    }
                }
                else {
                    this.list = definition;
                }
            }
        }
        /**
         * Adds instance to the instance list.
         *
         * @param instance Instance to be added.
         */
        add(instance) {
            this.list.push(instance);
        }
        /**
         * Adds a list of instances to the current instance list.
         *
         * @param instanceList List of instances to be added.
         */
        addAll(instanceList) {
            for (let instance of instanceList) {
                this.list.push(instance);
            }
        }
        /**
         * Returns size of the instance list.
         *
         * @return Size of the instance list.
         */
        size() {
            return this.list.length;
        }
        /**
         * Accessor for a single instance with the given index.
         *
         * @param index Index of the instance.
         * @return Instance with index 'index'.
         */
        get(index) {
            return this.list[index];
        }
        /**
         * Sorts instance list according to the attribute with index 'attributeIndex'.
         *
         * @param attributeIndex index of the attribute.
         */
        sort(attributeIndex) {
            if (attributeIndex == undefined) {
                this.list.sort((a, b) => (a.getClassLabel() < b.getClassLabel() ? -1 :
                    a.getClassLabel() > b.getClassLabel() ? 1 : 0));
            }
            else {
                this.list.sort((a, b) => a.getAttribute(attributeIndex).getValue() < b.getAttribute(attributeIndex).getValue() ? -1 :
                    a.getAttribute(attributeIndex).getValue() > b.getAttribute(attributeIndex).getValue() ? 1 : 0);
            }
        }
        /**
         * Shuffles the instance list.
         * @param random Random number generation.
         */
        shuffle(random) {
            random.shuffle(this.list);
        }
        /**
         * Creates a bootstrap sample from the current instance list.
         *
         * @param seed To create a different bootstrap sample, we need a new seed for each sample.
         * @return Bootstrap sample.
         */
        bootstrap(seed) {
            return new Bootstrap_1.Bootstrap(this.list, seed);
        }
        /**
         * Extracts the class labels of each instance in the instance list and returns them in an array of {@link String}.
         *
         * @return An array list of class labels.
         */
        getClassLabels() {
            let classLabels = new Array();
            for (let instance of this.list) {
                classLabels.push(instance.getClassLabel());
            }
            return classLabels;
        }
        /**
         * Extracts the class labels of each instance in the instance list and returns them as a set.
         *
         * @return An {@link Array} of distinct class labels.
         */
        getDistinctClassLabels() {
            let classLabels = new Array();
            for (let instance of this.list) {
                if (!classLabels.includes(instance.getClassLabel())) {
                    classLabels.push(instance.getClassLabel());
                }
            }
            return classLabels;
        }
        /**
         * Extracts the possible class labels of each instance in the instance list and returns them as a set.
         *
         * @return An {@link Array} of distinct class labels.
         */
        getUnionOfPossibleClassLabels() {
            let possibleClassLabels = new Array();
            for (let instance of this.list) {
                if (instance instanceof CompositeInstance_1.CompositeInstance) {
                    let compositeInstance = instance;
                    for (let possibleClassLabel of compositeInstance.getPossibleClassLabels()) {
                        if (!possibleClassLabels.includes(possibleClassLabel)) {
                            possibleClassLabels.push(possibleClassLabel);
                        }
                    }
                }
                else {
                    if (!possibleClassLabels.includes(instance.getClassLabel())) {
                        possibleClassLabels.push(instance.getClassLabel());
                    }
                }
            }
            return possibleClassLabels;
        }
        /**
         * Extracts distinct discrete values of a given attribute as an array of strings.
         *
         * @param attributeIndex Index of the discrete attribute.
         * @return An array of distinct values of a discrete attribute.
         */
        getAttributeValueList(attributeIndex) {
            let valueList = new Array();
            for (let instance of this.list) {
                if (!valueList.includes(instance.getAttribute(attributeIndex).getValue())) {
                    valueList.push(instance.getAttribute(attributeIndex).getValue());
                }
            }
            return valueList;
        }
        /**
         * Calculates the mean of a single attribute for this instance list (m_i). If the attribute is discrete, the maximum
         * occurring value for that attribute is returned. If the attribute is continuous, the mean value of the values of
         * all instances are returned.
         *
         * @param index Index of the attribute.
         * @return The mean value of the instances as an attribute.
         */
        attributeAverage(index) {
            if (this.list[0].getAttribute(index) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                let values = new Array();
                for (let instance of this.list) {
                    values.push(instance.getAttribute(index).getValue());
                }
                return new DiscreteAttribute_1.DiscreteAttribute(Model_1.Model.getMaximum(values));
            }
            else {
                if (this.list[0].getAttribute(index) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                    let sum = 0.0;
                    for (let instance of this.list) {
                        sum += instance.getAttribute(index).getValue();
                    }
                    return new ContinuousAttribute_1.ContinuousAttribute(sum / this.list.length);
                }
                else {
                    return undefined;
                }
            }
        }
        /**
         * Calculates the mean of a single attribute for this instance list (m_i).
         *
         * @param index Index of the attribute.
         * @return The mean value of the instances as an attribute.
         */
        continuousAttributeAverage(index) {
            if (index == undefined) {
                let result = new Array();
                for (let i = 0; i < this.list[0].attributeSize(); i++) {
                    for (let attribute of this.continuousAttributeAverage(i)) {
                        result.push(attribute);
                    }
                }
                return result;
            }
            else {
                if (this.list[0].getAttribute(index) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                    let maxIndexSize = this.list[0].getAttribute(index).getMaxIndex();
                    let values = new Array();
                    for (let i = 0; i < maxIndexSize; i++) {
                        values.push(0.0);
                    }
                    for (let instance of this.list) {
                        let valueIndex = instance.getAttribute(index).getIndex();
                        values[valueIndex]++;
                    }
                    for (let i = 0; i < values.length; i++) {
                        values[i] /= this.list.length;
                    }
                    return values;
                }
                else {
                    if (this.list[0].getAttribute(index) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                        let sum = 0.0;
                        for (let instance of this.list) {
                            sum += instance.getAttribute(index).getValue();
                        }
                        let values = new Array();
                        values.push(sum / this.list.length);
                        return values;
                    }
                    else {
                        return undefined;
                    }
                }
            }
        }
        /**
         * Calculates the standard deviation of a single attribute for this instance list (m_i). If the attribute is discrete,
         * null returned. If the attribute is continuous, the standard deviation  of the values all instances are returned.
         *
         * @param index Index of the attribute.
         * @return The standard deviation of the instances as an attribute.
         */
        attributeStandardDeviation(index) {
            if (this.list[0].getAttribute(index) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                let sum = 0.0;
                for (let instance of this.list) {
                    sum += instance.getAttribute(index).getValue();
                }
                let average = sum / this.list.length;
                sum = 0.0;
                for (let instance of this.list) {
                    sum += Math.pow(instance.getAttribute(index).getValue() - average, 2);
                }
                return new ContinuousAttribute_1.ContinuousAttribute(Math.sqrt(sum / (this.list.length - 1)));
            }
            else {
                return undefined;
            }
        }
        /**
         * Calculates the standard deviation of a single continuous attribute for this instance list (m_i).
         *
         * @param index Index of the attribute.
         * @return The standard deviation of the instances as an attribute.
         */
        continuousAttributeStandardDeviation(index) {
            if (index == undefined) {
                let result = new Array();
                for (let i = 0; i < this.list[0].attributeSize(); i++) {
                    for (let attribute of this.continuousAttributeStandardDeviation(i)) {
                        result.push(attribute);
                    }
                }
                return result;
            }
            else {
                if (this.list[0].getAttribute(index) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                    let maxIndexSize = this.list[0].getAttribute(index).getMaxIndex();
                    let averages = new Array();
                    for (let i = 0; i < maxIndexSize; i++) {
                        averages.push(0.0);
                    }
                    for (let instance of this.list) {
                        let valueIndex = instance.getAttribute(index).getIndex();
                        averages[valueIndex]++;
                    }
                    for (let i = 0; i < averages.length; i++) {
                        averages[i] /= this.list.length;
                    }
                    let values = new Array();
                    for (let i = 0; i < maxIndexSize; i++) {
                        values.push(0.0);
                    }
                    for (let instance of this.list) {
                        let valueIndex = instance.getAttribute(index).getIndex();
                        for (let i = 0; i < maxIndexSize; i++) {
                            if (i == valueIndex) {
                                values[i] += Math.pow(1 - averages[i], 2);
                            }
                            else {
                                values[i] += Math.pow(averages[i], 2);
                            }
                        }
                    }
                    for (let i = 0; i < values.length; i++) {
                        values[i] = Math.sqrt(values[i] / (this.list.length - 1));
                    }
                    return values;
                }
                else {
                    if (this.list[0].getAttribute(index) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                        let sum = 0.0;
                        for (let instance of this.list) {
                            sum += instance.getAttribute(index).getValue();
                        }
                        let average = sum / this.list.length;
                        sum = 0.0;
                        for (let instance of this.list) {
                            sum += Math.pow(instance.getAttribute(index).getValue() - average, 2);
                        }
                        let result = new Array();
                        result.push(Math.sqrt(sum / (this.list.length - 1)));
                        return result;
                    }
                    else {
                        return undefined;
                    }
                }
            }
        }
        /**
         * The attributeDistribution method takes an index as an input and if the attribute of the instance at given index is
         * discrete, it returns the distribution of the attributes of that instance.
         *
         * @param index Index of the attribute.
         * @return Distribution of the attribute.
         */
        attributeDistribution(index) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            if (this.list[0].getAttribute(index) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                for (let instance of this.list) {
                    distribution.addItem(instance.getAttribute(index).getValue());
                }
            }
            return distribution;
        }
        /**
         * The attributeClassDistribution method takes an attribute index as an input. It loops through the instances, gets
         * the corresponding value of given attribute index and adds the class label of that instance to the discrete distributions list.
         *
         * @param attributeIndex Index of the attribute.
         * @return Distribution of the class labels.
         */
        attributeClassDistribution(attributeIndex) {
            let distributions = new Array();
            let valueList = this.getAttributeValueList(attributeIndex);
            for (let ignored of valueList) {
                distributions.push(new DiscreteDistribution_1.DiscreteDistribution());
            }
            for (let instance of this.list) {
                distributions[valueList.indexOf(instance.getAttribute(attributeIndex).getValue())].addItem(instance.getClassLabel());
            }
            return distributions;
        }
        /**
         * The discreteIndexedAttributeClassDistribution method takes an attribute index and an attribute value as inputs.
         * It loops through the instances, gets the corresponding value of given attribute index and given attribute value.
         * Then, adds the class label of that instance to the discrete indexed distributions list.
         *
         * @param attributeIndex Index of the attribute.
         * @param attributeValue Value of the attribute.
         * @return Distribution of the class labels.
         */
        discreteIndexedAttributeClassDistribution(attributeIndex, attributeValue) {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let instance of this.list) {
                if (instance.getAttribute(attributeIndex).getIndex() == attributeValue) {
                    distribution.addItem(instance.getClassLabel());
                }
            }
            return distribution;
        }
        /**
         * The classDistribution method returns the distribution of all the class labels of instances.
         *
         * @return Distribution of the class labels.
         */
        classDistribution() {
            let distribution = new DiscreteDistribution_1.DiscreteDistribution();
            for (let instance of this.list) {
                distribution.addItem(instance.getClassLabel());
            }
            return distribution;
        }
        /**
         * The allAttributesDistribution method returns the distributions of all the attributes of instances.
         *
         * @return Distributions of all the attributes of instances.
         */
        allAttributesDistribution() {
            let distributions = new Array();
            for (let i = 0; i < this.list[0].attributeSize(); i++) {
                distributions.push(this.attributeDistribution(i));
            }
            return distributions;
        }
        /**
         * Returns the mean of all the attributes for instances in the list.
         *
         * @return Mean of all the attributes for instances in the list.
         */
        average() {
            let result = new Instance_1.Instance(this.list[0].getClassLabel());
            for (let i = 0; i < this.list[0].attributeSize(); i++) {
                result.addAttribute(this.attributeAverage(i));
            }
            return result;
        }
        /**
         * Returns the standard deviation of attributes for instances.
         *
         * @return Standard deviation of attributes for instances.
         */
        standardDeviation() {
            let result = new Instance_1.Instance(this.list[0].getClassLabel());
            for (let i = 0; i < this.list[0].attributeSize(); i++) {
                result.addAttribute(this.attributeStandardDeviation(i));
            }
            return result;
        }
        /**
         * Calculates a covariance {@link Matrix} by using an average {@link Vector}.
         *
         * @param average Vector input.
         * @return Covariance {@link Matrix}.
         */
        covariance(average) {
            let result = new Matrix_1.Matrix(this.list[0].continuousAttributeSize(), this.list[0].continuousAttributeSize());
            for (let instance of this.list) {
                let continuousAttributes = instance.continuousAttributes();
                for (let i = 0; i < instance.continuousAttributeSize(); i++) {
                    let xi = continuousAttributes[i];
                    let mi = average.getValue(i);
                    for (let j = 0; j < instance.continuousAttributeSize(); j++) {
                        let xj = continuousAttributes[j];
                        let mj = average.getValue(j);
                        result.addValue(i, j, (xi - mi) * (xj - mj));
                    }
                }
            }
            result.divideByConstant(this.list.length - 1);
            return result;
        }
        /**
         * Accessor for the instances.
         *
         * @return Instances.
         */
        getInstances() {
            return this.list;
        }
    }
    exports.InstanceList = InstanceList;
});
//# sourceMappingURL=InstanceList.js.map