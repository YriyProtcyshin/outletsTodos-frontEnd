import { StyledContainer } from './Container.styled';
export const Container = props => {
  const { children } = props;
  return <StyledContainer>{children}</StyledContainer>;
};
