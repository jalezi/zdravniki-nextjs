import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function ErrorLayout({ children }) {
  return <Styled.Main>{children}</Styled.Main>;
}

ErrorLayout.propTypes = {
  children: ChildrenPropType.isRequired,
};
