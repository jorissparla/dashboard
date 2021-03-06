import { useQuery } from "@apollo/client";
import clsx from "clsx";
import Button from "elements/TWButton";
import gql from "graphql-tag";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import Spinner from "utils/spinner";
//import { format } from "date-fns";
import { format } from "../utils/format";
import { NoData } from "./NoData";
const colors = ["#BA68C8", "#81D4FA", "#FF7043", "#8BC34A", "#ec407a", "#1da1f2", "#E57373"];

interface IGoLiveItem {
  id: string;
  day?: string;
  month?: string;
  customername: string;
  customerid: string;
  country: string;
  region: string;
  version: string;
  comments: string;
  date: string;
  lastupdated: string;
}

interface IGoLiveItemArray {
  golives: IGoLiveItem[];
}

const UPCOMING_GOLIVES_QUERY = gql`
  query UPCOMING_GOLIVES_QUERY {
    golives {
      id
      customername
      customerid
      country
      region
      version
      comments
      date
      lastupdated
    }
  }
`;

const dayPart = (d: any) => format(d, "dd");
const monthPart = (d: any) => format(d, "MMMM");

const GoLiveItem = ({ item, bg = "#ec407a", index, handleSetActive }: { item: IGoLiveItem; bg?: string; index: number; handleSetActive: any }) => {
  const { id, day, customername, customerid, region, version, comments } = item;
  const nr = index % 3;
  const baseClass = `w-12 h-12 p-2 mt-2 ml-2 flex items-center justify-center text-xl rounded-full shadow-xl col-span-1 row-span-2 `;
  const colorClass = nr === 0 ? `bg-orange-300 text-orange-700` : nr === 1 ? `bg-blue-300 text-blue-700` : `bg-pink-300 text-pink-700`;
  const cls = clsx(baseClass, colorClass);
  return (
    <div
      className="grid grid-cols-11 grid-rows-2  border-b border-gray-200 hover:bg-gray-200 cursor-pointer"
      key={id}
      onClick={() => handleSetActive(item)}
    >
      <div className={cls}>{day}</div>
      <div className="col-span-6 row-span-2">
        <span className="font-semibold text-gray-700">{`${customername.toUpperCase()}`}</span>
        <p className="text-sm overflow-hidden italic text-gray-600">{comments.slice(0, 300) + "..."}</p>
      </div>
      <div className="col-span-1 row-span-2 font-semibold flex items-center justify-center">{`${region}`}</div>
      <div className="col-span-2 row-span-2 flex items-center justify-start text-sm">{version}</div>
      <div className="col-span-1 flex items-center pt-2">
        <Button color="transp" onClick={() => window.open(`http://navigator.infor.com/n/incident_list.asp?ListType=CUSTOMERID&Value=${customerid}`)}>
          Incidents
        </Button>
      </div>
    </div>
  );
};

const GoLivesContainer = () => {
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [golives, setGolives] = useState<IGoLiveItem[] | any[]>([]);
  const [groupedLivesByMonth, SetGroupedLivesByMonth] = useState([]);
  const { data, loading } = useQuery<IGoLiveItemArray>(UPCOMING_GOLIVES_QUERY);
  const { x: fi } = useSpring({
    x: editDialogVisible ? 0 : 100,
  });
  const { x: xsettings } = useSpring({
    x: editDialogVisible ? 0 : 100,
  });
  const editProps = useSpring({ opacity: editDialogVisible ? 1 : 0 });

  useEffect(() => {
    console.log("data", data);
    if (data) {
      setGolives(data.golives);
      const x = goLivesByMonth(data.golives);
      console.log({ x });
      SetGroupedLivesByMonth(x);
    }
  }, [data]);

  if (loading) {
    return <Spinner loadingMessage="fetching data" />;
  }

  const editItem = (item: any) => {
    setActiveEvent(item);
    setEditDialogVisible(true);
  };

  function goLivesByMonth(golives: any) {
    const x: IGoLiveItem[] = [];
    if (golives && golives.length > 0) {
      return _.chain(golives)
        .sortBy((o: any) => Date.parse(o.date))
        .groupBy(function (g: any) {
          return format(g.date, "MMMM");
        })
        .map((o) => _.map(o, (i) => _.merge({ day: dayPart(i.date), month: monthPart(i.date) }, i)))
        .value();
    } else {
      return x;
    }
  }

  console.log({ groupedLivesByMonth });
  if (groupedLivesByMonth.length === 0) {
    return <div>No Data</div>;
  }
  return (
    <div className="bg-white h-screen">
      <div className="w-full text-sm text-gray-500 font-sans ml-2 py-2">
        data was last updated: {format(new Date(parseInt(golives[0].lastupdated)), "EEEE, d MMMM ")}
      </div>
      {groupedLivesByMonth.map((events: IGoLiveItem[], index: string | number | null | undefined) => (
        <div key={index}>
          <div className="flex bg-gray-200 text-lg py-3 pl-6 items-center text-gray-700 font-semibold font-pop shadow-lg">{events[0].month}</div>
          {events.map((item, index) => (
            <GoLiveItem key={index} item={item} bg={colors[index % 6]} index={index} handleSetActive={editItem} />
          ))}
        </div>
      ))}
      {/* {editDialogVisible && (
        <animated.div style={editProps}>
          <div className="inset-x-0 inset-y-2 flex z-50 bg-gray-700  bg-opacity-50 absolute w-2/3 ">
            <EditEventDialogDetails activeEvent={activeEvent} onClose={() => setEditDialogVisible(false)} />
          </div>
        </animated.div> 
      )}*/}
    </div>
  );
};

function EditEventDialogDetails({ activeEvent, onClose }: any) {
  const [values, setValues] = useState(activeEvent);
  if (!activeEvent) {
    return <div>No data</div>;
  }

  const handleChange = (event: any) => {
    event.persist();
    console.log(event.target, values);

    setValues({
      ...values,
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    });
  };
  const { customername, id, comments } = activeEvent;
  return (
    <div className="bg-white  px-4 font-sans right-0 w-2/3 flex h-full fixed z-50 shadow-lg rounded  flex-col mt-12">
      <div className="mt-5 py-4">
        <Button type="submit" color="teal" variant="contained">
          Save Changes
        </Button>
        <Button onClick={onClose} size="small">
          Close
        </Button>
      </div>
      <h1 className="text-2xl font-bold text-blue-500 mb-2">{customername}</h1>
      <div>
        <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
          Version
        </label>
        <input className="form-input w-full" name="version" placeholder="Enter Comments here..." value={values.version} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="pm" className="block text-sm font-medium leading-5 text-gray-700">
          Update Comments
        </label>
        <textarea
          className="form-textarea w-full resize-none"
          placeholder="Enter Comments here..."
          name="comments"
          cols={150}
          rows={20}
          value={values.comments}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default GoLivesContainer;
