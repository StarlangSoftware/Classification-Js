import { Experiment } from "./Experiment";
import { ExperimentPerformance } from "../Performance/ExperimentPerformance";
export interface MultipleRun {
    execute(experiment: Experiment): ExperimentPerformance;
}
