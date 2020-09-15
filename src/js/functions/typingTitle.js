function typingTitle() {
  const target = document.getElementById('typewriter-text');
  const text = document.getElementById('title-text').textContent;

  const typewriter = new Typewriter(target, {
    loop: false
  });

  typewriter.typeString(text)
    .pauseFor(2500)
    .deleteAll()
    .typeString(text)
    .pauseFor(2500)
    .start();
}

interact('.typewriter-container')
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.title .grid-wrapper',
        endOnly: true
      })
    ]
  })
  .resizable({
    // resize from all edges and corners
    edges: {
      left: true,
      right: true,
      bottom: true,
      top: true
    },

    listeners: {
      move (event) {
        const { target } = event;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = `translate(${x}px, ${y}px)`;
        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: '.title .grid-wrapper'
      }),
    ],

    inertia: true
  });

function dragMoveListener (event) {
  const { target } = event;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform = `translate(${x}px, ${y}px)`;
  target.style.transform = `translate(${x}px, ${y}px)`;

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
