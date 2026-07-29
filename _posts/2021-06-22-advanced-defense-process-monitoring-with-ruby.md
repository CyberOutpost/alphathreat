---
layout: post
title: "ADVANCE DEFENSE: PROCESS MONITORING WITH RUBY"
date: 2021-06-22T13:57:00+05:30
categories: ["Programming"]
description: "Make you own Security Solution, get alert on new process launch. Stay tuned Today's post can be used by System Admins and fellow friends to detect any suspicious process launch"
original_url: "https://blog.alphathreat.in/index.php?post/2021/06/22/ADVANCED-DEFENSE%3A-PROCESS-MONITORING-WITH-RUBY"
---

Make you own Security Solution, get alert on new process launch. Stay tuned

Today's post can be used by System Admins and fellow friends to detect any suspicious process launch in background. Latest malwares use fileless techniques to infect the system by spawning the system processes from memory region itself.

**cmd** and **powershell** are two such processes of high interest along with several others that need to be specially monitored.

Let us now prepare our machine to create an event upon such behavior. This can be achieved by starting your **Local Security Policy** &gt; **Local Policies &gt; Audit Policy** and setting the **Audit Process Tracking** setting to **Success,Failure**

This setting will create an Windows event each time a process gets spawned.

![audit_process.png, Jun 2021]({{ site.baseurl }}/assets/blog/Eventlog/audit_process.png)

These generated events with the EventId of **4688** can be manually viewed from **Event Viewer** as shown in below screenshot

![event_viewer.png, Jun 2021]({{ site.baseurl }}/assets/blog/Eventlog/event_viewer.png)

All we now need to do is monitor for such generated events. We will do this by creating a program in Ruby. The program will keep an eye on these Security events and will alert us upon a new process launch

Installing required gems

```
gem install win32-eventlog
```

### OUR PROGRAM

```

Thread.new { loop { sleep 0.01 } } # Allow Ctrl-C
require "win32/eventlog"
include Win32

log = EventLog.open('Security') do |log|
log.tail do |x|

if x.string_inserts[5].to_s.match(/cmd|powershell|calc|regedit/i) and x.event_id == 4688
p 'Process ' + x.string_inserts[5].to_s + ' initiated by ' + x.string_inserts[1]
end
end
end
```

Here we are using the code provided in the native gem library itself. We have modified it a bit to capture interesting process only **(/cmd|powershell|calc|regedit/)** from event logs. You can set your own programs of interest in the list

The code acts like a **tail** command under linux but for event logs.

Any new entry in Security event logs will be captured and displayed as shown below

![Event_log_viewer.gif, Jun 2021]({{ site.baseurl }}/assets/blog/Eventlog/Event_log_viewer.gif)
