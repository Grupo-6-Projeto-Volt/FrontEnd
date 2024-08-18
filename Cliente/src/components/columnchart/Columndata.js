import { listarChamadosCanceladosConcluido } from "../../model/DashDadosgraficos";
import { useState,useEffect} from "react";

const labels = [];
let dadosCancelados = [];
let dadosConcluidos = [];

export function ObterDadosChamadosGrafico(){
  let [chamadosConcluidos,setChamadosConcluidos] = useState([]);
  let [chamadosCancelados,setChamadosCancelados] = useState([]);

  useEffect(() => {
    async function obterChamadosCanceladosConcluidos() {
      try {
        let resposta = await listarChamadosCanceladosConcluido();
        SepararDadosParaGrafico(resposta);
      } catch (e) {
        console.log(e);
      }
    }

    obterChamadosCanceladosConcluidos();
  }, []);

  function SepararDadosParaGrafico(resposta){
      const vetorChamadosConcluidos = [];
      const vetorChamadosCancelados = [];

      if(resposta){
        resposta.forEach(element => {
              if(element.status === 2){
                vetorChamadosConcluidos.push(element)
              }else if(element.status === 1 ){
                 vetorChamadosCancelados.push(element)
              }
        });
      }
      setChamadosCancelados(vetorChamadosCancelados);
      setChamadosConcluidos(vetorChamadosConcluidos);  
       
      formatarDadosParaGrafico(vetorChamadosConcluidos,vetorChamadosCancelados)
  }

  function formatarDadosParaGrafico(vetorConcluidos, vetorCancelados){
      const adicionarDataFormatada = (element) => {
        if (element.dia < 10) {
          var dataFormatada = `0${element.dia}/${element.mes}`;
        }else{
          var dataFormatada = `${element.dia}/${element.mes}`;
        }
        if(labels.length < 4){
          labels.push(dataFormatada);
        }
      };
      vetorCancelados.forEach(adicionarDataFormatada);
      vetorConcluidos.forEach(adicionarDataFormatada);  
      adicionarDadosGrafico(vetorConcluidos,vetorCancelados)  
  }

  function adicionarDadosGrafico(vetorConcluidos,vetorCancelados){
      const popularVetor = (element) =>{
        if(element.status == 2){
          dadosConcluidos.push(element.quantidade);
        }else if(element.status == 1){
          dadosCancelados.push(element.quantidade)
        }
      }

    vetorConcluidos.forEach(popularVetor)
    vetorCancelados.forEach(popularVetor)
  } 

  
}

export const column_data = {
  labels,
  datasets: [
    {
      label: 'Cancelado',
      data: dadosCancelados,
      backgroundColor: '#F94144',
      stack: 'Stack 0',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.25
    },
    {
      label: 'Concluído',
      data: dadosConcluidos,
      backgroundColor: '#90BE6D',
      stack: 'Stack 1',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.25
    },
  ],
};

export const column_options = {
    plugins: {
        legend: {
            position: 'bottom',
            align: 'start',
            labels:{
                usePointStyle: true,
                padding: 15,
            }
          },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        display: true
      },
    },
  };
  