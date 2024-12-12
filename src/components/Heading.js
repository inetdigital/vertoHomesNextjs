import clsx from "clsx";

export const Heading = ({ as: Comp = "h1", children, className }) => {
  return <Comp className={clsx(className)}>{children}</Comp>;
};
