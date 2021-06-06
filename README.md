<br>
<p align="center">
Why use long and unshareable urls when they can be itnachota. 🔗
</p>
<p align="center">
crafted with <span style="color: #8b0000;">&hearts;</span> by your friend <a href="https://www.linkedin.com/in/shawshankkumar/">Shashank</a>.
</p>
<p align="center">
    <img src="https://img.shields.io/badge/version-1.0.0-yellowgreen" alt="version 1.0.0"/>
    <img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="license MIT"/>
</p>

> Spam their dms with love, not long urls! 💖

## Preview (The hosted website) 📺

<div align="center">
  <img alt="Screenshot" src="Public/Screenshot.png" />
</div>

check out the front-end part of the website here: [itnachotaclient](https://github.com/shawshankkumar/itnachotaclient)

Use the api:

Create a short url:

```
POST : https://itnachota.herokuapp.com/api/create/link
```

Sample JSON payload= {"link":"www.shashankkumar.xyz"}

Fetch the long url:

```
GET : "https://itnachota.herokuapp.com/api/fetch/link?code=<the 6 digit code received as response>"
```

Or use the website:

```
itnachota.shashankkumar.xyz
```

## Installation 🔧

Install dependencies

```
$ yarn
```

Build server

```
$ yarn build
```

Start the server

```
$ yarn start
```

Start the developement developer

```
$ yarn dev
```

## License 📜

`itnachota` is available under the MIT license. See the LICENSE file for more info.

## Contributing 🤝

Please read `Contributing.md` for details on our code of conduct, and the process for submitting pull requests to us.

## Forking this repo 🚨

Many people have contacted me asking if they can use this code for their own websites. The answer to that question is usually "yes", with attribution. There are some cases, such as using this code for a business or something that is greater than a personal project, that we may be less comfortable saying yes to. If in doubt, please don't hesitate to ask us.

We value keeping this site open source, but as you all know, _**plagiarism is bad**_. We spent a non-negligible amount of effort developing, designing, and trying to perfect this iteration of our website, and we are proud of it! All we ask is to not claim this effort as your own.

So, feel free to fork this repo. If you do, please just give us proper credit by linking back to our website, https://srmkzilla.net. Refer to this handy [quora post](https://www.quora.com/Is-it-bad-to-copy-other-peoples-code) if you're not sure what to do. Thanks!
