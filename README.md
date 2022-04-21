# id-wfa 🇮🇩

This project scrapes job openings from Indonesian companies that have publicly
announced that they provide WFA (work-from-anywhere) perks to their employees.
The job openings list page is implemented using [Next.js incremental static regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
and will be revalidated every 24 hours.

The initial version of this project uses this [tweet](https://twitter.com/antonybudianto/status/1471428324140347397) as a reference for the companies list.
Number of companies included in this project might increase/decrease as needed.

## For companies

If you would like your company to be removed from the site, please file an issue and I'll get to it.

If you would like your company to be included in the site, please also file an issue with
a link to your jobs list page. I can't guarantee I can collect the data myself from there though!
For better support, please provide an endpoint that returns the job data. If you are not sure what this is, ask your dev team, this can be an XML (RSS, feed), plain REST returning a JSON or a GraphQL endpoint. The amount of data this project need is very little:

```ts
type JobOpening = {
  jobTitle: string;
  url: string; // url to the job opening detail page,
  company: string;
  departmentName: string; // Engineering, Design, etc.
};
```

### Disclaimer

This project is not affiliated with any of the companies listed. Some information might be inaccurate/incomplete, including but not limited to:

1. Job openings that are included in the site, but apparently not WFA-friendly
2. Job openings that are WFA-friendly but not included in the site
