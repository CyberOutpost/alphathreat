---
layout: post
title: "HIDING YOUR BACKDOOR FROM DETECTION"
date: 2021-05-31T11:24:00+05:30
categories: ["Pentest Engagement"]
description: "This post explains a very simple technique to skip detection of your backdoor from native tools like netstat, ps, lsof This article assumes the attacker have already gained root"
original_url: "https://blog.alphathreat.in/index.php?post/2021/05/31/Safeguard-your-backdoor-from-detection"
---

This post explains a very simple technique to skip detection of your backdoor from native tools like netstat, ps, lsof

This article assumes the attacker have already gained root access over a machine and now is planning to plant a hidden backdoor. There are lots of methods to achieve the same like installing a rootkit, port knocking, etc but in this article we focus on simple technique that will achieve the same and bypass results from native tools like

- **netstat** : Prints network connections, routing tables, interface statistics, masquerade connections, and multicast memberships
- **ps** : Report a snapshot of the current processes
- **lsof** : List open files

For our simple demonstration attacker creates a netcat backdoor and leaves a port open. The open port can be easily listed by above tools. The attacker creates a script and hijacks the execution of the native tools by utilising the PATH environment variable precedence.

Once the attacker plants his netcat backdoor by nc command,

![nc_start.png, May 2021]({{ site.baseurl }}/assets/blog/Linux_bd/nc_start.png)

this will be detected as shown in below image

![nc_trace.png, May 2021]({{ site.baseurl }}/assets/blog/Linux_bd/nc_trace.png)

In order to hide the detection attacker creates a simple script as below:

```

#!/bin/bash
/bin/netstat \$@ | grep -Ev '1234|nc'
```

The above script upon execution:

- Calls the original netstat command located at **/bin/** folder
- **$@** : captures all the command line arguement passed to netstat command
- grep **-Ev** '1234|nc' : Removes every line from output matching the strings 1234 and nc

Attacker saves the above script titled **netstat** in **/usr/local/bin** and makes the script executable by

```

chmod +x /usr/local/bin/netstat
```

The point that the attacker leverages here is the implementation of PATH variable. The attacker checks the output of

```

echo $PATH
```

and notices that **/bin** comes after **/usr/local/bin**, this means the binary placed at /usr/local/bin will get executed first due to PATH order preference. He notes that the original netstat binary is placed at **/bin/netcat**by typing **which netstat**

![loc_netstat.png, May 2021]({{ site.baseurl }}/assets/blog/Linux_bd/loc_netstat.png)

Once the attacker has placed the script at /usr/local/bin, now when the local user of infected machine calls **netstat -ltp**

he wont be able to detect the presence of a listening netcat instance.

![no_nc.png, May 2021]({{ site.baseurl }}/assets/blog/Linux_bd/no_nc.png)

Attacker repeats the same process for ps and lsof commands by placing binaries with same name
