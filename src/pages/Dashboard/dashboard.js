import React, { useState, useEffect } from "react";
import Chart from "../../components/chart/chart";
import Heading from "../../components/header/header";
import { dataService } from "../../services/data.service";
import Calendar from "../../components/calendar/calendar";
import "./dashboard.scss";

function Dashboard() {

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    getMinuteData();
  }, []);

  async function postPageTimings() {
    global.PerfAnalytics.__init();
  }

  async function getMinuteData() {
    const min = await dataService.getByMin(30);
    setFetchedData(min);
    postPageTimings();
  }

  async function getSelectedDates(startDate, endDate) {
    const date = await dataService.getByDate(startDate, endDate);
    setFetchedData(date);
    postPageTimings();
  }

  const chartTypes = ['ttfb', 'fcp', 'domLoad', 'windowLoad', 'networkTiming'];
  const chartTypesMarkup = chartTypes.map((type, i) => {
    let timings = [],
        dates = [];
    fetchedData.map((x) => { timings.push(x[type]); dates.push(x['createdAt']); return true; });
    return <div key={i}><Chart message={type} data={timings} date={dates} /></div>
  });

  return (
    <div className="dashboard">
      <Heading />
      <Calendar onSubmit={getSelectedDates} />
      <div className="dashboard-chart">
        {chartTypesMarkup}
      </div>
    </div>
  );
}

export default Dashboard;
