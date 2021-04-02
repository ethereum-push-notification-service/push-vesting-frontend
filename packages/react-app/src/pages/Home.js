import React, { useCallback } from "react";
import ReactGA from 'react-ga';

import styled, { css } from 'styled-components';

import { useWeb3React } from '@web3-react/core'
import TokenVestingApp from "../components/TokenVestingApp";
import AdminPanel from "../components/AdminPanel";
import { addresses, abis } from "@project/contracts";

// Create Header
function Home({ setBadgeCount, bellPressed }) {
  ReactGA.pageview('/home');

  const { active, error, account, library, chainId } = useWeb3React();
  const [controlAt, setControlAt] = React.useState(0);  

  React.useEffect(() => {
    // Reset when account refreshes
    userClickedAt(0);
  }, []);

  
  // handle user action at control center
  const userClickedAt = (controlIndex) => {
    setControlAt(controlIndex);
  }

  // Render
  return (
    <Container>
      <Controls>
        <ControlButton index={0} active={controlAt == 0 ? 1 : 0} border="#e20880"
          onClick={() => {
            userClickedAt(0)
          }}
        >
          <ControlImage src="./svg/channeladmin.svg" active={controlAt == 0 ? 1 : 0} />
          <ControlText active={controlAt == 0 ? 1 : 0}>Advisors/Team</ControlText>
        </ControlButton>
        <ControlButton index={1} active={controlAt == 1 ? 1 : 0} border="#e20880"
          onClick={() => {
            userClickedAt(1)
          }}
        >
          <ControlImage src="./svg/channeladmin.svg" active={controlAt == 1 ? 1 : 0} />
          <ControlText active={controlAt == 1 ? 1 : 0}>Investors</ControlText>
        </ControlButton>
        <ControlButton index={2} active={controlAt == 2 ? 1 : 0} border="#e20880"
          onClick={() => {
            userClickedAt(2)
          }}
        >
          <ControlImage src="./svg/channeladmin.svg" active={controlAt == 2 ? 1 : 0} />
          <ControlText active={controlAt == 2 ? 1 : 0}>Foundation</ControlText>
        </ControlButton>
        <ControlButton index={3} active={controlAt == 3 ? 1 : 0} border="#e20880"
          onClick={() => {
            userClickedAt(3)
          }}
        >
          <ControlImage src="./svg/channeladmin.svg" active={controlAt == 3 ? 1 : 0} />
          <ControlText active={controlAt == 3 ? 1 : 0}>Admin Controls</ControlText>
        </ControlButton>
      </Controls>
      <Interface>
        {controlAt == 0 &&
          <TokenVestingApp multipleVesting={false} vestingAddresses={null} />
        }
        {controlAt == 1 &&
          <TokenVestingApp multipleVesting={true} vestingAddresses={null} />
        }
        {controlAt == 2 &&
          <TokenVestingApp multipleVesting={true} vestingAddresses={[addresses.vestedReserves.foundationA, addresses.vestedReserves.foundationB]} />
        }
        {controlAt == 3 &&
          <AdminPanel />
        }
      </Interface>
    </Container>
  );
}

// css style
const Container = styled.div`
  flex: 1;
  display: block;
  flex-direction: column;
  min-height: calc(100vh - 100px);
`

const Controls = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ControlButton = styled.div`
  flex: 1 1 21%;
  height: 120px;
  min-width: 200px;
  background: #fff;

  box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 1px solid rgb(225,225,225);

  border-bottom: 10px solid rgb(180,180,180);
  margin: 20px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 10px solid ${(props) => props.active ? props.border : "rgb(180,180,180)"};

  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
`

const ControlImage = styled.img`
  height: 30%;
  margin-right: 15px;
  filter: ${(props) => props.active ? "brightness(1)" : "brightness(0)"};
  opacity: ${(props) => props.active ? "1" : "0.25"};

  transition: transform .2s ease-out;
  ${ props => props.active && css`
    transform: scale(3.5) translate(-20px, 0px);
    opacity: 0.4;
  `};
`

const ControlText = styled.label`
  font-size: 16px;
  font-weight: 200;
  opacity: ${(props) => props.active ? "1" : "0.75"};

  transition: transform .2s ease-out;
  ${ props => props.active && css`
    transform: scale(1.3) translate(-10px, 0px);
  `};
`

const Interface = styled.div`
  flex: 1;
  display: flex;

  box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: 1px solid rgb(225,225,225);

  margin: 15px;
  overflow: hidden;
`

// Export Default
export default Home;
