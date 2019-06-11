import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';

const BadgeWrapper = styled.span`
  display: inline-block;
  margin: 0 0.25rem;
  border-radius: 3px;
  border: 1px solid #2eca13;
  background: #2eca13;
  color: white;
  padding: 0 0.5rem;
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
`;
export default function Badge({ children, isVisible = false }) {
  const props = useSpring(
    { opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1.0)' : 'scale(0.2)' },
    { config: config.slow }
  );
  return (
    <animated.div style={props}>
      <BadgeWrapper>{children}</BadgeWrapper>
    </animated.div>
  );
}
