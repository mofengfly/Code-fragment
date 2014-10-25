
#重启进程
#!/bin/bash

kill -9 $(ps aux | grep '[n]ode --harmony index.js' | awk '{print $2}')

node --harmony index.js
~       
