---
date: 2017-04-19 10:00:00+00:00
slug: typescript-instead-of-react-proptypes
title: 'TypeScript over React PropTypes'
pageDesc: 'I ditched React PropTypes in favour of TypeScript to see how things stacked up.'
---

In [React v15.5.0](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html) the `React.PropTypes` module gives a deprecation warning. Instead it should be loaded from it's own [package](https://github.com/reactjs/prop-types).

I've always used React PropTypes because it seemed like the 'right way' to do things. Runtime validation has value but in my experience there are three big negatives here:

1. PropTypes are tedious to write
2. PropTypes bloat production code
3. Runtime validation is slow and mistakes are missed

The first thing can be solved with another coffee. The second can be solved with Babel transform plugins to strip them out entirely. Thing three; well surely, there's a better way?

## TypeScript

[TypeScript](https://www.typescriptlang.org/) – to quote the homepage – "_is a typed superset of JavaScript that compiles to plain JavaScript._" [Flow](https://flow.org/en/) is another option for static type checkering.

TypeScript has been on my radar for a long time. I've yet to learn most of what's on offer but enough to get going. [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) provides the type defintions for React (and myriad other libraries). Instead of PropTypes I write a type interface for my functional component:

```jsx
interface ButtonProps {
  text: string,
  shadow?: boolean
}

const Button: React.SFC<ButtonProps> = props => {
  return ( /* [...] */ );
};
```

When I use the `<Button/>` component my editor shows useful information such as missing props and specific types required:

<p class="b-post__image">![TypeScript in action with React development](/images/blog/dbushell-button-typescript.gif)</p>

TypeScript, of course, is more than just a React PropType replacement. It can be applied to any JavaScript and I'll be expanding my knowledge for sure.
