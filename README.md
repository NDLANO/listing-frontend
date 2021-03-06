![CI](https://github.com/NDLANO/listing-frontend/workflows/CI/badge.svg)

# NDLA Listing frontend 

## Requirements

- Node.JS ~6.6
- npm ~3.9
- yarn ~0.18.0
- Docker (optional)

## Getting started

What's in the box?

- React
- Redux
- Express
- Webpack + Babel (ES6)

### Dependencies

All dependencies are defined in `package.json` and are managed with npm.  To
initially install all dependencies and when the list dependency has changed,
run `npm install`.

```
$ yarn install
```

### Start development server

Start node server with hot reloading middleware listening on port 3000.

```
$ yarn start
```

To use a different api set the `NDLA_API_URL` environment variable.

### Unit tests

Test framework: Jest with enzyme.

```
$ yarn test
```
### Code style

*tl;dr*: Use eslint! Rules: [Airbnb Styleguide]https://github.com/airbnb/javascript.

Lint code with [eslint](http://eslint.org/), including [eslint react plugin](https://github.com/yannickcr/eslint-plugin-react), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme).
Beside linting with globally installed eslint, eslint can be invoked with `npm`:

```
$ yarn run lint
```

Rules are configured in `./.eslintrc.js` and extends [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). If feeling brave, try `eslint --fix`.


## Other scripts

```
# Create minified production ready build with webpack:
$ yarn run build
```

```
# Docker stuff
$ ./build.sh
```
