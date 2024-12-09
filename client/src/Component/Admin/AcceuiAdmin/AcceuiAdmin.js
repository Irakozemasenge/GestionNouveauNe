import React, { Component, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
import Footer from '../../Visiteur/FootentContent/Footer';
import CountUp from 'react-countup';

function AcceuiAdmin() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 530)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 430)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 374)
    const [loadings, Setloadings] = useState(true);
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 530)
            SetMobile2(window.innerWidth < 430)
            SetMobile3(window.innerWidth < 374)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [dataResume, setDataResume] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8005/stat/dataResume").then((rep) => {
            setDataResume(rep.data)
            Setloadings(false)
        }).catch((err) => {
            console.log(err.message)
            Setloadings(false)
        })
    }, [])


    return (
        <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[92vh]' : 'h-[87vh]'}`}>
            {loadings && <SpinnerDemarage />}
            <div className='md:text-[40px] sm:text-[30px] strockText mb-5 p-2'>Tableau de bord</div>
            <div className={`flex ${mobile ? 'flex-col' : ''}`}>
                <div className={` flex justify-around ${mobile ? 'w-full' : mobile2 ? 'flex-col w-1/2 ' : 'w-1/2 '}`}>
                    <div className='w-full h-[10em] shadow-2xl border flex flex-col items-center justify-center m-2 rounded-md '>
                        <div className=' text-[#0000ff8c]'>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` flex-shrink-0 w-[3em]  h-[3em]  transition duration-75`} viewBox="0 0 16 16">
                                <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                            </svg>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-[30px]`}> <CountUp start={0} end={dataResume.nombresclient} duration={2} separator="," />  </div>
                        </div>
                        <div className={`font-serif text-gray-400  ${mobile2 ? 'text-[13px] ' : 'text-[15px] '}`}>Client</div>
                    </div>




                    <div className='w-full h-[10em] shadow-2xl border flex flex-col items-center justify-center m-2 rounded-md '>
                        <div className=' text-fuchsia-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` flex-shrink-0 w-[3em]  h-[3em]  transition duration-75`} viewBox="0 0 16 16">
                                <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
                                <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
                            </svg>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-[30px]`}> <CountUp start={0} end={dataResume.nombrestache} duration={2} separator="," />  </div>
                        </div>
                        <div className={`font-serif text-gray-400  ${mobile2 ? 'text-[13px] ' : 'text-[15px] '}`}>Taches</div>
                    </div>
                </div>

                <div className={` flex justify-around ${mobile ? 'w-full' : mobile2 ? 'flex-col w-1/2' : 'w-1/2'}`}>
                    <div className='w-full h-[10em] shadow-2xl border flex flex-col items-center justify-center m-2 rounded-md '>
                        <div className=' text-green-600 -rotate-[45deg]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` flex-shrink-0 w-[3em]  h-[3em]  transition duration-75`} viewBox="0 0 16 16">
                                <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06" />
                            </svg>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-[30px]`}> <CountUp start={0} end={dataResume.nombrespublicite} duration={2} separator="," />  </div>
                        </div>
                        <div className={`font-serif text-gray-400  ${mobile2 ? 'text-[13px] ' : 'text-[15px] '}`}>Publicite</div>
                    </div>





                    <div className='w-full  h-[10em] shadow-2xl border flex flex-col items-center justify-center m-2 rounded-md '>
                        <div className=' text-yellow-600 '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` flex-shrink-0 w-[3em]  h-[3em]  transition duration-75`} viewBox="0 0 16 16">
                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-[30px]`}> <CountUp start={0} end={dataResume.nombresmessage} duration={2} separator="," />  </div>
                        </div>
                        <div className={`font-serif text-gray-400  ${mobile2 ? 'text-[13px] ' : 'text-[15px] '}`}>Message</div>
                    </div>





                    <div className='w-full h-[10em]  shadow-2xl border flex flex-col items-center justify-center m-2 rounded-md '>
                        <div className=' text-[#62f844] '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={` flex-shrink-0 w-[3em]  h-[3em]  transition duration-75`} viewBox="0 0 16 16">
                                <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                                <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103" />
                            </svg>
                        </div>
                        <div className='flex justify-between'>
                            <div className={`text-[30px]`}> <CountUp start={0} end={dataResume.nombrecontrat} duration={2} separator="," />  </div>
                        </div>
                        <div className={`font-serif text-gray-400  ${mobile2 ? 'text-[13px] ' : 'text-[15px] '}`}>Contrant</div>
                    </div>
                </div>
            </div>

            <div className="w-[97%] p-2 m-1 border rounded-xl">
                <div className={`w-[97%] h-full flex justify-center`}>
                    <ApexChart donnees={dataResume} mobile3={mobile3} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AcceuiAdmin




