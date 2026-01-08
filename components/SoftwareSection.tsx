'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

export default function SoftwareSection() {
  return (
    <section id="software" className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto">
        {/* Section 3: Algorithms */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">03</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Algorithm Pipeline
          </h2>
          <p className="text-gray-500 max-w-xl">
            Real-time position computation from UWB range measurements.
          </p>
        </motion.div>

        {/* Runtime Pipeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <h3 className="text-lg font-medium text-white mb-6">Runtime Loop</h3>
          
          <div className="grid gap-4">
            {[
              { step: 1, action: 'Collect UWB ranges', math: 'd_i', desc: 'from visible anchors' },
              { step: 2, action: 'Apply ML correction', math: 'd_{corr} = d_i - \\hat{\\Delta}_i', desc: 'compute weight' },
              { step: 3, action: 'Solve multilateration', math: '(x, y, z)', desc: 'weighted least squares' },
              { step: 4, action: 'Tracking filter', math: null, desc: 'predict → correct with IMU' },
              { step: 5, action: 'Output position', math: null, desc: '(x, y, z, confidence, timestamp)', isOutput: true },
            ].map((item) => (
              <div 
                key={item.step} 
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  item.isOutput 
                    ? 'bg-green-900/20 border-green-700/30' 
                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm ${
                  item.isOutput ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <span className="text-white font-medium">{item.action}</span>
                  {item.math && (
                    <span className="text-gray-400 ml-2">
                      <InlineMath math={item.math} />
                    </span>
                  )}
                  <span className="text-gray-500 ml-2">— {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section 4: Physics Model */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">04</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Multilateration
          </h2>
          <p className="text-gray-500 max-w-xl mb-12">
            Position from range measurements — each range defines a sphere.
          </p>

          {/* Multilateration Image */}
          <div className="mb-10 p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
            <div className="relative w-full aspect-video bg-gray-950 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/multilateration.png"
                alt="Sphere intersection for multilateration"
                width={800}
                height={450}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-gray-500 text-sm text-center mt-4">
              Each anchor defines a sphere of radius <InlineMath math="d_i" />. The position lies at the intersection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Inputs
              </h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <p>Anchor positions <InlineMath math="a_i = (x_i, y_i, z_i)" /></p>
                <p>Corrected ranges <InlineMath math="d_{corr,i}" /></p>
                <p>Weights <InlineMath math="w_i = 1/\sigma_i^2" /></p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Output
              </h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <p>Position estimate <InlineMath math="\hat{p} = (x, y, z)" /></p>
                <p>Residual RMS (consistency metric)</p>
              </div>
            </div>
          </div>

          {/* Nonlinear Least Squares - Full Math */}
          <div className="p-8 bg-gradient-to-br from-blue-900/20 to-gray-900/40 border border-blue-800/30 rounded-xl mb-8">
            <h4 className="text-blue-400 font-medium mb-6 text-center">Nonlinear Least Squares on Range Residuals</h4>
            
            {/* Problem setup */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-4">
                Let 4 anchors have known 3D positions <InlineMath math="\mathbf{p}_i = [x_i, y_i, z_i]^\top \in \mathbb{R}^3" /> for <InlineMath math="i = 1, 2, 3, 4" />.
                The measured ranges (from time-of-flight) are <InlineMath math="r_i \geq 0" />. The unknown tag position is <InlineMath math="\mathbf{x} = [x, y, z]^\top" />.
              </p>
            </div>

            {/* Residual definition */}
            <div className="mb-6 p-5 bg-gray-900/60 rounded-xl border border-gray-800">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Residual Definition</p>
              <div className="py-2 overflow-x-auto">
                <BlockMath math="e_i(\mathbf{x}) = \|\mathbf{x} - \mathbf{p}_i\| - r_i, \quad i = 1, \dots, M" />
              </div>
            </div>

            {/* Objective function */}
            <div className="mb-6 p-5 bg-gradient-to-br from-orange-900/20 to-gray-900/40 rounded-xl border border-orange-700/30">
              <p className="text-orange-400 text-xs uppercase tracking-wider mb-3">Objective Function</p>
              <div className="py-2 overflow-x-auto">
                <BlockMath math="\min_{\mathbf{x}} \sum_{i=1}^{M} w_i \, e_i(\mathbf{x})^2" />
              </div>
              <p className="text-gray-500 text-sm mt-3 text-center">
                Solved via Gauss–Newton or Levenberg–Marquardt iteration.
              </p>
            </div>

            {/* Jacobian */}
            <div className="mb-6 p-5 bg-gray-900/60 rounded-xl border border-gray-800">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Jacobian Row <InlineMath math="i" /></p>
              <div className="py-2 overflow-x-auto">
                <BlockMath math="\mathbf{J}_i(\mathbf{x}) = \frac{\partial e_i}{\partial \mathbf{x}} = \frac{(\mathbf{x} - \mathbf{p}_i)^\top}{\|\mathbf{x} - \mathbf{p}_i\|} \in \mathbb{R}^{1 \times 3}" />
              </div>
            </div>

            {/* Update rule */}
            <div className="p-5 bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-xl border border-green-700/30">
              <p className="text-green-400 text-xs uppercase tracking-wider mb-3">Gauss–Newton Update</p>
              <div className="py-2 overflow-x-auto">
                <BlockMath math="\Delta \mathbf{x} = -(\mathbf{J}^\top \mathbf{W} \mathbf{J})^{-1} \mathbf{J}^\top \mathbf{W} \mathbf{e}" />
              </div>
              <div className="py-2 overflow-x-auto">
                <BlockMath math="\mathbf{x} \leftarrow \mathbf{x} + \Delta \mathbf{x}" />
              </div>
              <p className="text-gray-500 text-sm mt-3">
                Stack <InlineMath math="\mathbf{e} = [e_1, \dots, e_M]^\top" /> and <InlineMath math="\mathbf{J} \in \mathbb{R}^{M \times 3}" />. 
                Weight matrix <InlineMath math="\mathbf{W}" /> is typically diagonal with <InlineMath math="w_i = 1/\sigma_i^2" />.
              </p>
            </div>
          </div>

          {/* Linear initializer section */}
          <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl mb-8">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
              Linear Initializer (Fast Approximation)
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              For a good starting guess, subtract the first sphere equation from the rest to eliminate <InlineMath math="\mathbf{x}^\top \mathbf{x}" />:
            </p>
            <div className="p-4 bg-gray-900/60 rounded-lg mb-4 overflow-x-auto">
              <BlockMath math="\mathbf{A} = 2 \begin{bmatrix} (\mathbf{p}_2 - \mathbf{p}_1)^\top \\ (\mathbf{p}_3 - \mathbf{p}_1)^\top \\ (\mathbf{p}_4 - \mathbf{p}_1)^\top \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} r_1^2 - r_2^2 + \|\mathbf{p}_2\|^2 - \|\mathbf{p}_1\|^2 \\ r_1^2 - r_3^2 + \|\mathbf{p}_3\|^2 - \|\mathbf{p}_1\|^2 \\ r_1^2 - r_4^2 + \|\mathbf{p}_4\|^2 - \|\mathbf{p}_1\|^2 \end{bmatrix}" />
            </div>
            <div className="p-4 bg-gradient-to-r from-cyan-900/20 to-gray-900/40 rounded-lg border border-cyan-700/30 overflow-x-auto">
              <p className="text-cyan-400 text-xs uppercase tracking-wider mb-2">Solution (if anchors not coplanar)</p>
              <BlockMath math="\mathbf{x}_0 = \mathbf{A}^{-1} \mathbf{b}" />
            </div>
          </div>

          {/* Outlier rejection */}
          <div className="p-6 bg-gradient-to-r from-yellow-900/20 to-transparent border border-yellow-700/30 rounded-xl mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                </svg>
              </div>
              <div>
                <h4 className="text-yellow-500 font-medium mb-2">Robust Estimation</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Replace <InlineMath math="w_i" /> with robust weights updated each iteration (e.g., Huber/Tukey based on <InlineMath math="|e_i|" />), 
                  so outlier anchors get downweighted automatically — prevents &quot;teleporting&quot; from bad ranges.
                </p>
              </div>
            </div>
          </div>

          {/* Geometry notes */}
          <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
              Geometry Notes
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-blue-400 font-medium mb-1">Minimum</p>
                <p className="text-gray-400">4 anchors for 3D with absolute ranges; more improves conditioning</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-green-400 font-medium mb-1">Good Geometry</p>
                <p className="text-gray-400">Anchors spread in 3D (not coplanar) reduces dilution of precision</p>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <p className="text-purple-400 font-medium mb-1">Degeneracy</p>
                <p className="text-gray-400"><InlineMath math="\det(\mathbf{A}) = 0" /> when anchors are coplanar/collinear</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 5: AI Model */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">05</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            ML Bias Correction
          </h2>
          <p className="text-gray-500 max-w-xl mb-12">
            Correcting systematic NLOS errors using learned signal features.
          </p>

          <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl mb-8">
            <p className="text-gray-300">
              Indoor ranging errors are often <strong className="text-white">systematic</strong> — walls add consistent bias, 
              not purely random noise. A trained model predicts this bias from signal features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                </svg>
                Model Inputs
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  Measured distance <InlineMath math="d_{meas}" />
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  Anchor ID
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  Received signal strength (RSSI)
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                  First-path power, SNR
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Model Outputs
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                  <InlineMath math="\hat{b}" /> — predicted bias (meters)
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                  <InlineMath math="\hat{\sigma}" /> — predicted uncertainty
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                  Weight: <InlineMath math="w = 1/\hat{\sigma}^2" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl mb-8">
            <h4 className="text-white font-medium mb-4">Runtime Correction</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                <p className="text-gray-500 text-xs mb-2">Corrected Distance</p>
                <InlineMath math="d_{corr} = d_{meas} - \hat{b}" />
              </div>
              <div className="p-4 bg-gray-800/30 rounded-lg text-center">
                <p className="text-gray-500 text-xs mb-2">Weight</p>
                <InlineMath math="w = 1 / \max(\hat{\sigma}^2, \sigma_{floor}^2)" />
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-2">Key Insight</h4>
                <p className="text-gray-400 text-sm">
                  The ML model outputs <strong className="text-white">range corrections</strong>, not positions directly. 
                  Position is computed geometrically via multilateration. This keeps the system interpretable and debuggable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Data Plan */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-blue-500 font-mono text-sm">06</span>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent max-w-[100px]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Training Data Collection
          </h2>
          <p className="text-gray-500 max-w-xl mb-12">
            Ground truth methodology for ML model training.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4">Ground Truth Method</h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-mono">1</span>
                  <span>Create taped floor grid (0.5m spacing)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-mono">2</span>
                  <span>Measure grid coordinates with laser meter</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-mono">3</span>
                  <span>Stand at each point for 3–5 seconds, log all ranges</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <h4 className="text-white font-medium mb-4">Labels</h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <p>True distance: <InlineMath math="d_{true} = \|p_{gt} - a_i\|" /></p>
                <p>Bias label: <InlineMath math="b_{label} = d_{meas} - d_{true}" /></p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h4 className="text-white font-medium">LOS Samples</h4>
              </div>
              <p className="text-gray-400 text-sm">Tag and anchor in same room, clear line of sight</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h4 className="text-white font-medium">NLOS Samples</h4>
              </div>
              <p className="text-gray-400 text-sm">Signal passes through walls, corners, or obstructions</p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-green-900/20 to-transparent border border-green-700/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-green-400 font-medium mb-2">Train/Test Split</h4>
                <p className="text-gray-400 text-sm">
                  Split by room or hallway, <strong className="text-white">not random time</strong>. 
                  This proves the model generalizes to new environments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
