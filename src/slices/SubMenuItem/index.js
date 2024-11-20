/**
 * @typedef {import("@prismicio/client").Content.SubMenuItemSlice} SubMenuItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SubMenuItemSlice>} SubMenuItemProps
 * @param {SubMenuItemProps}
 */
const SubMenuItem = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for sub_menu_item (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SubMenuItem;
