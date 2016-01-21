"use strict";angular.module("fuelCalculator",["ngRoute"]).config(["$routeProvider",function(e){e.when("/distance",{templateUrl:"views/distance.html",controller:"DistanceCtrl",controllerAs:"vm"}).when("/fuel-volume",{templateUrl:"views/fuel-volume.html",controller:"FuelVolumeCtrl",controllerAs:"vm"}).when("/tank-volume",{templateUrl:"views/tank-volume.html",controller:"TankVolumeCtrl",controllerAs:"vm"}).when("/cost",{templateUrl:"views/cost.html",controller:"CostCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/distance"})}]).run(["$rootScope","$location","$window",function(e,t,r){var i=null;e.$on("$routeChangeSuccess",function(e,l,n){var a=t.path();r.ga&&a!==i&&r.ga("send","pageview",{page:a}),i=a})}]),angular.module("fuelCalculator").service("settingsService",["$window",function(e){var t=this;this.fuelType=function(r){if(!r)return e.localStorage.getItem("fuelType")||"91";var i=t.fuelType();e.localStorage.setItem("fuelType",r),e.ga&&e.ga("send","event","Octane","change",i+"->"+r)},this.consumption=function(t){return t?void e.localStorage.setItem("consumption",parseFloat(t)||8):parseFloat(e.localStorage.getItem("consumption"))||8},this.alertsRead=function(t){return t?void e.localStorage.setItem("alertsRead",!!t):!!e.localStorage.getItem("alertsRead")}}]),angular.module("fuelCalculator").service("fuelService",function(){function e(){return d}function t(e,t,r){return e/t*r}function r(e,t){return"new"===e?"91"===t?.75:.9:"91"===t?.45:.6}function i(e,t){var i=r("new",e),l=t/i;return l}function l(e,t,r,l){var n=i(e,l),a=n*t/r;return a}function n(e,t,i){return i*r(e,t)}function a(e,t,r,i,l){var a=i/r,c=a*l;return n(e,t,c)}var c="يوم",o="اسبوع",u="شهر",s="سنة",d=[[c,1],[o,7],[u,30],[s,360]];this.calculateByDistance=a,this.calculateByVolume=n,this.calculateDistanceByVolume=t,this.calculateDistanceByPrice=l,this.calculateLitersByPrice=i,this.getPeriodTable=e,this.getLiterPrice=r}),angular.module("fuelCalculator").service("periodService",["$window",function(e){var t="اليوم",r="الاسبوع",i="الشهر",l="السنة",n={day:1,week:7,month:30,year:360},a={day:t,week:r,month:i,year:l};this.getPeriodMenu=function(t){var r=t||"day";return{getVisualSelectedPeriod:function(){return a[r]},isPeriodSelected:function(e){return e===r},selectPeriod:function(t){var i=r;r=t,e.ga&&e.ga("send","event","Period","change",i+"->"+t)},getValuePerDay:function(e){return e/n[r]}}}}]),angular.module("fuelCalculator").controller("FuelVolumeCtrl",["fuelService","periodService","settingsService",function(e,t,r){var i=this;this.periodTable=e.getPeriodTable(),this.periodMenu=t.getPeriodMenu(),this.volume=1,this.calculatePrice=function(t){var l=i.periodMenu.getValuePerDay(i.volume);return e.calculateByVolume(t,r.fuelType(),l)},this.calculatePriceDifference=function(){var e=i.calculatePrice("old"),t=i.calculatePrice("new");return t-e}}]),angular.module("fuelCalculator").controller("TankVolumeCtrl",["fuelService","periodService","settingsService",function(e,t,r){var i=this;this.litersForDistance=1,this.tankVolume=64,this.fillTimes=1,this.periodTable=e.getPeriodTable(),this.periodMenu=t.getPeriodMenu("week"),this.distanceForLiters=r.consumption(),this.setConsumption=r.consumption,this.calculateDistance=function(){var t=i.periodMenu.getValuePerDay(i.fillTimes),r=i.tankVolume*t;return e.calculateDistanceByVolume(i.distanceForLiters,i.litersForDistance,r)},this.calculatePrice=function(t){var l=i.calculateDistance(),n=r.fuelType();return e.calculateByDistance(t,n,i.distanceForLiters,i.litersForDistance,l)},this.calculatePriceDifference=function(){var e=i.calculatePrice("old"),t=i.calculatePrice("new");return t-e}}]),angular.module("fuelCalculator").controller("DistanceCtrl",["fuelService","periodService","settingsService",function(e,t,r){var i=this;this.litersForDistance=1,this.distance=15,this.distanceForLiters=r.consumption(),this.setConsumption=r.consumption,this.periodTable=e.getPeriodTable(),this.periodMenu=t.getPeriodMenu(),this.calculateDistance=function(e){var t=i.periodMenu.getValuePerDay(i.distance);return t*e},this.calculatePrice=function(t){var l=i.periodMenu.getValuePerDay(i.distance),n=r.fuelType();return e.calculateByDistance(t,n,i.distanceForLiters,i.litersForDistance,l)},this.calculatePriceDifference=function(){var e=i.calculatePrice("old"),t=i.calculatePrice("new");return t-e}}]),angular.module("fuelCalculator").controller("CostCtrl",["fuelService","periodService","settingsService",function(e,t,r){var i=this;this.litersForDistance=1,this.cost=1,this.distanceForLiters=r.consumption(),this.setConsumption=r.consumption,this.periodTable=e.getPeriodTable(),this.periodMenu=t.getPeriodMenu(),this.calculateDistance=function(){var t=i.periodMenu.getValuePerDay(i.cost);return e.calculateDistanceByPrice(r.fuelType(),i.distanceForLiters,i.litersForDistance,t)},this.calculatePrice=function(t){var l=i.periodMenu.getValuePerDay(i.cost),n=r.fuelType(),a=e.calculateDistanceByPrice(n,i.distanceForLiters,i.litersForDistance,l);return e.calculateByDistance(t,n,i.distanceForLiters,i.litersForDistance,a)},this.calculatePriceDifference=function(){var e=i.calculatePrice("old"),t=i.calculatePrice("new");return t-e}}]),angular.module("fuelCalculator").controller("NavbarCtrl",["settingsService",function(e){this.setFuelType=e.fuelType,this.isFuelType=function(t){return e.fuelType()===t}}]),angular.module("fuelCalculator").controller("TabsCtrl",["$location",function(e){this.isCurrentPath=function(t){return t===e.path()}}]),angular.module("fuelCalculator").controller("AlertsCtrl",["settingsService",function(e){this.alertsRead=function(){return e.alertsRead()},this.dismiss=function(){e.alertsRead(!0)}}]);