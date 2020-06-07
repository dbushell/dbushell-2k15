---
date: 2020-06-08 10:00:00+00:00
slug: pwa-web-crypto-encryption-auto-sign-in-redux-persist
title: 'PWA Encryption and Auto Sign-in'
pageDesc: 'There one where paranoia gets the better of me.'
---

[**Mute Swan**](https://muteswan.app/) is a progressive web app I've been coding for my own amusement. It's a playground for me to mess around with experimental web standards. And to remind myself to buy milk.

I've recently implemented hidden Dropbox backup and sync functionality. With that in place I decided that my grocery list was of the upmost secrecy. What if my Dropbox account was hacked?

## Encryption

Mute Swan uses [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist its state data. I dump that into Dropbox via their JavaScript SDK for backups.

I wrote an asynchronous wrapper for the `getItem` and `setItem` methods; encrypting and decrypting values respectively. My encrypted local storage interface plugs into [Redux Persist](https://github.com/rt2zz/redux-persist) as a custom storage engine.

Encryption is handled by the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto). It uses AES-GCM with a key generated from a SHA-256 digest of a text password. Sounds secure, but the default password is stored right in the source code.

If a custom password is used it has to be requested before the Redux store can be configured. I mocked up a sign-in form that accepts the password. With that input the encryption key is generated and stored in internal JavaScript memory until the browser session ends. In React I'm mounting the form component at a higher level prior to the Redux provider and persist gate.

Redux Persist updates local storage asynchronously. There's some internal throttling going on, but it basically updates after every state change.
I ran some very primitive benchmarks and found my encryption interface to be plenty fast enough; milliseconds, if that.

## Auto sign-in

Requesting a password at the start of each session proved to be a frustrating experience. I briefly considered how secure it would be to store the password itself in local storage or a JavaScript cookie across sessions. Both are susceptible to cross-site scripting. Further research lead me to the answer: [Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management/retrieve-credentials).



### Auto sign-in (the correct way)

Chrome provides the best auto sign-in experience. If enabled, the password can be retrieved seamlessly without user interaction.

Passwords can be stored programmatically:

```javascript
const data = new window.PasswordCredential(form);
window.navigator.credentials.store(data);
```

And retrieved:

```javascript
const data = await window.navigator.credentials.get({
  password: true,
  mediation: 'optional'
});
```

Works in Chrome. Fails in Firefox. If the password cannot be retrieved via the method above (or is incorrect) I fall back to a sign-in form.

```html
<input
  required
  autocomplete="current-password"
  type="password"
  name="password"
/>
```

Browsers will offer to save the password for future auto-completion.

### Auto sign-in (the hack way)

If the browser doesn't cough up the password immediately the sign-in form is presented. The auto-completed password can be detected with an event:

```javascript
window.document.addEventListener('input', (ev) => {
  if (
    ev.target.name === 'password' &&
    ev.inputType === 'insertReplacementText'
  ) {
    // Attempt auto sign-in by submitting the form...
  }
}, {once: true});
```

Following this event the form can be submitted to attempt an "auto" sign-in.
Only try this once because an incorrect password results in an infinite loop!

This technique has noticeable latency and the form will appear briefly. I considered using CSS to hide the form to avoid the UI flash. However, a timeout would be necessary to show the form again if auto-complete didn't occur (or was not detected). Such a delay seems like the greater evil.

This feels very hacky but it works - shrug.

Hopefully browser support for credential management becomes standard.

## And so...

And so, my grocery list is now encrypted! The browser secures my password between sessions. Keys never leave the page. Naturally, there's a more than zero percent chance I've gotten something wrong and my code is entirely exploitable. I'll continue to learn, test, and iterate.

At some point I do plan to publish Mute Swan on GitHub. A lot of the functionality is still hidden behind secret flags. It turns out that building user-friendly interfaces is incredibly time-consuming!

## Related articles

* [Bundle a PWA as an Android App](/2020/03/05/bundle-a-pwa-as-an-android-app/)
* [Debugging a Todo App](/2020/03/27/debugging-a-todo-app/)
* [Bubblewrap Apps in Android Studio](/2020/06/01/bubblewrap-twa-pwa-apps-android-studio/)
* [PWA Encryption and Auto Sign-in](/2020/06/08/pwa-web-crypto-encryption-auto-sign-in-redux-persist/)

Last updated: June 2020.
