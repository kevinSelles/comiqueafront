if (typeof window !== "undefined") {
  const originalAlert = window.alert;

  window.alert = (message) => {
    const event = new CustomEvent("app-alert", {
      detail: { message },
    });

    window.dispatchEvent(event);
  };
}