---
layout: post
title: "SQLMAP TAMPER SCRIPTS"
date: 2021-09-20T12:20:00+05:30
categories: ["Pentest Engagement"]
description: "Sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers. This blog explains"
original_url: "https://blog.alphathreat.in/index.php?post/2021/09/20/SQLMAP-TAMPER-SCRIPTS"
---

Sqlmap is an open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over of database servers.

This blog explains various tamper scripts and their usage.

Credits to original author for piling this up

| **TAMPER SCRIPT** | **TESTED against** | **NOTES \ TIPS** |
| --- | --- | --- |
| apostrophemask | UNIVERSAL \ NOT DESCRIBED | Replaces apostrophe character with its UTF-8 full width counterpart |
| apostrophenullencode | UNIVERSAL \ NOT DESCRIBED | Replaces apostrophe character with its illegal double unicode counterpart |
| appendnullbyte | Microsoft Access \ TEST FURTHER | Useful to bypass weak web application firewalls when the back-end database management system is Microsoft Access - further uses are also possible |
| base64encode | UNIVERSAL \ NOT DESCRIBED | Base64 encode all characters in a given payload |
| between | Microsoft SQL Server 2005 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | MySQL 4 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | MySQL 5.0 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | Oracle 10g | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | PostgreSQL 8.3 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | PostgreSQL 8.4 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | PostgreSQL 9.0 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| between | MySQL 5.5 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character The BETWEEN clause is SQL standard. Hence, this tamper script should work against all (?) databases |
| bluecoat | MySQL 5.1 | Replaces space character after SQL statement with a valid random blank character. Afterwards replace character = with LIKE operator Useful to bypass Blue Coat's recommended WAF rule configuration |
| bluecoat | SGOS | Replaces space character after SQL statement with a valid random blank character. Afterwards replace character = with LIKE operator Useful to bypass Blue Coat's recommended WAF rule configuration |
| chardoubleencode | UNIVERSAL \ NOT DESCRIBED | Double url-encodes all characters in a given payload (not processing already encoded) \* Useful to bypass some weak web application firewalls that do not double url-decode the request before processing it through their ruleset |
| charencode | Microsoft SQL Server 2005 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | MySQL 4 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | MySQL 5.0 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | MySQL 5.5 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | Oracle 10g | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | PostgreSQL 8.3 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | PostgreSQL 8.4 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charencode | PostgreSQL 9.0 | Useful to bypass very weak web application firewalls that do not url-decode the request before processing it through their ruleset. The web server will anyway pass the url-decoded version behind, hence it should work against any DBMS |
| charunicodeencode | ASP | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeencode | ASP.NET | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeencode | Microsoft SQL Server 2000 | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeencode | Microsoft SQL Server 2005 | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeencode | MySQL 5.1.56 | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeencode | PostgreSQL 9.0.3 | Useful to bypass weak web application firewalls that do not unicode url-decode the request before processing it through their ruleset |
| charunicodeescape | UNIVERSAL \ NOT DESCRIBED | Useful to bypass weak filtering and/or WAFs in JSON contexes, Unicode-escapes non-encoded characters in a given payload (not processing already encoded). |
| commalesslimit | MySQL | Replaces instances like 'LIMIT M, N' with 'LIMIT N OFFSET M' |
| commalesslimit | MySQL 5.0 | Replaces instances like 'LIMIT M, N' with 'LIMIT N OFFSET M' |
| commalesslimit | MySQL 5.5 | Replaces instances like 'LIMIT M, N' with 'LIMIT N OFFSET M' |
| commalessmid | MySQL | Replaces instances like 'MID(A, B, C)' with 'MID(A FROM B FOR C)' |
| commalessmid | MySQL 5.0 | Replaces instances like 'MID(A, B, C)' with 'MID(A FROM B FOR C)' |
| commalessmid | MySQL 5.5 | Replaces instances like 'MID(A, B, C)' with 'MID(A FROM B FOR C)' |
| commentbeforeparentheses | Microsoft SQL Server | Useful to bypass web application firewalls that block usage of function calls |
| commentbeforeparentheses | MySQL | Useful to bypass web application firewalls that block usage of function calls |
| commentbeforeparentheses | Oracle | Useful to bypass web application firewalls that block usage of function calls |
| commentbeforeparentheses | PostgreSQL | Useful to bypass web application firewalls that block usage of function calls |
| concat2concatws | MySQL | Useful to bypass very weak and bespoke web application firewalls that filter the CONCAT() function |
| concat2concatws | MySQL 5.0 | Useful to bypass very weak and bespoke web application firewalls that filter the CONCAT() function |
| equaltolike | Microsoft SQL Server 2005 | Useful to bypass weak and bespoke web application firewalls that filter the equal character ('=') The LIKE operator is SQL standard. Hence, this tamper script should work against all (?) databases |
| equaltolike | MySQL 4 | Useful to bypass weak and bespoke web application firewalls that filter the equal character ('=') The LIKE operator is SQL standard. Hence, this tamper script should work against all (?) databases |
| equaltolike | MySQL 5 | Useful to bypass weak and bespoke web application firewalls that filter the equal character ('=') The LIKE operator is SQL standard. Hence, this tamper script should work against all (?) databases |
| equaltolike | MySQL 5.5 | Useful to bypass weak and bespoke web application firewalls that filter the equal character ('=') The LIKE operator is SQL standard. Hence, this tamper script should work against all (?) databases |
| escapequotes | UNIVERSAL \ NOT DESCRIBED | Slash escape quotes (' and ") |
| greatest | MySQL 4 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | MySQL 5 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | MySQL 5.5 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | Oracle 10g | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | PostgreSQL 8.3 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | PostgreSQL 8.4 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| greatest | PostgreSQL 9.0 | Replaces greater than operator ('&gt;') with 'GREATEST' counterpart. Useful to bypass weak and bespoke web application firewalls that filter the greater than character.The GREATEST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases |
| halfversionedmorekeywords | MySQL &lt; 5.1 | Adds versioned MySQL comment before each keyword. Useful to bypass several web application firewalls when the back-end database management system is MySQL Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| halfversionedmorekeywords | MySQL 4.0.18 | Adds versioned MySQL comment before each keyword. Useful to bypass several web application firewalls when the back-end database management system is MySQL Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| halfversionedmorekeywords | MySQL 5.0.22 | Adds versioned MySQL comment before each keyword. Useful to bypass several web application firewalls when the back-end database management system is MySQL Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| htmlencode | UNIVERSAL \ NOT DESCRIBED | HTML encode (using code points) all non-alphanumeric characters |
| ifnull2ifisnull | MySQL 5.0 | Replaces instances like 'IFNULL(A, B)' with 'IF(ISNULL(A), B, A)' Useful to bypass very weak and bespoke web application firewalls that filter the IFNULL() function |
| ifnull2ifisnull | MySQL 5.5 | Replaces instances like 'IFNULL(A, B)' with 'IF(ISNULL(A), B, A)' Useful to bypass very weak and bespoke web application firewalls that filter the IFNULL() function |
| informationschemacomment | UNIVERSAL \ NOT DESCRIBED | Add a comment to the end of all occurrences of (blacklisted) "information_schema" identifier |
| least | MySQL 4 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | MySQL 5 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | MySQL 5.5 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | Oracle 10g | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | PostgreSQL 8.3 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | PostgreSQL 8.4 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| least | PostgreSQL 9.0 | Useful to bypass weak and bespoke web application firewalls that filter the greater than character. The LEAST clause is a widespread SQL command. Hence, this tamper script should work against majority of databases. |
| lowercase | Microsoft SQL Server 2005 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | MySQL 4 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | MySQL 5.0 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | MySQL 5.5 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | Oracle 10g | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | PostgreSQL 8.3 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | PostgreSQL 8.4 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| lowercase | PostgreSQL 9.0 | Replaces each keyword character with lower case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases. |
| modsecurityversioned | MySQL | Embraces complete query with versioned comment. Useful to bypass ModSecurity WAF/IDS |
| modsecurityversioned | MySQL 5.0 | Useful to bypass ModSecurity WAF/IDS |
| multiplespaces | UNIVERSAL \ NOT DESCRIBED | Adds multiple spaces around SQL keywords. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions Reference: https://www.owasp.org/images/7/74/Advanced_SQL_Injection.ppt |
| nonrecursivereplacement | UNIVERSAL \ NOT DESCRIBED | Replaces predefined SQL keywords with representations suitable for replacement (e.g. .replace("SELECT", "")) filters. Useful to bypass very weak custom filters |
| overlongutf8 | UNIVERSAL \ NOT DESCRIBED | Converts all characters in a given payload (not processing already encoded) Reference: https://www.acunetix.com/vulnerabilities/unicode-transformation-issues/ |
| percentage | ASP | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| percentage | Microsoft SQL Server 2000 | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| percentage | Microsoft SQL Server 2005 | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| percentage | MySQL 5.1.56 | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| percentage | MySQL 5.5.11 | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| percentage | PostgreSQL 9.0 | Adds a percentage sign ('%') infront of each character. Useful to bypass weak and bespoke web application firewalls |
| plus2concat | Microsoft SQL Server 2012 | Replaces plus ('+') character with function CONCAT(). Useful in case ('+') character is filtered. |
| plus2concat | Microsoft SQL Server 2012+ | Replaces plus ('+') character with function CONCAT(). Useful in case ('+') character is filtered. |
| plus2fnconcat | Microsoft SQL Server 2008 | Replaces plus ('+') character with ODBC function {fn CONCAT()}. Useful in case ('+') character is filtered https://msdn.microsoft.com/en-us/library/bb630290.aspx |
| plus2fnconcat | Microsoft SQL Server 2008+ | Replaces plus ('+') character with ODBC function {fn CONCAT()}. Useful in case ('+') character is filtered https://msdn.microsoft.com/en-us/library/bb630290.aspx |
| randomcase | Microsoft SQL Server 2005 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | MySQL 4 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | MySQL 5 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | MySQL 5.5 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | Oracle 10g | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | PostgreSQL 8.3 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | PostgreSQL 8.4 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcase | PostgreSQL 9.0 | Replaces each keyword character with random case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| randomcomments | UNIVERSAL \ NOT DESCRIBED | Add random comments to SQL keywords. |
| securesphere | UNIVERSAL \ NOT DESCRIBED | Appends special crafted string. Useful for bypassing Imperva SecureSphere WAF. Reference: http://seclists.org/fulldisclosure/2011/May/163 |
| sp_password | MSSQL | Appends 'sp_password' to the end of the payload for automatic obfuscation from DBMS logs. Appending sp_password to the end of the query will hide it from T-SQL logs as a security measure Reference: http://websec.ca/kb/sql_injection |
| space2comment | Microsoft SQL Server 2005 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | MySQL 4 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | MySQL 5 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | MySQL 5.5 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | Oracle 10g | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | PostgreSQL 8.3 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | PostgreSQL 8.4 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2comment | PostgreSQL 9.0 | Replaces space character (' ') with comments '/\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2dash | MSSQL | Replaces space character (' ') with a dash comment ('--') followed by a random string and a new line ('\n'). Useful to bypass several web application firewalls Used during the ZeroNights SQL injection challenge https://proton.onsec.ru/contest/ |
| space2dash | SQLite | Replaces space character (' ') with a dash comment ('--') followed by a random string and a new line ('\n'). Useful to bypass several web application firewalls Used during the ZeroNights SQL injection challenge https://proton.onsec.ru/contest/ |
| space2hash | MySQL | Replaces space character (' ') with a pound character ('#') followed by a random string and a new line ('\n'). Useful to bypass several web application firewalls. Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| space2hash | MySQL 4.0 | Replaces space character (' ') with a pound character ('#') followed by a random string and a new line ('\n'). Useful to bypass several web application firewalls. Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| space2hash | MySQL 5.0 | Replaces space character (' ') with a pound character ('#') followed by a random string and a new line ('\n'). Useful to bypass several web application firewalls. Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| space2morecomment | MySQL 5.0 | Replaces space character (' ') with comments '/\*\*_\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2morecomment | MySQL 5.5 | Replaces space character (' ') with comments '/\*\*_\*\*/' Useful to bypass weak and bespoke web application firewalls |
| space2morehash | MySQL &gt;= 5.1.13 | Replaces space character (' ') with a pound character ('#') followed by a random string and a new line ('\n') |
| space2morehash | MySQL 5.1.41 | Useful to bypass several web application firewalls. Used during the ModSecurity SQL injection challenge http://modsecurity.org/demo/challenge.html |
| space2mssqlblank | Microsoft SQL Server | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2mssqlblank | Microsoft SQL Server 2000 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2mssqlblank | Microsoft SQL Server 2005 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2mssqlhash | MSSQL | Replaces space character (' ') with a pound character ('#') followed by a new line ('\n'). Useful to bypass several web application firewalls |
| space2mssqlhash | MySQL | Replaces space character (' ') with a pound character ('#') followed by a new line ('\n'). Useful to bypass several web application firewalls |
| space2mysqlblank | MySQL | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2mysqlblank | MySQL 5.1 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2mysqldash | MySQL | Replaces space character (' ') with a dash comment ('--') followed by a new line ('\n'). Useful to bypass several web application firewalls. |
| space2mysqldash | MSSQL | Replaces space character (' ') with a dash comment ('--') followed by a new line ('\n'). Useful to bypass several web application firewalls. |
| space2plus | UNIVERSAL \ NOT DESCRIBED | Replaces space character (' ') with plus ('+'). Is this any useful? The plus get's url-encoded by sqlmap engine invalidating the query afterwards. This tamper script works against all databases |
| space2randomblank | Microsoft SQL Server 2005 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2randomblank | MySQL 4.0 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2randomblank | MySQL 5.0 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| space2randomblank | MySQL 5.5 | Replaces space character (' ') with a random blank character from a valid set of alternate characters. Useful to bypass several web application firewalls |
| symboliclogical | UNIVERSAL \ NOT DESCRIBED | Replaces AND and OR logical operators with their symbolic counterparts (&& and ||) |
| unionalltounion | UNIVERSAL \ NOT DESCRIBED | Replaces UNION ALL SELECT with UNION SELECT |
| unmagicquotes | UNIVERSAL \ NOT DESCRIBED | Replaces quote character (') with a multi-byte combo %bf%27 together with generic comment at the end (to make it work). Useful for bypassing magic_quotes/addslashes feature http://shiflett.org/blog/2006/jan/addslashes-versus-mysql-real-escape-string |
| uppercase | Microsoft SQL Server 2005 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | MySQL 4.0 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | MySQL 5.0 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | MySQL 5.5 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | PostgreSQL 8.3 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | PostgreSQL 8.4 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| uppercase | PostgreSQL 9.0 | Replaces each keyword character with upper case value. Useful to bypass very weak and bespoke web application firewalls that has poorly written permissive regular expressions. This tamper script should work against all (?) databases |
| varnish | UNIVERSAL \ NOT DESCRIBED | Append a HTTP header 'X-originating-IP' to bypass WAF Protection of Varnish Firewall Reference: http://h30499.www3.hp.com/t5/Fortify-Application-Security/Bypassing-web-application-firewalls-using-HTTP-headers/ba-p/6418366 |
| versionedkeywords | MySQL | Encloses each non-function keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedkeywords | MySQL 4.0.18 | Encloses each non-function keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedkeywords | MySQL 5.1.56 | Encloses each non-function keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedkeywords | MySQL 5.5.11 | Encloses each non-function keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedmorekeywords | MySQL &gt;= 5.1.13 | Encloses each keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedmorekeywords | MySQL 5.1.56 | Encloses each keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| versionedmorekeywords | MySQL 5.5.11 | Encloses each keyword with versioned MySQL comment. Useful to bypass several web application firewalls when the back-end database management system is MySQL |
| xforwardedfor | UNIVERSAL \ NOT DESCRIBED | Append a fake HTTP header 'X-Forwarded-For' to bypass  WAF (usually application based) protection |
