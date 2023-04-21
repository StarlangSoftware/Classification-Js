import {GaussianModel} from "./GaussianModel";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Instance} from "../Instance/Instance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class LdaModel extends GaussianModel{

    protected w0: Map<string, number>
    protected w: Map<string, Vector>

    /**
     * A constructor which sets the priorDistribution, w and w0 according to given inputs.
     *
     * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
     * @param w                 {@link HashMap} of String and Vectors.
     * @param w0                {@link HashMap} of String and Double.
     */
    constructor(priorDistributionOrFileName?: DiscreteDistribution | string, w?: Map<string, Vector>, w0?: Map<string, number>) {
        super()
        if (priorDistributionOrFileName instanceof DiscreteDistribution){
            this.priorDistribution = priorDistributionOrFileName
            this.w = w
            this.w0 = w0
        } else {
            if (priorDistributionOrFileName != undefined){
                let input = new FileContents(priorDistributionOrFileName)
                let size = this.loadPriorDistribution(input)
                this.loadWandW0(input, size)
            }
        }
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It returns the dot product of given Instance
     * and wi plus w0i.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The dot product of given Instance and wi plus w0i.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        let xi = instance.toVector();
        let wi = this.w.get(Ci);
        let w0i = this.w0.get(Ci);
        return wi.dotProduct(xi) + w0i;
    }

    loadWandW0(input: FileContents, size: number){
        this.w0 = new Map<string, number>()
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ")
            this.w0.set(items[0], parseFloat(items[1]))
        }
        this.w = this.loadVectors(input, size)
    }

    saveTxt(fileName: string){
    }

}