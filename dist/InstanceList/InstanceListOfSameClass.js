"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceListOfSameClass = void 0;
const InstanceList_1 = require("./InstanceList");
class InstanceListOfSameClass extends InstanceList_1.InstanceList {
    classLabel;
    /**
     * Constructor for creating a new instance list with the same class label.
     *
     * @param classLabel Class label of instance list.
     */
    constructor(classLabel) {
        super();
        this.classLabel = classLabel;
    }
    /**
     * Accessor for the class label.
     *
     * @return Class label.
     */
    getClassLabel() {
        return this.classLabel;
    }
}
exports.InstanceListOfSameClass = InstanceListOfSameClass;
//# sourceMappingURL=InstanceListOfSameClass.js.map