class ApexChart extends Component {
    constructor(props) {
        super(props);
        const { mobile3 } = this.props;
        this.state = {
            series: [],
            options: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ['#ffffff']
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: mobile3 ? 20 : 50,
                        endingShape: 'rounded',
                        borderRadius: 4,
                        borderRadiusApplication: 'end',
                        dataLabels: {
                            position: 'top'
                        }
                    }
                },
                stroke: {
                    curve: 'smooth',
                    colors: ['#ffa500']
                },
                title: {
                    text: 'Résumé général',
                    align: 'left',
                },
                labels: ["Client", "Taches", "Publicite", "Message", "Contrant"],

                yaxis: {
                    opposite: false
                },
                legend: {
                    horizontalAlign: 'left'
                }
            }
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.donnees !== this.props.donnees) {
            this.updateChartData();
        }
    }

    updateChartData = () => {
        const { donnees } = this.props;

        const seriesData = [
            (donnees && donnees.nombresclient) || 0,
            (donnees && donnees.nombrestache) || 0,
            (donnees && donnees.nombrespublicite) || 0,
            (donnees && donnees.nombresmessage) || 0,
            (donnees && donnees.nombrecontrat) || 0
        ];


        this.setState({
            series: [
                {
                    name: "Egale au nombre",
                    data: seriesData,
                    color: '#5dca32'
                }
            ]
        });
    };

    render() {
        const { series, options } = this.state;

        return (
            <div className="w-[97%]">
                <ReactApexChart options={options} series={series} type="bar" height={500} />
            </div>
        );
    }
}



// class ApexChart extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             series: [{
//                 data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
//                 color: '#5dca32'
//             }],
//             options: {
//                 chart: {
//                     type: 'bar',
//                     height: 350,
//                     toolbar: {
//                         show: true
//                     }
//                 },
// plotOptions: {
//     bar: {
//         horizontal: false,
//         columnWidth: 30,
//         endingShape: 'rounded',
//          borderRadius: 4,
//         borderRadiusApplication: 'end',
//     }
// },
//                 dataLabels: {
//                     enabled: true,
//                     formatter: function (val) {
//                         return val.toLocaleString();
//                     }
//                 },
//                 xaxis: {
//                     categories: ['Germany', 'China', 'United States', 'Japan', 'France', 'Italy', 'Netherlands', 'United Kingdom', 'Canada', 'South Korea'],
//                 },
//                 grid: {
//                     xaxis: {
//                         lines: {
//                             show: true
//                         }
//                     },
//                     yaxis: {
//                         lines: {
//                             show: true
//                         }
//                     }
//                 },
//                 colors: ['#5dca32']
//             }
//         };
//     }

//     render() {
//         return (
//             <div className='w-[90%] mt-10'>
//                 <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={500} />
//             </div>
//         );
//     }
// }



// {
//     "nombresclient": 2,
//     "nombrecontrat": 2,
//     "nombresmessage": 8,
//     "nombrespublicite": 2,
//     "nombresservice": 5,
//     "nombrestache": 4
//   }
//   Calcul des pourcentages :

//   Nombre de clients:
//   Pourcentage = (2 / 23) * 100 = 8.70%
//   Nombre de contrats:
//   Pourcentage = (2 / 23) * 100 = 8.70%
//   Nombre de messages:
//   Pourcentage = (8 / 23) * 100 = 34.78%
//   Nombre de publicités:
//   Pourcentage = (2 / 23) * 100 = 8.70%
//   Nombre de services:
//   Pourcentage = (5 / 23) * 100 = 21.74%
//   Nombre de tâches:
//   Pourcentage = (4 / 23) * 100 = 17.39%
//   Donc, voici les pourcentages de chaque élément :

//   Nombre de clients : 8.70%
//   Nombre de contrats : 8.70%
//   Nombre de messages : 34.78%
//   Nombre de publicités : 8.70%
//   Nombre de services : 21.74%
//   Nombre de tâches : 17.39%


