---
layout: post
title: "BATCH FILE PROGRAMMING"
date: 2020-12-14T20:32:00+05:30
categories: ["Hacking"]
description: "Batch file programming is the native programming offered by the Microsoft Windows Operating System. Batch file is created using any text editors like notepad, WordPad, WinWord or"
original_url: "https://blog.alphathreat.in/index.php?post/2020/12/14/Batch-File-Programming"
---

Batch file programming is the native programming offered by the Microsoft Windows Operating System. Batch file is created using any text editors like notepad, WordPad, WinWord or so on, which comprises of a sequence of built-in commands used to perform some often done tasks like deleting a series of files of same type or of different type, creating logs, clearing unwanted craps from your computer and even for creating a batch VIRUS.

Although its powershell era but the batch still works in a lot of cases. Helped me in lot of cases, thats why decided to make up a tutorial to get you started.

Batch file programming is the native programming offered by the Microsoft Windows Operating System. Batch file is created using any text editors like notepad, WordPad, WinWord or so on, which comprises of a sequence of built-in commands used to perform some often done tasks like deleting a series of files of same type or of different type, creating logs, clearing unwanted craps from your computer and even for creating a batch VIRUS.

Whenever a Batch program is executed, it was interpreted line-by-line by the CLI (Command Line Interpreter) command.com or the cmd.exe. Batch file is really helpful in automating tedious tasks and for maintaining system logs. The commands used while creating a batch file are case insensitive, in the sense that it may accept both small and upper case letters.

## Modes

There are two different modes that are supported by DOS (Disk Operating System), they were,

**1. Interactive Mode.**

**2.Batch Mode (Silent Mode).**

**1) Interactive mode:** In interactive mode, when a command is executed, it interacts with the user for input and depending upon the input supplied by the user, the further processes are carried out. For example, let’s take the ‘del’ command. The ‘del’ command is used for deleting files that reside inside a directory. Now I am going to delete all the files inside a folder named ‘a’, and when I executed the following command, it is interacting with me prompting “Are you sure (Y/N)?”, confirming the deletion operation, and depending upon my input, it decides what to do. If I hit ‘Y’ then it will delete the files specified, else if I hit ‘N’ then it won’t delete.

```

C:\>del a
C:\a\*, Are you sure (Y/N)? y
```

**2) Batch Mode:** Batch mode can also be referred as ‘Silent mode’ or ‘Quiet Mode’ , and this is mere opposite to the interactive mode. The command that operates at batch mode will never interact with the user at any instance, instead it will take care of every operation by itself. For example, I am going to explain this by using the same ‘del’ command. There is a switch available for the ‘del’ command, which makes the command to operate at silent mode, and that switch is ‘/Q’

```

C:\>del /Q a
C:\>
```

##

## How to create a Batch Program

As said earlier, batch programs can be written using any of the text editors such as notepad, wordpad and so on, but notepad is the most often used text editor in such cases. Like any other programming languages, lets start our first program with the ‘Hello World’ program.

1. Open up a notepad and type the following.

```

@echo off
Echo Hello World
pause
```

2. Save the file with any name you wish, but make sure that you save the file extension with .bat, in this case I am saving this file as ‘first.bat’.

3. Just double click to execute the batch file that you have created now.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>batch.png</code> was not captured by the Internet Archive.</p>

Let me explain what does the above given program does, ‘echo’ is the command used to print text on the screen, so whatever that follows the echo command will be displayed on the output screen. This command is just like the ‘printf’ statement in the C language. When you type the echo command alone, then it will tell you whether the ‘echo is ON’ or ‘echo is OFF’.

It’s always recommended to turn the echo off, else it will display the prompts like **(C:\&gt;)** and so on. In order to avoid the prompts being displayed, the echo is turned off by using the command **“@echo off”** or simply by using the **“echo off”.**

**“Echo Hello World”** will display the **“Hello World”** on the output screen, and the pause command is used to wait for the user interaction, whether to proceed further or not. If the pause is not used, then the batch will terminate immediately after displaying the “Hello World”.

## Internal and External Commands

There are two types of commands that we can run from a command prompt, and they were,

**1. Internal commands
2. External commands.**

**1) Internal Commands**  are nothing but the built-in commands that are shipped along with the operating system, for example echo, cls, del, dir were few of the well known internal commands.

**2) External Commands** are the commands that are often created while installing a new application and these commands mostly have no use except calling that application and support files. Few external commands can only be executed in the ‘Run’ dialog box (start  Run), but not on the command prompt, and those commands include ‘firefox’. The ‘firefox’ command can be executed only from the run line, that too if the firefox application is installed on that machine and it won’t work on the command prompt.

Similar to other programming languages, batch program do support various operators for performing operations like arithmetic and logical operations, bitwise AND, OR, NOT, shifting and re- direction operation and separators and grouping operators.

