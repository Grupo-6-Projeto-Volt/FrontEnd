export const bar_options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'start',
        labels:{
           usePointStyle: true,
                padding: 15,
        }
      }
    },
  };
  
  const labels = ['Celulares', 'Acessórios', 'Computadores']
  
  export const bar_data = {
    labels,
    datasets: [
      {
        data: [1400,2000,300],
        borderColor: ['#5A6ACF','#8593ED','#C7CEFF' ],
        backgroundColor: ['#5A6ACF','#8593ED','#C7CEFF'],
      },
    //   {
    //     label: 'Dataset 2',
    //     data: [60,70,80,90,100,120],
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    ],
  };