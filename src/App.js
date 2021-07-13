import React, { useState, useEffect } from "react";
import Chart from "./components/chart/chart";
import Heading from "./components/header/header";
import { dataService } from "./services/data.service";
import Calendar from "./components/calendar/calendar";
import "./App.scss";

function App() {
  const [ttfb, setTtfb] = React.useState([]);
  const [fcp, setFcp] = React.useState([]);
  const [domLoad, setDomLoad] = React.useState([]);
  const [windowLoad, setWindowLoad] = React.useState([]);
  // const [startDateA, setStartDate] = React.useState([]);
  // const [endDateA, setEndDate] = React.useState([]);

  React.useEffect(() => {
    async function fetchChart() {
      const fullResponse = await dataService.getByMin(30);
      const ttfb = fullResponse.map((x) => x.ttfb);
      setTtfb(ttfb);
      const fcp = fullResponse.map((x) => x.fcp);
      setFcp(fcp);
      const domLoad = fullResponse.map((x) => x.domLoad);
      setDomLoad(domLoad);
      const windowLoad = fullResponse.map((x) => x.windowLoad);
      setWindowLoad(windowLoad);
    }

    fetchChart();
  }, []);

  async function onSubmit(startDate, endDate) {
    const dateData = await dataService.getByDate(startDate, endDate);
    const ttfb = dateData.map((x) => x.ttfb);
    setTtfb(ttfb);
    const fcp = dateData.map((x) => x.fcp);
    setFcp(fcp);
    const domLoad = dateData.map((x) => x.domLoad);
    setDomLoad(domLoad);
    const windowLoad = dateData.map((x) => x.windowLoad);
    setWindowLoad(windowLoad);
  }

  return (
    <div className="app">
      <Heading />
      <Calendar onSubmit={onSubmit} />
      <div className="app-chart">
        <div>
          <Chart message="ttfb" data={ttfb} />
        </div>
        <div>
          <Chart message="fcp" data={fcp} />
        </div>
        <div>
          <Chart message="domLoad" data={domLoad} />
        </div>
        <div>
          <Chart message="windowLoad" data={windowLoad} />
        </div>
      </div>
    </div>
  );
}

export default App;
