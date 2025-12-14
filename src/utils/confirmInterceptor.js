window.confirm = (message) => {
  return new Promise((resolve) => {
    const event = new CustomEvent("app-confirm", {
      detail: { message, resolve },
    });

    window.dispatchEvent(event);
  });
};