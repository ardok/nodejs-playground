dustjs-with-node
=================

You will need to have node installed (>= 0.10.22).

How to run this project:

1.  go to root directory i.e. `dustjs-playground/dustjs-with-node`
2.  do `npm install`
3.  go into `node-modules/dust/lib/server.js`
4.  modify that file:
    ```
    - Script = process.binding('evals').Script; // remove this line and replace it with the `Script` declaration below
    + Script = require("vm"); // add this line

    - require.paths.unshift(path.join(__dirname, '..')); // remove this line
    ```
5.  enjoy!

I followed this: http://sntran.tumblr.com/post/19736046092/using-dust-js-with-express3-0alpha-on-node-js-0-6-x
