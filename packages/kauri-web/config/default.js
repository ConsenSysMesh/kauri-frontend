const cloudImageId = "asdgvdoyen";

const googleTagManagerCode = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-112179323-1');
`;

const mixpanelToken = process.env.MIXPANEL_TOKEN;

const uppyConfig = {
  debug: true,
  autoProceed: true,
  restrictions: {
    maxFileSize: 10000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: [
      "image/*",
      "jpeg",
      "png",
      "images/*",
      "jpg",
      "image/jpeg",
      "image/png",
    ],
  },
};

const getApiURL = (hostName = process.env.monolithExternalApi) => {
  // localhost or mobile
  // console.log(hostName);
  if (
    (hostName && hostName.includes("192")) ||
    (hostName && hostName.includes("localhost"))
  ) {
    return process.env.monolithExternalApi;
  }
  let apiURL;
  // Use internal k8s dns if not browser
  if (global.window) {
    apiURL = process.env.monolithExternalApi;
  } else {
    apiURL = process.env.monolithApi;
  }
  // No idea why
  if (!apiURL) {
    apiURL = process.env.monolithExternalApi;
  }

  // Local config override if exists
  const localConfig = require("./local.js");
  if (typeof localConfig.apiURL === "string") apiURL = localConfig.apiURL;

  return apiURL;
};

module.exports = {
  ethUsdPriceEndpoint:
    "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
  subCategories: ["General", "Tutorial", "Walkthrough"],
  googleTagManagerCode,
  mixpanelToken,
  uppyConfig,
  appId: "kauri",
  clientId: "kauri-gateway",
  updateArticleWhitelistedAddresses: [
    // Admin
    "0x37648fc15a8365735289e002d65d44d80c505e8b",
    // Josh
    "0x7855bc9e6564a44753a8d291b037135c605e6d8a",
    // Josh 2
    "0x7b88584d0e6a608fa3a8716b0ca1620d61834a0c",
    // Eric
    "0xbfecec47dd8bf5f6264a9830a9d26ef387c38a67",
    // Sina (ETHBerlin)
    "0xC3EF09a2BdEec9De6Ab74cfA0B5491FA4Cd0b7c8",
  ],
  getApiURL,
  cloudImageId,
  testingAccounts: [
    "b282635ffc0ea4d6984f6b50e9dab90de1d03ce2",
    "5765d2d2fafb930132d72651f3f28c86371379b1",
    "27e77e164bc02788f347213b0a3e9a9a0cdf8d7a",
  ],
};
