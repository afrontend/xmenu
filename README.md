# xmenu
<!-- [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] -->
> program launcher to execute a command in terminal

## Use npm

Installation

    npm install -g xmenu

Usage

    $ xmenu xeyes xeyes xterm xterm terminator terminator

    or

    $ xmenu -c > ~/.xmenu.json
    $ vim ~/.xmenu.json
    $ xmenu

    __  ___ __ ___   ___ _ __  _   _
    \ \/ / '_ ` _ \ / _ \ '_ \| | | |
     >  <| | | | | |  __/ | | | |_| |
    /_/\_\_| |_| |_|\___|_| |_|\__,_|

    ? > (Use arrow keys)
    xeyes
    xterm
    ❯ terminator

## Use Docker

Installation

    docker pull afrontend/xmenu

Usage

    docker run --rm afrontend/xmenu xmenu

## License

MIT © [Bob Hwang](https://afrontend.github.io)

[npm-image]: https://badge.fury.io/js/xmenu.svg
[npm-url]: https://npmjs.org/package/xmenu
[travis-image]: https://travis-ci.org/afrontend/xmenu.svg?branch=master
[travis-url]: https://travis-ci.org/afrontend/xmenu
[daviddm-image]: https://david-dm.org/afrontend/xmenu.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/afrontend/xmenu
[coveralls-image]: https://coveralls.io/repos/afrontend/xmenu/badge.svg
[coveralls-url]: https://coveralls.io/r/afrontend/xmenu
