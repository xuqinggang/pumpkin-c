const raven = require('raven');
const sentry = new raven.Client('http://42b8b18a5302414b877f25c09ce46307:5738824ac7ab466ca573f8f3bdc61f7e@sentryjs.kuaizhan.sohuno.com/107', {
    sendTimeout: 8,
});

module.exports = sentry;
