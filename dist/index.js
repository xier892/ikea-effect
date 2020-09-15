"use strict";function average(e){return e.reduce(function(e,t){return e+t})/e.length}function debugMode(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];GLOBAL.DEBUG_MODE=e}function getOffsetTop(e){for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;return t}function setupTextareas(){for(var e=document.getElementsByClassName("typing-area"),t=function(t){var a=document.querySelector('.copy[data-index-number="'.concat(t,'"]')),n=a.textContent,r={wordLength:n.split(" ").length,errors:0},o=0;e[t].addEventListener("input",function(i){var s=Array.from(i.target.value);switch(0===o&&(r.timeBegin=Date.now()),GLOBAL.DEBUG_MODE&&"*"===s[o]&&(o=n.length-1,l()),n[o]){case"’":s[o]=s[o].replace("'","’");break;case"—":s[o]=s[o].replace("-","—");break;case"“":s[o]=s[o].replace('"',"“");break;case"”":s[o]=s[o].replace('"',"”")}if(s.join("")===n.slice(0,o+1))i.target.value=s.join(""),l(),o++;else{r.errors++,i.target.value=n.slice(0,o);var c=i.target.parentNode;c.classList.add("error"),c.addEventListener("animationend",function e(){c.removeEventListener("animationend",e,!1),c.classList.remove("error")},!1)}function l(){if(o===n.length-1){r.timeEnd=Date.now(),r.timeTotal=Math.max(1,r.timeEnd-r.timeBegin),r.wpm=r.wordLength/r.timeTotal*6e4,r.epm=r.errors/r.timeTotal*6e4,r.wpmTrue=Math.max(0,r.wpm-r.epm),console.table(r);var s=i.target.parentNode.parentNode,c=GLOBAL.SECTIONS[s.getAttribute("data-index-number")];if(e[t].disabled=!0,a.classList.add("complete"),c.PARAGRAPHS[c.PARAGRAPHS.length-1].id==="p".concat(t)&&updateSectionData(c,r),document.body.contains(document.getElementById("p".concat(t+1)))){var l=document.querySelector('.typing-area[data-index-number="'.concat(t+1,'"]')),d=document.getElementById("p".concat(t+1)).parentNode;l.removeAttribute("disabled"),l.focus();var p=l.offsetHeight/window.innerHeight*6,m=getOffsetTop(l)-l.offsetHeight/p;ROOT.scrollTop=Math.max(ROOT.scrollTop,m),d.classList.contains("inaccessible")&&d.classList.remove("inaccessible")}}}},!1)},a=0;a<e.length;a++)t(a)}function setup(){"scrollRestoration"in history&&(history.scrollRestoration="manual"),ROOT=document.documentElement;var e=document.getElementById("text");setupParagraphs(e),setupSections(e),setupContents(),setupTextareas()}function setupParagraphs(e){for(var t=e.querySelectorAll("p.typerace"),a=0;a<t.length;a++){var n=t[a].textContent;if(t[a].innerHTML='\n      <textarea class="typing-area" spellcheck="false" autocorrect="off" autocapitalize="off" data-index-number="'.concat(a,'" ').concat(a>0?"disabled":"",'></textarea>\n      <span class="copy" data-index-number="').concat(a,'">').concat(n,"</span>\n    "),t[a].id="p".concat(a),0===a){var r=t[a].getElementsByTagName("textarea")[0];new IntersectionObserver(o,{rootMargin:"0px",threshold:1}).observe(r)}}function o(e,t){for(var a=0;a<e.length;a++)e[a].isIntersecting&&(e[a].target.focus(),t.disconnect())}}function setupSections(e){for(var t=e.querySelectorAll("section.typerace"),a=0;a<t.length;a++){var n=t[a].getElementsByTagName("h2")[0],r=t[a].getElementsByTagName("p");t[a].id="s".concat(a),t[a].setAttribute("data-index-number",a),GLOBAL.SECTIONS.push({NODE:t[a],HEADER:n.textContent,PARAGRAPHS:r,WPM_RESULTS:[]})}}function setupContents(){for(var e=document.getElementById("contents").getElementsByTagName("tbody")[0],t=0;t<GLOBAL.SECTIONS.length;t++){var a=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("td");a.id="tr".concat(t),n.className="wpm",r.className="section-title",r.appendChild(document.createTextNode(GLOBAL.SECTIONS[t].HEADER)),a.appendChild(n),a.appendChild(r),e.appendChild(a),GLOBAL.SECTIONS[t].TABLE_ROW=a}}function setupFinalSection(){var e=ROOT.scrollTop,t=document.getElementById("summary");t.classList.remove("opacity-0"),ROOT.scrollTop=Math.max(e,getOffsetTop(t)-45)}function setupFinalTableRow(e){var t=document.getElementById("contents").getElementsByTagName("tbody")[0],a=document.createElement("tr"),n=document.createElement("td"),r=document.createElement("td");n.className="wpm final",r.className="section-title final",n.textContent=GLOBAL.FINAL_DATA.AVERAGE_WPM,r.appendChild(document.createTextNode("Average wpm")),a.appendChild(n),a.appendChild(r),t.appendChild(a)}function typingTitle(){var e=document.getElementById("typewriter-text"),t=document.getElementById("title-text").textContent;new Typewriter(e,{loop:!1}).typeString(t).pauseFor(2500).deleteAll().typeString(t).pauseFor(2500).start()}function dragMoveListener(e){var t=e.target,a=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,n=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.webkitTransform="translate(".concat(a,"px, ").concat(n,"px)"),t.style.transform="translate(".concat(a,"px, ").concat(n,"px)"),t.setAttribute("data-x",a),t.setAttribute("data-y",n)}function updateSectionData(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:GLOBAL.SECTIONS[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!GLOBAL.COMPLETE){e.WPM_RESULTS.push(t.wpmTrue),e.AVERAGE_WPM=average(e.WPM_RESULTS);var a=e.TABLE_ROW.getElementsByClassName("wpm")[0];e.TABLE_ROW.getElementsByClassName("section-title")[0];a.textContent=Math.round(e.AVERAGE_WPM),e.TABLE_ROW.classList.add("complete"),GLOBAL.SECTIONS.indexOf(e)===GLOBAL.SECTIONS.length-1&&updateFinalData()}}function updateFinalData(){for(var e={wpms:[]},t=0;t<GLOBAL.SECTIONS.length;t++)e.wpms.push(GLOBAL.SECTIONS[t].AVERAGE_WPM);GLOBAL.FINAL_DATA.AVERAGE_WPM=Math.round(average(e.wpms)),GLOBAL.COMPLETE=!0,console.log(GLOBAL.FINAL_DATA),setupFinalTableRow(),setupFinalSection()}interact(".typewriter-container").draggable({listeners:{move:window.dragMoveListener},inertia:!0,modifiers:[interact.modifiers.restrictRect({restriction:".title .grid-wrapper",endOnly:!0})]}).resizable({edges:{left:!0,right:!0,bottom:!0,top:!0},listeners:{move:function(e){var t=e.target,a=parseFloat(t.getAttribute("data-x"))||0,n=parseFloat(t.getAttribute("data-y"))||0;t.style.width="".concat(e.rect.width,"px"),t.style.height="".concat(e.rect.height,"px"),a+=e.deltaRect.left,n+=e.deltaRect.top,t.style.webkitTransform="translate(".concat(a,"px, ").concat(n,"px)"),t.style.transform="translate(".concat(a,"px, ").concat(n,"px)"),t.setAttribute("data-x",a),t.setAttribute("data-y",n)}},modifiers:[interact.modifiers.restrictEdges({outer:".title .grid-wrapper"})],inertia:!0}),window.dragMoveListener=dragMoveListener;var ROOT,GLOBAL={DEBUG_MODE:!0,SECTIONS:[],FINAL_DATA:{},COMPLETE:!1};typingTitle(),setup();