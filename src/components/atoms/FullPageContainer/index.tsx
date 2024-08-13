import { FullPageContainerWrapper } from "./style";

interface FullPageContainerProps {
  children: React.ReactNode; // This covers all types of React children
}
const FullPageContainer = (props: FullPageContainerProps) => {
  const { children } = props;
  return <FullPageContainerWrapper>{children}</FullPageContainerWrapper>;
};

export default FullPageContainer;
