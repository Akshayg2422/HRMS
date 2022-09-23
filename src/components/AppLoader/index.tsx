import LoadingOverlay from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';
import './loader.css';
import styled, { css } from 'styled-components';

const DarkBackground = styled.div<{ disappear: boolean }>`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  ${(props) =>
    props.disappear &&
    css`
      display: block; /* show */
    `}
`;

function AppLoader() {
  const { loading } = useSelector((state: any) => state.AppReducer);



  return (
    <div>
      <DarkBackground disappear={loading}>
      <LoadingOverlay styles={{
          spinner: (base) => ({
            ...base,
            '& svg circle': {
              stroke: 'rgba(82,48,124, 0.5)'
            }
          })
        }} className='bg-primary' active={true} spinner={true}></LoadingOverlay>
      </DarkBackground>
    </div>
  );
}

export default AppLoader;
