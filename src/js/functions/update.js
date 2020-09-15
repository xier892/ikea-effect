function updateSectionData(section = GLOBAL.SECTIONS[0], report = {}) {
  if (GLOBAL.COMPLETE) {
    return;
  }

  section.WPM_RESULTS.push(report.wpmTrue);
  // eslint-disable-next-line no-param-reassign
  section.AVERAGE_WPM = average(section.WPM_RESULTS);

  const tdWpm = section.TABLE_ROW.getElementsByClassName('wpm')[0];
  const tdSectionTitle = section.TABLE_ROW.getElementsByClassName('section-title')[0];

  tdWpm.textContent = Math.round(section.AVERAGE_WPM);
  section.TABLE_ROW.classList.add('complete');

  if (GLOBAL.SECTIONS.indexOf(section) === GLOBAL.SECTIONS.length - 1) {
    updateFinalData();
  }
}

function updateFinalData() {
  const report = {
    wpms: []
  };

  for (let i = 0; i < GLOBAL.SECTIONS.length; i++) {
    report.wpms.push(GLOBAL.SECTIONS[i].AVERAGE_WPM);
  }

  GLOBAL.FINAL_DATA.AVERAGE_WPM = Math.round(average(report.wpms));
  GLOBAL.COMPLETE = true;
  console.log(GLOBAL.FINAL_DATA);

  setupFinalTableRow();
  setupFinalSection();
}
