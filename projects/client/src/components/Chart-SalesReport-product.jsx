import "../css/indexR.css"
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { Flex } from "@chakra-ui/layout";
Chart.register(...registerables);

export default function ChartSalesReportProduct(props) {
const windowWidth = window.innerWidth
   // chart awal ===================================================================================
const prepareChartData = () => {
    const dateCountMap = {};
    const dateRevenueMap = {};
  
    props.dtSumQtyProd.forEach((item) => {
      const name = item.Stock.Product.product_name;
      if (dateCountMap[name]) {
        dateCountMap[name]++;
        dateRevenueMap[name] += item.total_qty;
      } else {
        dateCountMap[name] = 1;
        dateRevenueMap[name] = item.total_qty;
      }
    });
  
    console.log(dateCountMap);
    console.log(dateRevenueMap);
    const dates = Object.keys(dateCountMap);
    const revenues = Object.values(dateRevenueMap);
    const labels = dates.map(date =>
       `${date} (${dateRevenueMap[date]} Terjual)`);
  
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
          label: "Penjualan",
          data: chartData.revenues,
          backgroundColor: "rgba(115, 214, 115)", // Warna latar belakang
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