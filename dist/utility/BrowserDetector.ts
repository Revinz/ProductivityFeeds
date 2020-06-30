// Taken from and modified
// https://stackoverflow.com/questions/45838986/how-do-i-run-a-jasmine-test-for-a-specific-browser
//

export class BrowserDetection {
  public static isGoogleChrome(): boolean {
    return this.isBrowser("chrome");
  }

  public static isFirefox(): boolean {
    return this.isBrowser("firefox");
  }

  /**
   *
   * @param browserString Browserstring as it is found in the useragent string.
   * @returns {boolean} Returns true if there is a match for the browserstring.
   */
  private static isBrowser(browserString: string): boolean {
    let userAgent: string = window.navigator.userAgent;
    return userAgent.indexOf(browserString) >= 0;
  }
}