| OPERATORS | DESCRIPTION |
| --- | --- |
| () | Grouping |
| ! ~ - | Unary Operators |
| \* / % + - | Arithematic Operators |
| &lt;&lt; &gt;&gt; &lt; &gt; | Logical Shift and re directional operators |
| & | Bitwise and |
| ^ | Bitwise exclusive or |
| | | Bitwise or |
| =  \*= /=  %=  +=  -=  &=  ^=  |=  &lt;&lt;=  &gt;&gt;= | Assignment Operators |
| , | Separator |
| && | For using Multiple commands |
| || | For executing one from many commands |

The above given were the operators available in Batch file programming for performing arithmetic and logical operations. Let me brief you the operators with a small example, Note : For performing arithmetic operations, the ‘SET’ command should be used along with the ‘/A’ switch. For performing an addition operation on two integers, then I have to use the below command,

```

C:\>set /A 5 + 5
10
```

## Operator precedence

Likewise other programming languages, batch program does support operator precedence for performing a valid arithmetic operation to obtain accurate results.
The precedence of operations are given in order

### **\*  /   %   +   -  .**

The expression that is enclosed and grouped with the grouping operator ‘()’ gets the high priority in the precedence.

```

C:\>set /A (10-5)*2+6/213
13
```

In the above example, the expression that is enclosed within the ‘()’ operator gets the high priority and thus 10-5 is ‘5’, the next priority moves to the ‘/’ division operator and ‘6/2’ gives ‘3’, then comes the multiplication ‘\*’ operator 5\*2 gives ‘10’ then it is summed up with ‘3’ to obtain the final result as ‘13’. To redirect the output of one command to other file, the ‘&gt;’ and ‘&lt;’ command is used. For example the below command is used to print the text “hello redirection” to a notepad file named “first.txt”

```

C:\>echo hello redirection > first.txt
C:\>
```

As we already have seen that the ‘echo’ command is used for printing the given text on the screen, here by using the **redirection operator ‘&gt;’** we are redirecting the output of the command to a text file. It will create a new text file even it wasn’t already there. Likewise you can redirect the output of any command to any other files. The below command is used for performing the same operation but the redirection happens to word document,

```

C:\> echo hello redirection > first.doc
```

The **tilde ‘~’ operator** is a unary operator that is used for shortening the long directory names, the following example will brief with the usage of this operator. The tilde operator can be used after 6 consecutive characters of a directory name, for example the “Documents and Settings” is a directory that contains more than 8 characters, instead of typing them all and messing with it, we can use the ‘~’ operator, so that it will automatically recognizes the path and performs the operation mentioned,

```

C:\>cd C:\DOCUME~1\CYB3RC~1\LOCALS~1\Temp
C:\DOCUME~1\CYB3RC~1\LOCALS~1\Temp>14
```

The above command is just a path to the location “C:\Documents and Settings\Cyb3rcr4wl3r\Local Settings\Temp”, where “Cyb3rcr4wl3r’ is the user account on my computer. Note: even though the ‘~’ operator is a unary operator, it can’t be used without the 1 following the operator. The **‘&&’ operator** is used to execute multiple commands in a single line, for example, the following command is used to print the text ‘hi’ and ‘hello’ using two different echo commands,

```

C:\>echo Hi && echo hello
Hi
Hello
```

**The pipeline operator '|'**is used for giving the output of one command as input for another command,

```

C:\>echo Y | del *.txt
```

In the above example, whenever you delete a file using the del command, it will prompt you with a confirmation message whether to delete the file or not, and only depending upon the user input it will proceed further, here we can make use of the pipeline ‘|’ operator to print ‘Y’ when the ‘del’ command prompt for the user interaction. Whenever the ‘del’ command prompts the user for the confirmation, the output of the echo command (i.e. ‘Y’) will be given as input for the del command, and as a result it deletes all the text files that reside in the specified directory.

## Basic Commands

Here I am going to explain few basic and often used commands used for constructing a simple batch program. Before getting into the commands, there are few thing that I need to explain in detail, and they were **‘sub-commands’, ‘switches’ and ‘parameters’.**

**1) Sub-commands:** Sub-commands are nothing but the supportive commands that are used along with the main commands to narrow down the result that we are looking for. For example, I want to view how many user accounts are there created in my computer, and this can be done using the “net” command, as below

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>basic_command.png</code> was not captured by the Internet Archive.</p>

As you can see in the above screenshot, ‘net’ is the main command, where as ‘user’ is the sub-command used for narrowing down the result that we want. A main command can have any number of sub- commands and that too depends upon the usage. Once the command gets executed, its displaying all the available user accounts in my computer.

**2) Switches:** Say, for instance i am going to create a new user account in my computer by making use of the “net” command, and the user account that I wish to create is “technocrawl” with password “P4$$w0rd” and this can be done using the following command

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>switch.png</code> was not captured by the Internet Archive.</p>

