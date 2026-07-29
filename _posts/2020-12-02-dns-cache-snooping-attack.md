---
layout: post
title: "DNS CACHE SNOOPING ATTACK"
date: 2020-12-02T10:00:00+05:30
categories: ["Pentest Engagement"]
description: "This article focus on a DNS attack named \"DNS Cache Snooping\". This helps an outside attacker to gather the intelligence of domains being visited by the organisation."
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/02/DNS-Cache-Snooping-Attack"
---

*This article focus on a DNS attack named "DNS Cache Snooping". This helps an outside attacker to gather the intelligence of domains being visited by the organisation. These domains can then be utilised by attacker in later attacks.*

A DNS cache (sometimes called a DNS resolver cache) is a temporary database, maintained by a computer's operating system, that contains records of all the recent visits and attempted visits to websites and other internet domains. -Lifewire

We can query an organization's exposed DNS server to reveal the websites it has resolved. This can be helpful in profiling the websites to target for further attacks.

In layman terms , let us suppose Company A has its DNS server exposed to the internet. An attacker can query the DNS server to reveal the sites it has already cached, thus giving an idea to the attacker to target particular sites for further attacks.

Let us now query a nameserver to see if it has resolved attackdefense.com. I'd do this first by sending a non recursive query. A non recursive query simply asks a DNS nameserver to send reply only if he knows the answer and not to ask for any TLD nameserver. The +norecurse switch helps in this query as shown in below image.

In the image below we are querying nameserver 202.x.x.x to tell the IP of attackdefense.com without recursion(+norecurse)

And as output we can see Answer: 0 clearly stating that the nameserver has not resolved this domain before and hence the reply is not cached.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>dns.png</code> was not captured by the Internet Archive.</p>

Now let us again query for the same domain but this time without **+norecurse**switch. This will let the DNS server to query further nameservers to find the IP of the queried domain. And as a result we see an answer as shown in below image.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>dns_cache.png</code> was not captured by the Internet Archive.</p>

Now since the domain is now resolved by the DNS server at least once, it might have been cached. To verify let us query again with the +norecurse option. And as a result of caching we can now see the reply with +norecurse option.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>DNS_attack.png</code> was not captured by the Internet Archive.</p>

We now know that the site attackdefense.com has earlier been resolved via the target nameserver.

￼
