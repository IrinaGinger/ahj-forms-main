import Popover from "./popover";

const form = document.querySelector('.form');

const messages = [
    {
        id: "main-button",
        header: "Popover for button #main-button",
        message: "And here's some amazing content. It's very engaging. Right?"
    },
    {
        id: "another-button",
        header: "Popover for button #another-button",
        message: "Here is some content too"
    }
];

const popoverCollection = new Popover();

form.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;

    let isRemoved = popoverCollection.popovers.some(elem => {
        if (elem.id === target.id) {
            popoverCollection.removePopover(elem.id);
            return true;
        }
    })

    if (!isRemoved) {
        let messageElem = messages.find(msg => {return msg.id === target.id});
        if (messageElem) {
            popoverCollection.showPopover(messageElem, target);
        }
    }
});