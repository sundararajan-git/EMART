export const validateForm = (form: HTMLFormElement): boolean => {
  try {
    let isValid = true;

    Array.from(form.elements).forEach((element: Element) => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        const htmlElement = element as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement; // type cast the element

        if (htmlElement?.required && !htmlElement.value) {
          isValid = false;
          if (htmlElement.type === "file") {
            const fileInput = document.getElementById(
              `${htmlElement.id}`
            ) as HTMLElement;
            fileInput.classList.add("border-red-600");
          } else {
            htmlElement.classList.add("border-red-600");
          }
        } else {
          if (htmlElement.type === "file") {
            const fileInput = document.getElementById(
              `${htmlElement.id}`
            ) as HTMLElement;
            fileInput.classList.remove("border-red-600");
          } else {
            htmlElement.classList.remove("border-red-600");
          }
        }
      }
    });

    return isValid;
  } catch (err) {
    return false;
  }
};
