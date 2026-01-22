## Packages
framer-motion | Smooth animations for state transitions
react-dropzone | Drag and drop file uploads
recharts | Visualization for analysis metrics (optional but good for tech feel)

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
  mono: ["var(--font-mono)"],
}
API expects FormData for POST /api/analyze with 'file' field
