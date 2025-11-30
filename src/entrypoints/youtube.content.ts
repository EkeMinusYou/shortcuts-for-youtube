import { defineContentScript } from "wxt/utils/define-content-script";
import { registerYoutubeShortcuts } from "../content/index";

export default defineContentScript({
  matches: ["https://www.youtube.com/*"],
  main() {
    registerYoutubeShortcuts();
  },
});
