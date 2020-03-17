export default {
  bind: (el: HTMLElement, binding: any, vnode: any) => {
    // Make sure expression provided is a function
    if (typeof binding.value !== "function") {
      // Fetch name of component
      const compName = vnode.context.name;
      // pass warning to console
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}' `;
      }
    }

    let pressTimer: number = 0;
    const start = (e: MouseEvent) => {
      if (e.type === "click" && e.button !== 0) {
        return;
      }
      if (!pressTimer) {
        pressTimer = setTimeout(() => {
          binding.value();
        }, 1000);
      }
    };
    const cancel = () => {
      // Check if timer has a value or not
      if (!pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = 0;
      }
    };
    // Add Event listeners
    el.addEventListener("mousedown", start);
    // Cancel timeouts if this events happen
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
  }
};
