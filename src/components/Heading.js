import clsx from "clsx";

export const Heading = ({ as: Comp = "h1", children, className }) => {
  return <Comp className={clsx("font-sans", className)}>{children}</Comp>;
};
