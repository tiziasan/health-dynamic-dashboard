
import { updateUser } from './api.js';
export function enableDragAndDrop(container, currentUser) {
    const draggables = container.querySelectorAll('.widget');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    // --- ADD THIS BLOCK FOR SAFARI SUPPORT ---
    container.addEventListener('dragenter', e => {
        e.preventDefault();
    });
    // -----------------------------------------
    container.addEventListener('dragend', async () => {
        setTimeout(async () => {
            await saveNewOrder(container, currentUser);
        }, 100);
    });
    container.addEventListener('dragover', e => {
        e.preventDefault();

        const afterElement = getDragAfterElement(container, e.clientY, e.clientX);
        const draggable = document.querySelector('.dragging');

        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
}
async function saveNewOrder(container, currentUser) {
    if (!currentUser || !currentUser.layout) return;

    // 1. Get the new visual order of DOM elements
    const widgetElements = Array.from(container.children);

    // 2. Reorder the data array to match the DOM
    const newLayoutData = widgetElements.map(el => {
        // We stored the original index in dataset.index in render.js
        const originalIndex = el.dataset.index;
        return currentUser.layout[originalIndex];
    });

    // 3. Save to DB
    console.log("💾 Saving new drag order...");
    await updateUser(currentUser.id, { layout: newLayoutData });

    // 4. Update local state so we don't need to fetch again
    currentUser.layout = newLayoutData;
}
// Helper: Calculate which element the mouse is hovering over
function getDragAfterElement(container, y, x) {
    // Get all widgets except the one we are dragging
    const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();

        // Calculate distance from center of box
        // We look for horizontal and vertical overlap
        const offsetX = x - box.left - box.width / 2;
        const offsetY = y - box.top - box.height / 2;

        // Simple approximation for grid:
        // We generally care about the element *immediately* after the mouse cursor
        // For a strict grid, this logic can be complex, but for this project,
        // checking the "next sibling" visual position usually works well.

        if (offsetX < 0 && offsetY < 0 && offsetX > closest.offset) {
            return { offset: offsetX, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
