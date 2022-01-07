import {MultipleRun} from "./MultipleRun";
import {Experiment} from "./Experiment";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {Bootstrap} from "nlptoolkit-sampling/dist/Bootstrap";
import {InstanceList} from "../InstanceList/InstanceList";
import {Instance} from "../Instance/Instance";

export class BootstrapRun implements MultipleRun{

    private numberOfBootstraps: number

    /**
     * Constructor for BootstrapRun class. Basically sets the number of bootstrap runs.
     *
     * @param numberOfBootstraps Number of bootstrap runs.
     */
    constructor(numberOfBootstraps: number) {
        this.numberOfBootstraps = numberOfBootstraps
    }

    /**
     * Execute the bootstrap run with the given classifier on the given data set using the given parameters.
     *
     * @param experiment Experiment to be run.
     * @return An ExperimentPerformance instance.
     */
    execute(experiment: Experiment): ExperimentPerformance {
        let result = new ExperimentPerformance();
        for (let i = 0; i < this.numberOfBootstraps; i++) {
            let bootstrap = new Bootstrap<Instance>(experiment.getDataSet().getInstances(), i + experiment.getParameter().getSeed());
            let bootstrapSample = new InstanceList(bootstrap.getSample());
            experiment.getClassifier().train(bootstrapSample, experiment.getParameter());
            result.add(experiment.getClassifier().test(experiment.getDataSet().getInstanceList()));
        }
        return result;
    }
}