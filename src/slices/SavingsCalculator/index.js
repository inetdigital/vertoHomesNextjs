/**
 * @typedef {import("@prismicio/client").Content.SavingsCalculatorSlice} SavingsCalculatorSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SavingsCalculatorSlice>} SavingsCalculatorProps
 * @param {SavingsCalculatorProps}
 */
const SavingsCalculator = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for savings_calculator (variation: {slice.variation}
      ) Slices
    </section>
  );
};

export default SavingsCalculator;
