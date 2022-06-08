/* eslint-disable react/jsx-props-no-spreading */
import { H1, H2, H3, P, Ul, Strong, A } from "./styles";

export const mdComponents = {
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  p: (props) => <P {...props} />,
  ul: (props) => <Ul {...props} />,
  ol: (props) => <Ul as="ol" {...props} />,
  strong: (props) => <Strong {...props} />,
  a: (props) => <A {...props} />,
};
