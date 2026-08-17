# Token Efficiency

Maximize useful capability per unit of context. Route minimally, load references selectively, constrain tool output, prefer schemas and engines over repeated prose, and stop routing when the answer is sufficient. Defaults are 2,500 core tokens, zero initial references, at most four selected references, and on-demand examples/large sources. These are review thresholds, not artificial expertise caps.

If projected routing exceeds six skills or expected complexity, emit `CONTEXT_GUARD`, explain the load, and re-evaluate the route. Do not activate token-economy for every request; use it for request optimization, repository audit, refactor, or measurement.
