# Answers

### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

- A: The main difference is that a PureComponent will only re-render when it's props or it's own state changes due to its shouldComponentUpdate implementation doing a shallow comparison on it's state/props. On the other hand, a Component will re-render everytime it's parent re-renders, and won't do a prop/state state comparison for you, so everytime shouldComponentUpdate get's called, the component will re-render.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- A: Because in a PureComponent for example, it only re-renders when it's props changes, and so if up in the tree the context get's updated, if the PureComponent props doesn't change, it won't receive the updated context and neither it's children, and also in a component, depending on where it leaves and when or how it's parent's update, it might receive a unsync context as well.
- One solution, could be to create a Provider, that stores subscriptions to the forceUpdate of the component that reads from the context.

### 3. Describe 3 ways to pass information from a component to its PARENT.

- A:
  - 1. One way could be using a function passing through it's children props, so that the children can call it passing some data to it's parent.
  - 2. Another way could be through legacy context on class components, bearing in mind how the update of the component might be triggered and how it would listen to the changes.
  - 3. Using the Context API on functional components.
  - 4. Through the reference of the children that sets an imperative handle, providing ways to access it's internal methods and stuff. But this has very specific scenarios. Not an everyday use.
  - 5. localStorage could be too

### 4. Give 2 ways to prevent components from re-rendering.

- Using a PureComponent and letting it handle the comparison, or implement the shouldComponentUpdate and handle the possible updates.
- With Functional components, memoazing the component with useMemo.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

- React Fragments let's us group components and return multiple components without adding an extra node to the dom tree and without the need for a containing dom element. But it might break the DOM tree logic sequence if used incorrectly.

For example, this would be an invalid html:

```jsx
const Items = () => {
  return (
    <div>
      <li>item 1</li>
      <li>item 2</li>
    </div>
  );
};

const List = () => {
  return (
    <ul>
      <Items />
    </ul>
  );
};
```

this results in: (which is invalid)

```html
<ul>
  <div>
    <li>item 1</li>
    <li>item 2</li>
  </div>
</ul>
```

the solution would be:

```jsx
const Items = () => {
  return (
    // <></> in short
    <React.Fragment>
      <li>item 1</li>
      <li>item 2</li>
    </React.Fragment>
  );
};
```

resulting in

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
</ul>
```

- And since React Fragments doesn't produce DOM elements, we can't get reference of it as a container for example.

### 6. Give 3 examples of the HOC pattern.

- A: HOC is function that accepts a component and returns another component. It can be used to inject values in a component, reuse logics, etc...
- One example could be for reusing a logic for injecting an authenticated user information:

```jsx
export const withAuth = (WrappedComponent) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    hasValidToken().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return <WrappedComponent user={user} />;
  }

  // Or redirect the user maybe
  return <div>You don't have access to this</div>;
};
```

Another could be for getting the theme through props

```jsx
export const withTheme = (WrappedComponent) => {
  const theme = useTheme();

  return <WrappedComponent theme={theme} />;
};
```

Another could be for logging access to pages

```jsx
export const withLogPageAccess = (WrappedComponent) => {
    const user = useUser();

  useEffect(() => {
    ...
    someLoggingService(user, ...)
    ...
  }, [])

  return <WrappedComponent theme={theme} />;
};
```

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

- Promises: has a "native" standard way of handling exeptions through it's .catch method that receives a callback. So any exception thrown inside the promise, will result in the nearest catch callback. Also, promises can have chained catches, for passing the errors forward to be handled by different catches...
- Async...await: when an exception happens and it's thrown, it will be forwarded to be handled by the nearest try catch block enclosing it. And if it doesn't find it, it migh result in breaking the app.
- A callback by it self doesn't handle anything, at least if i understood the question correctly, unless it's being passed to the .catch of a promise. If it is, then when an exception happens inside the execution of a promise, the callback mentioned will be called.

### 8. How many arguments does setState take and why is it async.

- Only one argument, which can either be a value to replace and update the state, or a callback that accepts the previous state and returns the new state. And setState is asyncronous because React doesn't garantee that the changes will be applied instantly and in the same order, and that is also the use of the callback of the setState. So to prevent multiple setStates to merge values incorrectly, react queues the callbacks and executes them in the order, making sure all calls to update the state has the chance to do it's modification, passing it forward to each callback the "previous new state".

### 9. List the steps needed to migrate a Class to Function Component.

- 1. Create a function that returns some JSX instead of a render() class method.
- 2. Change the constructor to `this.state = {}` and `this.setState` to use hooks `useState(initialState)`.
- 3. Instead of componentDidMount, componentDidUpdate and componentWillUnmount, use:
- 4. Instead of class methods and bindings, just declare functions inside the functional component and call them. And depending on it's usage, use `useCallback` hooks to memoise the function, `useMemo` to memoise calls with reactive values, etc...
- 5. Instead of `PureComponents`, use React.memo(), and/or pass a different comparison algorithm to it if needed.

```js
useEffect(() => {
  effects;

  return () => {
    cleanup;
  }
}, deps to trigger the effect, none to run every re-render, or [] empty to run only when first mounted);
```

### 10. List a few ways styles can be used with components.
- Importing the css into the HTML template and adding correct classNames to component tags.
- Using any css-in-js library, that converts a inline css and dynamically or statically generates the css and loads it in the application.
- Using stylesheets through the default style prop of each component tag.
- Using css loaders, to import and bundle the css automatically in different ways, depending on the configuration.

### 11. How to render an HTML string coming from the server.
- Using dangerouslySetInnerHTML prop. Which as it states, it's dangerous to be used.