import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import { nanoid } from 'nanoid';


        
export default function BubbleGraph({ data }) {
    /* on run, this tells React to pass in some data to
    make a ref using the custom hook ("useD3");
    useD3 calls a function ("renderChartFn") and passes
    that function a d3 selection object instantiated
    with the ref.current value and returns ???????
    
    then */
    
    /* setting n = 200 as constant (this is "# of nodes value" in template) */
    /* setting m = 10 as constant (this is "# of clusters value" in template) */
    const n = 20
    const m = 10
            
    
    const ref = useD3(
        (svg) => {
            const height = 600;
            const width = 600;
            const margin = {top: 10, right: 10, bottom: 10, left: 10}
            
            /* first, making a root node that is formed by passing the (nested) data into d3.hierarchy(), then running .sum() on it */
            const root = d3.hierarchy(data).sum(d => d.value);
            /* then, making a PACKing function (?) that translates that data into the right layout */
            let packt = d3.pack().size([width, height]).padding(3);
            packt(root);
            const color = d3.scaleOrdinal(d3.range(m), d3.schemeCategory10);
            /* WOULD LOVE help understanding why this doesn't work... */
            const color_alt = d3.scaleSequential(d3.range(m), d3.interpolateInferno);
            
            function clicked(event, d) {
                if (event.defaultPrevented) return;

                var label = d3.select('.plot-area')
                .selectAll('text')
                .data(this)
                .append('text')
                .attr("x", this.x)
                .attr("y", this.y)
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text("farts!")

                console.log(label)
            }

            var nodes = d3.select('.plot-area')
            .selectAll('circle')
            .data(root.leaves())
            .join('g')
            .attr("id", d => d.id = nanoid(5))
            
            
            nodes.selectAll('g')
            .data(root.descendants().filter(d => d.height === 1))
            .join('circle')
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("id", d => d.id = nanoid(5))
            
            nodes.selectAll('g')
            .data(root.leaves())
            .join('circle')
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r)
            .attr("id", d => d.id = nanoid(5))
            .style('fill', d => color(d.data.group))
            .on("click", clicked)

        
        }, 
        [data.length]
        );
        
    return (
        <svg
            
            ref={ref}
            style={{
                height: 1000,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className='plot-area' />
        </svg>
    )
}