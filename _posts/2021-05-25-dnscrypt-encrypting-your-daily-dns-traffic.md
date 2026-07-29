---
layout: post
title: "DNSCRYPT: ENCRYPTING YOUR DAILY DNS TRAFFIC"
date: 2021-05-25T09:17:00+05:30
categories: ["Hacking"]
description: "DNSCrypt aids in encrypting the normal DNS traffic so that it can't be snooped DNSCRYPT DNSCrypt focuses on securing communications between a client and its first-level resolver."
original_url: "https://blog.alphathreat.in/index.php?post/2021/05/25/DNSCrypt%3A-Encrypting-your-daily-DNS-traffic"
---

DNSCrypt aids in encrypting the normal DNS traffic so that it can't be snooped

### DNSCRYPT

DNSCrypt focuses on securing communications between a client and its first-level resolver. It does this by encrypting traffic, making it harder to snoop in a local network. This prevents variety of attacks like Man in the Middle. The DNSCrypt daemon acts as a DNS proxy between a regular client, like a DNS cache or an operating system stub resolver, and a DNSCrypt-aware resolver, like OpenDNS. Just like HTTPS encrypts normal HTTP traffic, DNSCrypt encrypts the normal DNS traffic by using Elliptic-curve cryptography.

### INSTALLATION

The source can be easily download and compiled with the instructions provided in the [github](https://github.com/opendns/dnscrypt-proxy "Github")

If it is already in the package sources file it can also be installed via apt package manager in Ubuntu like distros via:

```

apt install dnscrypt-proxy
```

### CONFIGURE

Once the package is installed we need to change our system's default DNS resolver from 127.0.0.1 to 127.0.2.1

This can be achieved by various ways, the most common of them is directly editing **/etc/resolv.conf** file and adding the below line

```

nameserver 127.0.2.1
```

but if your system is using resolvconf daemon the changes made to the above file will reset, to make it persistent, edit the **/etc/resolvconf/resolv.conf.d/base** file and make the below entry in last line

```

nameserver 127.0.2.1
```

Third method is where you simply open your network manager and make static entry in DNS servers just like in image below

![netman.png, May 2021]({{ site.baseurl }}/assets/blog/DNSCrypt/netman.png)

Once the changes are made restart both networking and Resolvconf daemon by:

```

sudo systemctl restart networking
sudo systemctl restart resolvconf
```

### COMPARISON

Let us now compare the difference of before and after installing dnscrypt

**BEFORE**

The below image before installing DNSCrypt clearly shows the unencrypted DNS traffic being captured by Wireshark when we make make DNS queries via **host** command

![before_dnscrypt.png, May 2021]({{ site.baseurl }}/assets/blog/DNSCrypt/before_dnscrypt.png)

By making a TXT record query to debug.opendns.com we get the following results as shown in below image

![dnscrypt_debug_b4.png, May 2021]({{ site.baseurl }}/assets/blog/DNSCrypt/dnscrypt_debug_b4.png)

**AFTER**

Let us now compare the same after enabling dnscrypt-proxy. We can now not see any DNS traffic in our wireshark instance.

pack![after_dnscrypt.png, May 2021]({{ site.baseurl }}/assets/blog/DNSCrypt/after_dnscrypt.png)

The TXT record request made to opendns now gives us following confirmation

![dnscrypt_debug_after.png, May 2021]({{ site.baseurl }}/assets/blog/DNSCrypt/dnscrypt_debug_after.png)

Congratulations ! We now have succesfully installed and configured our DNS traffic
