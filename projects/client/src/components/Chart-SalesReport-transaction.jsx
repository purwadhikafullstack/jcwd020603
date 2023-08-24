import "../css/indexR.css"
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Flex } from "@chakra-ui/layout";
Chart.register(...registerables);

export default function ChartSalesReportTransactions(props) {
const windowWidth = window.innerWidth
   // chart awal ===================================================================================
const prepareChartData = () => {
    const dateCountMap = {};
    const dateRevenueMap = {};
  
    props.dtSalesReport.forEach((item) => {
      const date = item.date.split("T")[0];
      if (dateCountMap[date]) {
        dateCountMap[date]++;
        dateRevenueMap[date] += item.total;
      } else {
        dateCountMap[date] = 1;
        dateRevenueMap[date] = item.total;
      }
    });
  
    const dates = Object.keys(dateCountMap);
    const revenues = Object.values(dateRevenueMap);
    const labels = dates.map(date =>
       `${date} (${dateCountMap[date]} transaksi)`);
  
    return {
      labels,
      revenues,
    };
  };
  
  const ChartComponent = () => {
    const chartData = prepareChartData();
    const data = {
      labels: chartData.labels,
      datasets: [
        {
          label: "Pendapatan",
          data: chartData.revenues,
          backgroundColor: "rgba(115, 214, 115  )", // Warna latar belakang
          borderColor: "rgb(115, 214, 115)", // Warna garis
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return (
      <Flex w={windowWidth <= 500 ? "800px" : null} h={windowWidth <= 500 ? "400px" : null}>
      <Bar data={data} options={options} />
      </Flex>
    );
  };
  
  // chart akhir===================================================================================
    
      

    return (
        <>
        <ChartComponent/>
        </>
    )
}