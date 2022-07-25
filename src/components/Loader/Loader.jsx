import { Circles } from 'react-loader-spinner';
import { CircleContainer } from './Loader.styled';

export default function Loader() {
  return (
    <CircleContainer>
      <Circles color="#00BFFF" height={50} width={50} />
    </CircleContainer>
  );
}
