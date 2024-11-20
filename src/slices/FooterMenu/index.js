/**
 * @typedef {import("@prismicio/client").Content.FooterMenuSlice} FooterMenuSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FooterMenuSlice>} FooterMenuProps
 * @param {FooterMenuProps}
 */
const FooterMenu = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_menu (variation: {slice.variation})
      Slices
    </section>
  );
};

export default FooterMenu;
