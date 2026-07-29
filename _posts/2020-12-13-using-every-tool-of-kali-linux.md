---
layout: post
title: "KNOWING YOUR KALI TOOLS"
date: 2020-12-13T14:10:00+05:30
categories: ["Hacking"]
description: "This post explains all the tool categories under Kali linux. This post is upon request from one of our readers. Kali contains tons of tools categorized under various categories"
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/13/Using-every-tool-of-Kali-Linux"
---

This post explains all the tool categories under Kali linux. This post is upon request from one of our readers.

Kali contains tons of tools categorized under various categories including

- Information Gathering
- Vulnerability Analysis
- Wireless Attacks
- Web Applications
- Exploitation tools
- Stress testing
- Forensics
- Sniffing and Spoofing
- Password Attacks
- Maintaining Access
- Reverse Engineering
- Reporting Tools
- Hardware Hacking

Let us understand these categories

- **Information Gathering :** As the  name itself defines these tools serve the purpose to gather information about the target application or network. Information Gathering is the most vital and first step of a pentest phase. These are the first set of tools to start your engagement with. Examples include dnsmap, enum4linux, fierce, hping3, etc.

- **Vulnerability Analysis :** After gathering all the required information it is time for hunt for vulnerabilities, these are the set of tools to got to. Example: OpenVAS, NMAP, Yersinia, Lynis, etc. These tools provide the detailed information on the vulnerabilities found on the target. Nmap being a port scanner can be utilised as Vulnerability Scanner as well, with its extended NSE scripting engine.

- **Wireless Attacks :** Scanning, Deauthentication, WPS attacks, Spoofing, Rogue Access points, Bluetooth attacks and every other attack realated to the Wireless stream falls under this category. Examples include Aircrank-ng, pyrit, kismet, etc.

- **Web Applications :** These set of tools helps you to successfully pentest web applciation and related services to find vulnerabilities. Be it a Dynamic website, CMS like wordpress, Joomla, etc  these set of tools are your goto. Examples include BurpSuite, ZAP, w3af, dirbuster, etc.

- **Exploitation tools :** This category provide a mixture of tools that can be used in a network or a web application. The main purpose of this set is to help pentesters find exploits, create payloads and exploit vulnerabilities. Theses set of tools lets you to get into the target system or application. A very famous example is of Metasploit framework which falls under this category along with BeEF, expoitdb, Shellnoob, etc.

- **Stress testing :** These set of tools helps to craft packets which can be utilised for attacks like DoS (Denial of Service) and Flooding. The range cover web application, wireless and network tools. Example include MDK3 (Wireless), T50 (Network), SlowHTTPTest (Application).

- **Forensics :** These set of tools helps pentesters to find interesting information from variety of files. Provides tools that offers features like Extracting Firmwares, data scraping, data recovery, traffic fingerprinting, extracing digital artifacts from memory, etc. Examples include Volatility, binwalk, ddrescue, p0f, etc.

- **Sniffing and Spoofing :** These tools provides the power to perform the attacks like Man in the middle (MITM). DNS poisoning, SSL splitting. sniffing.  Examples include Responder, Sniffjoke,ZAProxy, etc.

- **Password Attacks :** From creating a custom defined wordlist to cracking a complex password hash. Bruteforcing web authentication forms to cracking open truecrypt volumes, everything password related attack is performed via this category.

- **Maintaining Access :** Attacks like Remote command execution, shellcode injection, tunneling, lateral movement, Backdooring can be performed by using tools under this category. Examples include Shellter, pwnat, weevely, etc.

- **Reverse Engineering :** Everything related to reverse engineering falls under this category. Reversing applications, decompiling executables, etc. Examples include JAD, apktool, etc.

- **Reporting Tools :** These set of utilities helps pentester to make notes of all the findings and create a report of the same. One famous examples like Cherrytree. Other set of tools helps in tasks like capturing screenshots of webpages, extracting metadata of documents, Taking RDP, etc.

- **Hardware hacking :** This category generally includes disassembly tools maily focused on android. (Android-SDK, apktool, smali, etc)

To know more about a tool you can simply type the n ame of the tool with -h OR --help option. This will open the complete help as shown in the below image.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>kali.png</code> was not captured by the Internet Archive.</p>
