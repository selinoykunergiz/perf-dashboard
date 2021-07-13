import React, { useState, useEffect, useLayoutEffect } from "react";
import Chart from "./components/chart/chart";
import Heading from "./components/header/header";
import { dataService } from "./services/data.service";
import Calendar from "./components/calendar/calendar";
import "./App.scss";

function App() {

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    global.PerfAnalytics.__init();
    getMinuteData();
  }, []);

  async function getMinuteData() {
    const min = await dataService.getByMin(30);
    setFetchedData(min);
  }

  async function getSelectedDates(startDate, endDate) {
    const date = await dataService.getByDate(startDate, endDate);
    setFetchedData(date);
  }

  const chartTypes = ['ttfb', 'fcp', 'domLoad', 'windowLoad', 'networkTiming'];
  const chartTypesMarkup = chartTypes.map((type, i) => {
    let timings = [],
        dates = [];
    fetchedData.map((x) => { timings.push(x[type]); dates.push(x['createdAt']) });
    return <div key={i}><Chart message={type} data={timings} date={dates} /></div>
  });

  return (
    <div className="app">
      <Heading />
      <Calendar onSubmit={getSelectedDates} />
      <div className="app-chart">
        {chartTypesMarkup}
      </div>
    </div>
  );
}

export default App;
