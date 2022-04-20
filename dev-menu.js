let getProps = (obj) =>
  Object.entries(obj).find((entry) => entry[0].startsWith("__reactProps"))[1]
    .children.props;
let hasPlayer = (obj) => {
  try {
    return getProps(obj).player ? true : false;
  } catch (ex) {
    return false;
  }
};
/** @param {import(".").NS } ns */
export const main = async (ns) => {
  ns.tprint("running script");
  let boxes = Array.from(
    eval("document").querySelectorAll("[class*=MuiBox-root]")
  );
  let box = boxes.find((x) => hasPlayer(x));

  if (box) {
    ns.tprint("Found Box");

    let props = getProps(box);

    props.router.toDevMenu();
  }
};
