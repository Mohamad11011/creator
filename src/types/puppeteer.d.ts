declare module 'puppeteer-extra' {
  import { Browser, PuppeteerLaunchOptions } from 'puppeteer';

  interface PuppeteerExtra {
    use(plugin: any): void;
    launch(options?: PuppeteerLaunchOptions): Promise<Browser>;
  }

  const puppeteer: PuppeteerExtra;
  export = puppeteer;
}

declare module 'puppeteer-extra-plugin-stealth' {
  const StealthPlugin: () => any;
  export = StealthPlugin;
} 