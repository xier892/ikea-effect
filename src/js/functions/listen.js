function setupTextareas() {
  const textareas = document.getElementsByClassName('typing-area');

  for (let i = 0; i < textareas.length; i++) {
    const copy = document.querySelector(`.copy[data-index-number="${i}"]`);
    const copyText = copy.textContent;
    const report = {
      wordLength: copyText.split(' ').length,
      errors: 0
    };
    let progress = 0;

    const listenTextInput = (event) => {
      const typedCharacters = Array.from(event.target.value);

      if (progress === 0) {
        report.timeBegin = Date.now();
      }

      if (GLOBAL.DEBUG_MODE && typedCharacters[progress] === '*') {
        progress = copyText.length - 1;
        advance();
      }

      // report.lastTyped = typedCharacters[progress];
      // report.remainingCharacters = copyText.length - progress - 1;

      switch (copyText[progress]) {
        case '’':
          typedCharacters[progress] = typedCharacters[progress].replace('\'', '’');
          break;
        case '—':
          typedCharacters[progress] = typedCharacters[progress].replace('-', '—');
          break;
        case '“':
          typedCharacters[progress] = typedCharacters[progress].replace('"', '“');
          break;
        case '”':
          typedCharacters[progress] = typedCharacters[progress].replace('"', '”');
          break;
        default:
      }

      if (typedCharacters.join('') === copyText.slice(0, progress + 1)) {
        // eslint-disable-next-line no-param-reassign
        event.target.value = typedCharacters.join('');
        advance();
        progress++;
      } else {
        report.errors++;
        // eslint-disable-next-line no-param-reassign
        event.target.value = copyText.slice(0, progress);

        const p = event.target.parentNode;
        p.classList.add('error');
        p.addEventListener('animationend', function removeClassAfterAnimation() {
          p.removeEventListener('animationend', removeClassAfterAnimation, false);
          p.classList.remove('error');
        }, false);
      }

      function advance() {
        if (progress === copyText.length - 1) {
          report.timeEnd = Date.now();
          report.timeTotal = Math.max(1, report.timeEnd - report.timeBegin);
          report.wpm = report.wordLength / report.timeTotal * 60000;
          report.epm = report.errors / report.timeTotal * 60000;
          report.wpmTrue = Math.max(0, report.wpm - report.epm);
          console.table(report);

          const currentParagraph = event.target.parentNode;
          const section = currentParagraph.parentNode;
          const currentSection = GLOBAL.SECTIONS[section.getAttribute('data-index-number')];

          textareas[i].disabled = true;
          copy.classList.add('complete');

          if (currentSection.PARAGRAPHS[currentSection.PARAGRAPHS.length - 1].id === `p${i}`) {
            updateSectionData(currentSection, report);
          }

          if (document.body.contains(document.getElementById(`p${i + 1}`))) {
            const nextArea = document.querySelector(`.typing-area[data-index-number="${i + 1}"]`);
            const nextParagraph = document.getElementById(`p${i + 1}`);
            const nextSection = nextParagraph.parentNode;

            nextArea.removeAttribute('disabled');
            nextArea.focus();
            const scrollCoefficient = nextArea.offsetHeight / window.innerHeight * 6;
            const scrollTarget = getOffsetTop(nextArea) - nextArea.offsetHeight / scrollCoefficient;
            ROOT.scrollTop = Math.max(ROOT.scrollTop, scrollTarget);

            if (nextSection.classList.contains('inaccessible')) {
              nextSection.classList.remove('inaccessible');
            }
          }
        }
      }
    };

    textareas[i].addEventListener('input', listenTextInput, false);
  }
}
