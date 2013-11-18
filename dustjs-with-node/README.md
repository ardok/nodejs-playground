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

### Edit page ###

Inside `views` directory, you will find `layouts` directory and a file named `index.dust`.

Inside `server.js`, you will find a route to `index.html` (`app.get(/index, ...)`).
In the callback function, you will see that it's trying to `render` the file that matches the requested url (without the `.html` extension).
In this case, it is `index`, hence it will try to render the `index.dust` file inside `views` directory.

Now, how does it know to look into `views` directory?
Because inside `app.configure`, we have specified the directory to look for, i.e. `app.set('views', __dirname + '/views')`.

How about knowing to look into the file with `.dust` extension without specifying it?
This line does it: `app.set('view engine', 'dust');`

Let's go back to `index.dust` file. Inside, you can see the first line that it's trying to render `main.dust` file inside `layouts` directory.
Hence, feel free to modify the `main.dust` file to your liking.
Then inside `index.dust`, you can override whatever the data that you'd like to override, specified by `{<...}` syntax.
You can also add more stuff below the `main` layout as you can see with the text `I wanna see what happens here` that appears after `main` layout.