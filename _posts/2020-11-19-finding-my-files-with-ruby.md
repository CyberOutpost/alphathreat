---
layout: post
title: "FINDING MY FILES WITH RUBY"
date: 2020-11-19T20:48:00+05:30
categories: ["Programming"]
description: "Here i share code i wrote to search my study related material which was spread all over the Hard disk in multiple partitions. So I have all my learning stuff spread in multiple"
original_url: "https://blog.alphathreat.in/index.php?post/2020/11/19/Finding-my-files-with-Ruby"
---

*Here i share code i wrote to search my study related material which was spread all over the Hard disk in multiple partitions.*

So I have all my learning stuff spread in multiple folders, which is nasty when i want to find something. Apart from different folders the stuff is divided in different partitions, so i spent time in finding what i need.

I decided to write a code and solve this problem. I made this for lnux distro which I use

**INSTALLATION**

- Ruby compiler *(apt install ruby)*
- rainbow gem  *(gem install rainbow)*

**CODE**

```

#!/usr/bin/env ruby

begin
require 'rainbow/ext/string'
rescue LoadError
puts "No gem rainbow found.\n Do gem install rainbow"
exit
end

`clear`
puts <<banner
██╗    ██╗██╗  ██╗███████╗██████╗ ███████╗██████╗ ██╗   ██╗
██║    ██║██║  ██║██╔════╝██╔══██╗██╔════╝██╔══██╗██║   ██║
██║ █╗ ██║███████║█████╗  ██████╔╝█████╗  ██████╔╝██║   ██║
██║███╗██║██╔══██║██╔══╝  ██╔══██╗██╔══╝  ██╔══██╗██║   ██║
╚███╔███╔╝██║  ██║███████╗██║  ██║███████╗██║  ██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝

banner

index=[]
count=0

puts "\nEnter the Book Name".color(:green).underline
book=gets.chomp
puts ""
path=[
"/media/xcode/HDD-UID/STUDY/EBOOKS/",
"/home/SecurityOwls/Documents/STUDY/"]
path.each do |cp|
begin
Dir.chdir(cp)
rescue Exception => e
print "#{e}\n".color(:red).underline
exit
end
Dir.glob("**/*").each do |x|
y=x.split("\/")
y=y[-1]

if y=~/#{Regexp.escape book}/i
#print "Filename >>\t".color(:cyan).bright,"#{y}\n".color(:gold),"Path >>\t\t".color(:yellow),"#{cp}\/#{x}\n\n".color(:coral)
print "\[#{count}\]. Filename >>\t".color(:cyan).bright,"#{y}\t".color(:gold),"\n"
#print "\tFilepath >>\t".color(:green).bright,"#{cp}\/#{x}\n\n"
index<<"#{cp}\/#{x}"
count+=1

end
end
end

puts "Enter the index".color(:cyan).bright
bo=gets.chomp.to_i
begin
index[bo]=index[bo].gsub(" ","\\ ")
`xdg-open #{index[bo]} &`
rescue Exception
puts "INVALID\n".color(:red).underline
end
exit
```

You need to set the path array to all the locations that you want to search the files in. That is line 29 and 30 in the above code.

**EXECUTE**

- Simply execute the script by SCRIPTNAME.rb
- Enter the book name upon search.
- Enter the index of the file, the script will open the file for you )

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>Untitled.png</code> was not captured by the Internet Archive.</p>
