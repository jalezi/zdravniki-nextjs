import { ChildrenPropType } from '../../types';
import { InfoContainer } from './styles';

const Info = function Info({ children }) {
  return <InfoContainer as="article">{children}</InfoContainer>;
};

export default Info;

Info.defaultProps = { children: undefined };

Info.propTypes = { children: ChildrenPropType };