As you can see in the above screenshot, ‘switch’ is used again to narrow down the operation of the command that being performed, and most often switches are prefixed with as **backward slash ‘/’ or with an hyphen ‘-‘.** The above command have created a new user account named “technocrawl” with the password “P4$$w0rd”.

**3) Parameters:** ‘Parameters’ can also be referred as ‘command line arguments’ and are nothing but the input supplied to the program by the user while the program is running, and depending upon the parameter the program will proceed the further operation. Copy the below given code into a notepad and save it as ‘welcome.bat’. Goto command prompt and run the program by using its name “welcome.bat” (Make sure that the ‘welcome.bat’ exists in the directory where you want to run).

```

@echo off
cd\
echo Welcome %1%
pause
```

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>para.png</code> was not captured by the Internet Archive.</p>

Where, ‘welcome’ is the batch file name and its followed by the parameter, here the parameter is “Cybercrawler”.
 Note: You can specify ‘n’ number of parameters for a batch file. Each parameter can be accessed by using the “%number%” format, where you have to replace the ‘number’ with 1 to access the first parameter value, and ‘2’ for accessing the second parameter value and viceversa. Incase if I want to access the file name then it can be access by using %0%, and for accessing the fifth parametes %5% and so on.

**‘Help’** is the command that is used to display the available internal commands supported by windows, so that you can type ‘help’ to know the internal commands available on your computer. Each command has its own sub-commands and switches, and to find out the usage of each command in detail, then you may use the **‘/?’** (without quotes) followed by the command, for example, if I want to know what are the available sub-commands and switches for the ‘net’ command, then I can use the **‘net /?’** command to get more details.

'**title’** command is used to set the title of the command prompt. By default the title of the command prompt is set to “C:\Windows\System32\Cmd.exe” incase of windows XP and “C:\Winnt\system32\Cmd.exe” incase of Windows 2000. Now I wish to change the title to “Crawlers Shell Console”, and this can be done by using the command given below.

**'Start'** This command is used for starting an application, assigning it with a priority, specifying the memory where to be shared or separated. This command does have its own switches. Whenever the ‘start’ command is used without any switches, but followed by a string or text, then it is used to start a new command prompt with the text you specified as the title. In the following case, I have used the start command followed by the text “My Shell”, and you can see a new window appeared just right of it with the text “My Shell” specified as title.

<p class="img-missing" role="note"><strong>Screenshot unavailable</strong> — <code>shell.png</code> was not captured by the Internet Archive.</p>

The ‘/d’ switch is used to specify the start directory of the command prompt, in the following case, I have set the start directory as “C:\windows\system32” using the ‘/d’ switch, and now you can see a new command prompt popping up from the directory “C:\windows\system32”.
The **‘/min’** switch is used for starting a new minimized command prompt, if no application is specified. In the following example, I want a notepad application to be opened in a minimized window.

```

C:\>start /min notepad
```

Once this command gets executed you can see the minimized notepad, in the system taskbar.
The **‘/max’** switch is used for starting a new maximized command prompt, if no application is specified. In the following example, I want MSpaint application to be opened in a maximized window.

```

C:\>start /max mspaint
```

Once this command gets executed you can see the MSpaint getting popped up in a maximized window.
The ‘/separate’ switch is used for starting up 16bit programs in a separate memory space. The below command will open up a calculator application in a separate memory.

```

C:\>start /separate calc
```

The ‘/shared’ switch is used for starting up 16bit programs in a shared memory space; hence all the application shares the same memory space. The following command is used for opening up a WordPad in a shared memory space.

```

C:\>start /shared write
```

The ‘/low’ switch when used with the start command is used for starting up an application with the minimal priority (Idle Mode), so that these applications may not be given higher preference. The following command is used to open up a Microsoft office word application with idle mode.

```

C:\>start /low winword
```

The ‘/normal’ switch when used along with the start command is used to start an application in a normal mode, which is the default mode for any application getting started. The below command is used to start a new Internet Explorer window with a normal mode.

```

C:\>start /normal iexplore.exe
```

The ‘exit’ command is used to terminate or close the command prompt.

## SAMPLE BATCH CODES

#### FALLING MATRIX

```

@echo off
```

```

:x
color 0a
echo %random% %random% %random% %random% %random% %random%
goto x
```

- **:x** is just a label, which tells that the upcoming code is a part of x
- **color 0a** changes the color to green, for more codes do color/? at terminal
- **echo** just prints its arguements and **%random%** will print any random number, so **echo %random% %random%.....** will print some random numbers.
- **goto x** tells the program to go back to label x, hence the program gets repeated infinite times.

#### APPLICATION BOMBER

Do not run this in your own system.The system may even crash

```

@echo off
:x
start notepad
start mspaint
start msword
start cmd
goto x
```
