import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f as l,i as c}from"./assets/vendor-651d7991.js";const t={input:document.querySelector("#datetime-picker"),btn:document.querySelector("button[data-start]"),daysField:document.querySelector("span[data-days]"),hoursField:document.querySelector("span[data-hours]"),minutesField:document.querySelector("span[data-minutes]"),secondsField:document.querySelector("span[data-seconds]")};let a,s;t.btn.disabled=!0;const m={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){new Date>e[0]?(c.error({title:"Alert",message:"Please choose a date in the future",position:"center"}),t.btn.disabled=!0):(a=e[0],t.btn.disabled=!1)}};l(t.input,m);t.btn.addEventListener("click",f);function f(e){s=setInterval(()=>h(a.getTime()-new Date().getTime()),1e3),e.target.disabled=!0,t.input.disabled=!0}function h(e){if(e>0){const n=p(e);t.daysField.textContent=o(n.days),t.hoursField.textContent=o(n.hours),t.minutesField.textContent=o(n.minutes),t.secondsField.textContent=o(n.seconds)}else clearInterval(s),t.input.disabled=!1}function p(e){const d=Math.floor(e/864e5),r=Math.floor(e%864e5/36e5),i=Math.floor(e%864e5%36e5/6e4),u=Math.floor(e%864e5%36e5%6e4/1e3);return{days:d,hours:r,minutes:i,seconds:u}}function o(e){return(""+e).padStart(2,0)}
//# sourceMappingURL=commonHelpers2.js.map
