---
layout: post
title: "SOCIAL ENGINEERING ATTACK TACTICS"
date: 2020-10-03T21:27:00+05:30
categories: ["General Security Awareness"]
description: "Here we will take a peek into the creativity of attackers who always keep on trying new and creative ideas to steal your identity. This post shows some real emails received that"
original_url: "https://blog.alphathreat.in/index.php?post/2020/10/03/Learning-from-Attackers"
---

Here we will take a peek into the creativity of attackers who always keep on trying new and creative ideas to steal your identity. This post shows some real emails received that are really creative enough to earn your trust and gain your personal information over email.

Below are some emails received in our honeypots, which exposes some attack tactics

- The below email requires interaction from its victim, the first email claims to offer you loads of money.

> Tunga Maje &lt;[[email protected]](/cdn-cgi/l/email-protection)&gt; wrote:
>
> I am Barrister Tunga Maje, a solicitor at law. I am the personal attorney to Mr. Raymond Beck, He was the CEO of a private firm here in Burkina Faso. Hereafter be referred to as my client. On the 21st of November 1999, my client Mr. Raymond Beck died from an automobile accident. Since the demise of my client, I personally have watched with keen interest to see his next of kin but all has proved abortive as no one has come to claim his funds deposit of US$50.5M, (Fifty Million Five Hundred united states dollars) which was deposited by my late client with UBA Bank Burkina Faso.
> On this note, I decided to seek for a foreigner who will stand as the Next of kin to claim this funds from the UBA BANK BURKINA FASO where the funds was deposited, as none of the deceased relatives has come up to claim the deceased funds. The banking ethics here does not allow such money to stay more than Nine years, after which the funds will be forfeited to the government account as unclaimed funds. With respect to your personality, I will give you 40% of the total sum. Upon the receipt of your response, I will not Fail to bring to your notice that this business is hitch free and
> that you should not entertain any fear as all modalities for fund transfer will be finalized within ten (10) banking days depending on how fast we can communicate. I have all necessary legal documents that can be used to
> back up any claim we may make.
> All I require is your honest cooperation to enable us to see this deal through. I guarantee that this will be executed under a legitimate arrangement that will protect you from any breach of the law. Please reply to my private email: [[email protected]](/cdn-cgi/l/email-protection)
> Best regards,
> Barrister. Tunga Maje

\*\* Upon sending a mail of interest you get a second email which asks you for your personal information.

> I am sorry i have not been able to respond to your email, i was busy in court and today i arrive in my office to see your message. To enable us proceed with this transaction please send me the following details,
>
> - Your full names
> - Home address
> - Mobile phone numbers
> - Office tel
> - Occupation
> - Position
> As soon as i get the above details i shall be able to complete the transaction,.
> Best regards,
> Barrister. Tunga Maje

- Here's another example where it spoofes Netflix

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>2020-10-03_21-17.png</code> was not captured by the Internet Archive.</p>

- Here's another, notice the person our attacker claims to be and check the email address it is received from.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>2020-10-03_21-13.png</code> was not captured by the Internet Archive.</p>

- This one claims to originate from a company and send you a payment. Not the html file attached. Once clicked these html files have the capability to drop a malware on your system.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>.2020-10-04_15-13_m.png</code> was not captured by the Internet Archive.</p>

- Another email stating that your Microsoft account will be deactivated if you didn't open the malicious attachment.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>.3_m.png</code> was not captured by the Internet Archive.</p>

##### **PREVENTION**

Following some common habits we can protect ourselves from such attacks.

- Never open an email from unknown origin
- Never open any attachment until you are confirmed of sender
- The malicious attachments are commonly document files (xls, ppt, doc, docx, pdf), image files and zip files
- Always check the sender's email ID. In suspicion avoid opening email
- Avoid opening emails that originate outside your organization
- Simply opening and email can reveal your location to the attacker
