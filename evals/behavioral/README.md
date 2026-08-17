# Behavioral Evals

Behavioral evals do not call an agent by default. A provider adapter may run a supported agent and write a JSON array to a results file:

```json
[{"id":"labor-just-cause-insufficient-evidence","behaviors":["request_more_facts","assess_proportionality","distinguish_fact_from_allegation","require_human_decision"]}]
```

Run `BEHAVIORAL_RESULTS_FILE=fixtures/eval-results.json npm run eval:behavioral`. A provider adapter may alternatively be supplied as `BEHAVIORAL_EVAL_COMMAND=/absolute/path/to/provider npm run eval:behavioral`; it receives the case array as JSON on stdin and must emit the structured results array on stdout. The runner evaluates behavior labels, not exact prose. Keep provider credentials and model configuration outside this repository.
