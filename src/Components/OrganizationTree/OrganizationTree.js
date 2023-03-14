import React, {useEffect, useRef, useState} from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/org-chart.json";
import { useCenteredTree } from "./helpers";
// import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import "./styles.css";
import { styled, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import editIcon from "../../Assets/editIcon.png";
import addEmployeePlus from "../../Assets/addEmployeePlus.png";
import AddEmployee from "../AddEmployee";
import sidebarIcon from "../../Assets/sidebarIcon.png";
import ChartSidebar from "./ChartSidebar";
import axios from "axios";
const containerStyles = {
  width: "100vw",
  height: "100vh",
  background: "#eee",
};

const CustomButton1 = styled(Button)({
  position: "relative",
  width: "350px",
  height: "150px",
  background: "white",
  color: "black",
  display: "flex",
  flexDirection: "column",
  border: "2px solid black",
  borderRadius: "20px",
  alignItems: "center",
  // paddingRight: "0px",
  "&:hover": {
    background: "white",
  },
});

const CustomButton2 = styled(Button)({
  position: "relative",
  width: "350px",
  height: "150px",
  background: "white",
  color: "black",
  display: "flex",
  flexDirection: "column",
  border: "1.5px dashed #7E3AF2",
  borderRadius: "20px",
  alignItems: "center",

  // paddingRight: "0px",
  "&:hover": {
    background: "white",
  },
});

const CustomEdit = styled(IconButton)({
  position: "absolute",
  top: "0px",
  right: "0px",
  color: "#4BA083",
});

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.
const renderForeignObjectNode1 = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addEmpRef,
    updateEmpRef,
    newEmployee,
    setNewEmployee,
    clickedEmployee,
    setClickedEmployee,
}) => (
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        className="w-[100%] z-20 h-full flex flex-col items-center justify-center"
        onMouseEnter={(e) => {
          //select element with id=nodeDatum.attributes?.id
          // console.log(document.getElementById(`plusButton_${nodeDatum.attributes?.id.toString()}`), ' is the element');
            if(nodeDatum?.parentId){
                document.getElementById(
                    `plusButton_${nodeDatum.attributes?.id * 3}`
                ).style.display = "block";
            }
          document.getElementById(
            `plusButton_${nodeDatum.attributes?.id * 3 + 1}`
          ).style.display = "block";
            if(nodeDatum?.parentId){
                document.getElementById(
                    `plusButton_${nodeDatum.attributes?.id * 3 + 2}`
                ).style.display = "block";
            }
          //remove space from id

          // console.log(`#plusButton-${nodeDatum.attributes?.id.toString()}`, 'is the id');
          // console.log('hi')
          // document.querySelector('.plus-button').style.display = "block";
        }}
        onMouseLeave={(e) => {
          document.getElementById(
            `plusButton_${nodeDatum.attributes?.id * 3}`
          ).style.display = "none";
          document.getElementById(
            `plusButton_${nodeDatum.attributes?.id * 3 + 1}`
          ).style.display = "none";
          document.getElementById(
            `plusButton_${nodeDatum.attributes?.id * 3 + 2}`
          ).style.display = "none";
          // console.log(`#plusButton-${nodeDatum.attributes?.id[1]}`, 'is the id');
          // document.querySelector('.plus-button').style.display = "none";
        }}
      >

        <AddCircleOutlineIcon
            sx={{
                color: "#7E3AF2",
            }}
          style={{
            display: "none",
            zIndex: 20,
          }}
          id={`plusButton_${nodeDatum.attributes?.id * 3}`}
          className="z-30 absolute top-[7rem] right-[1rem]"
          onClick={(e) => {
            e.stopPropagation();
            // console.log(e.target.id, " is the id");
            addEmpRef.current.classList.remove("hidden");
            addEmpRef.current.classList.add("block");
            setNewEmployee({
                ...newEmployee,
                reporting_manager: nodeDatum.attributes?.parentId,
            })
            // console.log("Add new node", nodeDatum.attributes.id);
          }}
        />
        <AddCircleOutlineIcon
            sx={{
                color: "#7E3AF2",
            }}
          style={{
            display: "none",
          }}
          id={`plusButton_${nodeDatum.attributes?.id * 3 + 1}`}
          className="absolute bottom-[1rem] right-[13rem]"
          onClick={(e) => {
            e.stopPropagation();
            addEmpRef.current.classList.remove("hidden");
            addEmpRef.current.classList.add("block");
            // console.log("Add new node", nodeDatum.attributes.id);
              setNewEmployee({
                ...newEmployee,
                reporting_manager: nodeDatum.attributes?.id,
            })
          }}
        />
        <AddCircleOutlineIcon
            sx={{
                color: "#7E3AF2",
            }}
          style={{
            display: "none",
          }}
          id={`plusButton_${nodeDatum.attributes?.id * 3 + 2}`}
          className="absolute top-[7rem] left-[1rem]"
          onClick={(e) => {
            e.stopPropagation();
            addEmpRef.current.classList.remove("hidden");
            setNewEmployee({
                ...newEmployee,
                reporting_manager: nodeDatum.attributes?.parentId,
            })
              addEmpRef.current.classList.add("block");
            // console.log("Add new node", nodeDatum.attributes.id);
          }}
        />
        <CustomButton1
          variant="contained"
          onClick={nodeDatum.children ? toggleNode : undefined}
        >
          <div className="w-full flex items-center">
            <div className="w-5/12 flex justify-center items-center">
              <img
                src={nodeDatum.attributes['avatar']}
                className="rounded-full w-full"
              />
            </div>
            <div className=" flex flex-col items-start pl-5 pr-0 border-r-2  border-[#E5E7EB]">
              <div className="text-lg text-left">{nodeDatum['first-name'] + " " + nodeDatum['last-name']}</div>
              {nodeDatum.attributes['designation'] && (
                <div>{nodeDatum.attributes['designation']}</div>
              )}
            </div>
            <IconButton
              style={{
                width: "3rem",
                height: "3rem",
                padding: "0",
                marginLeft: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                updateEmpRef.current.classList.remove("hidden");
                updateEmpRef.current.classList.add("block");
                setClickedEmployee(nodeDatum.attributes?.id);
                console.log(nodeDatum.attributes?.id, " is the id");
                // console.log(nodeDatum.attributes?.avatar.slice(1, -1), " is the avatar");
                console.log(nodeDatum, " is the node")
                // console.log("Edit node", nodeDatum.attributes.id);
              }}
            >
              <img
                src={editIcon}
                className="w-full flex p-0 justify-center items-center"
              />
            </IconButton>
          </div>
        </CustomButton1>
      </div>
    </foreignObject>
  </>
);
const renderForeignObjectNode2 = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  addEmpRef,
    updateEmpRef,
    newEmployee,
    setNewEmployee,
    clickedEmployee,
    setClickedEmployee,
}) => (
  <>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        className="w-[100%] z-20 h-full flex flex-col items-center justify-center"
        onMouseEnter={(e) => {
          //select element with id=nodeDatum.attributes?.id
          // console.log(document.getElementById(`plusButton_${nodeDatum.attributes?.id.toString()}`), ' is the element');
          document.getElementById(
            `plusButton_1`
          ).style.display = "block";
          document.getElementById(
            `plusButton_2`
          ).style.display = "block";
          document.getElementById(
            `plusButton_3`
          ).style.display = "block";
          //remove space from id

          // console.log(`#plusButton-${nodeDatum.attributes?.id.toString()}`, 'is the id');
          // console.log('hi')
          // document.querySelector('.plus-button').style.display = "block";
        }}
        onMouseLeave={(e) => {
          document.getElementById(
            `plusButton_1`
          ).style.display = "none";
          document.getElementById(
            `plusButton_2`
          ).style.display = "none";
          document.getElementById(
            `plusButton_3`
          ).style.display = "none";
          // console.log(`#plusButton-${nodeDatum.attributes?.id[1]}`, 'is the id');
          // document.querySelector('.plus-button').style.display = "none";
        }}
      >

        <AddCircleOutlineIcon
          style={{
            display: "none",
            zIndex: 20,
          }}
          id={`plusButton_1`}
          className="z-30 absolute top-[7rem] right-[1rem]"
          onClick={(e) => {
            e.stopPropagation();
            // console.log(e.target.id, " is the id");
            addEmpRef.current.classList.remove("hidden");
            addEmpRef.current.classList.add("block");
            // console.log("Add new node", nodeDatum.attributes.id);
          }}
        />
        <AddCircleOutlineIcon
          style={{
            display: "none",
          }}
          id={`plusButton_2`}
          className="absolute bottom-[1rem] right-[13rem]"
          onClick={(e) => {
            e.stopPropagation();
            addEmpRef.current.classList.remove("hidden");
            addEmpRef.current.classList.add("block");
            // console.log("Add new node", nodeDatum.attributes.id);
          }}
        />
        <AddCircleOutlineIcon
          style={{
            display: "none",

          }}
          id={`plusButton_3`}
          className="absolute top-[7rem] left-[1rem]"
          onClick={(e) => {
            e.stopPropagation();
            addEmpRef.current.classList.remove("hidden");
            addEmpRef.current.classList.add("block");
            // console.log("Add new node", nodeDatum.attributes.id);
          }}
        />
        <CustomButton2
          variant="contained"
          onClick={nodeDatum.children ? toggleNode : undefined}
        >
            <div className="w-full flex justify-center items-center">
                <div className='w-10 z-10' onClick={
                    (e) => {
                        e.stopPropagation();
                        // console.log(e.target.id, " is the id");
                        addEmpRef.current.classList.remove("hidden");
                        addEmpRef.current.classList.add("block");
                        setNewEmployee({
                            ...newEmployee,
                            reportingManager: null,
                        })
                        // console.log("Add new node", nodeDatum.attributes.id);
                    }
                }>
                  <img src={addEmployeePlus} className="w-full" />
                </div>
                <p className='text-lg mb-0 font-InM normal-case text-[#1F2A37] ml-2'>Add an Employee</p>
            </div>
        </CustomButton2>
      </div>
    </foreignObject>
  </>
);
export default function OrganizationTree({ addEmpRef, updateEmpRef, newEmployee, setNewEmployee, treeData, clickedEmployee, setClickedEmployee}) {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 450, y: 250 };
  const separation = { siblings: 1.25, nonSiblings: 1.5 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -230,
    y: -125,
  };
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const [chartData, setChartData] = useState(null);
    const chartContainerRef = React.createRef();
    const getChartData = () => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/chart/organizations/getEmployees/'+'1').then(res => {
            console.log(res.data)
            setChartData(res.data[0])
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getChartData();
    }, [])
    console.log(treeData, ' is the tree data')
    console.log(chartData, ' is the chart data')
  return (
    <div style={containerStyles} ref={containerRef} className="z-0 h-full">
        <div className='absolute top-6 left-8 z-10' >
            <img src={sidebarIcon} className='w-16 cursor-pointer' alt='sidebar icon' onClick={toggleSidebar}/>
        </div>
        <div className={`sidebar z-20 ${isOpen ? 'open' : ''} `}>
            <ChartSidebar setIsOpen={setIsOpen} chartReference={chartContainerRef} />
        </div>
        <div className={`w-full h-full`} ref={chartContainerRef}>
      <Tree
        data={(treeData!==null) ? treeData : ((chartData!==null) ? chartData : orgChartJson)}
        translate={translate}
        nodeSize={nodeSize}
        separation={separation}
        enableLegacyTransition={true}
        transitionDuration="5000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(rd3tProps) =>( (treeData!==null || chartData!==null) ?
          renderForeignObjectNode1({
            ...rd3tProps,
            foreignObjectProps,
            addEmpRef,
            updateEmpRef,
            newEmployee,
            setNewEmployee,
              clickedEmployee,
                setClickedEmployee
          }) :
            renderForeignObjectNode2({
                ...rd3tProps,
                foreignObjectProps,
                addEmpRef,
            updateEmpRef,
            newEmployee,
            setNewEmployee,
              clickedEmployee,
                setClickedEmployee
            })
        )
        }
        orientation="vertical"
        // shouldCollapseNeighborNodes={true}
        onNodeMouseOver={(node) => {
          console.log("node");
        }}
      />
        </div>
    </div>
  );
}
