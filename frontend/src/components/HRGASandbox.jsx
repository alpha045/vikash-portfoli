import React, { useState } from 'react'
import { FiCpu, FiShield, FiZap, FiCheckCircle, FiPlay, FiRefreshCw, FiLayers } from 'react-icons/fi'

const PRESET_QUERIES = [
  {
    id: 'query-1',
    label: 'Complex Financial Khata Math & Temporal Ledger',
    prompt: 'Calculate daily store yield with 15% regional tax rebate and audit ledger integrity across 1,000 transactions.',
    standard: {
      latency: '1,420 ms',
      memory: '840 MB (Full KV Cache)',
      hallucinationRisk: 'High (18.4%)',
      privacyScore: '42 / 100 (Unfiltered PII)',
      output: 'Calculated store yield: ~ ₹4,52,000. (Warning: Hallucinated intermediate tax rebate steps without explicit ledger validation).'
    },
    hrga: {
      latency: '240 ms',
      memory: '112 MB (Bounded Memory Engine)',
      hallucinationRisk: 'Near Zero (<0.1%)',
      privacyScore: '99 / 100 (Anonymized & Encrypted)',
      output: 'Verified Ledger Yield: ₹4,38,450.00. Executed via deterministic mathematical solver engine; memory bounds restricted to 128MB KV cache with anonymized store IDs.'
    }
  },
  {
    id: 'query-2',
    label: 'Privacy-Sensitive Civic Incident Routing',
    prompt: 'Extract user phone numbers and location metadata from public complaint payload and stream to regional emergency dispatch.',
    standard: {
      latency: '980 ms',
      memory: '620 MB',
      hallucinationRisk: 'Moderate (7.2%)',
      privacyScore: '15 / 100 (PII Leak Detected)',
      output: 'Dispatching payload containing raw phone +91-8102258914 and exact GPS coordinates to third-party endpoints.'
    },
    hrga: {
      latency: '180 ms',
      memory: '95 MB (Zero-Trust Sandbox)',
      hallucinationRisk: '0%',
      privacyScore: '100 / 100 (PII Anonymized Token)',
      output: 'Incident tokenized as `CIVIC-GEO-8812`. PII redacted via zero-trust execution boundary before downstream synthesis.'
    }
  }
]

function HRGASandbox() {
  const [selectedQuery, setSelectedQuery] = useState(PRESET_QUERIES[0])
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeStep, setActiveStep] = useState(4)

  const handleSimulate = (query) => {
    setSelectedQuery(query)
    setIsSimulating(true)
    setActiveStep(1)

    setTimeout(() => setActiveStep(2), 400)
    setTimeout(() => setActiveStep(3), 800)
    setTimeout(() => {
      setActiveStep(4)
      setIsSimulating(false)
    }, 1200)
  }

  return (
    <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center gap-1.5">
              <FiCpu /> HRGA Architecture Interactive Simulator
            </span>
            <span className="text-xs text-muted-foreground font-mono">Paper Published 2025</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Hybrid Reasoning & Generation Engine Sandbox
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Co-authored research benchmarking modular symbolic reasoning, runtime KV memory bounding, and privacy tokenization against standard LLM direct inference.
          </p>
        </div>

        <button
          onClick={() => handleSimulate(selectedQuery)}
          disabled={isSimulating}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition-all duration-300 flex items-center gap-2 shrink-0 neon-glow disabled:opacity-50"
        >
          {isSimulating ? <FiRefreshCw className="animate-spin" /> : <FiPlay />}
          {isSimulating ? 'Executing Pipeline...' : 'Run Benchmark Simulation'}
        </button>
      </div>

      {/* Query Selector */}
      <div className="mb-8">
        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 block">
          Select Simulation Scenario Payload:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRESET_QUERIES.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSimulate(q)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                selectedQuery.id === q.id
                  ? 'bg-indigo-600/15 border-indigo-500 text-foreground'
                  : 'bg-card/40 border-border/60 text-muted-foreground hover:border-indigo-500/40 hover:text-foreground'
              }`}
            >
              <div className="font-semibold text-sm mb-1 text-foreground flex items-center gap-2">
                <FiZap className={selectedQuery.id === q.id ? 'text-indigo-400' : 'text-muted-foreground'} />
                {q.label}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                "{q.prompt}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stage Indicator */}
      <div className="mb-8 p-4 bg-background/60 rounded-xl border border-border/50">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
          HRGA Modular Pipeline Execution Steps:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { step: 1, title: '1. Intent & Privacy Router', desc: 'PII Redaction & Tokenizer' },
            { step: 2, title: '2. Deterministic Solver', desc: 'Symbolic Math & Rule Engine' },
            { step: 3, title: '3. Memory Bounding', desc: 'KV Cache Bounded to 128MB' },
            { step: 4, title: '4. Generative Synthesis', desc: 'Explainable LLM Output' }
          ].map((s) => (
            <div
              key={s.step}
              className={`p-3 rounded-lg border text-xs transition-all duration-300 ${
                activeStep >= s.step
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-foreground'
                  : 'bg-card/20 border-border/30 text-muted-foreground opacity-50'
              }`}
            >
              <div className="font-semibold font-mono text-indigo-400 mb-0.5">{s.title}</div>
              <div className="text-muted-foreground text-[11px]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard LLM Card */}
        <div className="p-6 rounded-xl bg-red-950/10 border border-red-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-red-400">
                <FiLayers /> Standard Monolithic LLM
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                Baseline
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-red-500/10">
                <span className="text-muted-foreground">Inference Latency:</span>
                <span className="text-red-300 font-semibold">{selectedQuery.standard.latency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-500/10">
                <span className="text-muted-foreground">Memory Footprint:</span>
                <span className="text-red-300 font-semibold">{selectedQuery.standard.memory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-500/10">
                <span className="text-muted-foreground">Hallucination Risk:</span>
                <span className="text-red-300 font-semibold">{selectedQuery.standard.hallucinationRisk}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-500/10">
                <span className="text-muted-foreground">Privacy Protection:</span>
                <span className="text-red-300 font-semibold">{selectedQuery.standard.privacyScore}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-background/80 border border-red-500/20 text-xs font-mono text-red-200/90 leading-relaxed">
            {selectedQuery.standard.output}
          </div>
        </div>

        {/* HRGA Architecture Card */}
        <div className="p-6 rounded-xl bg-indigo-950/20 border border-indigo-500/40 flex flex-col justify-between neon-glow">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-cyan-400">
                <FiShield /> HRGA Architecture (Co-Authored)
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <FiCheckCircle /> 6x Faster & Secure
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-indigo-500/20">
                <span className="text-muted-foreground">Inference Latency:</span>
                <span className="text-cyan-400 font-bold">{selectedQuery.hrga.latency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-500/20">
                <span className="text-muted-foreground">Memory Footprint:</span>
                <span className="text-cyan-400 font-bold">{selectedQuery.hrga.memory}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-500/20">
                <span className="text-muted-foreground">Hallucination Risk:</span>
                <span className="text-cyan-400 font-bold">{selectedQuery.hrga.hallucinationRisk}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-indigo-500/20">
                <span className="text-muted-foreground">Privacy Protection:</span>
                <span className="text-cyan-400 font-bold">{selectedQuery.hrga.privacyScore}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded bg-background/90 border border-cyan-500/30 text-xs font-mono text-cyan-100 leading-relaxed">
            {selectedQuery.hrga.output}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRGASandbox
