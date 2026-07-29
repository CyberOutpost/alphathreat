---
layout: post
title: "Decoding the /proc/<PID>/net/tcp"
date: 2021-12-09T21:02:00+05:30
categories: ["Pentest Engagement"]
description: "The Linux concept of 'Everything is a file' is a very helpful one. This post share details of an attacker can read the network statistics even if the commands like 'netstat' and"
original_url: "https://blog.alphathreat.in/index.php?post/2021/12/09/Decoding-the-/proc//net/tcp"
---

The Linux concept of 'Everything is a file' is a very helpful one.

This post share details of an attacker can read the network statistics even if the commands like 'netstat' and 'lsof' are not available.

/proc is a virtual file system that is created each time a system boots and is dissolved during shutdown.
The directory /proc contains (among other things) one subdirectory for each process running on the system, which is named after the process ID (PID).

One such directory is /proc/&lt;PID&gt;/net
This directory provides a comprehensive look at various networking parameters and statistics. Each directory and virtual file within this directory describes aspects of the system's network configuration.

For example:
/proc/&lt;PID&gt;/net/tcp — Contains detailed TCP socket information.

A sample file looks like

[![/proc/net]({{ site.baseurl }}/assets/blog/ext/ydxZQgW-proc-net.png)](https://i.ibb.co/ydxZQgW/proc-net.png)

### DECODING THE VALUES

The values are divided in different columns like local_address, rem_address [remote address], st [status code], etc

Values in each column is stored in Hexadeciaml notation in 'Little Endian' format

This means

0100007F should be read as
7F 00 00 01
which gets decoded to 127.0.0.1

and the value of port number 8124 gets decoded to 33060

This is also shown in below image

[![]({{ site.baseurl }}/assets/blog/ext/6Nc39xF-hex2dec.png)](https://i.ibb.co/6Nc39xF/hex2dec.png)

The below script created in Ruby decodes the fields and print in a tabular format. All it needs is process ID as the parameter. The script also displays the command line used to execute the process and the Apparmor status of process

The output from the script is given below

[![https://i.ibb.co/SNy6DLX/ruby-script.png]({{ site.baseurl }}/assets/blog/ext/SNy6DLX-ruby-script.png)](https://i.ibb.co/SNy6DLX/ruby-script.png)

### The code

```

#!/bin/env ruby

=begin
A DECODER FOR /PROC/<PID>/NET/TCP or UDP FILE
DISPLAYS NETWORK STATS AND INFORMATION OF PROCESS
COMMAND LINE AND APPARMOR STATUS OF PROCESS
REGARDS: ALPHA THREAT IT SOLUTIONS

USAGE : ruby proc_net.rb <PROCESS ID>
 process ID can be obtained via ps -A command
=end

local_ip=[]; local_port=[]; remote_address=[]; remote_port=[]; state=[]
final_local=["\nLocal_IP : PORT\t\t\t\b REMOTE_IP : REMOTE_PORT\t\tSTATE\n"]

filename="/proc/#{ARGV[0]}/net/tcp"

begin

a=File.readlines(filename).each do |x|

if x.match?(/[A-Z 0-9]{8}:[A-Z -9]{4}/)

y = x.split(":")
local_ip << y[1].sub!(" ",'')
local_port << y[2].split(" ")[0]
remote_address << y[2].split(" ")[1]
remote_port << y[3].split(" ")[0]

if y[4].split(" ")[1] == '00'
state << "ERROR_STATUS"
elsif y[4].split(" ")[1] == '01'
state << "TCP_ESTABLISHED"
elsif y[4].split(" ")[1] == '02'
state << "TCP_SYN_SENT"
elsif y[4].split(" ")[1] == '03'
state << "TCP_SYN_RECV"
elsif y[4].split(" ")[1] == '04'
state << "TCP_FIN_WAIT1"
elsif y[4].split(" ")[1] == '05'
state << "TCP_FIN_WAIT2"
elsif y[4].split(" ")[1] == '06'
state << "TCP_TIME_WAIT"
elsif y[4].split(" ")[1] == '07'
state << "TCP_CLOSE"
elsif y[4].split(" ")[1] == '00'
state << "TCP_CLOSE_WAIT"
elsif y[4].split(" ")[1] == '09'
state << "TCP_LAST_ACK"
elsif y[4].split(" ")[1] == '0A'
state << "TCP_LISTEN"
elsif y[4].split(" ")[1] == '0B'
state << "TCP_CLOSING"
else
state << "UNKNOWN"

#if end
end

end

rescue Exception
next
#exception end
end
#do end
end

def print_ip(x)
return  x.scan(/../).reverse.map{|x| x.to_i(16)}.join('.')
end

def print_port(y)
return y.to_i(16)
end

for length in 0..local_ip.count-1

#sets spacing for printing columns
size=print_ip(local_ip[length]).to_s + ' : ' + print_port(local_port[length]).to_s
size=size.length.to_i
fs=23-size
size=print_ip(remote_address[length]).to_s + ' : ' + print_port(remote_port[length]).to_s
size=size.length.to_i
ns=23-size

#create a final array with all data
final_local << print_ip(local_ip[length]).to_s + ' : ' + print_port(local_port[length]).to_s + " "*fs + "\t\t" +  print_ip(remote_address[length]).to_s + ' : ' + print_port(remote_port[length]).to_s + " "*ns + "\t\t" + state[length].to_s
end

puts final_local
puts "\nProcess Command Line: " + File.read("/proc/#{ARGV[0]}/cmdline") + "\n\n" if File.exists?("/proc/#{ARGV[0]}/cmdline")
puts "AppArmour status: "  + File.read("/proc/#{ARGV[0]}/attr/apparmor/current") + "\n" if File.exists?("/proc/#{ARGV[0]}/attr/apparmor/current")
```
