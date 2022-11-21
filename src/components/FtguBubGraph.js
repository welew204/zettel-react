/* working on understanding REACT x D3 using template from https://wattenberger.com/blog/react-and-d3 */
import React from "react";
import * as d3 from 'd3';

const generateData = (size, x_span, y_span) => (
    Array(size).fill(0).map(() => ([
        Math.random() * x_span + size,
        Math.random() * y_span + size,
    ]))
)

export default function BubGrph() {
    const Svg = () => {
        return (
            <svg style={{
                border: "2px solid gold"
            }} />
        )
    }

    const example = Svg()
    
    return (
        <div>
            {example}
        </div>
    )
}