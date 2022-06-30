import { ChildrenPropType } from '../../../types/index';

import * as Styled from './styles';

const Backdrop = function Backdrop({ children }) {
  const clickHandler = event => event.stopPropagation();
  return <Styled.Backdrop onClick={clickHandler}>{children}</Styled.Backdrop>;
};

Backdrop.defaultProps = { children: null };

Backdrop.propTypes = { children: ChildrenPropType };
export default Backdrop;
