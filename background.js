const getRandomNumber = (N) => {
  return Math.floor(Math.random() * N);
}

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

  chrome.storage.sync.get(['blockedUrls', 'redirects'], (result) => {
    const { blockedUrls, redirects } = result;
    const redirectUrl = redirects[getRandomNumber(redirects.length)];

    const url = new URL(details.url);
    const domain = url.hostname;
    blockedUrls.forEach((element) => {
      if (domain.includes(element)) {
        chrome.tabs.update(details.tabId, { url: redirectUrl });
      }
    })
  })
})