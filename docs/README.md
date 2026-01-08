# Sentinal Nano S1 - LaTeX Documentation

## Files

- `sentinal_nano_s1.tex` - Main LaTeX document

## Required Images

The document expects two images in the same directory:

1. **`pcb_layout.png`** - The PCB layout view (blue schematic with routing)
2. **`pcb_3d.png`** - The 3D render of the assembled PCB

## Compiling on Overleaf

### Option 1: Upload to Overleaf

1. Go to [Overleaf](https://www.overleaf.com)
2. Create a new blank project
3. Upload `sentinal_nano_s1.tex`
4. Upload your two PCB images as `pcb_layout.png` and `pcb_3d.png`
5. Compile with pdfLaTeX

### Option 2: Compile Locally

```bash
pdflatex sentinal_nano_s1.tex
pdflatex sentinal_nano_s1.tex  # Run twice for TOC
```

## Package Requirements

The document uses standard LaTeX packages that are included in most TeX distributions:

- `amsmath`, `amssymb`, `amsthm` - Mathematics
- `graphicx` - Images
- `hyperref` - Clickable links
- `tcolorbox` - Colored boxes
- `booktabs` - Professional tables
- `fancyhdr` - Headers/footers
- `geometry` - Page layout
- `xcolor` - Colors
- `siunitx` - SI units
- `subcaption` - Subfigures

All these packages are available on Overleaf by default.

## Document Structure

1. **Problem Statement** - Why firefighter tracking matters
2. **System Overview** - High-level architecture
3. **Hardware Design** - Components, PCB, anchors
4. **Coordinate System** - Local frame setup
5. **Multilateration Mathematics** - Full derivation
   - Sphere intersection model
   - Linear closed-form solution
   - Nonlinear least squares (Gauss-Newton)
   - Robust estimation (Huber/Tukey)
6. **UWB Ranging Physics** - Time-of-flight basics
7. **ML Bias Correction** - NLOS error handling
8. **Training Data Collection** - Ground truth methodology
9. **Build Plan** - Development phases
10. **Technical Summary** - Specifications table
11. **Team** - Member responsibilities
12. **Appendix** - Notation reference

## Notes

- The document uses `tcolorbox` for highlighted math boxes
- Color scheme matches the website (blue/orange accents)
- All equations are numbered for reference
- Boxed equations highlight key formulas
