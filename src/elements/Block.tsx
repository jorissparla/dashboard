import React from "react";

const SELECTEDCOLOR = "rgb(130, 216, 216)";
const SELECTEDCOLORNEW = "rgb(0,0,0)";
const HOVERCOLOR = "#524763";

function getBGColor(props: any) {
  if (props.selected && props.outline) {
    return HOVERCOLOR;
  }
  return SELECTEDCOLOR;
}

type BlockProps = {
  children: any;
  selected?: boolean;
  onClick?: any;
  onMouseDown?: any;
};

export const Block: React.FC<BlockProps> = ({ children, selected = false, onClick, onMouseDown }) => (
  <div
    className={`font-pop m-1 px-2 py-1 font-bold hover:bg-purp hover:text-white rounded ${
      selected ? "bg-teal-300 text-teal-900" : "bg-gray-300 text-gray-800"
    }`}
  >
    {children}
  </div>
);
type BlockNewerProps = {
  children: any;
  onClick: any;
  selected?: boolean;
};

export const BlockNewer = ({ children, onClick, selected = false }: BlockNewerProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-pop inline-block uppercase tracking-wide text-base text-gray-700 font-semibold mb-2 mx-1 ${
        selected ? `bg-gray-400` : `bg-gray-300`
      }  rounded-md px-2 py-2 shadow cursor-pointer`}
    >
      {children}
    </button>
  );
};
// export const BlockNew = styled("button")<{ selected: boolean }>`
//   font-family: Poppins;
//   color: ${(props) => (props.selected ? "white" : "rgb(69, 69, 69)")};
//   display: inline-block;
//   text-transform: uppercase;
//   letter-spacing: 0.2rem;
//   font-size: 1rem;
//   font-weight: 800;
//   margin-bottom: 5px;
//   margin-right: 5px;
//   margin-left: 5px;
//   background-color: ${(props) => getBGColor(props)};
//   background-color: ${(props) => (props.selected ? SELECTEDCOLORNEW : "rgb(196, 196, 196)")};
//   border-radius: 3px;
//   padding: 5px 10px;
//   border-width: initial;
//   border-style: none;
//   border-color: initial;
//   border-image: initial;
//   margin: 5px;
//   box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);

//   transition: all 0.2s ease 0s;
//   :hover {
//     background-color: ${HOVERCOLOR};
//     color: ${(props) => (props.selected ? "white" : "white")}; // "rgb(69, 69, 69)")};
//     cursor: pointer;
//   }
// `;

export const Title: React.FC<{ children: any }> = ({ children }) => <h3 className="uppercase text-xl font-bold mx-1">{children}</h3>;
