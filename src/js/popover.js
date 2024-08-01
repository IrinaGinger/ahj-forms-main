export default class Popover {
    constructor() {
        this.popovers = [];
    }

    showPopover(popover, element) {
        const popoverElement = document.createElement('div');
        popoverElement.classList.add('popover-element');

        const popoverRectangle = document.createElement('div');
        popoverRectangle.classList.add('popover-rectangle');
        popoverElement.appendChild(popoverRectangle);

        const popoverHeader = document.createElement('div');
        popoverHeader.classList.add('popover-header');
        popoverHeader.textContent = popover.header;
        popoverRectangle.appendChild(popoverHeader);

        const popoverContent = document.createElement('div');
        popoverContent.classList.add('popover-content');
        popoverContent.textContent = popover.message;
        popoverRectangle.appendChild(popoverContent);

        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        arrow.innerHTML = "&rang;";
        popoverElement.appendChild(arrow);

        this.popovers.push({
            id: popover.id,
            element: popoverElement
        })

        document.body.appendChild(popoverElement);

        const { left, top } = element.getBoundingClientRect();

        popoverElement.style.top = top - popoverElement.offsetHeight + 'px'
        popoverElement.style.left = left + element.offsetWidth / 2 - popoverElement.offsetWidth / 2 + 'px';

    }

    removePopover(id) {
        const popover = this.popovers.find(t => t.id === id);
        
        if (!popover) {
            return;
        }

        popover.element.remove();
        this.popovers = this.popovers.filter(t => t.id !== id);
    }
}