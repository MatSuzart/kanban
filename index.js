const kanban = document.querySelector('.kanban');
const columns = kanban.querySelectorAll('.column');

let draggingCard = null;

for (const column of columns) {
  column.addEventListener('dragstart', (event) => {
    draggingCard = event.target;
    setTimeout(() => {
      event.target.style.display = 'none';
    }, 0);
  });

  column.addEventListener('dragover', (event) => {
    event.preventDefault();
    const columnEl = event.target.closest('.column');
    if (columnEl) {
      const firstCard = columnEl.querySelector('.card');
      if (firstCard && event.clientY < firstCard.getBoundingClientRect().top + firstCard.offsetHeight / 2) {
        columnEl.insertBefore(draggingCard, firstCard);
      } else {
        const afterElement = getCardAfterElement(columnEl, event.clientY);
        if (afterElement) {
          columnEl.insertBefore(draggingCard, afterElement.nextElementSibling);
        } else {
          columnEl.appendChild(draggingCard);
        }
      }
    }
  });

  column.addEventListener('dragend', (event) => {
    draggingCard.style.display = 'block';
    draggingCard = null;
  });
}

function getCardAfterElement(columnEl, y) {
  const cards = columnEl.querySelectorAll('.card:not(.dragging)');
  for (const card of cards) {
    const cardRect = card.getBoundingClientRect();
    if (y > cardRect.top + cardRect.height / 2 && y < cardRect.bottom) {
      return card;
    }
  }
  return null;
}