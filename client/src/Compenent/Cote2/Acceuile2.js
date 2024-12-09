/* eslint-disable use-isnan */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
function Acceuile2() {

    return (
        <div className='flex w-full p-2  h-[90vh] overflow-x-hidden overflow-y-auto  flex-col'>
            <div className='text-[40px]  font-serif'>Bienvenu</div>
            <div className='w-full flex-wrap flex justify-around'>
                <div className='border border-[#5dca32] m-2 w-[10em] h-[8em]  p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule" viewBox="0 0 16 16">
                                <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
                            </svg>
                        </div>
                        <div>
                            Médicaments
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>31</div>
                        <div className='text-[15px] text-[#5dca32]'>60.02%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>
                        <div></div>
                    </div>
                </div>
                <div className='border border-[#5dca32] m-2 w-[10em] h-[8em]  p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                            </svg>
                        </div>
                        <div>
                            Personnes
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>40</div>
                        <div className='text-[15px] text-[#5dca32]'>30.01%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>
                        <div>500</div>
                    </div>
                </div>


                <div className='border border-[#5dca32] m-2 w-[10em] h-[8em]  p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-diagram-3" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                            </svg>
                        </div>
                        <div>
                            Enfants
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>28</div>
                        <div className='text-[15px] text-[#5dca32]'>2.25%</div>
                    </div>

                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>
                        <div>500</div>
                    </div>
                </div>

                <div className='border border-[#5dca32] m-2 w-[14em] h-[8em]  p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capsule-pill" viewBox="0 0 16 16">
                                <path d="M11.02 5.364a3 3 0 0 0-4.242-4.243L1.121 6.778a3 3 0 1 0 4.243 4.243l5.657-5.657Zm-6.413-.657 2.878-2.879a2 2 0 1 1 2.829 2.829L7.435 7.536zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8m-.5 1.042a3 3 0 0 0 0 5.917zm1 5.917a3 3 0 0 0 0-5.917z" />
                            </svg>
                        </div>
                        <div>
                            Médicaments usage
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>100</div>
                        <div className='text-[15px] text-[#5dca32]'>81.07%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>

                        <div>500 </div>
                    </div>
                </div>





                <div className='border border-[#5dca32] m-2 w-[10em] p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                            </svg>
                        </div>
                        <div>
                            Consultations
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>51</div>
                        <div className='text-[15px] text-[#5dca32]'>81.07%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>

                        <div>500 </div>
                    </div>
                </div>


                <div className='border border-[#5dca32] m-2 w-[10em] p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-screwdriver" viewBox="0 0 16 16">
                                <path d="M0 .995.995 0l3.064 2.19a1 1 0 0 1 .417.809v.07c0 .264.105.517.291.704l5.677 5.676.909-.303a1 1 0 0 1 1.018.24l3.338 3.339a.995.995 0 0 1 0 1.406L14.13 15.71a.995.995 0 0 1-1.406 0l-3.337-3.34a1 1 0 0 1-.24-1.018l.302-.909-5.676-5.677a1 1 0 0 0-.704-.291H3a1 1 0 0 1-.81-.417zm11.293 9.595a.497.497 0 1 0-.703.703l2.984 2.984a.497.497 0 0 0 .703-.703z" />
                            </svg>
                        </div>
                        <div>
                            Vaccinations
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>42</div>
                        <div className='text-[15px] text-[#5dca32]'>81.07%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>

                        <div>500 </div>
                    </div>
                </div>

                <div className='border border-[#5dca32] m-2 w-[14em] p-2 rounded-md'>
                    <div className='flex m-1 w-full justify-between'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ol" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5" />
                                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z" />
                            </svg>
                        </div>
                        <div>
                            Enfants hospitalisées
                        </div>
                    </div>
                    <div className='flex w-full   justify-between'>
                        <div className='text-[30px] text-[#5dca32]'>109</div>
                        <div className='text-[15px] text-[#5dca32]'>81.07%</div>
                    </div>
                    <div className='flex m-1 w-full justify-between'>
                        <div className='text-[#5dca32]'>Total</div>

                        <div>500 </div>
                    </div>
                </div>

                <div className="w-[97%] p-2 m-1 border rounded-xl">
                    <div className={`w-[97%] h-full flex justify-center`}>
                        <ApexChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Acceuile2



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
                labels: ["Médicaments", "Personnes", "Enfants", "Médicaments usage", "Consultations", "Vaccinations", "Enfants hospitalisées"],
                yaxis: {
                    opposite: false
                },
                legend: {
                    horizontalAlign: 'left'
                }
            }
        };
    }

    componentDidMount() {
        this.updateChartData();
    }

    updateChartData = () => {
        const seriesData = [31, 40, 28, 100, 51, 42, 109];

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
