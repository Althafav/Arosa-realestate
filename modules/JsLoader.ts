export default class JsLoader {
  static loadFile(url: string, callBack?: () => any) {
    const existingScript = document.querySelector(`script[src="${url}"]`);
 
    if (existingScript == null) {
      const script = document.createElement("script");
      script.src = url;
      script.async = false;
      document.body.appendChild(script);
      if (callBack && typeof callBack !== "undefined") {
        callBack();
      }
    }
  }
}