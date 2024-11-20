/**
 * @typedef {import("@prismicio/client").Content.MenuItemSlice} MenuItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MenuItemSlice>} MenuItemProps
 * @param {MenuItemProps}
 */
const MenuItem = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for menu_item (variation: {slice.variation}) Slices
    </section>
  );
};

export default MenuItem;
