## Notes

I didn't had much time to work on it, so i did a few hacks to get to a good expected result, because since in the task i was only allowed to use pure react and javascript, i had to improvise a few things (like the accebility controls, with Keys Up and Down on the autocomplete), simplify and abstract a few others to speed things up, like proper error handling for the endpoints, more styling for the autocomplete, and a more SOLID compliant code.

Another approach would be to use a few libraries that are more battle tested for some functionalities, like virtual lists, handling focus, ... etc or even building them if needed, but with more time to cover all scenarios.

It was a very good challenge!

## [2 Test questions](https://github.com/lucaseddev/interview-auto-complete-test/blob/68c01944d7087d34a4d5bedc662d61c16e1cbd0b/QUESTIONS.MD)

# How to run it

I have built the project for both generating a library using rollup and starting a simple server with webpack.

## Running the app server

First install the dependencies

```bash
yarn install
# npm install
```

then just run it with yarn or npm:

```bash
yarn start
# npm run start
```

## Running storybook dashboard
```bash
yarn storybook
# npm run storybook
```

## Building the app
```bash
yarn build:app
# npm run build:app
```

## Building the lib
```bash
yarn build:lib
# npm run build:lib
```

## License
No license
