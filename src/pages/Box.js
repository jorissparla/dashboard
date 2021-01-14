const Box = (x) => ({ map: (f) => Box(f(x)), inspect: () => `Box(${JSON.stringify(x)})`, fold: (f) => f(x) });
