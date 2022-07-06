import { ChildrenPropType } from '../../types';
import * as Styled from './styles';

export default function HomeLayout({ children }) {
  return <Styled.Main>{children}</Styled.Main>;
}

HomeLayout.propTypes = {
  children: ChildrenPropType.isRequired,
};
