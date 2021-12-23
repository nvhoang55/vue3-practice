/* eslint-disable no-unused-vars */
import bootstrap from "bootstrap";

// Enable tooltips everywhere
const tooltipTriggerList = [].slice.call(document.querySelectorAll("[data-bs-toggle=\"tooltip\"]"));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl)
{
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
