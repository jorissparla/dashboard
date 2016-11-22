import React from 'react';
import  {
    Sparklines,
    SparklinesBars,
    SparklinesLine,
    SparklinesCurve,
    SparklinesNormalBand,
    SparklinesReferenceLine,
    SparklinesSpots
} from 'react-sparklines';

function boxMullerRandom() {
    let phase = false,
        x1,
        x2,
        w,
        z;

    return (function () {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array
        .apply(0, Array(n))
        .map(boxMullerRandom);
}

const sampleData = randomData(30);

const WorkLoad = () => {
    return (
        <div className="col s2">
            <Sparklines data={sampleData}>
                <SparklinesBars
                    style={{
                    fill: 'slategray',
                    fillOpacity: ".5"
                }}/>
                <SparklinesReferenceLine/>
            </Sparklines>

        </div>
    );
};

export default WorkLoad;