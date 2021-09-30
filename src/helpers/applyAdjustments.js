/*
def calculate_total_due(self):
  total_due = self.pre_adjustment_total

  for each_additive_adjustment in self.adjustments.filter(modifier='+'):
      total_due += each_additive_adjustment.value
  for each_multiplicative_adjustment in self.adjustments.filter(modifier='%'):
      total_due *= (1 + (each_multiplicative_adjustment.value / 100))

  return total_due
*/
export default function applyAdjustments(givenSummary, adjustments) {
  let summary = givenSummary;
  adjustments.filter(({ modifier }) => (modifier === '+')).forEach(({ value }) => {
    summary += value;
  });

  adjustments.filter(({ modifier }) => (modifier === '%')).forEach(({ value }) => {
    summary *= (1 + (value / 100));
  });

  return summary;
}
