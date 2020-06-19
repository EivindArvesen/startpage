# Custom Startpage
Live demo at [https://EivindArvesen.github.com/startpage/](https://EivindArvesen.github.com/startpage/)

A crudely hacked together startpage with various features.

Not yet thoroughly tested, probably won't play nice with IE < 9.

## Features
- Categorized links
- Autocompleted search (using DDG)
- URLs in search-field redirects

## Customize
You can customize the category names and as well as the site titles and urls in
```
sites.json
```

## Installation
To setup dependencies, you need to
```
git submodule init
git submodule update
```
or alternatively run the included bash-script that does this for you:
```
bash setup.sh
```

## License
[MIT](LICENSE.txt).
