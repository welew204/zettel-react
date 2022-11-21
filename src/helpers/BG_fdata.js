import * as d3 from "d3";

/* setting n = 200 as constant (this is "# of nodes value" in template) */
/* setting m = 10 as constant (this is "# of clusters value" in template) */
const n = 20
const m = 5
const s = 30

const BG_fake_data = ({
    children: Array.from(
        d3.group(
            Array.from({length: n}, (_, i) => ({
                group: Math.random() * m | 0,
                value: Math.random() * s
            })),
            d => d.group
            ),
            ([, children]) => ({children})
            )
        })

export default BG_fake_data

