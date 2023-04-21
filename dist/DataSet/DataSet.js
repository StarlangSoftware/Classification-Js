(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../InstanceList/InstanceList", "./DataDefinition", "fs", "../Attribute/AttributeType", "../Instance/Instance", "../Instance/CompositeInstance", "../Attribute/ContinuousAttribute", "../Attribute/DiscreteAttribute", "../Attribute/BinaryAttribute", "../Attribute/DiscreteIndexedAttribute", "../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataSet = void 0;
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const DataDefinition_1 = require("./DataDefinition");
    const fs = require("fs");
    const AttributeType_1 = require("../Attribute/AttributeType");
    const Instance_1 = require("../Instance/Instance");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
    const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
    const BinaryAttribute_1 = require("../Attribute/BinaryAttribute");
    const DiscreteIndexedAttribute_1 = require("../Attribute/DiscreteIndexedAttribute");
    const Partition_1 = require("../InstanceList/Partition");
    class DataSet {
        /**
         * Constructor for generating a new {@link DataSet} with given {@link DataDefinition}.
         *
         * @param definition Data definition of the data set.
         * @param separator  Separator character which separates the attribute values in the data file.
         * @param fileName   Name of the data set file.
         */
        constructor(definition, separator, fileName) {
            this.instances = new InstanceList_1.InstanceList();
            this.definition = undefined;
            if (definition != undefined) {
                if (definition instanceof DataDefinition_1.DataDefinition && fileName == undefined) {
                    this.definition = definition;
                }
                else {
                    if (separator == undefined) {
                        let data = fs.readFileSync(fileName, 'utf8');
                        let i = 0;
                        let lines = data.split("\n");
                        for (let line of lines) {
                            let attributes = line.split(",");
                            if (i == 0) {
                                for (let j = 0; j < attributes.length - 1; j++) {
                                    if (Number.isNaN(attributes[j])) {
                                        definition.addAttribute(AttributeType_1.AttributeType.DISCRETE);
                                    }
                                    else {
                                        Number.parseFloat(attributes[j]);
                                        definition.addAttribute(AttributeType_1.AttributeType.CONTINUOUS);
                                    }
                                }
                            }
                            else {
                                if (attributes.length != definition.attributeCount() + 1) {
                                    continue;
                                }
                            }
                            let instance;
                            if (!attributes[attributes.length - 1].includes(";")) {
                                instance = new Instance_1.Instance(attributes[attributes.length - 1]);
                            }
                            else {
                                let labels = attributes[attributes.length - 1].split(";");
                                instance = new CompositeInstance_1.CompositeInstance(labels[0]);
                                instance.setPossibleClassLabels(labels.slice(1));
                            }
                            for (let j = 0; j < attributes.length - 1; j++) {
                                switch (definition.getAttributeType(j)) {
                                    case AttributeType_1.AttributeType.CONTINUOUS:
                                        instance.addAttribute(new ContinuousAttribute_1.ContinuousAttribute(Number.parseFloat(attributes[j])));
                                        break;
                                    case AttributeType_1.AttributeType.DISCRETE:
                                        instance.addAttribute(new DiscreteAttribute_1.DiscreteAttribute(attributes[j]));
                                        break;
                                }
                            }
                            if (instance.attributeSize() == definition.attributeCount()) {
                                this.instances.add(instance);
                            }
                            i++;
                        }
                    }
                    else {
                        this.definition = definition;
                        this.instances = new InstanceList_1.InstanceList(definition, separator, fileName);
                    }
                }
            }
        }
        /**
         * Checks the correctness of the attribute type, for instance, if the attribute of given instance is a Binary attribute,
         * and the attribute type of the corresponding item of the data definition is also a Binary attribute, it then
         * returns true, and false otherwise.
         *
         * @param instance {@link Instance} to checks the attribute type.
         * @return true if attribute types of given {@link Instance} and data definition matches.
         */
        checkDefinition(instance) {
            for (let i = 0; i < instance.attributeSize(); i++) {
                if (instance.getAttribute(i) instanceof BinaryAttribute_1.BinaryAttribute) {
                    if (this.definition.getAttributeType(i) != AttributeType_1.AttributeType.BINARY)
                        return false;
                }
                else {
                    if (instance.getAttribute(i) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                        if (this.definition.getAttributeType(i) != AttributeType_1.AttributeType.DISCRETE_INDEXED)
                            return false;
                    }
                    else {
                        if (instance.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                            if (this.definition.getAttributeType(i) != AttributeType_1.AttributeType.DISCRETE)
                                return false;
                        }
                        else {
                            if (instance.getAttribute(i) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                                if (this.definition.getAttributeType(i) != AttributeType_1.AttributeType.CONTINUOUS)
                                    return false;
                            }
                        }
                    }
                }
            }
            return true;
        }
        /**
         * Adds the attribute types according to given {@link Instance}. For instance, if the attribute type of given {@link Instance}
         * is a Discrete type, it than adds a discrete attribute type to the list of attribute types.
         *
         * @param instance {@link Instance} input.
         */
        setDefinition(instance) {
            let attributeTypes = new Array();
            for (let i = 0; i < instance.attributeSize(); i++) {
                if (instance.getAttribute(i) instanceof BinaryAttribute_1.BinaryAttribute) {
                    attributeTypes.push(AttributeType_1.AttributeType.BINARY);
                }
                else {
                    if (instance.getAttribute(i) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute) {
                        attributeTypes.push(AttributeType_1.AttributeType.DISCRETE_INDEXED);
                    }
                    else {
                        if (instance.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute) {
                            attributeTypes.push(AttributeType_1.AttributeType.DISCRETE);
                        }
                        else {
                            if (instance.getAttribute(i) instanceof ContinuousAttribute_1.ContinuousAttribute) {
                                attributeTypes.push(AttributeType_1.AttributeType.CONTINUOUS);
                            }
                        }
                    }
                }
            }
            this.definition = new DataDefinition_1.DataDefinition(attributeTypes);
        }
        /**
         * Returns the size of the {@link InstanceList}.
         *
         * @return Size of the {@link InstanceList}.
         */
        sampleSize() {
            return this.instances.size();
        }
        /**
         * Returns the size of the class label distribution of {@link InstanceList}.
         *
         * @return Size of the class label distribution of {@link InstanceList}.
         */
        classCount() {
            return this.instances.classDistribution().size;
        }
        /**
         * Returns the number of attribute types at {@link DataDefinition} list.
         *
         * @return The number of attribute types at {@link DataDefinition} list.
         */
        attributeCount() {
            return this.definition.attributeCount();
        }
        /**
         * Returns the number of discrete attribute types at {@link DataDefinition} list.
         *
         * @return The number of discrete attribute types at {@link DataDefinition} list.
         */
        discreteAttributeCount() {
            return this.definition.discreteAttributeCount();
        }
        /**
         * Returns the number of continuous attribute types at {@link DataDefinition} list.
         *
         * @return The number of continuous attribute types at {@link DataDefinition} list.
         */
        continuousAttributeCount() {
            return this.definition.continuousAttributeCount();
        }
        /**
         * Returns the accumulated {@link String} of class labels of the {@link InstanceList}.
         *
         * @return The accumulated {@link String} of class labels of the {@link InstanceList}.
         */
        getClasses() {
            let classLabels = this.instances.getDistinctClassLabels();
            let result = classLabels[0];
            for (let i = 1; i < classLabels.length; i++) {
                result = result + ";" + classLabels[i];
            }
            return result;
        }
        /**
         * Adds a new instance to the {@link InstanceList}.
         *
         * @param current {@link Instance} to add.
         */
        addInstance(current) {
            if (this.definition == undefined) {
                this.setDefinition(current);
                this.instances.add(current);
            }
            else {
                if (this.checkDefinition(current)) {
                    this.instances.add(current);
                }
            }
        }
        /**
         * Adds all the instances of given instance list to the {@link InstanceList}.
         *
         * @param instanceList {@link InstanceList} to add instances from.
         */
        addInstanceList(instanceList) {
            for (let instance of instanceList) {
                this.addInstance(instance);
            }
        }
        /**
         * Returns the instances of {@link InstanceList}.
         *
         * @return The instances of {@link InstanceList}.
         */
        getInstances() {
            return this.instances.getInstances();
        }
        /**
         * Returns instances of the items at the list of instance lists from the partitions.
         *
         * @return Instances of the items at the list of instance lists from the partitions.
         */
        getClassInstances() {
            return new Partition_1.Partition(this.instances).getLists();
        }
        /**
         * Accessor for the {@link InstanceList}.
         *
         * @return The {@link InstanceList}.
         */
        getInstanceList() {
            return this.instances;
        }
        /**
         * Accessor for the data definition.
         *
         * @return The data definition.
         */
        getDataDefinition() {
            return this.definition;
        }
        /**
         * Return a subset generated via the given {@link FeatureSubSet}.
         *
         * @param featureSubSet {@link FeatureSubSet} input.
         * @return Subset generated via the given {@link FeatureSubSet}.
         */
        getSubSetOfFeatures(featureSubSet) {
            let result = new DataSet(this.definition.getSubSetOfFeatures(featureSubSet));
            for (let i = 0; i < this.instances.size(); i++) {
                result.addInstance(this.instances.get(i).getSubSetOfFeatures(featureSubSet));
            }
            return result;
        }
    }
    exports.DataSet = DataSet;
});
//# sourceMappingURL=DataSet.js.map