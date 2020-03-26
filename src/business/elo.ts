const n = 400;
const k = 30; //Future Enhancement: make k tiered (k=30 for players in their first 10 games)
class Elo {
    scoreEstimation(A: number, B: number): number {
        const x = A - B;
        const exp = -1 * (x / n);
        return 1 / (1 + Math.pow(10, exp));
    }
    eloChange(A: number, B: number, AWins: boolean): number {
        let factor = this.scoreEstimation(A, B);
        if (AWins) factor = 1 - factor;
        return Math.round(k * factor);
    }
}

const elo: Elo = new Elo();
export default elo;
