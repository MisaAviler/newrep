### Calendar event

- iOS 10+ web
- Android 7+ web

```html
<a href='https://link.to/iCal.ics' download></a>
```

Always convert event start and end time to UTC. For example, if you event in San Francisco (-7 hours) starts in 21:00, then you have to write 21:00 + 7 hours -> 04:00. In this case, time zones will be managed by calendar app.
