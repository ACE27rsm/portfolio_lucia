import { useEffect, useRef, cloneElement } from "react";

//=b Drop-in replacement for `react-visibility-sensor`, which relied on
//=b ReactDOM.findDOMNode (removed in React 19). Uses IntersectionObserver
//=b and forwards a ref to its single child, preserving the old layout.
const VisibilitySensor = ({ onChange, children, partialVisibility = true }) => {
  const ref = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => onChangeRef.current(entry.isIntersecting),
      { threshold: partialVisibility ? 0 : 1 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [partialVisibility]);

  return cloneElement(children, { ref });
};

export default VisibilitySensor;
