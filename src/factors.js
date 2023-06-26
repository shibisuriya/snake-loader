const gcd = (a, b) => {
  const impl = (ai, bi) => (ai ? impl(bi % ai, ai) : bi);
  // handle also case when a or b is 0 from the beginning
  return impl(Math.min(a, b), Math.max(a, b));
};

const factor = (v0) => {
  let v = v0;
  let factors = [1];

  const addFactors = (fs) => {
    if (fs.length > 0) {
      // pre-allocate space
      let newFactors = new Array(factors.length * fs.length);
      let o = 0;
      for (let i = 0; i < factors.length; i++) newFactors[o++] = factors[i];

      for (let i = 0; i < factors.length; i++) {
        for (let j = 0; j < fs.length; j++) {
          newFactors[o++] = factors[i] * fs[j];
        }
      }
      factors = newFactors;
    }
  };

  const addFactorPows = (f) => {
    // find all powers of the factor
    // Example; v = 12, f = 2
    // We want pows to be [2, 4]
    // This is important for addFactors to work correctly
    let p = 1;
    let pows = [];

    while (v % f === 0) {
      v /= f;
      p *= f;
      pows.push(p);
    }
    addFactors(pows);
    return pows.length !== 0;
  };

  addFactorPows(2);

  let s = Math.floor(Math.sqrt(v));
  for (let i = 3; i <= s; i += 2) {
    if (addFactorPows(i)) {
      s = Math.floor(Math.sqrt(v));
    }
  }
  // probably add the last prime, unless there was a perfect square and v = 1
  if (v !== 1) addFactorPows(v);

  return factors.sort((a, b) => a - b);
};

export const commonFactors = (a, b) => {
  const g = gcd(a, b);
  return factor(g);
};

