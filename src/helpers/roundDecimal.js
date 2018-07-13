const roundDecimal = (value, decimal = 0) => {
  const rounder = 10 ** decimal;

  return Math.round(value * rounder) / rounder;
};

export default roundDecimal;
