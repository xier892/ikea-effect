function setup() {
  // eslint-disable-next-line no-restricted-globals
  if ('scrollRestoration' in history) {
    // eslint-disable-next-line no-restricted-globals
    history.scrollRestoration = 'manual';
  }

  ROOT = document.documentElement;
  const text = document.getElementById('text');

  setupParagraphs(text);
  setupSections(text);
  setupContents();
  setupTextareas();
}

function setupParagraphs(text) {
  const paragraphs = text.querySelectorAll('p.typerace');

  for (let i = 0; i < paragraphs.length; i++) {
    const content = paragraphs[i].textContent;
    paragraphs[i].innerHTML = `
      <textarea class="typing-area" spellcheck="false" autocorrect="off" autocapitalize="off" data-index-number="${i}" ${(i > 0) ? 'disabled' : ''}></textarea>
      <span class="copy" data-index-number="${i}">${content}</span>
    `;
    paragraphs[i].id = `p${i}`;

    if (i === 0) {
      const textarea = paragraphs[i].getElementsByTagName('textarea')[0];
      const observer = new IntersectionObserver(observerCb, {
        rootMargin: '0px',
        threshold: 1
      });

      observer.observe(textarea);
    }
  }

  function observerCb(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.focus();
        observer.disconnect();
      }
    }
  }
}

function setupSections(text) {
  const sections = text.querySelectorAll('section.typerace');

  for (let i = 0; i < sections.length; i++) {
    const header = sections[i].getElementsByTagName('h2')[0];
    const paragraphs = sections[i].getElementsByTagName('p');
    // const observer = new IntersectionObserver(observerCb, {
    //   rootMargin: '0px',
    //   threshold: [0, 0.2, 0.5, 1]
    // });

    sections[i].id = `s${i}`;
    sections[i].setAttribute('data-index-number', i);

    GLOBAL.SECTIONS.push({
      NODE: sections[i],
      HEADER: header.textContent,
      PARAGRAPHS: paragraphs,
      WPM_RESULTS: []
    });

    // if (i > 0) {
    //   sections[i].style.opacity = 0;
    //   observer.observe(header);
    // }
  }

  // function observerCb(entries, observer) {
  //   for (let i = 0; i < entries.length; i++) {
  //     if (entries[i].isIntersecting) {
  //       entries[i].target.parentNode.style.opacity = entries[i].intersectionRatio;
  //     }
  //
  //     if (!entries[i].target.parentNode.classList.contains('inaccessible')) {
  //       entries[i].target.parentNode.removeAttribute('style');
  //       observer.unobserve(entries[i].target);
  //     }
  //   }
  // }
}

function setupContents() {
  const contents = document.getElementById('contents');
  const tbody = contents.getElementsByTagName('tbody')[0];

  for (let i = 0; i < GLOBAL.SECTIONS.length; i++) {
    const tr = document.createElement('tr');
    const tdWpm = document.createElement('td');
    const tdSectionTitle = document.createElement('td');

    tr.id = `tr${i}`;
    tdWpm.className = 'wpm';
    tdSectionTitle.className = 'section-title';

    tdSectionTitle.appendChild(document.createTextNode(GLOBAL.SECTIONS[i].HEADER));
    tr.appendChild(tdWpm);
    tr.appendChild(tdSectionTitle);
    tbody.appendChild(tr);

    GLOBAL.SECTIONS[i].TABLE_ROW = tr;
  }
}

function setupFinalSection() {
  const { scrollTop } = ROOT;
  const finalSection = document.getElementById('summary');
  finalSection.classList.remove('opacity-0');
  ROOT.scrollTop = Math.max(scrollTop, getOffsetTop(finalSection) - 45);
}

function setupFinalTableRow(wpm) {
  const contents = document.getElementById('contents');
  const tbody = contents.getElementsByTagName('tbody')[0];
  const tr = document.createElement('tr');
  const tdWpmFinal = document.createElement('td');
  const tdTitleFinal = document.createElement('td');

  tdWpmFinal.className = 'wpm final';
  tdTitleFinal.className = 'section-title final';

  tdWpmFinal.textContent = GLOBAL.FINAL_DATA.AVERAGE_WPM;
  tdTitleFinal.appendChild(document.createTextNode('Average wpm'));
  tr.appendChild(tdWpmFinal);
  tr.appendChild(tdTitleFinal);
  tbody.appendChild(tr);
}
