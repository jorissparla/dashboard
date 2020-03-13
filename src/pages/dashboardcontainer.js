import { UserContext } from 'globalState/UserProvider';
import React, { useEffect, useState } from 'react';
import PriorityDashboard from 'stats/PriorityDashboard';
import Anniversaries from '../awards/Anniversaries';
import DynamicImport from '../DynamicImport';
import CloudSuites from './CloudSuites';
import CourseDashboard from './CourseDashboard';
// import FeedbackList from './feedbackList';
import CourseList from './CourseList';
import { Surveys } from './Surveys';

// const CourseDash
const DashBoardStats = DynamicImport(() => import('./DashBoardStatsNew'));
const GoLives = DynamicImport(() => import('./goLiveListNew'));
const SupportCards = DynamicImport(() => import('./SupportCards'));
const HistoryDayAll = DynamicImport(() => import('../charts/historydayallcontainer'));
const NewsPage = DynamicImport(() => import('./newspage'));
// const CourseList = DynamicImport(() => import('./CourseList'))

const DashBoardContainer = props => {
  const region = props.region || 'EMEA';
  const { user } = React.useContext(UserContext);
  const components = [
    <CloudSuites user={user} />,
    <PriorityDashboard user={user} />,
    <CourseDashboard start="scheduled" user={user} />,
    <NewsPage region={region} />,
    <GoLives region={region} />,
    <DashBoardStats data1={['Logistics']} team="Logistics" region={region} />,
    <DashBoardStats data1={['Logistics']} team="Logistics" region={region} />,
    <DashBoardStats data1={['Finance']} team="Finance" region={region} />,
    <DashBoardStats data1={['Tools']} team="Tools" region={region} />,
    <HistoryDayAll region={region} />,
    <CourseList />,
    <Surveys />,
    // <KudoList />,
    // <DashBoard region={region} />,

    <SupportCards region={region} />,
    // <FeedbackList />,
    <Anniversaries />
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timerHandle = setInterval(() => {
      if (current < components.length - 1) {
        setCurrent(current + 1);
      } else {
        setCurrent(0);
      }
    }, 60000);
    return () => {
      clearInterval(timerHandle);
    };
  });

  return components[current];
};

export default DashBoardContainer;
