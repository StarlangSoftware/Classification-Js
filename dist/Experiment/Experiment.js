"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experiment = void 0;
class Experiment {
    model;
    parameter;
    dataSet;
    /**
     * Constructor for a specific machine learning experiment
     * @param model Model used in the machine learning experiment
     * @param parameter Parameter(s) of the classifier.
     * @param dataSet DataSet on which the classifier is run.
     */
    constructor(model, parameter, dataSet) {
        this.model = model;
        this.parameter = parameter;
        this.dataSet = dataSet;
    }
    /**
     * Accessor for the classifier attribute.
     * @return Classifier attribute.
     */
    getmodel() {
        return this.model;
    }
    /**
     * Accessor for the parameter attribute.
     * @return Parameter attribute.
     */
    getParameter() {
        return this.parameter;
    }
    /**
     * Accessor for the dataSet attribute.
     * @return DataSet attribute.
     */
    getDataSet() {
        return this.dataSet;
    }
    /**
     * Construct and returns a feature selection experiment.
     * @param featureSubSet Feature subset used in the feature selection experiment
     * @return Experiment constructed
     */
    featureSelectedExperiment(featureSubSet) {
        return new Experiment(this.model, this.parameter, this.dataSet.getSubSetOfFeatures(featureSubSet));
    }
}
exports.Experiment = Experiment;
//# sourceMappingURL=Experiment.js.map