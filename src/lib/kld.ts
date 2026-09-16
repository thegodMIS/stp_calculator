export interface KLDResult {
  kld: number;
  kldReverse: number;
  jsd: number;
  crossEntropy: number;
  entropyP: number;
  entropyQ: number;
  barData: { label: string; p: number; q: number }[];
}

function entropy(dist: number[]): number {
  return -dist.reduce((sum, p) => (p > 0 ? sum + p * Math.log2(p) : sum), 0);
}

export function computeKLD(pRaw: number[], qRaw: number[]): KLDResult {
  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
  const normalize = (arr: number[]) => {
    const s = sum(arr);
    return s === 0 ? arr.map(() => 1 / arr.length) : arr.map((v) => v / s);
  };

  const n = Math.min(pRaw.length, qRaw.length);
  const p = normalize(pRaw.slice(0, n));
  const q = normalize(qRaw.slice(0, n));

  // Add small epsilon to avoid log(0)
  const eps = 1e-10;
  const kld = p.reduce((sum, pi, i) => {
    if (pi <= 0) return sum;
    return sum + pi * Math.log2((pi + eps) / (q[i] + eps));
  }, 0);

  const kldReverse = q.reduce((sum, qi, i) => {
    if (qi <= 0) return sum;
    return sum + qi * Math.log2((qi + eps) / (p[i] + eps));
  }, 0);

  const m = p.map((pi, i) => (pi + q[i]) / 2);
  const jsd = 0.5 * (
    p.reduce((s, pi, i) => (pi > 0 ? s + pi * Math.log2((pi + eps) / (m[i] + eps)) : s), 0) +
    q.reduce((s, qi, i) => (qi > 0 ? s + qi * Math.log2((qi + eps) / (m[i] + eps)) : s), 0)
  );

  const crossEntropy = -p.reduce((sum, pi, i) => (pi > 0 ? sum + pi * Math.log2(q[i] + eps) : sum), 0);

  return {
    kld: Math.max(kld, 0),
    kldReverse: Math.max(kldReverse, 0),
    jsd: Math.max(jsd, 0),
    crossEntropy,
    entropyP: entropy(p),
    entropyQ: entropy(q),
    barData: p.map((pi, i) => ({ label: `x${i + 1}`, p: pi, q: q[i] })),
  };
}

export const PRESETS: Record<string, { p: string; q: string; label: string }> = {
  similar: {
    label: "Similar distributions",
    p: "0.4, 0.35, 0.15, 0.1",
    q: "0.38, 0.33, 0.18, 0.11",
  },
  moderate: {
    label: "Moderate divergence",
    p: "0.5, 0.3, 0.15, 0.05",
    q: "0.2, 0.4, 0.25, 0.15",
  },
  high: {
    label: "High divergence",
    p: "0.7, 0.2, 0.08, 0.02",
    q: "0.05, 0.15, 0.35, 0.45",
  },
  uniform: {
    label: "Uniform vs peaked",
    p: "0.25, 0.25, 0.25, 0.25",
    q: "0.7, 0.1, 0.1, 0.1",
  },
};
