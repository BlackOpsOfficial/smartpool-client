﻿(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$rootScope', '$http', '$scope', 'EthminerService','appConstants','$timeout'];

    function DashboardController($location, $rootScope, $http, $scope, EthminerService,appConstants,$timeout) {
        var vm = this;
        vm.roundHashRate = roundHashRate;
        vm.roundShares = roundShares;
        vm.applyShortPeriod = applyShortPeriod;
        vm.applyLongPeriod = applyLongPeriod;
        vm.applyWorker = applyWorker;
        vm.applyOverall = applyOverall;
        vm.applyAdvanceInfo = applyAdvanceInfo;

        vm.showAdvanceInfo = showAdvanceInfo;
        vm.getAnchorPointShort = getAnchorPointShort;
        vm.getAnchorPointLong = getAnchorPointLong;
        vm.convertHashrate = convertHashrate;
        vm.advance = {
            "load": false,
            "flag": true,
        }
        vm.config = {};

        vm.farm = {
            "short_duration": {
                "duration_in_hour": 0,
                "point_number": 1,
                "hash_rate": {
                    "effective_hashrate_avarage": 0,
                    "reported_hashrate_avarage": 0,
                    "effective_hashrate_percent": 0,
                    "chart": [

                    ],
                },
                "shares": {
                    "mined_share_avarage": 0,
                    "valid_share_avarage": 0,
                    "rejected_share_avarage": 0,
                    "chart": [

                    ],
                }
            },
            "long_duration": {
                "duration_in_hour": 0,
                "point_number": 1,
                "hash_rate": {
                    "effective_hashrate_avarage": 0,
                    "reported_hashrate_avarage": 0,
                    "effective_hashrate_percent": 0,
                    "chart": [

                    ],
                },
                "shares": {
                    "mined_share_avarage": 0,
                    "valid_share_avarage": 0,
                    "rejected_share_avarage": 0,
                    "chart": [

                    ],
                },
                "rigs": {
                    "chart": [
                        // ['x', 30, 50, 100, 230, 300, 310],
                        // ['Active Workers', 30, 200, 100, 400, 150, 250],                       
                    ],
                }
            },
            "overall": {
                "effective_hashrate": 0,
                "reported_hashrate": 0,
                "mined_share": 0,
                "valid_share": 0,
                "rejected_share":0,
                "verified_share":0,
                "pending_share":0,
                "valid_share_percent":0,
                "reject_share_percent":0,
                "effective_hashrate_percent": 0,
            },
            "worker": {
                "active_count": 0,
                "worker_list": [
                ]
            }

            //     }
            // "hash_rate": {
            //     "short_duration": {
            //         "effective_hashrate_avarage": 0,
            //         "reported_hashrate_avarage": 0,
            //         "duration_in_hour": 1,
            //         "chart": [
            //             ['x', 30, 50, 100, 230, 300, 310],
            //             ['Reported Hashrate', 30, 200, 100, 400, 150, 250],
            //             ['Effective Hashrate', 50, 20, 10, 40, 15, 25]
            //         ],
            //     },
            //     "long_duration": {
            //         "effective_hashrate_avarage": 0,
            //         "reported_hashrate_avarage": 0,
            //         "duration_in_hour": 1,
            //         "chart": [
            //             ['x', 30, 50, 100, 230, 300, 310],
            //             ['Reported Hashrate', 30, 200, 100, 400, 150, 250],
            //             ['Effective Hashrate', 50, 20, 10, 40, 15, 25]
            //         ],
            //     },
            //     "life_time": {

            //     }
            // },
            // "shares": {
            //     "short_duration": {
            //         "mined_share_avarage": 0,
            //         "valid_share_avarage": 0,
            //         "rejected_share_avarage": 0,
            //         "duration_in_hour": 1,
            //         "chart": [
            //             ['x', 30, 50, 100, 230, 300, 310],
            //             ['Mined shares', 30, 200, 100, 400, 150, 250],
            //             ['Valid shares', 50, 20, 10, 40, 15, 25],
            //             ['Rejected shares', 50, 20, 10, 40, 15, 25]
            //         ],
            //     }
            // }
        };

        // vm.shortHashrateChart = c3.generate({
        //     bindto: '#shortHashChart',
        //     data: {
        //         x: 'x',
        //         columns: vm.farm.short_duration.hash_rate.chart
        //     },
        //     axis: {
        //         x: {
        //             type: 'timeseries',
        //             tick: {
        //                 format: '%Y-%m-%d %H:%M'
        //             },
        //             show: false
        //         },
        //         y: {
        //             label: {
        //                 text: 'Hashrate [MH/s]',
        //                 position: 'outer-middle'
        //             }
        //         }
        //     },
        //     grid: {
        //         y: {
        //             show: true
        //         }
        //     }
        // });
        vm.longHashrateChart = c3.generate({
            bindto: '#longHashChart',
            data: {
                x: 'x',
                columns: vm.farm.long_duration.hash_rate.chart
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d %H:%M'
                    },
                    show: false
                },
                y: {
                    label: {
                        text: 'Hashrate [MH/s]',
                        position: 'outer-middle'
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            }
        });
        // vm.shortSharesChart = c3.generate({
        //     bindto: '#shortSharesChart',
        //     data: {
        //         x: 'x',
        //         columns: vm.farm.short_duration.shares.chart
        //     },
        //     axis: {
        //         x: {
        //             type: 'timeseries',
        //             tick: {
        //                 format: '%Y-%m-%d %H:%M'
        //             },
        //             show: false
        //         },
        //         y: {
        //             label: {
        //                 text: 'Shares',
        //                 position: 'outer-middle'
        //             }
        //         }
        //     },
        //     grid: {
        //         y: {
        //             show: true
        //         }
        //     }
        // });
        vm.longSharesChart = c3.generate({
            bindto: '#longSharesChart',
            data: {
                x: 'x',
                columns: vm.farm.long_duration.shares.chart,
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d %H:%M'
                    },
                    show: false
                },
                y: {
                    label: {
                        text: 'Shares',
                        position: 'outer-middle'
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            },
        });
        vm.longRigChart = c3.generate({
            bindto: '#longRigChart',
            data: {
                x: 'x',
                columns: vm.farm.long_duration.rigs.chart
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d %H:%M'
                    },
                    show: false
                },
                y: {
                    label: {
                        text: 'Active workers',
                        position: 'outer-middle'
                    }
                }
            },
            grid: {
                y: {
                    show: true
                }
            }
        });

        vm.cancelSocker = false;
        $rootScope.$on('$locationChangeSuccess',function(){
            vm.cancelSocker = true;   
        });
        if (window.WebSocket === undefined) {
            console.log("windows is not support websocket");
        } else {
            var socket = new WebSocket("ws://" + $location.$$host + ":" + $location.$$port + "/ws/farm");

            socket.onopen = function() {
                console.log("Socket is open");
                //get info after interval time
                (function refreshData(){
                    if (vm.cancelSocker){
                        return;
                    }
                    console.log("farm");
                     socket.send(JSON.stringify({
                          action: "getFarmInfo"
                        }));
                       //return sendWsMessage;
                     $timeout(refreshData,appConstants.CONST_FRESH_FARM_DATA)
                }());

                // $interval(function sendWsMessage() {
                  
                //   }(), appConstants.CONST_FRESH_FARM_DATA);
            };
            socket.onmessage = function(message) {
                var response = JSON.parse(message.data);
                //reperate data
                //vm.$apply(function() {
                $scope.$apply(function() {
                    vm.applyShortPeriod(response);
                    vm.applyLongPeriod(response);
                    vm.applyOverall(response);
                    vm.applyWorker(response);
                    vm.applyAdvanceInfo(response);
                })
            }
            socket.onclose = function() {
                console.log("Socket is close");
            }
        }

        function applyShortPeriod(response) {
            vm.farm.short_duration.duration_in_hour = response.short_window_duration / 3600;
            var pointTotal = response.short_window_duration / response.period_duration;
            vm.farm.short_duration.point_number = pointTotal;
            var totalEffectiveHashRate = 0;
            var totalReportedHashRate = 0;
            var reportedChart = ['Reported Hashrate'];
            var effectiveChart = ['Effective Hashrate'];

            var totalMinedShare = 0;
            var totalValidShare = 0;
            var totalRejectedShare = 0;
            var minedChart = ['Mined Shares'];
            var validChart = ['Valid Shares'];
            var rejectedChart = ['Rejected Shares'];

            var xChart = ['x'];
            vm.farm.worker.active_count = 0;
            vm.farm.worker.worker_list = [];

            //anchor point
            var anchorPoint = vm.getAnchorPointShort(response);
            var val;
            for (var key = anchorPoint; key < (anchorPoint + pointTotal); key++) {
                //console.log(key);
                if (response.short_window_sample[key]) {
                    val = response.short_window_sample[key]
                    xChart.push(key * response.period_duration * 1000);

                    reportedChart.push(vm.roundHashRate(val.reported_hashrate / 1000000));
                    effectiveChart.push(vm.roundHashRate(val.effective_hashrate / 1000000));
                    totalEffectiveHashRate += val.effective_hashrate;
                    totalReportedHashRate += val.reported_hashrate;

                    minedChart.push(val.mined_share);
                    validChart.push(val.valid_share);
                    rejectedChart.push(val.rejected_share);
                    totalMinedShare += val.mined_share;
                    totalValidShare += val.valid_share;
                    totalRejectedShare += val.rejected_share;

                    //calculate short hashrate and active worker
                    $.each(val.rigs, function(rigName, rigVal) {
                        var check = false;
                        for (var i = 0; i < vm.farm.worker.worker_list.length; i++) {
                            if (rigName === vm.farm.worker.worker_list[i][0]) {
                                check = true;
                                break;
                            }
                        }
                        if (check) {
                            vm.farm.worker.worker_list[i][1] += rigVal.ReportedHashrate ? rigVal.ReportedHashrate : 0;
                        } else {
                            vm.farm.worker.active_count += 1;
                            vm.farm.worker.worker_list.push([rigName, rigVal.ReportedHashrate ? rigVal.ReportedHashrate : 0, 0, 0])
                        }
                    })
                } else {
                    xChart.push(key * response.period_duration * 1000);
                    reportedChart.push(0);
                    effectiveChart.push(0);
                    minedChart.push(0);
                    validChart.push(0);
                    rejectedChart.push(0);
                }
            }

            vm.farm.short_duration.hash_rate.chart = [xChart, reportedChart, effectiveChart];
            vm.farm.short_duration.hash_rate.effective_hashrate_avarage = vm.convertHashrate(totalEffectiveHashRate / pointTotal);
            vm.farm.short_duration.hash_rate.reported_hashrate_avarage = vm.convertHashrate(totalReportedHashRate / pointTotal);
            vm.farm.short_duration.hash_rate.effective_hashrate_percent = vm.roundShares(vm.farm.short_duration.hash_rate.effective_hashrate_avarage / vm.farm.short_duration.hash_rate.reported_hashrate_avarage * 100);

            vm.farm.short_duration.shares.chart = [xChart, minedChart, validChart, rejectedChart];
            vm.farm.short_duration.shares.mined_share_avarage = vm.roundShares(totalMinedShare / pointTotal);
            vm.farm.short_duration.shares.valid_share_avarage = vm.roundShares(totalValidShare / pointTotal);
            vm.farm.short_duration.shares.rejected_share_avarage = vm.roundShares(totalRejectedShare / pointTotal);

            //calculate share percent
            vm.farm.short_duration.shares.valid_share_percent = vm.roundShares(vm.farm.short_duration.shares.valid_share_avarage / vm.farm.short_duration.shares.mined_share_avarage * 100);
            vm.farm.short_duration.shares.rejected_share_percent = vm.roundShares(vm.farm.short_duration.shares.rejected_share_avarage / vm.farm.short_duration.shares.mined_share_avarage * 100);


            //load chart
            // vm.shortHashrateChart.load({
            //     columns: vm.farm.short_duration.hash_rate.chart
            // })
            // vm.shortSharesChart.load({
            //     columns: vm.farm.short_duration.shares.chart
            // })
        }

        function applyLongPeriod(response) {
            vm.farm.long_duration.duration_in_hour = response.long_window_duration / 3600;
            var pointTotal = response.long_window_duration / response.period_duration;
            vm.farm.long_duration.point_number = pointTotal;
            var totalEffectiveHashRate = 0;
            var totalReportedHashRate = 0;
            var reportedChart = ['Reported Hashrate'];
            var effectiveChart = ['Effective Hashrate'];

            var totalMinedShare = 0;
            var totalValidShare = 0;
            var totalRejectedShare = 0;
            var minedChart = ['Mined Shares'];
            var validChart = ['Valid Shares'];
            var rejectedChart = ['Rejected Shares'];
            var workerChart = ['Active Workers'];
            var activeWorker = 0;

            var xChart = ['x'];

            //anchor point
            var anchorPoint = vm.getAnchorPointLong(response);
            var val;
            for (var key = anchorPoint; key < (anchorPoint + pointTotal); key++) {
                //console.log(key);
                if (response.long_window_sample[key]) {
                    val = response.long_window_sample[key];
                    xChart.push(key * response.period_duration * 1000);

                    //for hashrate
                    reportedChart.push(vm.roundHashRate(val.reported_hashrate / 1000000));
                    effectiveChart.push(vm.roundHashRate(val.effective_hashrate / 1000000));
                    totalEffectiveHashRate += val.effective_hashrate;
                    totalReportedHashRate += val.reported_hashrate;

                    //for share
                    minedChart.push(val.mined_share);
                    validChart.push(val.valid_share);
                    rejectedChart.push(val.rejected_share);
                    totalMinedShare += val.mined_share;
                    totalValidShare += val.valid_share;
                    totalRejectedShare += val.rejected_share;

                    //for workers

                    activeWorker = 0;
                    //calculate hashrate
                    $.each(val.rigs, function(rigName, rigVal) {
                        var check = false;
                        for (var i = 0; i < vm.farm.worker.worker_list.length; i++) {
                            if (rigName === vm.farm.worker.worker_list[i][0]) {
                                check = true;
                                break;
                            }
                        }
                        if (check) {
                            vm.farm.worker.worker_list[i][2] += rigVal.ReportedHashrate ? rigVal.ReportedHashrate : 0;
                        }
                        if (rigVal.ReportedHashrate && (rigVal.ReportedHashrate > 0)) {
                            activeWorker++;
                        }
                    })
                    workerChart.push(activeWorker);
                } else {
                    xChart.push(key * response.period_duration * 1000);
                    reportedChart.push(0);
                    effectiveChart.push(0);
                    minedChart.push(0);
                    validChart.push(0);
                    rejectedChart.push(0);
                    workerChart.push(0);
                }
            }

            //for hashrate
            vm.farm.long_duration.hash_rate.chart = [xChart, reportedChart, effectiveChart];
            vm.farm.long_duration.hash_rate.effective_hashrate_avarage = vm.convertHashrate(totalEffectiveHashRate / pointTotal);
            vm.farm.long_duration.hash_rate.reported_hashrate_avarage = vm.convertHashrate(totalReportedHashRate / pointTotal);
            vm.farm.long_duration.hash_rate.effective_hashrate_percent = vm.roundShares(vm.farm.long_duration.hash_rate.effective_hashrate_avarage / vm.farm.long_duration.hash_rate.reported_hashrate_avarage * 100);

            //for share
            vm.farm.long_duration.shares.chart = [xChart, minedChart, validChart, rejectedChart];
            vm.farm.long_duration.shares.mined_share_avarage = vm.roundShares(totalMinedShare / pointTotal);
            vm.farm.long_duration.shares.valid_share_avarage = vm.roundShares(totalValidShare / pointTotal);
            vm.farm.long_duration.shares.rejected_share_avarage = vm.roundShares(totalRejectedShare / pointTotal);
            //calculate percent
            vm.farm.long_duration.shares.valid_share_percent = vm.roundShares(vm.farm.long_duration.shares.valid_share_avarage / vm.farm.long_duration.shares.mined_share_avarage * 100);
            vm.farm.long_duration.shares.rejected_share_percent = vm.roundShares(vm.farm.long_duration.shares.rejected_share_avarage / vm.farm.long_duration.shares.mined_share_avarage * 100);

            //for active worker
            vm.farm.long_duration.rigs.chart = [xChart, workerChart];

            //load chartl
            vm.longHashrateChart.load({
                columns: vm.farm.long_duration.hash_rate.chart
            });
            vm.longSharesChart.load({
                columns: vm.farm.long_duration.shares.chart
            });
            vm.longRigChart.load({
                columns: vm.farm.long_duration.rigs.chart
            });
        }

        function applyOverall(response) {
            vm.farm.overall.effective_hashrate = vm.roundHashRate(response.overall.effective_hashrate / 1000000);
            vm.farm.overall.reported_hashrate = vm.roundHashRate(response.overall.reported_hashrate / 1000000);
            vm.farm.overall.effective_hashrate_percent = vm.roundShares(vm.farm.overall.effective_hashrate / vm.farm.overall.reported_hashrate * 100);

            vm.farm.overall.mined_share = response.overall.mined_share;
            vm.farm.overall.valid_share = response.overall.valid_share;
            vm.farm.overall.rejected_share = response.overall.rejected_share;
            vm.farm.overall.verified_share = response.overall.verified_share;
            vm.farm.overall.pending_share = response.overall.pending_share;
            if (vm.farm.overall.mined_share > 0) {
                vm.farm.overall.valid_share_percent = vm.roundShares(vm.farm.overall.valid_share / vm.farm.overall.mined_share * 100);
                vm.farm.overall.rejected_share_percent = vm.roundShares(vm.farm.overall.rejected_share / vm.farm.overall.mined_share * 100);
            }
            //calculate hashrate
            for (var i = 0; i < vm.farm.worker.worker_list.length; i++) {
                var rigName = vm.farm.worker.worker_list[i][0];
                if (response.overall.rigs[rigName]) {
                    vm.farm.worker.worker_list[i][3] = response.overall.rigs[rigName].ReportedHashrate ? response.overall.rigs[rigName].ReportedHashrate : 0;
                }
            }
        }

        function applyWorker(response) {
            if (vm.tableWorker) {
                $('#worker_table').dataTable().fnDestroy();
            }
            for (var i = 0; i < vm.farm.worker.worker_list.length; i++) {
                if (vm.farm.short_duration.point_number > 0) {
                    vm.farm.worker.worker_list[i][1] = vm.convertHashrate(vm.farm.worker.worker_list[i][1] / vm.farm.short_duration.point_number);
                }
                if (vm.farm.long_duration.point_number > 0) {
                    vm.farm.worker.worker_list[i][2] = vm.convertHashrate(vm.farm.worker.worker_list[i][2] / vm.farm.long_duration.point_number);
                }
                vm.farm.worker.worker_list[i][3] = vm.convertHashrate(vm.farm.worker.worker_list[i][3])
            }
            vm.tableWorker = $("#worker_table").DataTable({
                paging: false,
                info: false,
                stateSave: true,
                data: vm.farm.worker.worker_list,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "search..."
                },
                columns: [
                    { title: "Worker" },
                    { title: vm.farm.short_duration.duration_in_hour + " ago" },
                    { title: vm.farm.long_duration.duration_in_hour + " ago" },
                    { title: "Overall" },
                ],
                columnDefs: [{
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    "render": function(data, type, row) {
                        return '<a href="/stats/#!/rig/' + data + '" rel="workerChart" class="btn btn-default btn-xs">' + data + '</a>';
                    },
                    "targets": 0
                }, ]
            });
        }

        function applyAdvanceInfo(response) {
            vm.advance.total_block_found = response.overall.total_block_found;
            vm.advance.start_time = response.overall.start_time;
            vm.advance.last_block = response.overall.last_block;
            vm.advance.last_valid_share = response.overall.last_valid_share;
        }

        function showAdvanceInfo() {
            vm.advance.flag = !vm.advance.flag;
            // if (vm.advance.load) {
            //     vm.advance.flag = !vm.advance.flag;
            //     return;
            // }
            // EthminerService.GetAdvanceInfo()
            //     .then(function(response) {
            //         vm.advance.x = response.x;
            //         vm.advance.y = response.y;
            //         vm.advance.load = true;
            //         vm.advance.flag = true;
            //     });
        }
        (function initController() {
            EthminerService.GetConfigInfo()
                .then(function(response) {
                    vm.config = response;
                });
        })();

        function roundHashRate(rate) {
            return Math.round(rate * 100) / 100;
        }

        function roundShares(shares) {
            return Math.round(shares * 100) / 100;
        }

        function convertHashrate(hashRate) {
            //convert to Mhz
            return Math.round(hashRate / 1000000 * 100) / 100;
        }

        function getAnchorPointShort(response) {
            var point = 99999999;
            $.each(response.short_window_sample, function(key, val) {
                var keyInt = parseInt(key, 10);
                if (keyInt < point) {
                    point = keyInt;
                }
            })
            return point
        }


        function getAnchorPointLong(response) {
            var point = 99999999;
            $.each(response.long_window_sample, function(key, val) {
                var keyInt = parseInt(key, 10);
                if (keyInt < point) {
                    point = keyInt;
                }
            })
            return point
        }
    }

})();
