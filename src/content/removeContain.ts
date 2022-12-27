interface removeContain {
  ancestor: Node;
  checkParentsInterval: number;
}

export const removeContain = ({
  ancestor,
  checkParentsInterval,
}: removeContain) => {
  let currentEl: any = ancestor;

  for (let x = 0; x < checkParentsInterval; x++) {
    // console.log(currentEl);
    if (currentEl.parentNode) {
      currentEl = currentEl.parentNode;

      const cssClasses = currentEl.classList;

      // console.log(cssClasses);

      cssClasses.forEach((className: any) => {
        const tempElement = document.createElement('div');
        tempElement.classList.add(className);

        const computedStyles = getComputedStyle(tempElement);

        // console.log(className, computedStyles);

        if (computedStyles.contain !== 'none') {
          currentEl.style.contain = 'none';
        }
      });
    }
  }
};
