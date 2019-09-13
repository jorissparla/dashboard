import React from 'react';
import { animated, useTransition } from 'react-spring';

const Loader = ({ loading }) => {
  // const { loading } = useContext(StoreContext)

  const transitions = useTransition(loading, null, {
    // from: { transform: 'translate3d(100%, 0, 0)', opacity: 0 },
    // enter: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    // leave: { transform: 'translate3d(100%, 0, 0)', opacity: 0 }
    from: { opacity: 0.8 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={{
            background: 'purple',
            position: 'fixed',
            top: '25%',
            left: '25%',
            // right: 0,
            // bottom: 0,
            zIndex: 1000,
            background: 'var(--xtraPurp)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...props
          }}
        >
          {loading ? 'Loading...' : 'Fetching data'}
          <svg
            width="120"
            height="30"
            viewBox="0 0 120 30"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <circle cx="15" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.5s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.5s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
              <animate
                attributeName="r"
                from="9"
                to="9"
                begin="0s"
                dur="0.5s"
                values="9;15;9"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="0.5"
                to="0.5"
                begin="0s"
                dur="0.8s"
                values=".5;1;.5"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="105" cy="15" r="15">
              <animate
                attributeName="r"
                from="15"
                to="15"
                begin="0s"
                dur="0.8s"
                values="15;9;15"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                from="1"
                to="1"
                begin="0s"
                dur="0.8s"
                values="1;.5;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </animated.div>
      )
  );
};

export default Loader;
