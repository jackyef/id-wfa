## wfa-id
Next step:
1. Implement UI
2. Setup GH Action with cron for automatic deployment
### Project goal
Show job openings of various Indonesian companies that have declared themselves as WFH.
Normalize implementing RSS feed for Indonesian job postings.

### Strategy
Starting out, let's manually scrape the career pages of companies that have declared themselves
to be doing WFA. Use [this tweet](https://twitter.com/antonybudianto/status/1471428324140347397) as reference.

Tweet the initial MVP out. If it got enough traction, ask company to DM us if they want their job opening listed. We'll ask them to implement an RSS feed for their career pages.
[RSS feed implementation reference](https://developers.google.com/search/blog/2014/10/best-practices-for-xml-sitemaps-rssatom)

To tweet:
"If you are a company implementing WFA and want to get your job openings on the site, shoot me a DM! If you are a company that is already listed on the site and you found some inaccuracy in the data, shoot me a DM as well so we can work it out :)"

### Potential problems
1. Companies putting too many job openings, causing the others to be drowned
   Solutions:
   - Limit the number? 
   - Better way to structure the data, maybe at the top-level just put list of companies?

2. How do we decide orders? By publish date, probably. Jobs without publish date will appear later


