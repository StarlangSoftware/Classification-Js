import {Performance} from "../Performance/Performance";
import {Experiment} from "./Experiment";

export interface SingleRun {

    execute(experiment: Experiment): Performance
}