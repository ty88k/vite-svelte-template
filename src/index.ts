import "../scss/app.scss";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app")!,
  props: {
    name: "John"
  },
});

export default app;
