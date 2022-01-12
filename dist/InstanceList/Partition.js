(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./InstanceList", "./InstanceListOfSameClass"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Partition = void 0;
    const InstanceList_1 = require("./InstanceList");
    const InstanceListOfSameClass_1 = require("./InstanceListOfSameClass");
    class Partition {
        constructor(instanceList, attributeIndex, stratifiedOrValue, random) {
            this.multiList = new Array();
            if (instanceList != undefined) {
                if (attributeIndex == undefined) {
                    let classLabels = instanceList.getDistinctClassLabels();
                    for (let classLabel of classLabels) {
                        this.add(new InstanceListOfSameClass_1.InstanceListOfSameClass(classLabel));
                    }
                    for (let instance of instanceList.getInstances()) {
                        this.get(classLabels.indexOf(instance.getClassLabel())).add(instance);
                    }
                }
                else {
                    if (stratifiedOrValue == undefined) {
                        let valueList = instanceList.getAttributeValueList(attributeIndex);
                        for (let value of valueList) {
                            this.add(new InstanceList_1.InstanceList());
                        }
                        for (let instance of instanceList.getInstances()) {
                            this.get(valueList.indexOf(instance.getAttribute(attributeIndex).getValue())).add(instance);
                        }
                    }
                    else {
                        if (typeof stratifiedOrValue == "boolean") {
                            this.add(new InstanceList_1.InstanceList());
                            this.add(new InstanceList_1.InstanceList());
                            if (stratifiedOrValue) {
                                let distribution = instanceList.classDistribution();
                                let counts = new Array(distribution.size).fill(0);
                                let randomArray = new Array();
                                for (let i = 0; i < instanceList.size(); i++) {
                                    randomArray.push(i);
                                }
                                if (random != undefined) {
                                    random.shuffle(randomArray);
                                }
                                for (let i = 0; i < instanceList.size(); i++) {
                                    let instance = instanceList.get(randomArray[i]);
                                    let classIndex = distribution.getIndex(instance.getClassLabel());
                                    let ratio = attributeIndex;
                                    if (counts[classIndex] < instanceList.size() * ratio * distribution.getProbability(instance.getClassLabel())) {
                                        this.get(0).add(instance);
                                    }
                                    else {
                                        this.get(1).add(instance);
                                    }
                                    counts[classIndex]++;
                                }
                            }
                            else {
                                instanceList.shuffle(random);
                                for (let i = 0; i < instanceList.size(); i++) {
                                    let instance = instanceList.get(i);
                                    let ratio = attributeIndex;
                                    if (i < instanceList.size() * ratio) {
                                        this.get(0).add(instance);
                                    }
                                    else {
                                        this.get(1).add(instance);
                                    }
                                }
                            }
                        }
                        else {
                            this.add(new InstanceList_1.InstanceList());
                            this.add(new InstanceList_1.InstanceList());
                            if (Number.isInteger(stratifiedOrValue)) {
                                for (let instance of instanceList.getInstances()) {
                                    if (instance.getAttribute(attributeIndex).getIndex() == stratifiedOrValue) {
                                        this.get(0).add(instance);
                                    }
                                    else {
                                        this.get(1).add(instance);
                                    }
                                }
                            }
                            else {
                                for (let instance of instanceList.getInstances()) {
                                    if (instance.getAttribute(attributeIndex).getValue() <= stratifiedOrValue) {
                                        this.get(0).add(instance);
                                    }
                                    else {
                                        this.get(1).add(instance);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        /**
         * Adds given instance list to the list of instance lists.
         *
         * @param list Instance list to add.
         */
        add(list) {
            this.multiList.push(list);
        }
        /**
         * Returns the size of the list of instance lists.
         *
         * @return The size of the list of instance lists.
         */
        size() {
            return this.multiList.length;
        }
        /**
         * Returns the corresponding instance list at given index of list of instance lists.
         *
         * @param index Index of the instance list.
         * @return Instance list at given index of list of instance lists.
         */
        get(index) {
            return this.multiList[index];
        }
        /**
         * Returns the instances of the items at the list of instance lists.
         *
         * @return Instances of the items at the list of instance lists.
         */
        getLists() {
            let result = new Array(this.multiList.length);
            for (let i = 0; i < this.multiList.length; i++) {
                result.push(this.multiList[i].getInstances());
            }
            return result;
        }
    }
    exports.Partition = Partition;
});
//# sourceMappingURL=Partition.js.map