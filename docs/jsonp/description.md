# JSONP

We are going to make a gitlab api call on my profile. Because of `CORS` we can't load the data via `XMLHttpRequest` but will be using jsonp to get the data from gitlab.

## The Technique

To use API data hosted on a domain other than your own, you need to use a technique called JSONP. From Wikipedia:

    JSONP or “JSON with padding” is a communication technique used in JavaScript programs running in web browsers to request data from a server in a different domain, something prohibited by typical web browsers because of the same-origin policy. JSONP takes advantage of the fact that browsers do not enforce the same-origin policy on `<script>` tags.

Source: [wikipedia](https://en.wikipedia.org/wiki/JSONP)

Here’s how it works: The API request URL is set as the src of a `<script>` tag, which gets appended to the DOM. That data is then passed into a callback method on load. The callback is included in the request url as `?callback=callbackMethodName`;
